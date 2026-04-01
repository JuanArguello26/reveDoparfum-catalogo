// ==========================================
// RÉVE DO PARFUM - CATÁLOGO ESTÁTICO
// ==========================================

let perfumes = [];
let filteredPerfumes = [];
let currentView = 'client';
let searchTerm = '';

const WHATSAPP_NUMBER = '573151413120';

// ==========================================
// DATA LOADING
// ==========================================
async function loadPerfumes() {
  try {
    const response = await fetch('data/perfumes.json');
    const data = await response.json();
    perfumes = data.perfumes;
    filteredPerfumes = [...perfumes];
    return perfumes;
  } catch (error) {
    console.error('Error loading perfumes:', error);
    return [];
  }
}

// ==========================================
// UTILITIES
// ==========================================
const formatMoney = (amount) => new Intl.NumberFormat('es-CO', { 
  style: 'currency', 
  currency: 'COP', 
  minimumFractionDigits: 0 
}).format(amount * 1000);

// ==========================================
// VIEW MANAGEMENT
// ==========================================
function goHome() {
  hideAllViews();
  document.getElementById('client-view').classList.remove('hidden');
  currentView = 'client';
  window.scrollTo(0, 0);
}

function showCatalogView() {
  hideAllViews();
  document.getElementById('catalog-view').classList.remove('hidden');
  currentView = 'catalog';
  renderCatalog();
  window.scrollTo(0, 0);
}

function hideAllViews() {
  document.getElementById('client-view').classList.add('hidden');
  document.getElementById('catalog-view').classList.add('hidden');
}

// ==========================================
// RENDERING
// ==========================================
function createProductCard(product) {
  return `
    <div class="product-card" onclick="openPerfumeModal(${product.id})">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%231a1a1a%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23d4af37%22 font-size=%2240%22>✦</text></svg>'">
      <p class="product-brand">${product.brand || 'Premium'}</p>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">${formatMoney(product.price)}</p>
      <p class="product-type">${product.type} • ${product.category}</p>
    </div>
  `;
}

function renderTrending() {
  const container = document.getElementById('trending-carousel');
  if (!container) return;
  
  // Show first 6 products as trending
  const trending = perfumes.slice(0, 6);
  container.innerHTML = trending.map(p => createProductCard(p)).join('');
}

function renderCatalog() {
  const container = document.getElementById('catalog-grid');
  const countEl = document.getElementById('catalog-count');
  if (!container) return;
  
  container.innerHTML = filteredPerfumes.map(p => createProductCard(p)).join('');
  if (countEl) countEl.textContent = filteredPerfumes.length;
}

// ==========================================
// FILTERING
// ==========================================
function applyFilters() {
  const priceMin = parseInt(document.getElementById('price-min')?.value || 0);
  const priceMax = parseInt(document.getElementById('price-max')?.value || 450);
  
  const typeFilters = Array.from(document.querySelectorAll('.type-filter:checked')).map(cb => cb.value);
  const catFilters = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);
  const occasionFilters = Array.from(document.querySelectorAll('.occasion-filter:checked')).map(cb => cb.value);
  const accordFilters = Array.from(document.querySelectorAll('.accord-filter:checked')).map(cb => cb.value);
  
  const sort = document.getElementById('catalog-sort')?.value || 'popularity';
  
  filteredPerfumes = perfumes.filter(p => {
    // Price filter
    if (p.price < priceMin || p.price > priceMax) return false;
    
    // Type filter
    if (typeFilters.length > 0 && !typeFilters.includes(p.type)) return false;
    
    // Category filter
    if (catFilters.length > 0 && !catFilters.includes(p.category)) return false;
    
    // Occasion filter
    if (occasionFilters.length > 0) {
      const hasOccasion = p.occasion?.some(o => occasionFilters.includes(o));
      if (!hasOccasion) return false;
    }
    
    // Accord filter
    if (accordFilters.length > 0) {
      const hasAccord = p.accords?.some(a => accordFilters.includes(a.name));
      if (!hasAccord) return false;
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matches = p.name.toLowerCase().includes(term) || 
                      p.brand?.toLowerCase().includes(term) ||
                      p.description?.toLowerCase().includes(term);
      if (!matches) return false;
    }
    
    return true;
  });
  
  // Sort
  if (sort === 'price-asc') {
    filteredPerfumes.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredPerfumes.sort((a, b) => b.price - a.price);
  }
  
  renderCatalog();
}

function filterProducts(field, value) {
  showCatalogView();
  
  // Clear all filters first
  document.querySelectorAll('.type-filter, .cat-filter, .occasion-filter, .accord-filter').forEach(cb => cb.checked = false);
  
  if (field === 'category') {
    const cb = document.querySelector(`.cat-filter[value="${value}"]`);
    if (cb) cb.checked = true;
  } else if (field === 'type') {
    const cb = document.querySelector(`.type-filter[value="${value}"]`);
    if (cb) cb.checked = true;
  }
  
  applyFilters();
}

// ==========================================
// PRICE SLIDER
// ==========================================
function updateDualSlider() {
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  const display = document.getElementById('price-slider-display');
  const range = document.getElementById('slider-range');
  
  if (!minInput || !maxInput || !display) return;
  
  let min = parseInt(minInput.value);
  let max = parseInt(maxInput.value);
  
  if (min > max) {
    [min, max] = [max, min];
  }
  
  const minVal = (min / 450) * 100;
  const maxVal = (max / 450) * 100;
  
  if (range) {
    range.style.left = minVal + '%';
    range.style.width = (maxVal - minVal) + '%';
  }
  
  display.textContent = `Precio: ${formatMoney(min)} — ${formatMoney(max)}`;
  applyFilters();
}

// ==========================================
// SEARCH
// ==========================================
function toggleSearch() {
  document.getElementById('search-overlay').classList.toggle('hidden');
  if (!document.getElementById('search-overlay').classList.contains('hidden')) {
    document.getElementById('search-input').focus();
  }
}

function closeSearch() {
  document.getElementById('search-overlay').classList.add('hidden');
  document.getElementById('search-input').value = '';
  searchTerm = '';
  applyFilters();
}

function handleSearch(event) {
  searchTerm = event.target.value;
  if (currentView === 'catalog') {
    applyFilters();
  } else {
    // Search in all products
    filteredPerfumes = perfumes.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    showCatalogView();
  }
}

// ==========================================
// PERFUME MODAL
// ==========================================
function openPerfumeModal(productId) {
  const product = perfumes.find(p => p.id === productId);
  if (!product) return;
  
  document.getElementById('pd-image').src = product.image;
  document.getElementById('pd-brand').textContent = product.brand || 'Premium';
  document.getElementById('pd-name').textContent = product.name;
  document.getElementById('pd-desc').textContent = product.description || 'Descripción no disponible';
  document.getElementById('pd-price').textContent = formatMoney(product.price);
  
  // Render accords
  const accordsContainer = document.getElementById('pd-accords');
  if (product.accords && product.accords.length > 0) {
    accordsContainer.innerHTML = product.accords.map(a => `
      <div class="accord-bar">
        <span class="accord-name">${a.name}</span>
        <div class="accord-bar-container">
          <div class="accord-bar-fill" style="width: ${a.value}%; background: ${a.color};"></div>
        </div>
        <span class="accord-value">${a.value}%</span>
      </div>
    `).join('');
  } else {
    accordsContainer.innerHTML = '<p style="color: var(--text-muted);">Notas no disponibles</p>';
  }
  
  // WhatsApp button
  const message = encodeURIComponent(`Hola! Me interesa el perfume ${product.name} (${product.brand}) precio ${formatMoney(product.price)}. ¿Está disponible?`);
  document.getElementById('pd-whatsapp-btn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  
  document.getElementById('perfume-detail-modal').classList.remove('hidden');
}

function closePerfumeModal() {
  document.getElementById('perfume-detail-modal').classList.add('hidden');
}

// ==========================================
// LEGAL MODALS
// ==========================================
const legalContent = {
  shipping: `
    <h3>POLÍTICAS DE ENVÍO</h3>
    <p>Realizamos envíos a todo Colombia a través de transportadoras confiables.</p>
    <p><strong>Tiempo de entrega:</strong> 3-5 días hábiles para ciudades principales, 5-8 días para zonas rurales.</p>
    <p><strong>Costo:</strong> Envío gratis en pedidos superiores a $300.000 COP. Para pedidos menores, el costo varía según la ubicación.</p>
    <p><strong>Seguimiento:</strong> Una vez despachado tu pedido, recibirás el número de guía por WhatsApp.</p>
  `,
  returns: `
    <h3>POLÍTICAS DE CAMBIOS Y DEVOLUCIONES</h3>
    <p>Aceptamos cambios dentro de los 5 días siguientes a la recepción del producto.</p>
    <p><strong>Condiciones:</strong></p>
    <ul>
      <li>El producto debe estar en su empaque original</li>
      <li>No debe haber sido usado ni abierto el sello</li>
      <li>Debes presentar la factura de compra</li>
    </ul>
    <p>Para iniciar un proceso de cambio, contactános por WhatsApp.</p>
  `,
  privacy: `
    <h3>POLÍTICA DE PRIVACIDAD</h3>
    <p>En Réve do Parfum respetamos tu privacidad y protegemos tus datos personales.</p>
    <p><strong>Datos que recopilamos:</strong> Nombre, correo electrónico, número de teléfono y dirección de envío.</p>
    <p><strong>Uso:</strong> Tus datos se utilizan exclusivamente para procesar tus pedidos y comunicarnos contigo sobre tu compra.</p>
    <p>No compartiremos tu información con terceros sin tu consentimiento.</p>
  `,
  terms: `
    <h3>TÉRMINOS DEL SERVICIO</h3>
    <p>Al realizar una compra en Réve do Parfum, aceptas los siguientes términos:</p>
    <p><strong>1.</strong> Todos los productos son originales y auténticos.</p>
    <p><strong>2.</strong> Los precios mostrados están en pesos colombianos (COP) e incluyen IVA.</p>
    <p><strong>3.</strong> Nos reservamos el derecho de cancelar pedidos en caso de indisponibilidad del producto.</p>
    <p><strong>4.</strong> La empresa no se hace responsable por productos falsificados adquiridos en otros canales.</p>
  `
};

function openLegalModal(type) {
  document.getElementById('legal-title').textContent = type === 'shipping' ? 'Políticas de Envío' : 
    type === 'returns' ? 'Políticas de Cambios' : 
    type === 'privacy' ? 'Política de Privacidad' : 'Términos del Servicio';
  document.getElementById('legal-content').innerHTML = legalContent[type] || '<p>Contenido no disponible</p>';
  document.getElementById('legal-modal').classList.remove('hidden');
}

function closeLegalModal() {
  document.getElementById('legal-modal').classList.add('hidden');
}

// ==========================================
// CAROUSEL
// ==========================================
let trendingScrollPos = 0;

function scrollTrending(direction) {
  const container = document.getElementById('trending-carousel');
  if (!container) return;
  
  const cardWidth = 270;
  trendingScrollPos += direction * cardWidth;
  
  container.scrollTo({
    left: trendingScrollPos,
    behavior: 'smooth'
  });
}

// ==========================================
// INITIALIZATION
// ==========================================
async function initApp() {
  await loadPerfumes();
  renderTrending();
  
  // Hide loader
  const loader = document.getElementById('premium-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => loader.remove(), 600);
    }, 3500);
  }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
# ✨ Réve do Parfum - Catálogo Digital

<div align="center">

![React](https://img.shields.io/badge/-Sitio_Estático-blue?style=flat&logo=)
![Vercel](https://img.shields.io/badge/-Desplegado_Vercel-black?style=flat&logo=vercel)
![HTML5](https://img.shields.io/badge-HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge-CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**Catálogo digital de perfumes originales de alta gama - 100% estático, sin backend.**

[🔗 Ver Demo](https://revedoparfum.vercel.app) · [📖 Docs](#índice) · [💬 WhatsApp](https://wa.me/573151413120)

</div>

---

## 🌟 Introducción

Bienvenido al catálogo digital de **Réve do Parfum**. Este proyecto es un sitio web estático de alto rendimiento, diseñado específicamente para mostrar el catálogo de perfumes premium sin necesidad de un servidor backend.

### ¿Por qué un catálogo estático?

- ⚡ **Velocidad极致** - Carga instantánea sin espera de servidor
- 💰 **Costo $0** - Despliegue gratuito en Vercel
- 🔒 **Seguridad** - Sin base de datos, sin vulnerabilidades
- 📱 **Responsive** - Funciona perfecto en cualquier dispositivo
- 🚀 **Escalable** - Soporta miles de productos sin problemas

---

## 🎯 Características

| Característica | Descripción |
|---------------|-------------|
| 🎨 **Diseño Premium** | Estilo oscuro elegante con acentos dorados |
| 🔍 **Filtros Avanzados** | Precio, tipo, género, ocasión, notas olfativas |
| 📱 **100% Responsive** | Mobile-first, tablet, desktop |
| 💬 **WhatsApp Integration** | Pedir productos directamente por WhatsApp |
| 🎭 **Módulos Especiales** | Catálogo principal, Decants, Esiencias |
| ✨ **Animaciones Suaves** | Experiencia de usuario mejorada con AOS |
| 🔎 **Búsqueda en Tiempo Real** | Encuentra perfumes rápidamente |
| 🌐 **SEO Optimizado** | Meta tags para搜索引擎 |
| 📲 **PWA Ready** | Installable como app móvil |

---

## 📂 Estructura del Proyecto

```
reveDoparfum-catalogo/
├── index.html           # Página principal
├── css/
│   └── styles.css      # Estilos optimizados (600+ líneas)
├── js/
│   └── app.js         # Lógica del catálogo (400+ líneas)
├── data/
│   └── perfumes.json  # Base de datos de perfumes
├── images/             # 12 imágenes de productos
├── manifest.json      # Configuración PWA
└── README.md          # Este archivo
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Node.js (opcional, para desarrollo local)

### Ejecución Local

```bash
# Opción 1: Con serve (recomendado)
npx serve

# Opción 2: Con http-server
npx http-server -p 3000

# Opción 3: Abre directamente
# Simplemente abre index.html en tu navegador
```

### Ver en Navegador

```
http://localhost:3000
```

---

## ☁️ Despliegue en Vercel

### Método 1: Git Integration (Recomendado)

1. **Sube el proyecto a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Catálogo de perfumes"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/reveDoparfum-catalogo.git
   git push -u origin main
   ```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio
   - Vercel detectará automáticamente que es un sitio estático
   - Click en "Deploy" 🎉

### Método 2: Vercel CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel

# Sigue las instrucciones en pantalla
```

### Método 3: Drag & Drop

1. Ve a [vercel.com/drop](https://vercel.com/drop)
2. Arrastra la carpeta del proyecto
3. ¡Listo! Tu sitio estará live en segundos

---

## 📝 Cómo Agregar Productos

### Agregar un Nuevo Perfume

1. Abre `data/perfumes.json`
2. Agrega un nuevo objeto al array:

```json
{
  "id": 14,
  "name": "Nuevo Perfume",
  "brand": "Marca del Perfume",
  "price": 125,
  "category": "Hombre",
  "type": "Nicho",
  "image": "images/nuevo-perfume.png",
  "occasion": ["Oficina", "Noche", "Evento Formal"],
  "description": "Una descripción hermosa del perfume...",
  "accords": [
    { "name": "Amaderado", "value": 85, "color": "#6a5c48" },
    { "name": "Ámbar", "value": 70, "color": "#e8a939" }
  ]
}
```

### Agregar Imágenes

1. Coloca tu imagen en la carpeta `images/`
2. Nombra el archivo de forma descriptiva: `yves-saint-laurent-libre.png`
3. Actualiza el campo `image` en el JSON

### Campos Disponibles

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | Identificador único |
| `name` | string | Nombre del perfume |
| `brand` | string | Marca/Laboratorio |
| `price` | number | Precio en miles COP |
| `category` | string | Hombre/Mujer/Unisex |
| `type` | string | Diseñador/Nicho |
| `image` | string | Ruta a la imagen |
| `occasion` | array | Occasiones de uso |
| `description` | string | Descripción detallada |
| `accords` | array | Notas olfativas |

---

## 🎨 Personalización

### Colores

Edita `css/styles.css`:

```css
:root {
  --primary-color: #d4af37;  /* Dorado */
  --bg-color: #121212;       /* Negro oscuro */
  --text-main: #e0e0e0;      /* Texto claro */
}
```

### Número de WhatsApp

Edita `js/app.js`:

```javascript
const WHATSAPP_NUMBER = '573151413120';
```

### Título y Meta

Edita `index.html`:

```html
<title>Réve do Parfum | Tu Título</title>
<meta name="description" content="Tu descripción...">
```

---

## 📱 Screenshots

| Mobile | Desktop |
|--------|---------|
| ![Mobile](https://via.placeholder.com/300x600?text=Mobile+View) | ![Desktop](https://via.placeholder.com/800x400?text=Desktop+View) |

---

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables
- **Vanilla JS** - Sin frameworks, máximo rendimiento
- **JSON** - Datos estáticos
- **AOS** - Animaciones
- **Google Fonts** - Playfair Display & Lato

---

## 📄 Licencia

MIT License - feel free to use this project for your own perfume catalog!

---

## 🤝 Contribuir

¿Encontraste un bug? ¿Tienes una idea?

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la branch (`git push origin feature/amazing`)
5. Abre un Pull Request

---

## 📞 Contacto

<div align="center">

**¿Interesado en un perfume?**

¡Escríbenos por WhatsApp!

<a href="https://wa.me/573151413120" target="_blank">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
</a>

---

💜 **Réve do Parfum** - *La poesía de tu presencia*

</div>
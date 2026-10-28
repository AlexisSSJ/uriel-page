# Uriel Page — Portafolio + CV en PDF

Página web personal de **Uriel Alexis Luna López**: portafolio bilingüe (ES/EN) con
estética «Apple × editorial» (lienzo blanco, serif editorial + sans neutra, fotos en
B/N) y generación del CV en PDF en español o inglés.

## 🚀 Ver en local

Es un sitio estático sin dependencias ni build. Solo abre `index.html` en tu navegador,
o sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## ✏️ Editar el contenido (lo único que necesitas tocar)

**Todo** el contenido vive en un único archivo:

```
js/data.js
```

Dentro encontrarás dos bloques, `es` y `en`, con la misma estructura:

- `name`, `fullName`, `headline`
- `contact` (teléfono, email, LinkedIn)
- `summary`
- `experience` (empresa, puesto, fechas, bullets)
- `education`
- `certifications`
- `skills` (categorías e ítems)
- `courses`
- `projects` (título, tipo, imagen, tags, bullets)

Edita los dos idiomas para mantenerlos sincronizados. Tanto la página principal
(`index.html`) como el CV imprimible (`cv.html`) se regeneran solos a partir de ahí.
No necesitas tocar HTML ni CSS.

## 📄 Generar el PDF del CV

1. En la página, pulsa **«Descargar CV»** y elige **Español** o **English**
   (o abre directamente `cv.html?lang=es` / `cv.html?lang=en`).
2. Pulsa **«Guardar como PDF»**.
3. En el diálogo de impresión elige **«Guardar como PDF»** con márgenes
   **«Predeterminado»** (tamaño Carta).

El PDF sale con texto seleccionable y saltos de página controlados.

## 🖼️ Imágenes

Las imágenes son placeholders en `assets/img/`. Sustitúyelos por tus propios archivos
manteniendo el mismo nombre, o cambia la ruta `image` de cada proyecto en `js/data.js`.

## 🌐 Publicar

- **GitHub Pages:** sube el repositorio y activa Pages desde la rama principal.
- **Railway / Netlify / Vercel:** arrastra la carpeta o conecta el repo (sitio estático).

## 📁 Estructura

```
index.html          # Portafolio
cv.html             # Vista del CV para PDF (?lang=es|en)
css/style.css       # Estilos del portafolio
css/cv-print.css    # Estilos del CV (pantalla + impresión)
js/data.js          # ⭐ Todo el contenido (es + en)
js/main.js          # Render del portafolio + toggle de idioma
js/cv.js            # Render del CV + botón de impresión
assets/img/         # Placeholders de imágenes
```

# CV PDF (foto + hipervínculo + diseño editorial) — Plan de implementación

> **Para trabajadores agenticos:** SUB-SKILL OBLIGATORIO: usar
> superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans
> para implementar este plan tarea por tarea. Los pasos usan checkbox (`- [ ]`).

**Goal:** Que el CV en PDF lleve foto, hipervínculo a `https://urielluna.site/` y un
diseño editorial a dos columnas, con texto real y extraíble en orden lógico.

**Architecture:** Sitio estático sin build. El CV se renderiza en cliente desde
`js/data.js` dentro de `cv.html` (script `js/cv.js`) y se estiliza con
`css/cv-print.css`; el PDF sale con «Guardar como PDF». Se reestructura el render a
masthead + grid de dos columnas (`grid-template-areas`) manteniendo el orden lógico en
el DOM (`main` antes que `sidebar`) para que la extracción de texto sea correcta.

**Tech Stack:** HTML + CSS + JS vanilla. Fuentes Newsreader (serif) e Inter (sans).
Sin dependencias ni tests automatizados: la verificación es estática (grep sobre el
código fuente) + manual (servir y abrir en navegador).

**Spec:** `docs/superpowers/specs/2026-10-28-cv-pdf-photo-hyperlink-editorial-design.md`

## Global Constraints

- URL web: `https://urielluna.site/` (hipervínculo clicable en el PDF).
- Foto: `assets/img/profile.jpg`, en B/N, con `alt` descriptivo.
- No tocar `index.html` ni `css/style.css`.
- No reestructurar el contenido de `js/data.js` (solo añadir la URL de la web).
- Tamaño Carta; márgenes `@page` 14 mm (sin cambios).
- Enlaces reales: email (`mailto:`), LinkedIn y web (`<a href>`).
- Orden de extracción: nombre → contacto → resumen → experiencia → educación →
  proyectos → habilidades → certificaciones → cursos.

## Review Focus

1. **Hipervínculo clicable en PDF:** el enlace a la web debe ser `<a href="https://urielluna.site/">`
   y el email/LinkedIn enlaces reales; Chrome «Guardar como PDF» los conserva clicables.
2. **Orden de extracción de texto:** con la barra lateral a la izquierda visualmente,
   el texto extraído debe seguir el orden lógico (main antes que sidebar).
3. **Paginación a dos columnas:** la barra lateral y la columna principal deben
   fragmentarse limpiamente entre página 1 y 2 sin huecos raros.
4. **Foto B/N y con alt:** la foto debe verse en escala de grises y no desbordar el masthead.
5. **Ambos idiomas:** es y en deben mostrar el enlace a la web.

---

### Task 1: Añadir la URL de la web a `js/data.js`

**Files:**
- Modify: `js/data.js:17-23` (contact de `es`)
- Modify: `js/data.js:194-200` (contact de `en`)

**Interfaces:**
- Produces: `DATA.es.contact.website` y `DATA.es.contact.websiteLabel`
  (mismos campos en `DATA.en.contact`), leídos en `cv.js` como `d.contact.website`
  y `d.contact.websiteLabel`.

- [ ] **Step 1: Añadir los campos `website` y `websiteLabel` en el contacto de `es` y de `en`**

En ambos bloques `contact`, justo después de `linkedinLabel`, añadir:
```js
website: "https://urielluna.site/",
websiteLabel: "urielluna.site",
```

- [ ] **Step 2: Verificar con grep**

Run: `grep -n "website" js/data.js`
Expected: 4 coincidencias (`website:` y `websiteLabel:` en `es` y en `en`).

- [ ] **Step 3: Commit**

```bash
git add js/data.js
git commit -m "data: añadir URL de la web al contacto (es/en)"
```

---

### Task 2: Reestructurar el render en `js/cv.js` (masthead + dos columnas)

**Files:**
- Modify: `js/cv.js:132-176` (bloque `contactLine` y `$("cvSheet").innerHTML`)

**Interfaces:**
- Consumes: `d.contact.website`, `d.contact.websiteLabel`, `d.contact.email`,
  `d.contact.linkedin`, `d.contact.linkedinLabel`, `d.contact.phone` (de Task 1 y datos existentes).
- Produces: marcado `.cv-header` (foto + nombre + headline), `address.cv-contact`
  (con enlaces), `.cv-cols` > `.cv-main` + `.cv-side` (para Task 3).

- [ ] **Step 1: Sustituir la línea de contacto por una versión con enlaces**

Reemplazar `const contactLine = ...` (línea 132-133) por:
```js
const contactHTML = `
  <span>${esc(c.phone)}</span>
  <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>
  <a href="${esc(c.linkedin)}" target="_blank" rel="noopener">${esc(c.linkedinLabel)}</a>
  <a class="cv-web" href="${esc(c.website)}" target="_blank" rel="noopener">${esc(c.websiteLabel)} ↗</a>`;
```

- [ ] **Step 2: Reescribir el template de `cvSheet` a masthead + dos columnas**

Reemplazar el `$("cvSheet").innerHTML` (líneas 135-176) por:
- `.cv-header` con `.cv-header-main` (`h1.cv-name` + `.cv-headline`) y `figure.cv-photo`
  con `<img src="assets/img/profile.jpg" alt="Retrato de Uriel Luna" />`.
- `address.cv-contact` con `contactHTML`.
- `.cv-cols` conteniendo, **en este orden en el DOM**:
  - `.cv-main` → secciones resumen, experiencia, educación, proyectos.
  - `.cv-side` → secciones habilidades, certificaciones, cursos.

(Reutilizar las funciones `experienceHTML()`, `educationHTML()`, etc. existentes, sin cambios.)

- [ ] **Step 3: Verificar con grep**

Run: `grep -n "cv-photo\|cv-web\|cv-cols\|cv-main\|cv-side" js/cv.js`
Expected: una línea para cada selector; `cv-main` aparece antes que `cv-side` en el archivo.

- [ ] **Step 4: Commit**

```bash
git add js/cv.js
git commit -m "cv: masthead con foto + enlaces y estructura a dos columnas"
```

---

### Task 3: Rediseño editorial en `css/cv-print.css`

**Files:**
- Modify: `css/cv-print.css` (sección HOJA: `.cv-header`, `.cv-contact`; añadir
  `.cv-photo`, `.cv-cols`, `.cv-main`, `.cv-side`, `.cv-web`; ajustar `@media print`).

**Interfaces:**
- Consumes: clases generadas en Task 2 (`.cv-header`, `.cv-header-main`, `.cv-photo`,
  `.cv-contact`, `.cv-web`, `.cv-cols`, `.cv-main`, `.cv-side`).

- [ ] **Step 1: Rediseñar masthead y contacto**

- `.cv-header`: flex con `justify-content: space-between` y `align-items: flex-start`.
- `.cv-name`: serif, ~32px, `font-weight: 500`.
- `.cv-headline`: sans, `color: var(--muted)`, `letter-spacing`.
- `.cv-photo img`: `width: 88px; height: 88px; object-fit: cover; filter: grayscale(1);`
  con borde hairline.
- `.cv-contact`: fila con `display: flex; flex-wrap: wrap; gap;` separadores `·`;
  `a { color: inherit }` y `.cv-web { color: var(--accent); text-decoration: underline; }`.

- [ ] **Step 2: Añadir el grid de dos columnas**

```css
.cv-cols {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas: "side main";
  gap: 40px;
  align-items: start;
}
.cv-main { grid-area: main; }
.cv-side { grid-area: side; }
.cv-side { border-right: 1px solid var(--line); padding-right: 28px; }
```

- [ ] **Step 3: Ajustar `@media print`**

Mantener `break-inside: avoid` en `.cv-block`, `.cv-skill`, `.cv-courses li`; conservar
el color del enlace web en impresión (`a { color: inherit }` salvo `.cv-web`); ajustar
`.cv-name` a ~26px en impresión y quitar sombras/radios de `.sheet`.

- [ ] **Step 4: Verificar con grep**

Run: `grep -n "cv-cols\|grid-template-areas\|cv-photo\|cv-web" css/cv-print.css`
Expected: definiciones presentes para `.cv-cols`, `grid-template-areas`, `.cv-photo`, `.cv-web`.

- [ ] **Step 5: Commit**

```bash
git add css/cv-print.css
git commit -m "cv: rediseño editorial a dos columnas + enlaces"
```

---

### Task 4: Verificación manual (es/en, foto, enlace, extracción)

**Files:** ninguno (solo verificación).

- [ ] **Step 1: Servir el sitio**

Run: `python3 -m http.server 8000` (en `/workspaces/uriel-page`).

- [ ] **Step 2: Revisar `cv.html?lang=es` y `cv.html?lang=en`**

Abrir ambos. Confirmar: foto B/N en el masthead, enlace `urielluna.site ↗` visible y
clicable, email/LinkedIn clicables, dos columnas (barra lateral izquierda + principal
derecha), y paginación limpia en 1-2 páginas.

- [ ] **Step 3: Verificar extracción de texto (orden lógico)**

Seleccionar todo el texto del CV y pegarlo en un editor; confirmar que el orden es
nombre → contacto → resumen → experiencia → educación → proyectos → habilidades →
certificaciones → cursos, sin que la barra lateral aparezca antes que la experiencia.

- [ ] **Step 4: Guardar como PDF y abrir el PDF**

Confirmar que el enlace `https://urielluna.site/` sigue siendo clicable en el PDF
abierto en un visor (Chrome/Edge/Acrobat).

- [ ] **Step 5: Commit final (si hubo ajustes) y cierre**

```bash
git add -A
git commit -m "cv: verificación y ajustes finales de PDF"
```

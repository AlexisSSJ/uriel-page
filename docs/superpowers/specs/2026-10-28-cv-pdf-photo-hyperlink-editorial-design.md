A# CV PDF — foto, hipervínculo y diseño editorial a dos columnas

**Fecha:** 2026-10-28
**Alcance:** cambio pequeño, limitado a `js/data.js`, `js/cv.js` y `css/cv-print.css`.

## Intención y por qué

El CV que se genera en PDF debe lucir editorial y profesional, y cumplir tres cosas:
foto, enlace clicable a la versión web y una lectura fácil. El texto debe quedar
100 % real y extraíble, en orden lógico, para que herramientas de IA (ATS,
revisores automáticos) lo parseen sin fricción.

## Objetivos

- Incluir la foto de perfil (`assets/img/profile.jpg`, en blanco y negro) en el PDF.
- Añadir un hipervínculo clicable a la versión web: `https://urielluna.site/`.
- Rediseñar el CV a un formato editorial de dos columnas (barra lateral + columna principal).
- Mantener texto real y extraíble, con orden de lectura lógico (nombre → contacto →
  resumen → experiencia → educación → proyectos → habilidades → idiomas → certificaciones → cursos).

## No-objetivos / anti-objetivos

- No tocar el portafolio (`index.html` ni `css/style.css`).
- No cambiar el contenido de `js/data.js` (solo añadir la URL de la web).
- No añadir dependencias, build ni servidor: el PDF sigue saliendo con «Guardar como PDF».
- Anti-objetivo: no usar imágenes como texto, ni posicionamiento absoluto que rompa la extracción.

## Restricciones

- PDF generado por el navegador («Guardar como PDF»): Chrome conserva enlaces `<a>` clicables.
- Tamaño Carta, márgenes actuales `@page` de 14 mm.
- Fuentes ya cargadas en `cv.html`: Newsreader (serif) + Inter (sans).
- La foto ya existe en `assets/img/profile.jpg` (en el portafolio se muestra B/N).

## Enfoques considerados

1. **Dos columnas con barra lateral** (elegida): foto + contacto en el masthead,
   barra lateral con habilidades/idiomas/certificaciones/cursos, columna principal
   con resumen/experiencia/educación/proyectos.
2. **Una columna refinada**: solo pulir el encabezado añadiendo foto y enlace.
   Descartada por el usuario.

## Cómo se construye

### `js/data.js`

- Añadir a `contact`, en `es` y `en`: `website: "https://urielluna.site/"` y
  `websiteLabel: "urielluna.site"`.
- El email y el LinkedIn pasan a ser enlaces reales (`mailto:` y URL).

### `js/cv.js`

- **Masthead** (ancho completo): nombre (serif) + headline; foto a la derecha
  (cuadrada, B/N, ~84 px, `alt="Retrato de Uriel Luna"`); debajo, una fila de
  contacto: teléfono · email (`mailto:`) · LinkedIn (enlace) · `urielluna.site`
  (enlace, con icono `↗` o equivalente).
- **Cuerpo** en grid de dos columnas usando `grid-template-areas`:
  - `main` (derecha, ~66 %): resumen, experiencia, educación, proyectos.
  - `sidebar` (izquierda, ~34 %): habilidades, idiomas, certificaciones, cursos.
- Orden en el DOM: `main` **antes** que `sidebar`. El grid mueve visualmente el
  `sidebar` a la izquierda, de modo que la extracción de texto sigue el orden
  lógico (lo importante primero) aunque visualmente la barra quede a la izquierda.

### `css/cv-print.css`

- Rediseño editorial: reglas finas (hairline), jerarquía serif/sans, títulos de
  sección en mayúsculas con `letter-spacing`, acento azul usado con mesura solo
  en enlaces.
- Barra lateral con separación sutil (borde o fondo suave), sin romper la impresión.
- Enlaces con color acento + subrayado sutil, visibles también en impresión.
- Conservar `break-inside: avoid` en bloques y orden de paginación.

## Lo que queda al criterio del constructor

- Valores finos de tipografía, espaciado y tonos (dentro de la paleta editorial
  ya existente del portafolio).

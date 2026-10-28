/* ============================================================================
   CV PDF — cv.js
   Renderiza el CV a partir de js/data.js según ?lang=es|en y prepara la vista
   para guardar como PDF mediante el diálogo de impresión del navegador.
   ========================================================================== */

(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  let lang = params.get("lang");
  if (lang !== "es" && lang !== "en") lang = "es";

  const UI_TOOLBAR = {
    es: { back: "Volver", print: "Guardar como PDF", hint: "Consejo: en el diálogo de impresión elige «Guardar como PDF» y márgenes «Predeterminado»." },
    en: { back: "Back", print: "Save as PDF", hint: "Tip: in the print dialog choose “Save as PDF” and “Default” margins." },
  };

  const $ = (id) => document.getElementById(id);
  function esc(s) {
    return String(s);
  }

  const d = DATA[lang];
  const L = CV_LABELS[lang];
  const T = UI_TOOLBAR[lang];

  document.documentElement.lang = lang;
  document.title = "CV_Uriel_Luna_" + lang.toUpperCase();

  /* ---------- toolbar ---------- */
  $("toolbarBack").textContent = T.back;
  $("printLabel").textContent = T.print;
  $("hint").textContent = T.hint;

  $("cvLangToggle").innerHTML = ["es", "en"]
    .map((code) => {
      const label = code === "es" ? "ES" : "EN";
      const active = code === lang ? " active" : "";
      return `<a class="lang-btn${active}" href="cv.html?lang=${code}">${label}</a>`;
    })
    .join("");

  $("printBtn").addEventListener("click", () => window.print());

  /* ---------- secciones ---------- */
  function experienceHTML() {
    return d.experience
      .map((job) => {
        const loc = job.location ? ` · ${job.location}` : "";
        const bullets = job.bullets
          .map((b) => `<li><strong>${esc(b.lead)}</strong> ${esc(b.text)}</li>`)
          .join("");
        return `
          <div class="cv-block">
            <div class="cv-row">
              <span class="cv-company">${esc(job.company)}${esc(loc)}</span>
              <span class="cv-date">${esc(job.period)}</span>
            </div>
            <div class="cv-role">${esc(job.role)}</div>
            <ul class="cv-bullets">${bullets}</ul>
          </div>`;
      })
      .join("");
  }

  function educationHTML() {
    return d.education
      .map(
        (e) => `
          <div class="cv-block">
            <div class="cv-row">
              <span class="cv-company">${esc(e.school)}</span>
              <span class="cv-date">${esc(e.period)}</span>
            </div>
            <div class="cv-role">${esc(e.degree)}</div>
            ${e.details.map((det) => `<div class="cv-line">${esc(det)}</div>`).join("")}
          </div>`
      )
      .join("");
  }

  function certificationsHTML() {
    return d.certifications
      .map(
        (c) => `
          <div class="cv-block">
            <div class="cv-row">
              <span class="cv-company">${esc(c.name)}</span>
              <span class="cv-date">${esc(c.year)}</span>
            </div>
            <div class="cv-line">${esc(c.description)}</div>
          </div>`
      )
      .join("");
  }

  function skillsHTML() {
    return d.skills
      .map(
        (s) => `
          <div class="cv-skill">
            <span class="cv-skill-cat">${esc(s.category)}:</span>
            <span class="cv-skill-items">${s.items.map(esc).join(", ")}</span>
          </div>`
      )
      .join("");
  }

  function coursesHTML() {
    return d.courses
      .map((c) => `<li>${esc(c.name)} <span class="cv-date">${esc(c.year)}</span></li>`)
      .join("");
  }

  function projectsHTML() {
    return d.projects
      .map((p) => {
        const bullets = p.bullets.map((b) => `<li>${esc(b)}</li>`).join("");
        return `
          <div class="cv-block">
            <div class="cv-row">
              <span class="cv-company">${esc(p.title)}</span>
              <span class="cv-date">${esc(p.type)}</span>
            </div>
            <ul class="cv-bullets">${bullets}</ul>
          </div>`;
      })
      .join("");
  }

  const c = d.contact;
  const contactLine = `${c.phone} &nbsp;·&nbsp; ${c.email} &nbsp;·&nbsp; ${c.linkedinLabel}`;

  $("cvSheet").innerHTML = `
    <header class="cv-header">
      <h1 class="cv-name">${esc(d.fullName)}</h1>
      <div class="cv-headline">${esc(d.headline)}</div>
      <div class="cv-contact">${contactLine}</div>
    </header>

    <section class="cv-section">
      <h2 class="cv-h2">${L.summary}</h2>
      <p class="cv-summary">${esc(d.summary)}</p>
    </section>

    <section class="cv-section">
      <h2 class="cv-h2">${L.experience}</h2>
      ${experienceHTML()}
    </section>

    <section class="cv-section">
      <h2 class="cv-h2">${L.education}</h2>
      ${educationHTML()}
    </section>

    <section class="cv-section">
      <h2 class="cv-h2">${L.certifications}</h2>
      ${certificationsHTML()}
    </section>

    <section class="cv-section">
      <h2 class="cv-h2">${L.skills}</h2>
      ${skillsHTML()}
    </section>

    <section class="cv-section">
      <h2 class="cv-h2">${L.projects}</h2>
      ${projectsHTML()}
    </section>

    <section class="cv-section">
      <h2 class="cv-h2">${L.courses}</h2>
      <ul class="cv-courses">${coursesHTML()}</ul>
    </section>
  `;
})();

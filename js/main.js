/* ============================================================================
   PORTFOLIO — main.js
   Renderiza toda la página a partir de js/data.js y maneja el toggle ES/EN.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- estado de idioma ---------- */
  let lang = localStorage.getItem("ul_lang") || "es";
  if (lang !== "es" && lang !== "en") lang = "es";

  const $ = (id) => document.getElementById(id);

  function data() {
    return DATA[lang];
  }
  function ui() {
    return UI[lang];
  }
  function esc(s) {
    return String(s);
  }

  /* ---------- helpers de render ---------- */
  function renderNav() {
    const u = ui().nav;
    $("navLinks").innerHTML = [
      ["#top", u.home],
      ["#about", ui().aboutTag],
      ["#experience", u.experience],
      ["#projects", u.projects],
      ["#contact", u.contact],
    ]
      .map(([href, label]) => `<a href="${href}">${label}</a>`)
      .join("");

    // Toggle de idioma
    $("langToggle").innerHTML = ["es", "en"]
      .map((code) => {
        const label = code === "es" ? "ES" : "EN";
        const active = code === lang ? " active" : "";
        return `<button class="lang-btn${active}" data-lang="${code}" aria-pressed="${code === lang}">${label}</button>`;
      })
      .join("");

    $("cvBtn").textContent = ui().downloadCv;
  }

  function renderHero() {
    const u = ui().hero;
    const d = data();
    $("heroHeadline").textContent = d.headline;
    $("heroName").innerHTML = d.name.split(" ").join("<br>");
    $("heroAvailability").textContent = u.availability;
    $("heroBasedIn").textContent = u.basedIn;
    $("heroPortfolio").innerHTML =
      ui().portfolioCta + " <span class='arrow' aria-hidden='true'>→</span>";
    $("heroCaptionName").textContent = d.fullName;
    $("heroCaptionLoc").textContent = d.contact.location;
  }

  function renderAbout() {
    const u = ui();
    $("aboutTag").textContent = u.aboutTag;
    $("bioText").textContent = data().summary;
  }

  function renderExperience() {
    const u = ui();
    $("experienceTitle").textContent = u.experienceTitle;
    $("experienceSub").textContent = u.experienceSub;

    $("experienceList").innerHTML = data()
      .experience.map((job) => {
        const loc = job.location ? `<span class="exp-loc">${esc(job.location)}</span>` : "";
        const bullets = job.bullets
          .map((b) => `<li><strong>${esc(b.lead)}</strong> ${esc(b.text)}</li>`)
          .join("");
        return `
          <article class="exp-item">
            <div class="exp-period">${esc(job.period)}</div>
            <div class="exp-body">
              <div class="exp-company">${esc(job.company)}${loc}</div>
              <div class="exp-role">${esc(job.role)}</div>
              <ul class="exp-bullets">${bullets}</ul>
            </div>
          </article>`;
      })
      .join("");
  }

  function renderProjects() {
    const u = ui();
    $("projectsTitle").textContent = u.projectsTitle;
    $("projectsSub").textContent = u.projectsSub;

    $("projectsGrid").innerHTML = data()
      .projects.map((p) => {
        const tags = p.tags.join("<span class='skill-sep'>·</span>");
        const bullets = p.bullets.map((b) => `<p>${esc(b)}</p>`).join("");
        return `
          <article class="project-card">
            <figure class="project-figure">
              <img src="${p.image}" alt="${esc(p.title)}" loading="lazy" />
            </figure>
            <div class="project-top">
              <h3 class="project-title">${esc(p.title)}</h3>
              <span class="project-type">${esc(p.type)}</span>
            </div>
            <p class="project-tags">${tags}</p>
            <div class="project-desc">${bullets}</div>
          </article>`;
      })
      .join("");
  }

  function renderSkills() {
    const u = ui();
    $("skillsTitle").textContent = u.skillsTitle;

    $("skillsGrid").innerHTML = data()
      .skills.map((s) => {
        const items = s.items
          .map((i) => esc(i))
          .join("<span class='skill-sep'>·</span>");
        return `
          <div class="skill-card">
            <h3>${esc(s.category)}</h3>
            <p class="skill-items">${items}</p>
          </div>`;
      })
      .join("");
  }

  function renderEduCerts() {
    const u = ui();
    $("educationTitle").textContent = u.educationTitle;
    $("educationColTitle").textContent = u.educationTitle;
    $("certificationsColTitle").textContent = u.certificationsTitle;
    $("coursesColTitle").textContent = u.coursesTitle;

    $("educationList").innerHTML = data()
      .education.map((e) => {
        const details = e.details.map((d) => `<li>${esc(d)}</li>`).join("");
        return `
          <div class="edu-item">
            <div class="edu-school">${esc(e.school)}</div>
            <div class="edu-degree">${esc(e.degree)} <span class="edu-period">· ${esc(e.period)}</span></div>
            <ul class="edu-details">${details}</ul>
          </div>`;
      })
      .join("");

    $("certificationsList").innerHTML = data()
      .certifications.map((c) => {
        return `
          <div class="edu-item cert">
            <div class="edu-school">${esc(c.name)} <span class="edu-period">· ${esc(c.year)}</span></div>
            <ul class="edu-details"><li>${esc(c.description)}</li></ul>
          </div>`;
      })
      .join("");

    $("coursesList").innerHTML = data()
      .courses.map((c) => `<li>${esc(c.name)} <span class="course-year">${esc(c.year)}</span></li>`)
      .join("");
  }

  function renderContact() {
    const u = ui();
    const c = data().contact;
    $("contactTitle").textContent = u.contactTitle;
    $("contactSub").textContent = u.contactSub;
    $("footerNote").textContent = u.footerNote;
    $("contactLinks").innerHTML = `
      <a class="contact-pill" href="mailto:${esc(c.email)}">${esc(c.email)}</a>
      <a class="contact-pill" href="tel:+52${esc(c.phone.replace(/\s/g, ""))}">${esc(c.phone)}</a>
      <a class="contact-pill" href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
    `;
  }

  function renderAll() {
    document.documentElement.lang = lang;
    document.title = lang === "es" ? "Uriel Luna — Actuario & Data Scientist" : "Uriel Luna — Actuary & Data Scientist";
    renderNav();
    renderHero();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();
    renderEduCerts();
    renderContact();
  }

  /* ---------- eventos ---------- */
  document.addEventListener("click", function (e) {
    const langBtn = e.target.closest(".lang-btn");
    if (langBtn) {
      lang = langBtn.dataset.lang;
      localStorage.setItem("ul_lang", lang);
      renderAll();
      return;
    }

    // Dropdown del CV
    const menu = $("cvMenu");
    if (e.target.closest("#cvBtn")) {
      const open = menu.hidden;
      menu.hidden = !open;
      $("cvBtn").setAttribute("aria-expanded", String(open));
    } else if (!e.target.closest("#cvDropdown")) {
      menu.hidden = true;
      $("cvBtn").setAttribute("aria-expanded", "false");
    }
  });

  renderAll();
})();

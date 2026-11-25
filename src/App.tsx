import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight, Minus, Moon, Plus, Sun } from "lucide-react";
import { CV_DATA, type Language } from "./data/cvData";
import { SectionRow } from "./components/SectionRow";
import { SpotlightHeading } from "./components/SpotlightHeading";
import { TimeSeriesBackdrop } from "./components/TimeSeriesBackdrop";

type Theme = "dark" | "light";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (queryLang === "es" || queryLang === "en") return queryLang;
  const stored = window.localStorage.getItem("ul_lang_swiss");
  if (stored === "es" || stored === "en") return stored;
  return "en";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("ul_theme_swiss");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [expandedWork, setExpandedWork] = useState<Record<string, boolean>>({});
  const [expandedEducation, setExpandedEducation] = useState<Record<string, boolean>>({});
  const [showSkillCategories, setShowSkillCategories] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  // Hero time-series crosshair state
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const [chartPointerRatioX, setChartPointerRatioX] = useState<number | null>(null);

  const cv = CV_DATA[lang];
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = cv.meta.pageTitle;
    try {
      window.localStorage.setItem("ul_lang_swiss", lang);
    } catch {
      // ignore storage unavailability
    }
  }, [lang, cv.meta.pageTitle]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem("ul_theme_swiss", theme);
    } catch {
      // ignore storage unavailability
    }
  }, [theme]);

  const allWorkExpanded = cv.workHistory.every((job) => expandedWork[job.id]);

  const toggleAllWork = () => {
    if (allWorkExpanded) {
      setExpandedWork({});
    } else {
      const next: Record<string, boolean> = {};
      for (const job of cv.workHistory) {
        next[job.id] = true;
      }
      setExpandedWork(next);
    }
  };

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWork = (id: string) => {
    setExpandedWork((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEducation = (id: string) => {
    setExpandedEducation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleHeroSectionMove = (e: MouseEvent<HTMLElement>) => {
    const sectionRect = heroSectionRef.current?.getBoundingClientRect();
    if (sectionRect && sectionRect.width > 0) {
      setChartPointerRatioX((e.clientX - sectionRect.left) / sectionRect.width);
    }
  };

  const handleHeroSectionLeave = () => {
    setChartPointerRatioX(null);
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9] text-[#111111] dark:bg-[#0B0B0C] dark:text-[#F2F2F2] transition-colors duration-200">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 md:px-14 lg:px-16 pb-20 md:pb-28">
        {/* ==================== TOP UTILITY HEADER (3-COLUMN) ==================== */}
        <header
          style={{ "--delay": "0ms" } as CSSProperties}
          className="animate-swiss-fade grid grid-cols-1 sm:grid-cols-12 gap-y-4 sm:gap-x-8 pt-6 md:pt-8 text-[12.5px] leading-[1.55] tracking-[-0.005em]"
        >
          {/* Left column: Resume label + quiet inline language & theme controls */}
          <div className="sm:col-span-5 flex items-start flex-wrap gap-x-5 gap-y-1">
            <span className="font-normal text-[#111111] dark:text-[#F2F2F2] whitespace-nowrap">
              {cv.meta.docLabel}
            </span>

            <nav
              aria-label="Language"
              className="no-print inline-flex items-center gap-1.5 text-[#4A4A4A] dark:text-[#9A9A9E]"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`cursor-pointer whitespace-nowrap transition-colors duration-150 ${
                  lang === "en"
                    ? "text-[#111111] dark:text-[#F2F2F2] editorial-link font-medium"
                    : "text-[#4A4A4A] dark:text-[#9A9A9E] hover:text-[#111111] dark:hover:text-[#FFFFFF]"
                }`}
              >
                EN
              </button>
              <span aria-hidden="true" className="text-[#4A4A4A]/60 dark:text-[#9A9A9E]/50">
                /
              </span>
              <button
                type="button"
                onClick={() => setLang("es")}
                aria-pressed={lang === "es"}
                className={`cursor-pointer whitespace-nowrap transition-colors duration-150 ${
                  lang === "es"
                    ? "text-[#111111] dark:text-[#F2F2F2] editorial-link font-medium"
                    : "text-[#4A4A4A] dark:text-[#9A9A9E] hover:text-[#111111] dark:hover:text-[#FFFFFF]"
                }`}
              >
                ES
              </button>
            </nav>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? cv.meta.themeLightLabel : cv.meta.themeDarkLabel}
              className="no-print editorial-link inline-flex items-center gap-1.5 cursor-pointer text-[#4A4A4A] dark:text-[#9A9A9E] hover:text-[#111111] dark:hover:text-[#FFFFFF] whitespace-nowrap"
            >
              {isDark ? (
                <>
                  <Sun aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
                  <span>{cv.meta.themeLightLabel}</span>
                </>
              ) : (
                <>
                  <Moon aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
                  <span>{cv.meta.themeDarkLabel}</span>
                </>
              )}
            </button>
          </div>

          {/* Center-right column: Underlined phone & email */}
          <div className="sm:col-span-4 flex flex-col items-start sm:items-end tabular-nums">
            <a
              href={cv.contact.phoneHref}
              className="editorial-link text-[#111111] dark:text-[#F2F2F2] whitespace-nowrap"
            >
              {cv.contact.phone}
            </a>
            <a
              href={`mailto:${cv.contact.email}`}
              className="editorial-link text-[#111111] dark:text-[#F2F2F2] break-all sm:break-normal"
            >
              {cv.contact.email}
            </a>
          </div>

          {/* Right column: Stacked underlined links */}
          <div className="sm:col-span-3 flex flex-row flex-wrap sm:flex-col items-start sm:items-end gap-x-4 sm:gap-x-0">
            <a
              href={cv.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link text-[#111111] dark:text-[#F2F2F2] whitespace-nowrap"
            >
              {cv.sections.portfolio}
            </a>
            <a
              href={cv.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link text-[#111111] dark:text-[#F2F2F2] whitespace-nowrap"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="no-print editorial-link cursor-pointer text-[#111111] dark:text-[#F2F2F2] whitespace-nowrap bg-transparent p-0 text-left sm:text-right"
            >
              {cv.meta.savePdfLabel}
            </button>
            <a
              href={`/cv.html?lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-print editorial-link text-[#111111] dark:text-[#F2F2F2] whitespace-nowrap"
            >
              {cv.meta.classicCvLabel}
            </a>
          </div>
        </header>

        {/* ==================== HERO SECTION WITH TIME-SERIES BACKDROP ==================== */}
        <main>
          <section
            ref={heroSectionRef}
            onMouseMove={handleHeroSectionMove}
            onMouseLeave={handleHeroSectionLeave}
            style={{ "--delay": "90ms" } as CSSProperties}
            className="animate-swiss-fade relative pt-20 pb-20 sm:pt-28 sm:pb-24 md:pt-36 md:pb-28"
          >
            <TimeSeriesBackdrop isDark={isDark} pointerRatioX={chartPointerRatioX} />

            <SpotlightHeading
              as="h1"
              radius={230}
              className="relative z-10 max-w-[19ch] cursor-default text-[clamp(2.25rem,5.4vw,4.75rem)] font-normal leading-[1.08] tracking-[-0.032em] [text-wrap:balance]"
            >
              <span className="block">
                {cv.meta.greetingPrefix} {cv.name}
              </span>
              <span className="block">— {cv.headline}.</span>
            </SpotlightHeading>
          </section>

          {/* ==================== 1. ABOUT ME ==================== */}
          <SectionRow id="about" title={cv.sections.about} delayMs={180}>
            <p className="max-w-[66ch] text-[15.5px] md:text-[17.5px] font-normal leading-[1.46] tracking-[-0.01em] text-[#111111] dark:text-[#E8E8EA]">
              {cv.aboutParagraph}
            </p>
          </SectionRow>

          {/* ==================== 2. PORTFOLIO / PROJECTS ==================== */}
          <SectionRow id="portfolio" title={cv.sections.portfolio} delayMs={250}>
            <div className="space-y-1.5 text-[13.5px] md:text-[14px] leading-[1.6]">
              {/* Direct External Portfolio & Profile Links */}
              {cv.portfolioLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-12 items-baseline gap-x-4 py-1 text-[#111111] dark:text-[#F2F2F2]"
                >
                  <span className="col-span-5 sm:col-span-5 font-normal text-[#111111] dark:text-[#F2F2F2] group-hover:opacity-75 transition-opacity duration-150">
                    {item.label}
                  </span>
                  <span className="col-span-6 sm:col-span-6 truncate">
                    <span className="editorial-link text-[#111111] dark:text-[#F2F2F2]">
                      {item.urlDisplay}
                    </span>
                  </span>
                  <span className="col-span-1 flex justify-end">
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="editorial-arrow h-4 w-4 text-[#111111] dark:text-[#F2F2F2] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              ))}

              {/* Featured Technical Projects (inline expandable) */}
              {cv.projects.map((project) => {
                const isOpen = Boolean(expandedProjects[project.id]);
                return (
                  <div key={project.id} className="pt-0.5">
                    <button
                      type="button"
                      onClick={() => toggleProject(project.id)}
                      aria-expanded={isOpen}
                      className="group w-full cursor-pointer grid grid-cols-12 items-baseline gap-x-4 py-1 text-left text-[#111111] dark:text-[#F2F2F2]"
                    >
                      <span className="col-span-5 sm:col-span-5 font-normal text-[#111111] dark:text-[#F2F2F2] group-hover:opacity-75 transition-opacity duration-150">
                        {project.title}
                      </span>
                      <span className="col-span-6 sm:col-span-6 truncate">
                        <span className="editorial-link text-[#111111] dark:text-[#F2F2F2]">
                          {project.subtitle}
                        </span>
                      </span>
                      <span className="col-span-1 flex justify-end">
                        {isOpen ? (
                          <Minus
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="h-3.5 w-3.5 text-[#4A4A4A] dark:text-[#9A9A9E]"
                          />
                        ) : (
                          <ArrowUpRight
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="editorial-arrow h-4 w-4 text-[#111111] dark:text-[#F2F2F2] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        )}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="mt-1.5 mb-3 border-t border-[#BDBDBD]/80 dark:border-[#27272A] pt-2.5 pl-0 sm:pl-[41.666%] text-[13px] leading-[1.55] text-[#4A4A4A] dark:text-[#9A9A9E]">
                        <div className="mb-1.5 text-[12px] text-[#4A4A4A] dark:text-[#9A9A9E]">
                          <span>{project.type}</span>
                          <span aria-hidden="true" className="mx-1.5">
                            ·
                          </span>
                          <span>{project.tags.join(" · ")}</span>
                        </div>
                        <ul className="space-y-1">
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-[#111111]/90 dark:text-[#E2E2E5]">
                              — {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </SectionRow>

          {/* ==================== 3. COMPETENCES / SKILLS ==================== */}
          <SectionRow
            id="competences"
            title={cv.sections.competences}
            delayMs={320}
            titleAccessory={
              <button
                type="button"
                onClick={() => setShowSkillCategories((prev) => !prev)}
                aria-expanded={showSkillCategories}
                className="editorial-link cursor-pointer text-[12px] text-[#4A4A4A] dark:text-[#9A9A9E] hover:text-[#111111] dark:hover:text-[#FFFFFF] md:mt-2"
              >
                {showSkillCategories ? cv.controls.hideCategories : cv.controls.viewByCategory}
              </button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-8 gap-y-6 md:gap-x-8">
              {/* Left (cols 5–9): Narrative skill summary */}
              <div className="md:col-span-5 space-y-3.5 text-[13.5px] md:text-[14px] leading-[1.58] text-[#111111] dark:text-[#E8E8EA]">
                <p>{cv.competencesParagraphs[0]}</p>
                <p className="text-[#111111]/90 dark:text-[#D4D4D8]">
                  {cv.competencesParagraphs[1]}
                </p>
              </div>

              {/* Right (cols 10–12): Right-aligned vertical list of core specialties */}
              <ul className="md:col-span-3 space-y-1 text-[13.5px] md:text-[14px] leading-[1.58] text-[#111111] dark:text-[#F2F2F2] md:text-right">
                {cv.coreSpecialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>

            {showSkillCategories ? (
              <div className="mt-7 border-t border-[#BDBDBD] dark:border-[#27272A] pt-5 space-y-3 text-[13px] leading-[1.55]">
                {cv.skillsByCategory.map((group) => (
                  <div
                    key={group.category}
                    className="grid grid-cols-1 sm:grid-cols-8 gap-y-0.5 sm:gap-x-6"
                  >
                    <div className="sm:col-span-3 font-medium text-[#111111] dark:text-[#F2F2F2]">
                      {group.category}
                    </div>
                    <div className="sm:col-span-5 text-[#4A4A4A] dark:text-[#9A9A9E]">
                      {group.items.join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </SectionRow>

          {/* ==================== 4. WORK HISTORY ==================== */}
          <SectionRow
            id="experience"
            title={cv.sections.workHistory}
            delayMs={390}
            titleAccessory={
              <button
                type="button"
                onClick={toggleAllWork}
                aria-expanded={allWorkExpanded}
                className="editorial-link cursor-pointer text-[12px] text-[#4A4A4A] dark:text-[#9A9A9E] hover:text-[#111111] dark:hover:text-[#FFFFFF] md:mt-2"
              >
                {allWorkExpanded ? cv.controls.collapseDetails : cv.controls.expandDetails}
              </button>
            }
          >
            <div className="space-y-1 text-[13.5px] md:text-[14px] leading-[1.6]">
              {cv.workHistory.map((job) => {
                const isOpen = Boolean(expandedWork[job.id]);
                return (
                  <div key={job.id}>
                    <button
                      type="button"
                      onClick={() => toggleWork(job.id)}
                      aria-expanded={isOpen}
                      className="group w-full cursor-pointer grid grid-cols-1 sm:grid-cols-12 items-baseline gap-y-0.5 sm:gap-x-4 py-1 text-left transition-opacity duration-150 hover:opacity-80"
                    >
                      <span className="sm:col-span-4 font-normal text-[#111111] dark:text-[#F2F2F2] inline-flex items-baseline gap-1.5">
                        <span>{job.company}</span>
                        <span className="no-print text-[#4A4A4A] dark:text-[#9A9A9E] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          {isOpen ? (
                            <Minus aria-hidden="true" className="inline h-3 w-3" />
                          ) : (
                            <Plus aria-hidden="true" className="inline h-3 w-3" />
                          )}
                        </span>
                      </span>
                      <span className="sm:col-span-5 text-[#111111]/90 dark:text-[#D4D4D8]">
                        {job.role}
                      </span>
                      <span className="sm:col-span-3 sm:text-right text-[#4A4A4A] dark:text-[#9A9A9E] sm:text-[#111111] sm:dark:text-[#E8E8EA] tabular-nums whitespace-nowrap">
                        {job.period}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="mt-1.5 mb-4 border-t border-[#BDBDBD]/80 dark:border-[#27272A] pt-2.5 text-[13px] leading-[1.58] text-[#4A4A4A] dark:text-[#9A9A9E]">
                        {job.location ? (
                          <div className="mb-1.5 text-[12px] text-[#4A4A4A] dark:text-[#9A9A9E]">
                            {job.location}
                          </div>
                        ) : null}
                        <ul className="space-y-1.5">
                          {job.bullets.map((b, idx) => (
                            <li key={idx}>
                              <span className="font-medium text-[#111111] dark:text-[#F2F2F2]">
                                {b.lead}
                              </span>{" "}
                              <span className="text-[#4A4A4A] dark:text-[#B4B4BA]">{b.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </SectionRow>

          {/* ==================== 5. EDUCATION ==================== */}
          <SectionRow id="education" title={cv.sections.education} delayMs={460}>
            <div className="space-y-1 text-[13.5px] md:text-[14px] leading-[1.6]">
              {cv.education.map((edu) => {
                const isOpen = Boolean(expandedEducation[edu.id]);
                return (
                  <div key={edu.id}>
                    <button
                      type="button"
                      onClick={() => toggleEducation(edu.id)}
                      aria-expanded={isOpen}
                      className="group w-full cursor-pointer grid grid-cols-1 sm:grid-cols-12 items-baseline gap-y-0.5 sm:gap-x-4 py-1 text-left transition-opacity duration-150 hover:opacity-80"
                    >
                      <span className="sm:col-span-9 text-[#111111] dark:text-[#F2F2F2]">
                        <span>{edu.school}</span>
                        <span className="text-[#4A4A4A] dark:text-[#9A9A9E]"> — {edu.degree}</span>
                      </span>
                      <span className="sm:col-span-3 sm:text-right text-[#4A4A4A] dark:text-[#9A9A9E] sm:text-[#111111] sm:dark:text-[#E8E8EA] tabular-nums whitespace-nowrap">
                        {edu.period}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="mt-1 mb-3 border-t border-[#BDBDBD]/80 dark:border-[#27272A] pt-2 text-[13px] leading-[1.55] text-[#4A4A4A] dark:text-[#9A9A9E]">
                        {edu.details.join(" · ")}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {/* Collapsible specialized courses row */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowCourses((prev) => !prev)}
                  aria-expanded={showCourses}
                  className="group w-full cursor-pointer grid grid-cols-1 sm:grid-cols-12 items-baseline gap-y-0.5 sm:gap-x-4 py-1 text-left transition-opacity duration-150 hover:opacity-80"
                >
                  <span className="sm:col-span-9 text-[#111111] dark:text-[#F2F2F2]">
                    <span className="editorial-link">
                      {cv.controls.coursesLabel} ({cv.courses.length})
                    </span>
                    <span className="text-[#4A4A4A] dark:text-[#9A9A9E]">
                      {" "}
                      — AMAT, Univ. of Michigan, Deeplearning.AI
                    </span>
                  </span>
                  <span className="sm:col-span-3 sm:text-right text-[#4A4A4A] dark:text-[#9A9A9E] sm:text-[#111111] sm:dark:text-[#E8E8EA] tabular-nums whitespace-nowrap">
                    2022 – 2025
                  </span>
                </button>

                {showCourses ? (
                  <ul className="mt-1.5 mb-2 border-t border-[#BDBDBD]/80 dark:border-[#27272A] pt-2.5 space-y-1 text-[13px] leading-[1.55] text-[#4A4A4A] dark:text-[#9A9A9E]">
                    {cv.courses.map((course) => (
                      <li
                        key={`${course.name}-${course.year}`}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <span className="text-[#111111]/90 dark:text-[#D4D4D8]">{course.name}</span>
                        <span className="tabular-nums text-[#4A4A4A] dark:text-[#9A9A9E] shrink-0">
                          {course.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </SectionRow>

          {/* ==================== 6. CERTIFICATIONS ==================== */}
          <SectionRow id="certifications" title={cv.sections.certifications} delayMs={520}>
            <div className="space-y-2 text-[13.5px] md:text-[14px] leading-[1.58]">
              {cv.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="grid grid-cols-1 sm:grid-cols-12 items-baseline gap-y-0.5 sm:gap-x-4 py-0.5"
                >
                  <div className="sm:col-span-9">
                    <span className="text-[#111111] dark:text-[#F2F2F2]">{cert.name}</span>
                    <span className="text-[#4A4A4A] dark:text-[#9A9A9E]"> — {cert.description}</span>
                  </div>
                  <div className="sm:col-span-3 sm:text-right text-[#4A4A4A] dark:text-[#9A9A9E] sm:text-[#111111] sm:dark:text-[#E8E8EA] tabular-nums whitespace-nowrap">
                    {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </SectionRow>

          {/* ==================== 7. LANGUAGES ==================== */}
          <SectionRow id="languages" title={cv.sections.languages} delayMs={580}>
            <div className="space-y-1 text-[13.5px] md:text-[14px] leading-[1.6]">
              {cv.languages.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-2 items-baseline gap-x-4 py-0.5"
                >
                  <span className="text-[#111111] dark:text-[#F2F2F2]">{item.name}</span>
                  <span className="text-right text-[#111111] dark:text-[#F2F2F2]">{item.level}</span>
                </div>
              ))}
            </div>
          </SectionRow>
        </main>
      </div>
    </div>
  );
}

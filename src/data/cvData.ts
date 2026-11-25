export type Language = "en" | "es";

export interface WorkBullet {
  lead: string;
  text: string;
}

export interface WorkItem {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: WorkBullet[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  details: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  year: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CourseItem {
  name: string;
  year: string;
}

export interface PortfolioLinkItem {
  id: string;
  label: string;
  urlDisplay: string;
  href: string;
  external: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  type: string;
  subtitle: string;
  tags: string[];
  bullets: string[];
}

export interface LanguageProficiency {
  name: string;
  level: string;
}

export interface ResumeContent {
  meta: {
    pageTitle: string;
    docLabel: string;
    greetingPrefix: string;
    savePdfLabel: string;
    classicCvLabel: string;
    themeDarkLabel: string;
    themeLightLabel: string;
  };
  sections: {
    about: string;
    portfolio: string;
    competences: string;
    workHistory: string;
    education: string;
    certifications: string;
    languages: string;
  };
  controls: {
    expandDetails: string;
    collapseDetails: string;
    viewByCategory: string;
    hideCategories: string;
    coursesLabel: string;
    projectDetailsHint: string;
    closeDetailsHint: string;
  };
  name: string;
  fullName: string;
  headline: string;
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    linkedin: string;
    linkedinLabel: string;
    website: string;
    websiteLabel: string;
    location: string;
  };
  aboutParagraph: string;
  portfolioLinks: PortfolioLinkItem[];
  projects: ProjectItem[];
  competencesParagraphs: [string, string];
  coreSpecialties: string[];
  skillsByCategory: SkillCategory[];
  workHistory: WorkItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  courses: CourseItem[];
  languages: LanguageProficiency[];
}

export const CV_DATA: Record<Language, ResumeContent> = {
  en: {
    meta: {
      pageTitle: "Uriel Luna — Actuary & Data Specialist",
      docLabel: "Resume",
      greetingPrefix: "Hello! I’m",
      savePdfLabel: "Save PDF",
      classicCvLabel: "Classic CV",
      themeDarkLabel: "Dark",
      themeLightLabel: "Light",
    },
    sections: {
      about: "About me",
      portfolio: "Portfolio",
      competences: "Competences",
      workHistory: "Work History",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
    },
    controls: {
      expandDetails: "Expand details",
      collapseDetails: "Hide details",
      viewByCategory: "View full stack by category",
      hideCategories: "Hide category breakdown",
      coursesLabel: "Specialized Courses",
      projectDetailsHint: "View project details",
      closeDetailsHint: "Hide project details",
    },
    name: "Uriel Luna",
    fullName: "Uriel Alexis Luna López",
    headline: "Actuary & Data Specialist",
    contact: {
      phone: "+52 56 3207 0069",
      phoneHref: "tel:+525632070069",
      email: "urielalexistunalopez23@gmail.com",
      linkedin: "https://www.linkedin.com/in/urielalexislunalopez/",
      linkedinLabel: "linkedin.com/in/urielalexislunalopez",
      website: "https://urielluna.site/",
      websiteLabel: "urielluna.site",
      location: "Querétaro, Mexico",
    },
    aboutParagraph:
      "Actuary based in Querétaro, Mexico, with experience in fraud prevention, risk management, and technical reserves across the financial and insurance sectors (Agroasemex, Santander, Kellanova). Experienced in Machine Learning (Classification, Clustering, Time Series), Python, advanced SQL, and BI (Power BI, Tableau, Shiny) for Big Data analysis and real-time dashboard development. Focused on optimizing analytical processes and generating actionable insights.",
    portfolioLinks: [
      {
        id: "website",
        label: "Personal Website",
        urlDisplay: "urielluna.site",
        href: "https://urielluna.site/",
        external: true,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        urlDisplay: "linkedin.com/in/urielalexislunalopez",
        href: "https://www.linkedin.com/in/urielalexislunalopez/",
        external: true,
      },
      {
        id: "cv-pdf",
        label: "Printable CV (PDF)",
        urlDisplay: "cv.html?lang=en",
        href: "/cv.html?lang=en",
        external: true,
      },
    ],
    projects: [
      {
        id: "ames",
        title: "House Price Prediction Model",
        type: "Academic Project — AMAT",
        subtitle: "AMES dataset · 3rd place (Adj. R² = 0.83)",
        tags: ["Python", "Machine Learning", "Regression"],
        bullets: [
          "Analyzed the AMES (Iowa) dataset to predict final sale prices using a predictive model in Python.",
          "Achievement: 3rd place, adjusted R² = 0.83.",
        ],
      },
      {
        id: "crypto",
        title: "Crypto ML Prediction System",
        type: "Personal Project",
        subtitle: "Real-time 5-min forecasts · Python & APIs",
        tags: ["Python", "APIs", "OOP", "Databases"],
        bullets: [
          "Developed and deployed a Python system that generates price predictions every 5 minutes using a Machine Learning model.",
          "Automated real-time data extraction via API, optimizing the analysis of large volumes of information.",
          "Designed and managed databases to store and process historical and real-time data.",
          "Applied OOP (Object-Oriented Programming) principles to improve system modularity and scalability.",
        ],
      },
    ],
    competencesParagraphs: [
      "I specialize in Actuarial Science, Machine Learning, and Risk Analytics, with hands-on expertise in Technical Reserves, Solvency (CUSF, CNSF), and Python (Pandas, Polars, Scikit-Learn, TensorFlow, NLTK) alongside R (Tidyverse, Shiny, fabletools). My work bridges quantitative modeling with regulatory rigor across insurance and banking.",
      "Across Big Data, BI, and Cloud engineering, I build automated ETL pipelines and real-time dashboards using Advanced SQL, Hive, Elasticsearch, AWS (Athena, S3), Snowflake, Tableau, Power BI, Kibana, Matplotlib, and Seaborn, supported by OOP, Power Query, Power Pivot, Git/GitHub, and modern AI developer tooling (Opencode, Claude Code, Railway).",
    ],
    coreSpecialties: [
      "Technical Reserves & Solvency",
      "Machine Learning",
      "Fraud Prevention",
      "Big Data & ETL",
      "BI & Visualization",
      "AI & Cloud Tooling",
    ],
    skillsByCategory: [
      {
        category: "Actuarial",
        items: ["Technical Reserves", "RRC", "SONR", "Solvency (CUSF, CNSF)"],
      },
      {
        category: "AI & Cloud",
        items: ["Opencode (CLI)", "Claude Code (CLI)", "Railway", "Gemini", "Copilot"],
      },
      {
        category: "Programming Languages",
        items: [
          "Python (Pandas, Polars, Scikit-Learn, TensorFlow, NLTK)",
          "R (Tidyverse, Shiny, fabletools)",
        ],
      },
      {
        category: "Databases & Big Data",
        items: ["SQL (Advanced)", "Hive", "Elasticsearch", "AWS (Athena, S3)", "Snowflake"],
      },
      {
        category: "Visualization & BI",
        items: ["Tableau", "Power BI", "Kibana", "Matplotlib", "Seaborn", "Shiny"],
      },
      {
        category: "IDEs & Tools",
        items: ["RStudio", "VS Code", "PyCharm", "Git/GitHub"],
      },
      {
        category: "Other",
        items: ["Object-Oriented Programming (OOP)", "Power Query", "Power Pivot"],
      },
    ],
    workHistory: [
      {
        id: "agroasemex",
        company: "Agroasemex",
        location: "Querétaro, MX",
        role: "Deputy Manager of Technical Reserves & Solvency",
        period: "Aug 2025 – Present",
        bullets: [
          {
            lead: "Flow Optimization:",
            text: "Optimized data flows for the calculation of technical reserves and the development of pension plans, using KNIME to implement significant improvements to existing processes.",
          },
          {
            lead: "Data Processing, Validation & Orchestration:",
            text: "Designed and optimized data pipelines for technical reserves calculations and actuarial analytics using Python, ensuring strict data integrity and compliance with CUSF regulatory standards.",
          },
          {
            lead: "Stochastic Simulations & Risk Analytics:",
            text: "Conducted continuous simulations of reserves, premiums, and interest rates to evaluate solvency scenarios, perform sensitivity testing, and support strategic decision-making.",
          },
          {
            lead: "Regulatory Compliance:",
            text: "Supported compliance with CUSF and CNSF regulatory requirements in structured data validation flows, ensuring accuracy in official reports.",
          },
        ],
      },
      {
        id: "santander",
        company: "Santander",
        location: "Querétaro, MX",
        role: "Fraud Prevention Analyst",
        period: "Nov 2024 – Aug 2025",
        bullets: [
          {
            lead: "Fraud Detection & ML:",
            text: "Led fraud detection and prevention through the implementation of machine learning models (Classification, Clustering, Time Series) and the use of the Elasticsearch API for real-time analysis, directly contributing to strategic decision-making in risk management.",
          },
          {
            lead: "ETL Optimization:",
            text: "Improved data processing efficiency by 95% for risk/fraud analysis by enhancing ETL processes with Python and managing workflows in Snowflake, resulting in data access over 3x faster.",
          },
        ],
      },
      {
        id: "kellanova",
        company: "Kellanova",
        location: "Querétaro, MX",
        role: "Data Analyst, Digital Transformation",
        period: "Jan 2023 – Nov 2024",
        bullets: [
          {
            lead: "Automation:",
            text: "Automated data workflows using Python, reducing execution time by 80% and improving the accuracy of BI tools.",
          },
          {
            lead: "Data Quality:",
            text: "Analyzed sales data to identify outliers and errors, ensuring data integrity across BI systems (Tableau).",
          },
          {
            lead: "ETL & BI Technologies:",
            text: "Used AWS (Athena, S3), Python, R (Shiny), and Tableau for data extraction, transformation, and visualization (ETL).",
          },
        ],
      },
    ],
    education: [
      {
        id: "uaq",
        school: "Universidad Autónoma de Querétaro",
        degree: "B.Sc. in Actuarial Science",
        period: "2020 – 2024",
        details: ["GPA: 9.04/10", "Degree requirements currently in progress."],
      },
      {
        id: "umich",
        school: "University of Michigan (Coursera)",
        degree: "Applied Data Science with Python",
        period: "2024",
        details: [
          "Proficiency in key Python libraries for data science (Scikit-learn, Pandas, NetworkX, Matplotlib, NLTK).",
        ],
      },
    ],
    certifications: [
      {
        id: "exam-p",
        name: "Exam P",
        year: "2022",
        description:
          "Fundamentals of probability theory, random variables, and distributions (solid mathematical foundation).",
      },
      {
        id: "exam-srm",
        name: "Exam SRM",
        year: "2023",
        description:
          "Methods and models for data analysis: Regression Models (including GLM), Time Series, PCA, Decision Trees, and Cluster Analysis.",
      },
    ],
    courses: [
      { name: "Time Series Course: Forecasting – AMAT", year: "2025" },
      { name: "Machine Learning in Production – Deeplearning.AI", year: "2025" },
      { name: "Applied Social Network Analysis in Python – University of Michigan", year: "2023" },
      { name: "Applied Machine Learning in Python – University of Michigan", year: "2023" },
      { name: "Applied Text Mining in Python – University of Michigan", year: "2023" },
      {
        name: "Applied Plotting, Charting & Data Representation in Python – University of Michigan",
        year: "2023",
      },
      { name: "Data Science and Machine Learning with R", year: "2023" },
      { name: "Data Science and Machine Learning with Python", year: "2023" },
      { name: "Exam P preparation course – AMAT", year: "2022" },
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Advanced" },
    ],
  },

  es: {
    meta: {
      pageTitle: "Uriel Luna — Actuario & Data Specialist",
      docLabel: "Currículum",
      greetingPrefix: "¡Hola! Soy",
      savePdfLabel: "Guardar PDF",
      classicCvLabel: "CV Clásico",
      themeDarkLabel: "Oscuro",
      themeLightLabel: "Claro",
    },
    sections: {
      about: "Sobre mí",
      portfolio: "Portafolio",
      competences: "Competencias",
      workHistory: "Experiencia",
      education: "Educación",
      certifications: "Certificaciones",
      languages: "Idiomas",
    },
    controls: {
      expandDetails: "Ver detalles",
      collapseDetails: "Ocultar detalles",
      viewByCategory: "Ver stack completo por categoría",
      hideCategories: "Ocultar categorías",
      coursesLabel: "Cursos especializados",
      projectDetailsHint: "Ver detalle del proyecto",
      closeDetailsHint: "Ocultar detalle",
    },
    name: "Uriel Luna",
    fullName: "Uriel Alexis Luna López",
    headline: "Actuario & Data Specialist",
    contact: {
      phone: "+52 56 3207 0069",
      phoneHref: "tel:+525632070069",
      email: "urielalexistunalopez23@gmail.com",
      linkedin: "https://www.linkedin.com/in/urielalexislunalopez/",
      linkedinLabel: "linkedin.com/in/urielalexislunalopez",
      website: "https://urielluna.site/",
      websiteLabel: "urielluna.site",
      location: "Querétaro, México",
    },
    aboutParagraph:
      "Actuario radicado en Querétaro, México, con experiencia en prevención de fraude, gestión de riesgos y reservas técnicas en el sector financiero y asegurador (Agroasemex, Santander, Kellanova). Con experiencia en Machine Learning (Clasificación, Clustering, Series de Tiempo), Python, SQL avanzado y BI (Power BI, Tableau, Shiny) para análisis de Big Data y desarrollo de dashboards en tiempo real. Enfocado en optimizar procesos y generar insights clave.",
    portfolioLinks: [
      {
        id: "website",
        label: "Sitio Web",
        urlDisplay: "urielluna.site",
        href: "https://urielluna.site/",
        external: true,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        urlDisplay: "linkedin.com/in/urielalexislunalopez",
        href: "https://www.linkedin.com/in/urielalexislunalopez/",
        external: true,
      },
      {
        id: "cv-pdf",
        label: "CV Imprimible (PDF)",
        urlDisplay: "cv.html?lang=es",
        href: "/cv.html?lang=es",
        external: true,
      },
    ],
    projects: [
      {
        id: "ames",
        title: "Predicción de Precios de Casas",
        type: "Proyecto Académico — AMAT",
        subtitle: "Dataset AMES · 3er lugar (R² ajustado = 0.83)",
        tags: ["Python", "Machine Learning", "Regresión"],
        bullets: [
          "Analicé el dataset AMES (Iowa) para predecir precios finales usando un modelo predictivo en Python.",
          "Logro: 3er lugar, R² ajustado = 0.83.",
        ],
      },
      {
        id: "crypto",
        title: "Sistema ML de Criptomonedas",
        type: "Proyecto Personal",
        subtitle: "Predicciones cada 5 min · Python & APIs",
        tags: ["Python", "APIs", "OOP", "Bases de Datos"],
        bullets: [
          "Desarrollé e implementé un sistema en Python que genera predicciones de valor cada 5 minutos usando un modelo de Machine Learning.",
          "Automaticé la extracción de datos en tiempo real vía API, optimizando el análisis de grandes volúmenes de información.",
          "Diseñé y gestioné bases de datos para almacenar y procesar datos históricos y en tiempo real.",
          "Apliqué principios de OOP (Programación Orientada a Objetos) para mejorar la modularidad y escalabilidad del sistema.",
        ],
      },
    ],
    competencesParagraphs: [
      "Me especializo en Ciencias Actuariales, Machine Learning y Analítica de Riesgo, con experiencia sólida en Reservas Técnicas, RRC, SONR, Solvencia (CUSF, CNSF), Python (Pandas, Polars, Scikit-Learn, TensorFlow, NLTK) y R (Tidyverse, Shiny, fabletools). Integro modelado cuantitativo con cumplimiento normativo en seguros y banca.",
      "En Big Data, BI y Cloud diseño pipelines ETL automatizados y tableros en tiempo real con SQL avanzado, Hive, Elasticsearch, AWS (Athena, S3), Snowflake, Tableau, Power BI, Kibana, Matplotlib y Seaborn, junto con OOP, Power Query, Power Pivot, Git/GitHub y herramientas de IA y despliegue (Opencode, Claude Code, Railway).",
    ],
    coreSpecialties: [
      "Reservas Técnicas y Solvencia",
      "Machine Learning",
      "Prevención de Fraude",
      "Big Data & ETL",
      "Visualización & BI",
      "IA & Cloud",
    ],
    skillsByCategory: [
      {
        category: "Ciencias Actuariales",
        items: ["Reservas Técnicas", "RRC", "SONR", "Solvencia (CUSF, CNSF)"],
      },
      {
        category: "AI & Cloud",
        items: ["Opencode", "Claude Code", "Railway"],
      },
      {
        category: "Lenguajes de Programación",
        items: [
          "Python (Pandas, Polars, Scikit-Learn, TensorFlow, NLTK)",
          "R (Tidyverse, Shiny, fabletools)",
        ],
      },
      {
        category: "Bases de Datos & Big Data",
        items: ["SQL (Avanzado)", "Hive", "Elasticsearch", "AWS (Athena, S3)", "Snowflake"],
      },
      {
        category: "Visualización & BI",
        items: ["Tableau", "Power BI", "Kibana", "Matplotlib", "Seaborn", "Shiny"],
      },
      {
        category: "IDEs & Herramientas",
        items: ["RStudio", "VS Code", "PyCharm", "Git/GitHub"],
      },
      {
        category: "Otros",
        items: ["Object-Oriented Programming (OOP)", "Power Query", "Power Pivot"],
      },
    ],
    workHistory: [
      {
        id: "agroasemex",
        company: "Agroasemex",
        location: "Querétaro, MX",
        role: "Subgerente de Reservas Técnicas y Solvencia",
        period: "Ago 2025 – Actualidad",
        bullets: [
          {
            lead: "Optimización de Flujos:",
            text: "Optimicé flujos de datos para el cálculo de reservas técnicas y el desarrollo de planes de pensiones, utilizando KNIME para implementar mejoras significativas en los procesos existentes.",
          },
          {
            lead: "Procesamiento, Validación y Orquestación de Datos:",
            text: "Diseñé y optimicé pipelines de datos para el cálculo de reservas técnicas y análisis actuariales, garantizando su integridad y precisión mediante Python y alineados estrictamente con la normativa CUSF.",
          },
          {
            lead: "Simulaciones Estocásticas y Análisis de Riesgo:",
            text: "Ejecuté simulaciones continuas de reservas, primas y tasas de interés para evaluar escenarios de solvencia y respaldar la toma de decisiones estratégicas.",
          },
          {
            lead: "Cumplimiento Normativo:",
            text: "Apoyé en el cumplimiento de los requerimientos normativos de la CUSF y la CNSF en flujos de validación de datos estructurados, garantizando exactitud en los reportes oficiales.",
          },
        ],
      },
      {
        id: "santander",
        company: "Santander",
        location: "Querétaro, MX",
        role: "Analista Prev. de Fraudes",
        period: "Nov 2024 – Ago 2025",
        bullets: [
          {
            lead: "Detección de Fraude & ML:",
            text: "Lideré la detección y prevención de fraude mediante la implementación de modelos de machine learning (Clasificación, Clustering, Series de Tiempo) y el uso de Elasticsearch API para análisis en tiempo real, contribuyendo directamente a la toma de decisiones estratégicas en la gestión de riesgos.",
          },
          {
            lead: "Optimización ETL:",
            text: "Optimicé la eficiencia del procesamiento de datos en un 95% para análisis de riesgo/fraude al mejorar los procesos de ETL con Python y gestionar flujos de trabajo en Snowflake, resultando en un acceso a datos más de 3 veces más rápido.",
          },
        ],
      },
      {
        id: "kellanova",
        company: "Kellanova",
        location: "Querétaro, MX",
        role: "Analista de Datos en Transformación Digital",
        period: "Ene 2023 – Nov 2024",
        bullets: [
          {
            lead: "Automatización:",
            text: "Automaticé flujos de trabajo de datos utilizando Python, reduciendo el tiempo de ejecución en un 80% y mejorando la precisión de las herramientas de BI.",
          },
          {
            lead: "Calidad de Datos:",
            text: "Analicé datos de ventas para identificar outliers y errores, asegurando la integridad de los datos en sistemas de BI (Tableau).",
          },
          {
            lead: "Tecnologías ETL & BI:",
            text: "Utilicé AWS (Athena, S3), Python, R (Shiny) y Tableau para la extracción, transformación y visualización de datos (ETL).",
          },
        ],
      },
    ],
    education: [
      {
        id: "uaq",
        school: "Universidad Autónoma de Querétaro",
        degree: "Licenciatura en Actuaría",
        period: "2020 – 2024",
        details: ["Promedio (GPA): 9.04/10", "Actualmente en proceso de titulación."],
      },
      {
        id: "umich",
        school: "University of Michigan (Coursera)",
        degree: "Applied Data Science with Python",
        period: "2024",
        details: [
          "Dominio de librerías clave de Python para ciencia de datos (Scikit-learn, Pandas, NetworkX, Matplotlib, NLTK).",
        ],
      },
    ],
    certifications: [
      {
        id: "exam-p",
        name: "Exam P",
        year: "2022",
        description:
          "Fundamentos de Teoría de la Probabilidad, variables aleatorias y distribuciones (base matemática sólida).",
      },
      {
        id: "exam-srm",
        name: "Exam SRM",
        year: "2023",
        description:
          "Métodos y modelos para análisis de datos: Modelos de Regresión (incluyendo GLM), Series de Tiempo, PCA, Árboles de Decisión y Cluster Analysis.",
      },
    ],
    courses: [
      { name: "Curso de Series de Tiempo: Forecasting – AMAT", year: "2025" },
      { name: "Machine Learning in Production – Deeplearning.AI", year: "2025" },
      { name: "Applied Social Network Analysis in Python – University of Michigan", year: "2023" },
      { name: "Applied Machine Learning in Python – University of Michigan", year: "2023" },
      { name: "Applied Text Mining in Python – University of Michigan", year: "2023" },
      {
        name: "Applied Plotting, Charting & Data Representation in Python – University of Michigan",
        year: "2023",
      },
      { name: "Ciencia de Datos y Machine Learning con R", year: "2023" },
      { name: "Ciencia de Datos y Machine Learning con Python", year: "2023" },
      { name: "Curso de preparación exam P – AMAT", year: "2022" },
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Avanzado" },
    ],
  },
};

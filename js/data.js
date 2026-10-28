/* ============================================================================
   CONTENIDO DEL PORTAFOLIO Y CV  —  ⭐ ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR
   ----------------------------------------------------------------------------
   - Todo el texto de la página web y de los PDFs sale de aquí.
   - Hay dos bloques: `es` (español) y `en` (inglés). Edita ambos para que los
     dos idiomas se mantengan sincronizados.
   - La página (index.html) y el CV imprimible (cv.html) se generan solos a
     partir de estos datos. No necesitas tocar HTML ni CSS.
   ========================================================================== */

const DATA = {
  /* ============================== ESPAÑOL ============================== */
  es: {
    name: "URIEL LUNA",
    fullName: "Uriel Alexis Luna López",
    headline: "Actuario & Data Scientist",
    contact: {
      phone: "56 3207 0069",
      email: "urielalexistunalopez23@gmail.com",
      linkedin: "https://www.linkedin.com/in/urielalexislunalopez/",
      linkedinLabel: "linkedin.com/in/urielalexislunalopez",
      website: "https://urielluna.site/",
      websiteLabel: "urielluna.site",
      location: "Querétaro, México",
    },
    summary:
      "Actuario con experiencia en prevención de fraude, gestión de riesgos y reservas técnicas en el sector financiero y asegurador (Santander, Agroasemex). Con experiencia en Machine Learning (Clasificación, Clustering, Series de Tiempo). Python, SQL (Avanzado) y BI (Power BI, Tableau, Shiny) para análisis de Big Data y desarrollo de dashboards en tiempo real. Enfocado en optimizar procesos y generar insights clave.",

    experience: [
      {
        company: "Agroasemex",
        location: "",
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
        school: "Universidad Autónoma de Querétaro",
        degree: "Licenciatura en Actuaría",
        period: "2020 – 2024",
        details: ["Promedio (GPA): 9.04/10", "Actualmente en proceso de titulación."],
      },
      {
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
        name: "Exam P",
        year: "2022",
        description:
          "Fundamentos de Teoría de la Probabilidad, variables aleatorias y distribuciones. (Base matemática sólida).",
      },
      {
        name: "Exam SRM",
        year: "2023",
        description:
          "Métodos y modelos para análisis de datos: Modelos de Regresión (incluyendo GLM), Series de Tiempo, PCA, Árboles de Decisión y Cluster Analysis. (Relevante para modelado de riesgo).",
      },
    ],

    skills: [
      { category: "Ciencias Actuariales", items: ["Reservas Técnicas", "RRC", "SONR", "Solvencia (CUSF, CNSF)"] },
      { category: "AI & Cloud", items: ["Opencode", "Claude Code", "Railway"] },
      {
        category: "Lenguajes de Programación",
        items: ["Python (Pandas, Polars, Scikit-Learn, TensorFlow, NLTK)", "R (Tidyverse, Shiny, fabletools)"],
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
        items: ["Object-Oriented Programming (OOP)", "Power Query", "Power Pivot",],
      },
      {
        category: "Idiomas",
        items: ["Español (Nativo)", "Inglés (Avanzado, proficiente en conversación)"],
      },
    ],

    courses: [
      { name: "Curso de preparación exam P – AMAT", year: "2022" },
      { name: "Ciencia de Datos y Machine Learning con Python", year: "2023" },
      { name: "Ciencia de Datos y Machine Learning con R", year: "2023" },
      { name: "Applied Plotting, Charting & Data Representation in Python – University of Michigan", year: "2023" },
      { name: "Applied Text Mining in Python – University of Michigan", year: "2023" },
      { name: "Applied Machine Learning in Python – University of Michigan", year: "2023" },
      { name: "Applied Social Network Analysis in Python – University of Michigan", year: "2023" },
      { name: "Machine Learning in Production – Deeplearning.AI", year: "2025" },
      { name: "Curso de Series de Tiempo: Forecasting – AMAT", year: "2025" },
    ],

    projects: [
      {
        title: "Modelo de Predicción de Precios de Casas",
        type: "Proyecto Académico — AMAT",
        image: "assets/img/project-ames.svg",
        tags: ["Python", "Machine Learning", "Regresión"],
        bullets: [
          "Analicé el dataset AMES (Iowa) para predecir precios finales usando un modelo predictivo en Python.",
          "Logro: 3er lugar, R² ajustado = 0.83.",
        ],
      },
      {
        title: "Sistema de ML para Predicción de Criptomonedas",
        type: "Proyecto Personal",
        image: "assets/img/project-crypto.svg",
        tags: ["Python", "APIs", "OOP", "Bases de Datos"],
        bullets: [
          "Desarrollé e implementé un sistema en Python que genera predicciones de valor cada 5 minutos usando un modelo de Machine Learning.",
          "Automaticé la extracción de datos en tiempo real vía API, optimizando el análisis de grandes volúmenes de información.",
          "Diseñé y gestioné bases de datos para almacenar y procesar datos históricos y en tiempo real.",
          "Apliqué principios de OOP (Programación Orientada a Objetos) para mejorar la modularidad y escalabilidad del sistema.",
        ],
      },
    ],
  },

  /* ============================== ENGLISH ============================== */
  en: {
    name: "Uriel Luna",
    fullName: "Uriel Alexis Luna López",
    headline: "Actuary & Data Scientist",
    contact: {
      phone: "56 3207 0069",
      email: "urielalexistunalopez23@gmail.com",
      linkedin: "https://www.linkedin.com/in/urielalexislunalopez/",
      linkedinLabel: "linkedin.com/in/urielalexislunalopez",
      website: "https://urielluna.site/",
      websiteLabel: "urielluna.site",
      location: "Querétaro, Mexico",
    },
    summary:
      "Actuary with experience in fraud prevention, risk management, and technical reserves in the financial and insurance sectors (Santander, Agroasemex). Experienced in Machine Learning (Classification, Clustering, Time Series). Python, SQL (Advanced), and BI (Power BI, Tableau, Shiny) for Big Data analysis and real-time dashboard development. Focused on optimizing processes and generating key insights.",

    experience: [
      {
        company: "Agroasemex",
        location: "",
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
        school: "Universidad Autónoma de Querétaro",
        degree: "B.Sc. in Actuarial Science",
        period: "2020 – 2024",
        details: ["GPA: 9.04/10", "Degree requirements currently in progress."],
      },
      {
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
        name: "Exam P",
        year: "2022",
        description:
          "Fundamentals of probability theory, random variables, and distributions. (Solid mathematical foundation).",
      },
      {
        name: "Exam SRM",
        year: "2023",
        description:
          "Methods and models for data analysis: Regression Models (including GLM), Time Series, PCA, Decision Trees, and Cluster Analysis. (Relevant for risk modeling).",
      },
    ],

    skills: [
      { category: "Actuarial", items: ["Technical Reserves", "Solvency (CUSF, CNSF)"] },
      { category: "AI & Cloud", items: ["Opencode (CLI)", "Claude Code (CLI)", "Railway", "Gemini (Anitgravity)", "Copilot"] },
      {
        category: "Programming Languages",
        items: ["Python (Pandas, Polars, Scikit-Learn, TensorFlow, NLTK)", "R (Tidyverse, Shiny, fabletools)"],
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
      {
        category: "Languages",
        items: ["Spanish (Native)", "English (Advanced, proficient in conversation)"],
      },
    ],

    courses: [
      { name: "Exam P preparation course – AMAT", year: "2022" },
      { name: "Data Science and Machine Learning with Python", year: "2023" },
      { name: "Data Science and Machine Learning with R", year: "2023" },
      { name: "Applied Plotting, Charting & Data Representation in Python – University of Michigan", year: "2023" },
      { name: "Applied Text Mining in Python – University of Michigan", year: "2023" },
      { name: "Applied Machine Learning in Python – University of Michigan", year: "2023" },
      { name: "Applied Social Network Analysis in Python – University of Michigan", year: "2023" },
      { name: "Machine Learning in Production – Deeplearning.AI", year: "2025" },
      { name: "Time Series Course: Forecasting – AMAT", year: "2025" },
    ],

    projects: [
      {
        title: "House Price Prediction Model",
        type: "Academic Project — AMAT",
        image: "assets/img/project-ames.svg",
        tags: ["Python", "Machine Learning", "Regression"],
        bullets: [
          "Analyzed the AMES (Iowa) dataset to predict final sale prices using a predictive model in Python.",
          "Achievement: 3rd place, adjusted R² = 0.83.",
        ],
      },
      {
        title: "ML System for Cryptocurrency Price Prediction",
        type: "Personal Project",
        image: "assets/img/project-crypto.svg",
        tags: ["Python", "APIs", "OOP", "Databases"],
        bullets: [
          "Developed and deployed a Python system that generates price predictions every 5 minutes using a Machine Learning model.",
          "Automated real-time data extraction via API, optimizing the analysis of large volumes of information.",
          "Designed and managed databases to store and process historical and real-time data.",
          "Applied OOP (Object-Oriented Programming) principles to improve system modularity and scalability.",
        ],
      },
    ],
  },
};

/* ============================================================================
   TEXTOS DE LA INTERFAZ (etiquetas de la página, botones, secciones)
   ========================================================================== */

const UI = {
  es: {
    nav: { home: "INICIO", experience: "EXPERIENCIA", projects: "PROYECTOS", contact: "CONTACTO" },
    downloadCv: "DESCARGAR CV",
    portfolioCta: "Portafolio",
    hero: {
      hello: "Hola,",
      availability: "Disponible para nuevas oportunidades",
      basedIn: "Querétaro, MX · Remoto",
    },
    aboutTag: "SOBRE MI",
    experienceTitle: "Experiencia",
    experienceSub: "Mi trayectoria profesional en el sector financiero y de datos.",
    projectsTitle: "Proyectos",
    projectsSub:
      "Del concepto a la implementación, estos proyectos muestran mi experiencia creando soluciones de datos que generan resultados.",
    skillsTitle: "Habilidades",
    educationTitle: "Educación",
    certificationsTitle: "Certificaciones",
    coursesTitle: "Cursos",
    contactTitle: "¿Trabajamos juntos?",
    contactSub: "Estoy abierto a nuevas oportunidades y colaboraciones. Escríbeme.",
    footerNote: "© 2026 Uriel Luna. Hecho con HTML, CSS y JS.",
  },
  en: {
    nav: { home: "HOME", experience: "EXPERIENCE", projects: "PROJECTS", contact: "CONTACT" },
    downloadCv: "Download CV",
    portfolioCta: "Portfolio",
    hero: {
      hello: "Hey there, I'm",
      availability: "Open to new opportunities",
      basedIn: "Querétaro, MX · Remote",
    },
    aboutTag: "ABOUT ME",
    experienceTitle: "Experience",
    experienceSub: "My professional journey in the financial and data sectors.",
    projectsTitle: "Recent Projects",
    projectsSub:
      "From concept to completion, these projects highlight my expertise in building data solutions that drive results.",
    skillsTitle: "Skills",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    coursesTitle: "Courses",
    contactTitle: "Let's work together",
    contactSub: "I'm open to new opportunities and collaborations. Reach out.",
    footerNote: "© 2026 Uriel Luna. Built with HTML, CSS & JS.",
  },
};

/* Etiquetas de las secciones del CV en PDF */
const CV_LABELS = {
  es: {
    summary: "Resumen Profesional",
    experience: "Experiencia Profesional",
    education: "Educación",
    certifications: "Certificaciones",
    skills: "Habilidades & Software",
    courses: "Cursos",
    projects: "Proyectos",
  },
  en: {
    summary: "Professional Summary",
    experience: "Professional Experience",
    education: "Education",
    certifications: "Certifications",
    skills: "Skills & Software",
    courses: "Courses",
    projects: "Projects",
  },
};

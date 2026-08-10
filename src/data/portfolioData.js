import projectsData from './projects.json';
import skillsData from './skills.json';

export const portfolioData = {
  personal: {
    name: "Rahul Nalla",
    role: "Software Developer",
    location: "Visakhapatnam",
    status: "Available for Roles",
    tagline: "I build scalable software, intelligent products, and experiences at the intersection of engineering and technology.",
    aboutStatement: "I enjoy turning complex problems into software that feels simple.",
    aboutDetailed: "Driven by technical rigor and clean architecture, I specialize in engineering resilient backend microservices, performant full-stack applications, and data-driven intelligent systems. My focus is on writing maintainable code, designing scalable system architecture, and delivering crisp digital experiences.",
    email: "nallarahul515@gmail.com",
    github: "https://github.com/nallarahul",
    linkedin: "https://linkedin.com/in/rahul-nalla",
    resumeUrl: "https://drive.google.com/file/d/1uwXDJwoiwq1hoB7slWuCJ_ESSXAuL6VJ/view",
    avatarAlt: "Rahul Nalla - Software Developer",
  },

  // Skills are loaded directly from skills.json for easy user modification
  skills: skillsData,

  // Projects are loaded directly from projects.json for easy user modification
  projects: projectsData,

  experienceTimeline: [
    // {
    //   period: "2023 — Present",
    //   role: "Software Developer & Engineering Specialist",
    //   type: "Full-Stack / Backend Engineering",
    //   institution: "[Organization / Engineering Team]",
    //   description: "Architecting backend microservices, developing modern web applications, and implementing automated testing & deployment pipelines.",
    //   keyAchievements: [
    //     "Engineered scalable RESTful web APIs and database schemas using Java and Spring Boot.",
    //     "Built responsive front-end user interfaces utilizing React.js and modern state management patterns.",
    //     "Implemented containerized deployment pipelines using Docker and GitHub Actions CI/CD."
    //   ]
    // },
    {
      period: "2022 — 2026",
      role: "Undergradute",
      type: "Computer Science and Engineering",
      institution: "VIT-AP University",
      description: "Focused coursework and practical implementation in Data Structures, System Architecture, Database Systems, Object-Oriented Software Design, and Machine Learning.",
      keyAchievements: [
        "Completed Degree in Computer Science / Software Engineering with 8.73 CGPA.",
        "Developed full-stack capstone applications integrating Java backends with relational database systems.",
        "Authored modular open-source software packages and project case studies."
      ]
    }
  ],

  certificationsAndMilestones: [
    { title: "Oracle Generative AI Professional", issuer: "Oracle", year: "2025" },
    { title: "MERN Fullstack", issuer: "Ethnus", year: "2024" },
    { title: "The Complete Python Bootcamp from Zero to Hero in Python", issuer: "Udemy", year: "2023" }
  ]
};

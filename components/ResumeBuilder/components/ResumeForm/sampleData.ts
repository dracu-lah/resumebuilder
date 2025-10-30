import { Resume } from "./resumeSchema";

export const sampleData: Resume = {
  personalInfo: {
    name: "Sagar Alias Jackie",
    title: "Business Analyst / Data Scientist",
    phone: "+91 7070777077",
    email: "sagaraliasjackie@007.com",
    location: "Chennai, India",
    portfolioWebsite: "sagaraliasjackie.dev",
    linkedInUrl: "https://www.linkedin.com/in/sagaraliasjackie007",
    summary:
      "Business Analyst and Data Scientist with expertise in machine learning, data analysis, and process improvement. Proven track record in delivering data-driven solutions.",
  },
  experience: [
    {
      company: "WS",
      positions: [
        {
          title: "Business Analyst Intern",
          duration: "January 24 - March 24",
          achievements: [
            "Reduced data processing time by 20% through streamlined collection and reporting",
            "Implemented automation solutions resulting in 15% productivity increase",
            "Conducted market research identifying 10+ key trends for strategic decisions",
          ],
        },
      ],
    },
  ],
  skills: {
    languages: ["Python", "SQL", "JAVA"],
    frameworks: ["Pandas", "Numpy", "Scikit-Learn", "Matplotlib"],
    databases: ["Power BI", "Excel", "Tableau", "MySQL"],
    architectures: ["PyCharm", "Jupyter Notebook", "VS Code"],
    tools: [],
    methodologies: [],
    other: ["Stakeholder Management", "Communication", "People Management"],
  },
  education: [
    {
      degree: "Master of Computer Application; GPA: 8.06",
      institution: "Vellore Institute of Technology",
      year: "2022 - 2024",
    },
    {
      degree: "B.Sc. (Honors) Mathematics; GPA: 8.70",
      institution: "Barasat Govt. College",
      year: "2018 - 2021",
    },
  ],
  projects: [
    {
      name: "Student Performance Prediction",
      link: "www.link.website",
      role: "Data Scientist",
      description:
        "Achieved 96% accuracy in forecasting student academic performance using machine learning.",
      technologies: [],
      features: [
        "Enhanced data quality by 33% through handling missing values and encoding",
        "Identified key factors influencing academic performance through analysis",
      ],
    },
    {
      name: "Credit Card Fraud Detection",
      link: "www.link.website",
      role: "ML Engineer",
      description:
        "Developed logistic regression model achieving 87% accuracy in fraud prediction.",
      technologies: [],
      features: [
        "Reduced false positives by 16% through feature engineering",
        "Addressed class imbalance using ensemble techniques",
      ],
    },
  ],
  achievements: [
    "Programming in Python (Meta) - March 2023",
    "Introduction to Data Analyst (IBM) - March 2023",
    "Foundations: Data, Data, Everywhere (Google) - March 2023",
  ],
  interests: ["Data Analysis", "Machine Learning", "Business Intelligence"],
  knownLanguages: ["English", "Malayalam"],
};

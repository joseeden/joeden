import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "../components/projects/Project.module.scss";
import { Project, ProjectData } from "../components/projects/Project";

// const assetsDir = "./assets/projects";
const baseUrl = "/joeden";

const projects: ProjectData[] = [
  {
    title: "Swiftlink",
    description: "A responsive landing page for a fictional logistics company",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Swiftlink/`, 
    image: require(`/img/docs/Screenshot-2025-04-18-144904.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Circuit Minds",
    description: "Landing page for a fictional electronics company",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Circuit-Minds/`, 
    image: require(`/img/docs/Screenshot-2025-03-28-195824.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Just Keep Running",
    description: "A simple landing page for a fictional running event",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Just-Keep-Running/`, 
    image: require(`/img/docs/Screenshot-2025-03-24-075843.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "CI/CD Pipeline for Flask Application",
    description: "Automated code testing, packaging, and deployment.",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Single-Server-Deployment`, 
    image: require(`/img/docs/jenkins-flask.png`),
    tags: ["DevOps", "Containers", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "AWS Serverless Deployment using Jenkins",
    description: "Using Jenkins to deploy a serverless application",
    url: `${baseUrl}/docs/Amazon-Web-Services/Projects/Deploy-Serverless-App-using-Jenkins/`, 
    image: require(`/img/docs/AWS-SAM.png`),
    tags: ["DevOps", "AWS", "Serverless"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Setting Up Jenkins with Ansible",
    description: "Automated Jenkins installation and setup using Ansible.",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Setup-Ansible-and-Jenkins/`, 
    image: require(`/img/docs/ansible-jenkins.png`),
    tags: ["DevOps", "Ansible"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Kong Gateway Setup with Docker Compose",
    description: "Setup Kong API Gateway with ELK, Prometheus, Grafana, and more.",
    url: `${baseUrl}/docs/Software-Engineering/Kong-API-Gateway/Containerized-Kong-and-Other-Apps`, 
    image: require(`/img/docs/kong-elk-prom-graf.png`),
    tags: ["DevOps", "Docker", "Observability"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "A Network Analysis of Game of Thrones",
    description: "Analyze co-occurrence networks of characters in Game of Thrones",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/020-A-Network-Analysis-of-Game-of-Thrones/network-analysis-on-game-of-thrones.ipynb",
    image: require(`/img/docs/got_network.jpeg`),
    tags: ["Data Analysis", "Python"]
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "A New Era of Data Analysis in Baseball",
    description: "Use Statcast data to compare home runs of two of MLB's brightest stars.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/021-A-New-Era-of-Data-Analysis-in-Baseball/A-New-Era-of-Data-Analysis-in-Baseball.ipynb",
    image: require(`/img/docs/stanton_wide.jpg`),
    tags: ["Data Analysis", "Python"]
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "Investigating Netflix Movies",
    description: "Exploratory data analysis on 90s movies using Netflix data.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/010-Investigating-Netflix-Movies/netflix-movies.ipynb",
    image: require(`/img/docs/redpopcorn.jpg`),
    tags: ["Data Analysis", "Python"]
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "Hacker Statistics with Python",
    description: "Using hacker statistics to calculate your chances of winning a bet.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/009-Hacker-Statistics/Hacker_Statistics.ipynb",
    image: require(`/img/docs/hacker-statistics.png`),
    tags: ["Data Analysis", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Exploring NYC Public School Test Result Scores",
    description: "Analyze scores using summary statistics and data manipulation.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/022-Exploring-NYC-Public-School-Test-Result-Scores/Exploring-NYC-Public-School-Test-Result-Scores.ipynb",
    image: require(`/img/docs/schoolbus.jpg`),
    tags: ["Data Analysis", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Centralized Logging with Graylog SIEM",
    description: "Deploy Graylog as an SIEM solution to collect logs from AWS resources.",
    url: "",
    image: require(`/img/docs/graylog.png`),
    tags: ["DevOps", "Security", "AWS"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "Microservices Deployment on Kubernetes",
    description: "Deploy microservices-based application on Kubernetes.",
    url: "",
    image: require(`/img/docs/aws-eks.png`),
    tags: ["DevOps", "Kubernetes", "Docker"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "End-to-End DevSecOps Pipeline",
    description: "CICD pipeline with automated testing, security scans, and compliance checks.",
    url: "",
    image: require(`/img/docs/devsecops.png`),
    tags: ["DevOps", "Security"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "Machine Learning Pipeline Deployment",
    description: "Build an ML pipeline for data preprocessing and model training.",
    url: "",
    image: require(`/img/docs/mlops.png`),
    tags: ["Machine Learning", "MLOps", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "ETL Pipeline Deployment",
    description: "Develop an ETL pipeline to extract, transform, and load large datasets.",
    url: "",
    image: require(`/img/docs/etl-pipeline.png`),
    tags: ["Data Engineering", "ETL", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
];


// Set the layout of the Projects page, including the title and categories for filtering projects. 
//    Left column: Categories filter sidebar
//    Right column: Project cards
// The categories are defined as an array of objects, each with an `id` and a `label`. 
// The `id` is used for internal logic, while the `label` is displayed to users.
const title = "Projects";

const categories = [
  { id: "devops", label: "DevOps" },
  { id: "security", label: "Security" },
  { id: "webdev", label: "Web Development" },
  { id: "dataanalysis", label: "Data Analysis" },
  { id: "dataengineering", label: "Data Engineering" },
  { id: "ml", label: "Machine Learning" },
  { id: "ai", label: "Artificial Intelligence" },
];

export default function Projects(): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((currentCategories) => {
      if (currentCategories.includes(category)) {
        return currentCategories.filter((item) => item !== category);
      }

      return [...currentCategories, category];
    });
  };

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter((project) =>
          project.tags?.some((tag) => selectedCategories.includes(tag)),
        );

  return (
    <Layout title={title}>
      <main className="margin-vert--lg">
        <div className={styles.projectsPage}>
          <div className={styles.pageWrapper}>
            <div className={styles.headerBox}>
              <h1 className={styles.projectsTitle}>{title}</h1>
            </div>
            <div className="outerpageContiner">
              <div className={styles.pageContainer}>
                <div className={styles.leftColumn}>
                  <div className={styles.sidebarContainer}>
                    <div className={styles.categoriesHeader}>
                      CATEGORIES
                    </div>
                    <div className={styles.categoriesList}>
                      {categories.map((category) => (
                        <div key={category.id} className={styles.categoryItem}>
                          <input
                            type="checkbox"
                            id={category.id}
                            className={styles.categoryToggle}
                            checked={selectedCategories.includes(category.label)}
                            onChange={() => handleCategoryToggle(category.label)}
                          />
                          <label htmlFor={category.id} className={styles.categoryLabel}>
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.rightColumn}>
                  <div className={styles.cardsList}>
                    {filteredProjects.map((project) => (
                      <Project key={project.title} {...project} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

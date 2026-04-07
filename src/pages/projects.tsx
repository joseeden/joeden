import React from "react";
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
    // role: "Organizer",
  },  
  {
    title: "Circuit Minds",
    description: "Landing page for a fictional electronics engineering company",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Circuit-Minds/`, 
    image: require(`/img/docs/Screenshot-2025-03-28-195824.png`),
    tags: ["Web Development", "JavaScript"],
    // role: "Organizer",
  },  
  {
    title: "Just Keep Running",
    description: "A simple landing page for a fictional running event",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Just-Keep-Running/`, 
    image: require(`/img/docs/Screenshot-2025-03-24-075843.png`),
    tags: ["Web Development", "JavaScript"],
    // role: "Organizer",
  },  
  {
    title: "CI/CD Pipeline for Flask Application",
    description: "Automate code deployment with testing, packaging, and server deployment.",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Single-Server-Deployment`, 
    image: require(`/img/docs/jenkins-flask.png`),
    tags: ["DevOps", "Containers", "Python"],
    // role: "Organizer",
  },  
  {
    title: "AWS Serverless Deployment using Jenkins",
    description: "Using Jenkins to deploy a serverless application",
    url: `${baseUrl}/docs/Amazon-Web-Services/Projects/Deploy-Serverless-App-using-Jenkins/`, 
    image: require(`/img/docs/AWS-SAM.png`),
    tags: ["DevOps", "AWS", "Serverless"],
    // role: "Organizer",
  },  
  {
    title: "Setting Up Jenkins with Ansible",
    description: "Automated Jenkins installation and setup using Ansible.",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Setup-Ansible-and-Jenkins/`, 
    image: require(`/img/docs/ansible-jenkins.png`),
    tags: ["DevOps", "Ansible"],
    // role: "Organizer",
  },  
  {
    title: "Kong Gateway Setup with Docker Compose",
    description: "Setup Kong API Gateway along with ELK, Prometheus, Grafana, and other tools.",
    url: `${baseUrl}/docs/Software-Engineering/Kong-API-Gateway/Containerized-Kong-and-Other-Apps`, 
    image: require(`/img/docs/kong-elk-prom-graf.png`),
    tags: ["DevOps", "Docker", "Observability"],
    // role: "Organizer",
  },  
  {
    title: "A Network Analysis of Game of Thrones",
    description: "Analyze co-occurrence network of the characters in the Game of Thrones books",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/020-A-Network-Analysis-of-Game-of-Thrones/network-analysis-on-game-of-thrones.ipynb",
    image: require(`/img/docs/got_network.jpeg`),
    tags: ["Data Analysis", "Python"]
    // role: "Organizer",
  },
  {
    title: "A New Era of Data Analysis in Baseball",
    description: "Use MLB's Statcast data to compare the home runs of two of baseball's brightest stars.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/021-A-New-Era-of-Data-Analysis-in-Baseball/A-New-Era-of-Data-Analysis-in-Baseball.ipynb",
    image: require(`/img/docs/stanton_wide.jpg`),
    tags: ["Data Analysis", "Python"]
    // role: "Organizer",
  },
  {
    title: "Investigating Netflix Movies",
    description: "Perform an exploratory data analysis on 90s movies using Netflix data.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/010-Investigating-Netflix-Movies/netflix-movies.ipynb",
    image: require(`/img/docs/redpopcorn.jpg`),
    tags: ["Data Analysis", "Python"]
    // role: "Organizer",
  },
  {
    title: "Hacker Statistics with Python",
    description: "Using hacker statistics to calculate your chances of winning a bet.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/009-Hacker-Statistics/Hacker_Statistics.ipynb",
    image: require(`/img/docs/hacker-statistics.png`),
    tags: ["Data Analysis", "Python"],
    // role: "Organizer",
  },  
  {
    title: "Exploring NYC Public School Test Result Scores",
    description: "Analyze scores using summary statistics and data manipulation.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/022-Exploring-NYC-Public-School-Test-Result-Scores/Exploring-NYC-Public-School-Test-Result-Scores.ipynb",
    image: require(`/img/docs/schoolbus.jpg`),
    tags: ["Data Analysis", "Python"],
    // role: "Organizer",
  },  
  {
    title: "Centralized Logging with Graylog SIEM",
    description:
      "Deploy Graylog as an SIEM solution to collect logs from AWS resources.",
    url: "",
    image: require(`/img/docs/graylog.png`),
    tags: ["DevOps", "Security", "AWS"],
    // role: "Maintainer",
  },
  {
    title: "Microservices Deployment on Kubernetes",
    description: "Deploy microservices-based application on Kubernetes.",
    url: "",
    image: require(`/img/docs/aws-eks.png`),
    tags: ["DevOps", "Kubernetes", "Docker"],
    // role: "Maintainer",
  },
  {
    title: "End-to-End DevSecOps Pipeline",
    description: "CI/CD pipeline with security scanning, automated testing, and compliance checks.",
    url: "",
    image: require(`/img/docs/devsecops.png`),
    tags: ["DevOps", "Security"],
    // role: "Author",
  },
  {
    title: "Machine Learning Pipeline Deployment",
    description: "Build an ML pipeline for data preprocessing and model training.",
    url: "",
    image: require(`/img/docs/mlops.png`),
    tags: ["Machine Learning", "MLOps", "Python"],
    // role: "Author",
  },
  {
    title: "ETL Pipeline Deployment",
    description: "Develop an ETL pipeline for extracting, transforming, and loading large datasets.",
    url: "",
    image: require(`/img/docs/etl-pipeline.png`),
    tags: ["Data Engineering", "ETL", "Python"],
    // role: "Organizer",
  },
];

const title = "Projects";

export default function Projects(): JSX.Element {
  return (
    <Layout title={title}>
      <main className={`${styles.projectsPage} margin-vert--lg`}>
        <div className={styles.pageContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.categoriesHeader}>
              CATEGORIES
            </div>
            <div className={styles.categoriesList}>
              <div className={styles.categoryItem}>
                <input type="checkbox" id="devops" className={styles.categoryToggle} />
                <label htmlFor="devops" className={styles.categoryLabel}>DevOps</label>
              </div>
              <div className={styles.categoryItem}>
                <input type="checkbox" id="security" className={styles.categoryToggle} />
                <label htmlFor="security" className={styles.categoryLabel}>Security</label>
              </div>
              <div className={styles.categoryItem}>
                <input type="checkbox" id="webdev" className={styles.categoryToggle} />
                <label htmlFor="webdev" className={styles.categoryLabel}>Web Development</label>
              </div>
              <div className={styles.categoryItem}>
                <input type="checkbox" id="dataanalysis" className={styles.categoryToggle} />
                <label htmlFor="dataanalysis" className={styles.categoryLabel}>Data Analysis</label>
              </div>
              <div className={styles.categoryItem}>
                <input type="checkbox" id="dataengineering" className={styles.categoryToggle} />
                <label htmlFor="dataengineering" className={styles.categoryLabel}>Data Engineering</label>
              </div>
              <div className={styles.categoryItem}>
                <input type="checkbox" id="ml" className={styles.categoryToggle} />
                <label htmlFor="ml" className={styles.categoryLabel}>Machine Learning</label>
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.headerBox}>
              <h1 className={styles.projectsTitle}>{title}</h1>
            </div>
            <div className={styles.cardsList}>
              {projects.map((project) => (
                <Project key={project.title} {...project} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

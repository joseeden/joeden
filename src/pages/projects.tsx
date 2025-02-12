import React from "react";
import Layout from "@theme/Layout";
import styles from "../components/projects/Project.module.scss";
import { Project, ProjectData } from "../components/projects/Project";

// const assetsDir = "./assets/projects";
const assetsDir = "/img/docs";
const baseUrl = "/joeden";

const projects: ProjectData[] = [
  {
    title: "A Network Analysis of Game of Thrones",
    description: "Analyze co-occurrence network of the characters in the Game of Thrones books",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/020-A-Network-Analysis-of-Game-of-Thrones/network-analysis-on-game-of-thrones.ipynb",
    // image: `${assetsDir}/got_network.jpeg`,
    image: require(`/img/docs/got_network.png`),
    // role: "Organizer",
  },
  {
    title: "A New Era of Data Analysis in Baseball",
    description: "Use MLB's Statcast data to compare the home runs of two of baseball's brightest stars.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/021-A-New-Era-of-Data-Analysis-in-Baseball/A-New-Era-of-Data-Analysis-in-Baseball.ipynb",
    image: `${assetsDir}/stanton_wide.jpg`,
    // role: "Organizer",
  },
  {
    title: "Investigating Netflix Movies",
    description: "Perform an exploratory data analysis on 90s movies using Netflix data.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/010-Investigating-Netflix-Movies/netflix-movies.ipynb",
    image: `${assetsDir}/redpopcorn.jpg`,
    // role: "Organizer",
  },
  {
    title: "Hacker Statistics with Python",
    description: "Using hacker statistics to calculate your chances of winning a bet.",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/009-Hacker-Statistics/Hacker_Statistics.ipynb",
    image: `${assetsDir}/hacker-statistics.png`,
    // role: "Organizer",
  },  
  {
    title: "AWS Serverless Deployment using Jenkins",
    description: "Using Jenkins to deploy a serverless application",
    url: `${baseUrl}/docs/Amazon-Web-Services/Projects/Deploy-Serverless-App-using-Jenkins/`, 
    image: `${assetsDir}/AWS-SAM.png`,
    // role: "Organizer",
  },  
  {
    title: "Centralized Logging with Graylog SIEM",
    description:
      "Implement Graylog as an SIEM solution to collect logs from AWS resources.",
    url: "",
    image: `${assetsDir}/graylog.png`,
    // role: "Maintainer",
  },
  {
    title: "Microservices Deployment on Kubernetes",
    description: "Deploy microservices-based application on Kubernetes.",
    url: "",
    image: `${assetsDir}/aws-eks.png`,
    // role: "Maintainer",
  },
  {
    title: "End-to-End DevSecOps Pipeline",
    description: "CI/CD pipeline integrated with security scanning, automated testing, and compliance checks.",
    url: "",
    image: `${assetsDir}/devsecops.png`,
    // role: "Author",
  },
  {
    title: "Machine Learning Pipeline Deployment",
    description: "Build an ML pipeline for data preprocessing and model training.",
    url: "",
    image: `${assetsDir}/mlops.png`,
    // role: "Author",
  },
  {
    title: "ETL Pipeline Deployment for Data Processing",
    description: "Develop an ETL pipeline to extract, transform, and load large datasets.",
    url: "",
    image: `${assetsDir}/etl-pipeline.png`,
    // role: "Organizer",
  },
];

const title = "Projects";

export default function Projects(): JSX.Element {
  return (
    <Layout title={title}>
      <main className={`${styles.projectsPage} container container--fluid margin-vert--lg`}>
        <h1 className={styles.projectsTitle}>{title}</h1>
        <div className={styles.row}>
          {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

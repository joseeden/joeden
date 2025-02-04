import React from "react";
import Layout from "@theme/Layout";
import styles from "../components/projects/Project.module.scss";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Centralized Logging with Graylog SIEM",
    description:
      "Implement Graylog as an SIEM solution to collect logs from AWS resources.",
    url: "",
    image: require(`${assetsDir}/graylog.png`),
    // role: "Maintainer",
  },
  {
    title: "Microservices Deployment on Kubernetes",
    description: "Deploy microservices-based application on Kubernetes.",
    url: "",
    image: require(`${assetsDir}/aws-eks.png`),
    // role: "Maintainer",
  },
  {
    title: "End-to-End DevSecOps Pipeline",
    description: "Secure CI/CD pipeline integrated with security scanning, automated testing, and compliance checks.",
    url: "",
    image: require(`${assetsDir}/devsecops.png`),
    // role: "Author",
  },
  {
    title: "Machine Learning Pipeline Deployment",
    description: "Build an ML pipeline for data preprocessing and model training.",
    url: "",
    image: require(`${assetsDir}/mlops.png`),
    // role: "Author",
  },
  {
    title: "ETL Pipeline Deployment for Data Processing",
    description: "Develop an ETL pipeline to extract, transform, and load large datasets.",
    url: "",
    image: require(`${assetsDir}/etl-pipeline.png`),
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

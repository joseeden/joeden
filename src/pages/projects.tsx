import React from "react";
import Layout from "@theme/Layout";
import styles from "../components/projects/Project.module.scss";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Centralized Logging with Graylog SIEM",
    description:
      "Deployed Graylog as a SIEM solution to collect, aggregate, and analyze logs from all AWS resources.",
    url: "",
    image: require(`${assetsDir}/graylog.png`),
    role: "Maintainer",
  },
  {
    title: "Microservices Deployment on Kubernetes",
    description: "Implemented microservices-based application on Kubernetes using Terraform and Other Tools. ",
    url: "",
    image: require(`${assetsDir}/capact.png`),
    role: "Maintainer",
  },
  {
    title: "End-to-End DevSecOps Pipeline",
    description: "Designed and deployed a secure CI/CD pipeline integrating security scanning, automated testing, and compliance checks.  ",
    url: "",
    image: require(`${assetsDir}/mongo-seeding.png`),
    role: "Author",
  },
  {
    title: "Machine Learning Pipeline Deployment",
    description: "Built and deployed an ML pipeline for data preprocessing, model training, and inference",
    url: "",
    image: require(`${assetsDir}/terminer.png`),
    role: "Author",
  },
  {
    title: "ETL Pipeline Deployment for Data Processing",
    description: "Developed an ETL pipeline to extract, transform, and load large datasets.",
    url: "",
    image: require(`${assetsDir}/gophers-silesia.png`),
    role: "Organizer",
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

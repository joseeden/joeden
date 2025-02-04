import React from "react";
import Layout from "@theme/Layout";
import styles from "../components/projects/Project.module.scss";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Botkube",
    description:
      "Monitor and act on your Kubernetes cluster from your favorite chat platforms.",
    url: "https://botkube.io/",
    image: require(`${assetsDir}/botkube.png`),
    role: "Maintainer",
  },
  {
    title: "Capact",
    description: "A unified way to manage applications and infrastructure.",
    url: "https://capact.io",
    image: require(`${assetsDir}/capact.png`),
    role: "Maintainer",
  },
  {
    title: "Mongo Seeding",
    description: "Ultimate solution for populating MongoDB database.",
    url: "https://github.com/pkosiec/mongo-seeding",
    image: require(`${assetsDir}/mongo-seeding.png`),
    role: "Author",
  },
  {
    title: "Terminer",
    description: "Upgrade your terminal experience with a single command.",
    url: "https://github.com/pkosiec/terminer",
    image: require(`${assetsDir}/terminer.png`),
    role: "Author",
  },
  {
    title: "Gophers Silesia",
    description: "Go & Cloud Native Meetup organized in Katowice, Poland",
    url: "https://www.meetup.com/GophersSilesia",
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

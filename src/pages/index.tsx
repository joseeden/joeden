// src/pages/index.tsx
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Hero } from "../components/homepage/Hero";
import { Experiences } from "../components/homepage/Experiences";
import { Skills } from "../components/homepage/Skills";
import { LetsTalk } from "../components/homepage/LetsTalk.tsx";
import "../css/homepage.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <main className="homepage">
        <Hero />
        <Experiences />
        <Skills />
        <LetsTalk />
      </main>
    </Layout>
  );
}

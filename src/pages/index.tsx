// src/pages/index.tsx
import React from "react";
import {translate} from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import { Hero } from "../components/homepage/Hero";
import { Writings } from "../components/homepage/Writings";
import { Experiences } from "../components/homepage/Experiences";
import { Skills } from "../components/homepage/Skills";
import { LetsTalk } from "../components/homepage/LetsTalk.tsx";
import "../css/homepage.scss";

export default function Home(): JSX.Element {
  return (
    <Layout title={translate({id: "homepage.title", message: "Home"})} description={translate({id: "homepage.description", message: "Engineer by day, runner by night."})}>
      <main className="homepage">
        <Hero />
        <Writings />
        <Experiences />
        <Skills />
        <LetsTalk />
      </main>
    </Layout>
  );
}

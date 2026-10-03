// src/pages/index.tsx
import React from "react";
import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {translate} from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import { Hero } from "../components/homepage/Hero";
import { Writings } from "../components/homepage/Writings";
import { Experiences } from "../components/homepage/Experiences";
import { Skills } from "../components/homepage/Skills";
import { LetsTalk } from "../components/homepage/LetsTalk.tsx";
import "../css/homepage.scss";

export default function Home(): JSX.Element {
  const pageUrl = useBaseUrl("/", {absolute: true});
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile`,
    url: pageUrl,
    name: "Eden Jose",
    mainEntity: {
      "@type": "Person",
      "@id": "https://joseeden.com/#person",
      name: "Eden Jose",
      alternateName: "joseeden",
      url: "https://joseeden.com/",
      sameAs: [
        "https://github.com/joseeden",
        "https://linkedin.com/in/joseeden",
        "https://x.com/eden_noel08",
      ],
    },
  };
  return (
    <Layout title={translate({id: "homepage.title", message: "Home"})} description={translate({id: "homepage.description", message: "Engineer by day, runner by night."})}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(profile).replace(/</g, "\\u003c")}</script>
      </Head>
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

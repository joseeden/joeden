// src/components/homepage/Hero.tsx

import clsx from "clsx";
import React, { FunctionComponent } from "react";
import styles from "./Hero.module.scss";

// Handle scrolling to an element
const handleScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 102,   // Adjust by the navbar height (102px)
      behavior: "smooth",             // Smooth scrolling
    });
  }
};

export const Hero: FunctionComponent = () => {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      {/* <div className={clsx("container", "homepage")}> */}
      <div className={clsx("container", "homepage-wrapper")}>
        <h1 className={clsx("hero__title", styles.title)}>
          Hi, <span className={styles.highlighted}>Eden</span> here.
        </h1>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          I'm a problem solver who enjoys learning and solving challenges.
          <br />
          An engineer by day, runner by night.
        </p>
      </div>
    </header>
  );
};

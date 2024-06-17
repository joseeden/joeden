// src\components\homepage\Hero.tsx
import clsx from "clsx";
import React, { FunctionComponent } from "react";
import styles from "./Hero.module.scss";

export const Hero: FunctionComponent = () => {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
      <h1 className={clsx("hero__title", styles.title)}>
          Hi. I'm <span className={styles.highlighted}>Eden</span>.
          {/* <br />
          A Cloud and DevOps Engineer. */}
        </h1>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          I'm a problem solver who enjoys learning things and solving challenges.
          <br /> 
          An engineer by day, runner by night.
        </p>
      </div>
    </header>
  );
};

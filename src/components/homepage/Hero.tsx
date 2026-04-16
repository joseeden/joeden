// src/components/homepage/Hero.tsx

import clsx from "clsx";
import React, { FunctionComponent } from "react";
import styles from "./Hero.module.scss";

export const Hero: FunctionComponent = () => {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={clsx("container", "homepage-wrapper")}>
        <div className={styles.contentWrapper}>
          <h1 className={clsx("hero__title", styles.title)}>
            <span className={styles.name}>Jose Eden</span>
          </h1>
          
          <div className={styles.narrative}>
            <p>
              I'm interested in building things and understanding how they work. I write code, work with cloud infrastructure, and solve problems that matter. When I'm not coding, you'll find me running or reading books that take me to other worlds.
            </p>
            <p>
              I like creating tools that are simple, useful, and solve real problems. Most of my time is spent learning how systems work, writing better code, and figuring out how to make things work well together. I enjoy the process of turning ideas into working solutions.
            </p>
            <p>
              This site is where I collect some of the things I'm working on and thinking about.
            </p>
          </div>

          <div className={styles.interestsSection}>
            <h2 className={styles.interestsTitle}>INTERESTS</h2>
            <div className={styles.interestsContent}>
              <p>
                Beyond code, I spend most of my free time running long distances. It clears my head and helps me focus. I've done multiple half marathons and local runs to be in the moment and and get lost with the experience. I also have a home lab where I work with (and break stuff) with servers and electronics.
              </p>
              <p>
                I spend a lot of time reading. I'm drawn to books that explore complex ideas. I heavily enjoyed Andy Weir's <em>The Martian</em> where the protagonist's resourcefulness and problem-solving approach really resonated with me. I enjoyed Haruki Murakami's surreal views on reality and consciousness, and everything in between. Whether it's hard sci-fi, philosophy, or genre fiction, if it challenges how I think, I'm reading it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

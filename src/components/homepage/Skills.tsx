
import React from "react";
import styles from "./Skills.module.scss";

// TypeScript declaration for require.context (Webpack)
declare const require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => {
    keys: () => string[];
    <T>(id: string): T;
  };
};


// Dynamically import all image files from the icons folder
const ICON_PATH = require.context(
  "../../../assets/site-design/tools-skills/icons",
  false,
  /\.(png|jpe?g|gif|webp|avif|svg)$/i
);

const ICONS = ICON_PATH.keys().map((key: string) => key.replace(/^\.\//, ""));

export const Skills: React.FC = () => {
  return (
    <section className={styles.skillsSection} aria-label="Skills">
      <h2 className={styles.skillsTitle}>SKILLS</h2>
      <p className={styles.skillsIntro}>
        A selection of technologies, platforms, and tools I use regularly.
      </p>
      <div className={styles.skillsCarouselSection}>
        <div className={styles.skillsCarouselShell}>
          <div className={styles.skillsCarouselViewport}>
            <div className={styles.skillsCarouselTrackContinuous}>
              {[...ICONS, ...ICONS].map((icon, idx) => {
                let src = "";
                try {
                  const mod = ICON_PATH(`./${icon}`) as string | { default: string };
                  src = typeof mod === "string" ? mod : mod.default;
                } catch (e) {
                  return null;
                }
                return (
                  <div className={styles.skillsCarouselSlide} key={icon + idx}>
                    <img
                      src={src}
                      alt={icon.replace(/\..+$/, "").replace(/[-_]+/g, " ")}
                      className={styles.skillsCarouselImage}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

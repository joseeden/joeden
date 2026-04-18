
import React, { FunctionComponent, useMemo } from "react";
import styles from "./Skills.module.scss";

type SkillImage = {
  src: string;
  alt: string;
};

export const Skills: FunctionComponent = () => {
  const skillImages = useMemo<SkillImage[]>(() => {
    const imagesContext = (require as any).context(
      "../../../assets/site-design/tools-skills/icons",
      false,
      /\.[^/.]+$/i
    );

    return imagesContext
      .keys()
      .sort((first: string, second: string) =>
        first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" })
      )
      .map((imagePath: string) => {
        const source = imagesContext(imagePath) as any;
        const normalizedSource =
          typeof source === "string"
            ? source
            : typeof source?.default === "string"
              ? source.default
              : source?.default?.src || source?.src || "";

        return {
          src: normalizedSource,
          alt: imagePath
            .replace("./", "")
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " "),
        };
      })
      .filter((skillImage: SkillImage) => Boolean(skillImage.src));
  }, []);

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
              {[...skillImages, ...skillImages].map((skillImage: SkillImage, idx: number) => {
                return (
                  <div className={styles.skillsCarouselSlide} key={`${skillImage.src}-${idx}`}>
                    <img
                      src={skillImage.src}
                      alt={idx < skillImages.length ? skillImage.alt : ""}
                      className={styles.skillsCarouselImage}
                      loading="lazy"
                      aria-hidden={idx >= skillImages.length}
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

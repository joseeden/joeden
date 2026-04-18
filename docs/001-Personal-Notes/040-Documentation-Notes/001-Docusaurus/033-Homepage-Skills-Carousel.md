---
title: "Adding a Homepage Skills Carousel"
sidebar_position: 33
description: "Adding a continuous image carousel in the homepage SKILLS section"
tags:
  - Docusaurus
---


## Overview

This KB explains how to add a dynamic "Skills" (or "Tools") carousel section to the homepage, using images from a folder. The section is easy to maintain, just add or remove images in the icons folder, and the carousel updates automatically.

## Implementation 

### Prepare the Icons

The skill/tool icons (PNG, SVG, JPG, etc.) are placed in `assets/site-design/tools-skills/icons`.

Newer images can be added at any time without code changes, just drop them in the folder.

### Create the Skills Component

File: `src/components/homepage/Skills.tsx`

The `require.context` (Webpack) is used to dynamically load all images from the folder without manual imports. No hardcoded filenames, which means new images are picked up automatically.

<details>
  <summary>View code</summary>
 
  ```tsx
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
                {[...skillImages, ...skillImages].map((skillImage: SkillImage, idx: number) => (
                  <div className={styles.skillsCarouselSlide} key={`${skillImage.src}-${idx}`}>
                    <img
                      src={skillImage.src}
                      alt={idx < skillImages.length ? skillImage.alt : ""}
                      className={styles.skillsCarouselImage}
                      loading="lazy"
                      aria-hidden={idx >= skillImages.length}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  ```

</details>

### Styling

File: `src/components/homepage/Skills.module.scss`

The dedicated SCSS file contains all styles (width, carousel animation, dark mode, etc.).

Example class names: 

- `skillsSection`
- `skillsTitle`
- `skillsCarouselImage`, etc.


### Add to Homepage

File: `src/pages/index.tsx`

As a final step, import and render the `<Skills />` component in the TSX file for the homepage (e.g., after the *Experiences* section).

<details>
  <summary> View code </summary>
 
  ```tsx
  import { Skills } from "../components/homepage/Skills";

  export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
      <Layout title="Home" description={siteConfig.tagline}>
        <main className="homepage">
          <Hero />
          <Experiences />
          <Skills />
        </main>
      </Layout>
    );
  }
  ```
</details>


## Maintenance

To add a new skill/tool, just drop a new image in the icons folder, no code changes needed.

The carousel now reads any file extension with this regex:

```tsx
/\.[^/.]+$/i
```

This means you do not need to maintain a list of supported image formats.

The file order is sorted with numeric-aware sorting, so prefixed filenames like `1-`, `2-`, `10-` load in expected order.

Notes: 

- This approach is future-proof for Docusaurus/React+Webpack projects.
- For Vite or other bundlers, use their dynamic import features instead.

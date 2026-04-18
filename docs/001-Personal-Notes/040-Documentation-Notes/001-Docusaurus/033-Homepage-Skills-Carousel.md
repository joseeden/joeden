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
  import React from "react";
  import styles from "./Skills.module.scss";

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

  const ICON_PATH = require.context(
    "../../../assets/site-design/tools-skills/icons",
    false,
    /\.(png|jpe?g|gif|webp|avif|svg)$/i
  );

  const ICONS = ICON_PATH.keys().map((key: string) => key.replace(/^\.\//, ""));

  export const Skills: React.FC = () => (
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
                  src = ICON_PATH(`./${icon}`);
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

Notes: 

- This approach is future-proof for Docusaurus/React+Webpack projects.
- For Vite or other bundlers, use their dynamic import features instead.

## Supported Image Formats

The supported image formats are defined in a single array in the Skills component:

```tsx
const SUPPORTED_IMAGE_EXTENSIONS = ['png', 'jpe?g', 'gif', 'webp', 'avif', 'svg'];
```

To add a new supported format (for example, `bmp`):

- Just add it to the `SUPPORTED_IMAGE_EXTENSIONS` array in `Skills.tsx`.
- No need to update multiple places or regexes.
- The carousel and dynamic import will automatically support the new format.

Example:

```tsx
const SUPPORTED_IMAGE_EXTENSIONS = ['png', 'jpe?g', 'gif', 'webp', 'avif', 'svg', 'bmp'];
```

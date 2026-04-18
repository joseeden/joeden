---
title: "Adding a Homepage Books Carousel"
sidebar_position: 32
description: "Adding a continuous image carousel in the homepage INTERESTS section"
tags:
  - Docusaurus
---

## Overview

This page documents how to add a books image carousel under the INTERESTS section on the homepage.

This implementation covers:

- Load all images from one folder
- Support mixed image formats (jpg, jpeg, png, gif, webp, avif)
- Run as a continuous carousel from right to left
- Loop seamlessly from last image back to first
- Keep implementation simple and easy to tune


Files used:

- `assets/site-design/books` - source images
- `src/components/homepage/Hero.tsx` - carousel markup and image loading logic
- `src/components/homepage/Hero.module.scss` - carousel styles and animation


## Implementation

### 1. Adding the Images

All the book images are placed in the same folder:

- `assets/site-design/books`

For my setup, the images are in different formats (for example: `.jpg`, `.jpeg`, `.png`).


### 2. Loading Images Dynamically in Hero Component

In `Hero.tsx`, a context loader is used so new images are automatically included without manual imports.

Key logic:

- `require.context(...)` to load all supported extensions
- Sort keys for stable display order
- Normalize output so `img src` is always a string
- Build a readable `alt` from file names
- Filter out invalid sources

**Why normalize:**

Docusaurus/webpack image imports can have different shapes (`string`, `default`, or nested `src`).
Normalization prevents broken image rendering.

<details>
  <summary> View Code</summary>

  ```tsx
  type BookImage = {
    src: string;
    alt: string;
  };

  const bookImages = useMemo<BookImage[]>(() => {
    const imagesContext = (require as any).context(
      "../../../assets/site-design/books",
      false,
      /\.(png|jpe?g|gif|webp|avif)$/i
    );

    return imagesContext.keys().sort().map((imagePath: string) => {
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
    }).filter((bookImage: BookImage) => Boolean(bookImage.src));
  }, []);
  ```

</details>


### 3. Rendering a Continuous Loop

In `Hero.tsx`, the track duplicates the image array:

- First half: real set of images
- Second half: duplicate set for seamless looping

Pattern:

- Render `[...bookImages, ...bookImages]`
- Animate the whole track from `translateX(0)` to `translateX(-50%)`

This creates a continuous one-direction loop (right to left) where the first image appears naturally after the last.

<details>
  <summary> View Code</summary>
    
  ```tsx
  {bookImages.length > 0 && (
      <div className={styles.booksCarouselSection}>
          <p className={styles.booksCarouselTitle}>Books in my collection</p>
          <div className={styles.carouselShell}>
              <div className={styles.carouselViewport}>
                  <div className={styles.carouselTrackContinuous}>
                      {[...bookImages, ...bookImages].map((bookImage: BookImage, index: number) => (
                          <div className={styles.carouselSlide} key={`${bookImage.src}-${index}`}>
                              <img
                                  src={bookImage.src}
                                  alt={index < bookImages.length ? bookImage.alt : ""}
                                  className={styles.bookCarouselImage}
                                  loading="lazy"
                                  aria-hidden={index >= bookImages.length}
                              />
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  )}
  ```

</details>


### 4. Styling the Carousel

In `Hero.module.scss`:

| Class                      | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `.carouselViewport`        | Handles clipping and rounded container edges                   |
| `.carouselTrackContinuous` | Uses `display: flex` and animation                             |
| `.carouselSlide`           | Uses content-based width (`auto`) so each slide fits the image |
| `.bookCarouselImage`       | Uses fixed height + `object-fit: contain` to avoid cropping    |

Current behavior choices:

- Border/background can be transparent (clean blend with page)
- Images have rounded corners
- Horizontal spacing is controlled by `padding-right` on `.carouselSlide`


For mobile screens, media queries are used to override styles:

- Reduce image height
- Reduce spacing between slides

This keeps motion smooth and prevents visual crowding on phones.

Mobile override example:

<details>
  <summary> Mobile override example </summary>

```scss
@media (max-width: 425px) {
    .bookCarouselImage {
        height: 150px;
    }

    .carouselSlide {
        padding-right: 0.3rem;
    }
}
```

</details>


## Quick Tuning Guide

Use these style values to tune appearance:

| Aspect         | Where to Adjust                                              |
| -------------- | ------------------------------------------------------------ |
| Carousel speed | `.carouselTrackContinuous { animation: ... }`                |
| Image height   | `.bookCarouselImage { height: ... }`                         |
| Image spacing  | `.carouselSlide { padding-right: ... }`                      |
| Roundness      | `.carouselViewport` and `.bookCarouselImage` `border-radius` |


## Common Issues

1. Images look zoomed/cropped:

    - Use `object-fit: contain` (not `cover`)

2. Slides feel too far apart:

    - Reduce `.carouselSlide` right padding
    - Keep slide width content-based (`auto`)

3. Loop jump looks noticeable:

    - Ensure duplicated list is used
    - Keep animation end at exactly `translateX(-50%)`


**Notes:**

- The carousel title text is regular paragraph text, not a heading element.
- If title copy is updated, change it in `Hero.tsx` under the books carousel section.

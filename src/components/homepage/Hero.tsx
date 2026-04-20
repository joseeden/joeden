// src/components/homepage/Hero.tsx

import clsx from "clsx";
import React, { FunctionComponent, useMemo } from "react";
import styles from "./Hero.module.scss";

type BookImage = {
  src: string;
  alt: string;
};

export const Hero: FunctionComponent = () => {
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

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={clsx("container", "homepage-wrapper")}>
        <div className={styles.contentWrapper}>
          <h1 className={clsx("hero__title", styles.title)}>
            Jose Eden
          </h1>
          
          <div className={styles.narrative}>
            <p>
              I'm interested in building things and solving problems. I write code, work with cloud-native environments, and build systems that are reliable, scalable, and built to handle real-world use. When I'm not coding, you'll find me running or reading books that take me to other worlds.
            </p>
            <p>
              A big part of my work is around automation, integration, and building tools that glue different things together. I often work with APIs, infrastructure, and open-source tools to reduce manual effort and make things work more seamlessly in production. I work on connecting different pieces and turning ideas into practical solutions.
            </p>
            <p>
              This space is where I collect and share the things I’ve worked on and am currently working on, along with the ideas and thoughts that come with them.
            </p>
          </div>

          <div className={styles.interestsSection}>
            <h2 className={styles.interestsTitle}>INTERESTS</h2>
            <div className={styles.interestsContent}>
              <p>
                Outside of code, I spend most of my free time running long distances. It helps me clear my head and stay focused. I’ve done multiple half marathons and local running events, where I can just stay in the moment and get lost in the experience. I also run a small home lab where I experiment with servers, networking, and electronics.
              </p>
              <p>
                I read a lot, especially books that explore complex ideas. I like Andy Weir's <em>The Martian</em> where the protagonist's resourcefulness and problem-solving approach really resonated with me. I love Haruki Murakami's surreal views on reality and consciousness, and everything in between. 
              </p>
              <p>
                Whether it's hard sci-fi, philosophy, or non-fiction, if it challenges how I think, I'm reading it.
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </header>
  );
};

// src/components/about/About.tsx

import React from 'react';
import styles from './About.module.scss'; // Import styles

const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.imageColumn}>
              <img src="img/about/me-2.jpg" alt="Eden Jose" />
            </div>
            <div className={styles.textColumn}>
              <h2 className={styles.title}>
                I'm Eden, a DevOps Engineer currently based in the sunny island of Singapore.
              </h2>
              <p className={styles.subtitle}>
                I have an extensive experience across various IT domains such as networking, automation, cloud, and DevOps. I am passionate about exploring and implementing cloud-native solutions, and securing the end-to-end process of my projects.
              </p>
              <p className={styles.subtitle}>
                Outside of work, I find joy in running long-distance, often participating in marathons. I also love immersing myself in great books. 
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.timeline}>
        <h1 className={styles.sectionHeader}>Experiences</h1>
        <div className={styles.underline}></div>
        <div className="container">
          <div className={styles.verticalTimeline}>
            {/* Your timeline elements */}
          </div>
        </div>
      </section>

      <section className={styles.currentlyReading}>
        <h1 className={styles.sectionHeader}>Favorite Reads</h1>
        <div className={styles.underline}></div>
        <div className="container">
          <div className="row">
            {/* Your currently reading books */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

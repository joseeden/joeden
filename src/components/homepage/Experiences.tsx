import {translate} from "@docusaurus/Translate";
import React, { FunctionComponent } from "react";
import styles from "./Experiences.module.scss";

declare const require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => ((id: string) => string | { default: string }) & { keys: () => string[] };
};

type ExperienceItem = {
  year: string;
  role: string;
  description: string;
};

const EXPERIENCES: ExperienceItem[] = [
  {
    year: "2023 — 2025",
    role: translate({id: "homepage.experience.0.role", message: "Senior DevOps Engineer at ST Engineering"}),
    description: translate({id: "homepage.experience.0.description", message: "Led cloud infrastructure automation and large-scale system delivery across enterprise projects. Executed cloud migrations, implemented observability and SIEM platforms, and improved reliability through CI/CD, testing, and DevSecOps practices."}),
  },
  {
    year: "2022 — 2023",
    role: translate({id: "homepage.experience.1.role", message: "DevOps Consultant at QRinno"}),
    description: translate({id: "homepage.experience.1.description", message: "Managed Kubernetes-based platforms and built real-time data pipelines for IoT systems. Integrated distributed tools across cloud environments and established CI/CD workflows to support scalable, data-driven applications."}),
  },
  {
    year: "2021 — 2022",
    role: translate({id: "homepage.experience.2.role", message: "IT Specialist at DSV Panalpina"}),
    description: translate({id: "homepage.experience.2.description", message: "Built and optimized data pipelines and platforms supporting SaaS applications. Improved performance through data modeling and enabled visibility with dashboards and centralized tooling."}),
  },
  {
    year: "2020 — 2021",
    role: translate({id: "homepage.experience.3.role", message: "NMS (Tooling & Automation) Engineer at ATOS"}),
    description: translate({id: "homepage.experience.3.description", message: "Developed monitoring and logging solutions for large-scale network environments. Delivered observability systems and automation for alerting, metrics, and infrastructure visibility."}),
  },
  {
    year: "2019 — 2020",
    role: translate({id: "homepage.experience.4.role", message: "Network Engineer at IOPEX Technologies"}),
    description: translate({id: "homepage.experience.4.description", message: "Handled network infrastructure deployment and troubleshooting, working with vendors and ISPs to resolve connectivity and circuit issues across enterprise environments."}),
  },
  {
    year: "2018 — 2019",
    role: translate({id: "homepage.experience.5.role", message: "Associate Technical Engineer at Finastra"}),
    description: translate({id: "homepage.experience.5.description", message: "Supported banking platforms by diagnosing production issues, performing root cause analysis, and maintaining backend systems for global financial clients."}),
  },
  {
    year: "2017 — 2018",
    role: translate({id: "homepage.experience.6.role", message: "Engineer I at Eastern Communications"}),
    description: translate({id: "homepage.experience.6.description", message: "Provided infrastructure support and incident resolution, ensuring network reliability through monitoring and end-to-end fault handling."}),
  },
];

const getResumePdfUrl = (): string | null => {
  const pdfContext = require.context("../../../assets/site-design/resume", false, /\.pdf$/);
  const pdfKeys = pdfContext.keys().sort((first, second) => first.localeCompare(second));

  if (pdfKeys.length === 0) {
    return null;
  }

  const moduleValue = pdfContext(pdfKeys[0]);
  return typeof moduleValue === "string" ? moduleValue : moduleValue.default;
};

const resumePdfUrl = getResumePdfUrl();
const RESUME_DOWNLOAD_FILENAME = "Jose Eden.pdf";

export const Experiences: FunctionComponent = () => {
  return (
    <section className={styles.experiencesSection} aria-label={translate({id: "homepage.experience.label", message: "Experiences"})}>
      <h2 className={styles.experiencesTitle}>{translate({id: "homepage.experience.title", message: "EXPERIENCES"})}</h2>
      <p className={styles.experiencesIntro}>
        {translate({id: "homepage.experience.intro", message: "DevOps engineer specialized in cloud infrastructure, automation, and resilient systems across large-scale production environments."})}
      </p>

      <div className={styles.experiencesTable}>
        {EXPERIENCES.map((item) => (
          <div className={styles.experienceRow} key={`${item.year}-${item.role}`}>
            <span className={styles.experienceYear}>{item.year}</span>
            <div className={styles.experienceDetails}>
              <p className={styles.experienceRole}>{item.role}</p>
              <p className={styles.experienceDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {resumePdfUrl && (
        <div className={styles.resumeCta}>
          <a
            href={resumePdfUrl}
            className={styles.resumeButton}
            download={RESUME_DOWNLOAD_FILENAME}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={styles.resumeIcon}
            >
              <path d="M12 15V3" />
              <path d="M7 10l5 5l5-5" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            </svg>
            {translate({id: "homepage.experience.download", message: "Download full resume"})}
          </a>
        </div>
      )}
    </section>
  );
};

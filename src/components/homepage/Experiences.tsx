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
    role: "Senior DevOps Engineer at ST Engineering",
    description:
      "Led cloud infrastructure automation and large-scale system delivery across enterprise projects. Executed cloud migrations, implemented observability and SIEM platforms, and improved reliability through CI/CD, testing, and DevSecOps practices.",
  },
  {
    year: "2022 — 2023",
    role: "DevOps Consultant at QRinno",
    description:
      "Managed Kubernetes-based platforms and built real-time data pipelines for IoT systems. Integrated distributed tools across cloud environments and established CI/CD workflows to support scalable, data-driven applications.",
  },
  {
    year: "2021 — 2022",
    role: "IT Specialist at DSV Panalpina",
    description:
      "Built and optimized data pipelines and platforms supporting SaaS applications. Improved performance through data modeling and enabled visibility with dashboards and centralized tooling.",
  },
  {
    year: "2020 — 2021",
    role: "NMS (Tooling & Automation) Engineer at ATOS",
    description:
      "Developed monitoring and logging solutions for large-scale network environments. Delivered observability systems and automation for alerting, metrics, and infrastructure visibility.",
  },
  {
    year: "2019 — 2020",
    role: "Network Engineer at IOPEX Technologies",
    description:
      "Handled network infrastructure deployment and troubleshooting, working with vendors and ISPs to resolve connectivity and circuit issues across enterprise environments.",
  },
  {
    year: "2018 — 2019",
    role: "Associate Technical Engineer at Finastra",
    description:
      "Supported banking platforms by diagnosing production issues, performing root cause analysis, and maintaining backend systems for global financial clients.",
  },
  {
    year: "2017 — 2018",
    role: "Engineer I at Eastern Communications",
    description:
      "Provided infrastructure support and incident resolution, ensuring network reliability through monitoring and end-to-end fault handling.",
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
    <section className={styles.experiencesSection} aria-label="Experiences">
      <h2 className={styles.experiencesTitle}>EXPERIENCES</h2>
      <p className={styles.experiencesIntro}>
        DevOps engineer specialized in cloud infrastructure, automation, and resilient systems across large-scale production environments.
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
            Download full resume
          </a>
        </div>
      )}
    </section>
  );
};

// src/theme/DocPage.tsx
import React from "react";
import DocPage from "@theme-original/DocPage";
import styles from "../components/documentation/Documentation.module.scss"

export default function CustomDocPage(props) {
  return (
    <div className={styles.documentation}>
      <DocPage {...props} />
    </div>
  );
}

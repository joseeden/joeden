import clsx from "clsx";
import React, { FunctionComponent } from "react";
import Image from "@theme/IdealImage";

import DiscoverIcon from "./icon-discover.svg";
import styles from "./Project.module.scss";

export interface ProjectData {
  title: string;
  description: string;
  // role?: string;
  url: string;
  image: string;
}

export const Project: FunctionComponent<ProjectData> = ({
  title,
  description,
  url,
  // role,
  image,
}) => {
  return (
    <div className={clsx("col col--6", styles.cardContainer)}>
      <div className={clsx("card", styles.card)}>
        <div className={clsx("card__image", styles.image)}>
          <Image img={image} alt={description} title={title} />
          {/* {role && (
            <span className={clsx("badge badge--secondary", styles.role)}>
              {role}
            </span>
          )} */}
        </div>
        <div className={clsx("card__body", styles.card__body)}></div>
        {/* <div className="card__body"> */}
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="card__footer" style={{ textAlign: "center" }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--outline"
          >
            <span className="button__icon">
              <DiscoverIcon />
            </span>
            See Project
          </a>
        </div>
      </div>
    </div>
  );
};

import clsx from "clsx";
import React, {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "@theme/IdealImage";

import DiscoverIcon from "./icon-discover.svg";
import styles from "./Project.module.scss";

export interface ProjectData {
  title: string;
  description: string;
  // role?: string;
  url: string;
  image: string;
  tags?: string[];  
}

const TOUCH_CARD_MEDIA_QUERY = "(hover: none), (pointer: coarse)";
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [role="link"]';

export const Project: FunctionComponent<ProjectData> = ({
  title,
  description,
  url,
  // role,
  image,
  tags,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [usesTapToggle, setUsesTapToggle] = useState(false);
  const [isLifted, setIsLifted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(TOUCH_CARD_MEDIA_QUERY);
    const updateInteractionMode = (event?: MediaQueryListEvent) => {
      setUsesTapToggle(event?.matches ?? mediaQuery.matches);
    };

    updateInteractionMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateInteractionMode);

      return () => {
        mediaQuery.removeEventListener("change", updateInteractionMode);
      };
    }

    mediaQuery.addListener(updateInteractionMode);

    return () => {
      mediaQuery.removeListener(updateInteractionMode);
    };
  }, []);

  useEffect(() => {
    if (!usesTapToggle) {
      setIsLifted(false);
    }
  }, [usesTapToggle]);

  useEffect(() => {
    if (!usesTapToggle || !isLifted) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) {
        setIsLifted(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isLifted, usesTapToggle]);

  const shouldIgnoreToggle = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest(INTERACTIVE_SELECTOR));
  };

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!usesTapToggle || shouldIgnoreToggle(event.target)) {
      return;
    }

    setIsLifted((previousState) => !previousState);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      !usesTapToggle ||
      shouldIgnoreToggle(event.target) ||
      (event.key !== "Enter" && event.key !== " ")
    ) {
      return;
    }

    event.preventDefault();
    setIsLifted((previousState) => !previousState);
  };

  return (
    <div className={clsx("col col--6", styles.cardContainer)}>
      <div
        ref={cardRef}
        className={clsx("card", styles.card, {
          [styles.cardLifted]: isLifted,
        })}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role={usesTapToggle ? "button" : undefined}
        tabIndex={usesTapToggle ? 0 : undefined}
        aria-pressed={usesTapToggle ? isLifted : undefined}
      >
        <div className={clsx("card__image", styles.image)}>
          <Image img={image} alt={description} title={title} />
        </div>
        <div className={styles.cardContentContainer}>
          <div className={clsx("card__body", styles.card__body)}>
            <h2>{title}</h2>
            <p>{description}</p>
            {tags && tags.length > 0 && (
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className={clsx("card__footer", styles.card__footer)}>
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
    </div>
  );
};

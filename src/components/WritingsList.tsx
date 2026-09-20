import React from 'react';
import Link from '@docusaurus/Link';
import styles from '../theme/BlogListPage/bloglistpage.module.css';

export type Writing = {
  title?: string;
  permalink?: string;
  date?: string;
  readingTime?: number;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function formatDate(date: string | undefined): string {
  if (!date) {
    return '';
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return dateFormatter.format(parsed);
}

function formatReadingTime(minutes: number | undefined): string {
  if (typeof minutes !== 'number' || Number.isNaN(minutes)) {
    return '';
  }

  const roundedMinutes = Math.max(1, Math.round(minutes));
  return `${roundedMinutes} min read`;
}

export default function WritingsList({posts, linkTo, titleAs: Title = 'h2'}: {
  posts: Writing[];
  linkTo?: string;
  titleAs?: 'h2' | 'h3';
}): JSX.Element {
  return (
    <ul className={styles.list}>
      {posts.map((post) => {
        const title = post?.title ?? 'Untitled';
        const permalink = post?.permalink ?? '#';
        const formattedDate = formatDate(post?.date);
        const readingTime = formatReadingTime(post?.readingTime);

        return (
          <li key={permalink} className={styles.listItem}>
            <Link to={linkTo ?? permalink} className={styles.postLink}>
              <div className={styles.postMain}>
                <time className={styles.date} dateTime={post?.date ?? undefined}>
                  {formattedDate}
                </time>
                <Title className={styles.title}>{title}</Title>
              </div>
              <p className={styles.readingTime}>{readingTime}</p>
            </Link>
          </li>
        );
            })}
          </ul>
  );
}

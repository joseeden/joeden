import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './bloglistpage.module.css';

type BlogListItem = {
  content?: {
    metadata?: {
      title?: string;
      permalink?: string;
      date?: string;
      readingTime?: number;
    };
  };
};

type BlogListPageProps = {
  metadata?: {
    blogTitle?: string;
    blogDescription?: string;
  };
  items?: BlogListItem[];
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

function sortByDateDesc(items: BlogListItem[]): BlogListItem[] {
  return [...items].sort((a, b) => {
    const aDate = a.content?.metadata?.date ? new Date(a.content.metadata.date).getTime() : 0;
    const bDate = b.content?.metadata?.date ? new Date(b.content.metadata.date).getTime() : 0;
    return bDate - aDate;
  });
}

export default function BlogListPage({ metadata, items = [] }: BlogListPageProps): JSX.Element {
  const sortedItems = sortByDateDesc(items);

  return (
    <Layout title={metadata?.blogTitle ?? 'Writings'} description={metadata?.blogDescription}>
      <main className={styles.page}>
        <section className={styles.wrapper} aria-label="Writings list">
          <ul className={styles.list}>
            {sortedItems.map((item) => {
              const post = item.content?.metadata;
              const title = post?.title ?? 'Untitled';
              const permalink = post?.permalink ?? '#';
              const formattedDate = formatDate(post?.date);
              const readingTime = formatReadingTime(post?.readingTime);

              return (
                <li key={permalink} className={styles.listItem}>
                  <Link to={permalink} className={styles.postLink}>
                    <div className={styles.postMain}>
                      <time className={styles.date} dateTime={post?.date ?? undefined}>
                        {formattedDate}
                      </time>
                      <h2 className={styles.title}>{title}</h2>
                    </div>
                    <p className={styles.readingTime}>{readingTime}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

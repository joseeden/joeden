import React from 'react';
import WritingsList from '../../components/WritingsList';
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
          <h1 className={styles.header}>Writings</h1>
          <WritingsList posts={sortedItems.map((item) => item.content?.metadata ?? {})} />
        </section>
      </main>
    </Layout>
  );
}

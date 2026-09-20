import React, {useState} from 'react';
import CategoryFilters from '../../components/CategoryFilters';
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
      tags?: {label: string; permalink?: string}[];
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

const categories = [
  {id: 'my-life', label: 'My Life', tags: ['personal', 'sketches', 'arts', 'runs']},
  {id: 'book-reviews', label: 'Book Reviews', tags: ['books']},
  {id: 'arts', label: 'Arts', tags: ['arts', 'sketches']},
  {id: 'devnotes', label: 'DevNotes', tags: ['devnotes', '100daysofcode']},
];

function sortByDateDesc(items: BlogListItem[]): BlogListItem[] {
  return [...items].sort((a, b) => {
    const aDate = a.content?.metadata?.date ? new Date(a.content.metadata.date).getTime() : 0;
    const bDate = b.content?.metadata?.date ? new Date(b.content.metadata.date).getTime() : 0;
    return bDate - aDate;
  });
}

export default function BlogListPage({ metadata, items = [] }: BlogListPageProps): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const selectedTags = new Set(categories
    .filter(({id}) => selectedCategories.includes(id))
    .flatMap(({tags}) => tags));
  const sortedItems = sortByDateDesc(items).filter((item) =>
    selectedCategories.length === 0 || item.content?.metadata?.tags?.some(
      ({label, permalink}) => {
        // Display labels are translated, but tag permalink names stay stable.
        const tagName = permalink?.split('/').filter(Boolean).pop();
        return selectedTags.has((tagName ?? label).toLowerCase());
      },
    ),
  );

  const toggleCategory = (id: string) => {
    setSelectedCategories((selected) => selected.includes(id)
      ? []
      : [id]);
  };

  return (
    <Layout title={metadata?.blogTitle ?? 'Writings'} description={metadata?.blogDescription}>
      <main className={styles.page}>
        <section className={styles.wrapper} aria-label="Writings list">
          <h1 className={styles.header}>Writings</h1>
          <div className={styles.filters}>
            <CategoryFilters
              categories={categories}
              selected={selectedCategories}
              onToggle={toggleCategory}
              onClear={() => setSelectedCategories([])}
              idPrefix="writings"
            />
          </div>
          {sortedItems.length > 0
            ? <WritingsList posts={sortedItems.map((item) => item.content?.metadata ?? {})} />
            : <p role="status">No writings match the selected categories.</p>}
        </section>
      </main>
    </Layout>
  );
}

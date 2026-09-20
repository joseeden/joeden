import React, {useState} from 'react';
import {translate} from '@docusaurus/Translate';
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

const getCategories = () => [
  {id: 'my-life', label: translate({id: 'writings.category.myLife', message: 'My Life'}), tags: ['personal', 'sketches', 'arts', 'runs']},
  {id: 'book-reviews', label: translate({id: 'writings.category.books', message: 'Book Reviews'}), tags: ['books']},
  {id: 'arts', label: translate({id: 'writings.category.arts', message: 'Arts'}), tags: ['arts', 'sketches']},
  {id: 'devnotes', label: translate({id: 'writings.category.devnotes', message: 'DevNotes'}), tags: ['devnotes', '100daysofcode']},
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
  const categories = getCategories();
  const title = translate({id: 'writings.title', message: 'Writings'});
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
    <Layout title={title} description={metadata?.blogDescription}>
      <main className={styles.page}>
        <section className={styles.wrapper} aria-label={translate({id: 'writings.list', message: 'Writings list'})}>
          <h1 className={styles.header}>{title}</h1>
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
            : <p role="status">{translate({id: 'writings.empty', message: 'No writings match the selected categories.'})}</p>}
        </section>
      </main>
    </Layout>
  );
}

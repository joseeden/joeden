import React from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './CategoryFilters.module.scss';

type Category = {id: string; label: string};

export default function CategoryFilters({categories, selected, onToggle, onClear, idPrefix}: {
  categories: Category[];
  selected: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
  idPrefix: string;
}): JSX.Element {
  return (
    <div className={styles.sidebarContainer} role="group" aria-label={translate({id: 'categoryFilters.label', message: 'Categories'})}>
      <div className={styles.categoriesList}>
        {categories.map(({id, label}) => (
          <div key={id} className={styles.categoryItem}>
            <input
              type="checkbox"
              id={`${idPrefix}-${encodeURIComponent(id)}`}
              className={styles.categoryToggle}
              checked={selected.includes(id)}
              onChange={() => onToggle(id)}
            />
            <label htmlFor={`${idPrefix}-${encodeURIComponent(id)}`} className={styles.categoryLabel}>
              {label}
            </label>
          </div>
        ))}
      </div>
      <button type="button" className={styles.clearAllButton} onClick={onClear}>
        {translate({id: 'categoryFilters.clear', message: 'Clear All'})}
      </button>
    </div>
  );
}

import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import WritingsList, {type Writing} from '../WritingsList';
import styles from './Writings.module.scss';

export function Writings(): JSX.Element | null {
  const {posts} = usePluginData('homepage-writings') as {posts: Writing[]};
  if (!posts.length) return null;

  return (
    <section className={styles.section} aria-labelledby="homepage-writings-title">
      <h2 id="homepage-writings-title" className={styles.heading}>
        {translate({id: 'homepage.writings.title', message: 'Writings'})}
      </h2>
      <WritingsList posts={posts} linkTo="/writings" titleAs="h3" />
      <Link to="/writings" className={styles.allWritings}>
        {translate({id: 'homepage.writings.all', message: 'All writings'})}{' '}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

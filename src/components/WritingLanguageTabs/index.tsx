import React, {type ReactNode} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

type Props = {
  english: ReactNode;
  spanish: ReactNode;
  defaultLanguage?: 'en' | 'es';
};

export default function WritingLanguageTabs({
  english,
  spanish,
  defaultLanguage = 'es',
}: Props) {
  return (
    <Tabs defaultValue={defaultLanguage} className={styles.languages}>
      <TabItem value="en" label="English" attributes={{lang: 'en'}}>
        <div lang="en">{english}</div>
      </TabItem>
      <TabItem value="es" label="Español" attributes={{lang: 'es'}}>
        <div lang="es">{spanish}</div>
      </TabItem>
    </Tabs>
  );
}

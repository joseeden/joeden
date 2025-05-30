import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
// import { useDoc } from '@docusaurus/theme-common/internal';
import {useDoc} from '@docusaurus/plugin-content-docs/client';     /* Reference: https://github.com/facebook/docusaurus/issues/10404 */
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from '../../../css/styles.module.css';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
import DocItemInfo from './DocItemInfo';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  const { colorMode } = useColorMode();

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>
              <DocItemInfo />
              {children}
            </DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
        <br></br>
        <Giscus
          id="comments"
          repo="joseeden/joeden"
          repoId="R_kgDOMKoS2w"
          category="Comments"
          categoryId="DIC_kwDOMKoS284Cmto9"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={colorMode}
          lang="en"
          loading="lazy"
        />
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
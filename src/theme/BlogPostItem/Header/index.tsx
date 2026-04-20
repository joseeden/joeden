import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import './blogpostitem.module.css';

export default function BlogPostItemHeader(): ReactNode {
  const {isBlogPostPage} = useBlogPost();
  const writingsHref = useBaseUrl('/writings');

  return (
    <header>
      {isBlogPostPage ? (
        <Link className="blog-post-back-link" to={writingsHref} aria-label="Back to writings">
          <span className="blog-post-back-icon" aria-hidden="true">
            ↖
          </span>
          <span>Back to writings</span>
        </Link>
      ) : null}
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {!isBlogPostPage ? <BlogPostItemHeaderAuthors /> : null}
    </header>
  );
}
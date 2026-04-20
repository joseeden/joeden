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
        <Link className="blog-post-back-link" to={writingsHref} aria-label="Back to Writings">
          <svg
            className="blog-post-back-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <line x1="17" y1="17" x2="7" y2="7" />
            <polyline points="7 17 7 7 17 7" />
          </svg>
          <span>Back to Writings</span>
        </Link>
      ) : null}
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {!isBlogPostPage ? <BlogPostItemHeaderAuthors /> : null}
    </header>
  );
}
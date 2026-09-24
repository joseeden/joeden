import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import './blogpostitem.module.css';

export default function BlogPostItemHeader(): ReactNode {
  const {isBlogPostPage} = useBlogPost();
  const writingsHref = useBaseUrl('/writings');
  const backToWritingsLabel = translate({
    id: 'writings.backToWritings',
    message: 'Back to Writings',
    description: 'Link above a blog post title that returns to the writings list',
  });

  return (
    <header>
      {isBlogPostPage ? (
        <Link className="blog-post-back-link" to={writingsHref} aria-label={backToWritingsLabel}>
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
          <span>{backToWritingsLabel}</span>
        </Link>
      ) : null}
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {!isBlogPostPage ? <BlogPostItemHeaderAuthors /> : null}
    </header>
  );
}

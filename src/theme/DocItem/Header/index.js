import React from 'react';
import Header from '@theme-original/DocItem/Header';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import {useDoc} from '@docusaurus/theme-common';
import TagsListInline from '@theme/TagsListInline';

export default function HeaderWrapper(props) {
  let tags = [];
  
  try {
    const doc = useDoc();
    tags = doc.metadata.tags || [];
  } catch {
    // Fallback for blog posts or other content types
    try {
      const blogPost = useBlogPost();
      tags = blogPost.metadata.tags || [];
    } catch {
      // No tags available
    }
  }
  
  return (
    <>
      <Header {...props} />
      {tags.length > 0 && (
        <div className="custom-tags-header" style={{
          marginTop: '0.5rem',
          marginBottom: '1rem'
        }}>
          <TagsListInline tags={tags} />
        </div>
      )}
    </>
  );
}
import React from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/theme-common/internal';
import TagsListInline from '@theme/TagsListInline';

export default function ContentWrapper(props) {
  const {metadata} = useDoc();
  const {tags} = metadata;
  
  return (
    <>
      <Content {...props} />
      {tags.length > 0 && (
        <div className="custom-tags-top" style={{
          marginBottom: '1rem',
          display: window.innerWidth >= 768 ? 'block' : 'none'
        }}>
          <TagsListInline tags={tags} />
        </div>
      )}
    </>
  );
}
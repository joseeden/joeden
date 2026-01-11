import React from 'react';
import Header from '@theme-original/DocItem/Header';
import {useDoc} from '@docusaurus/theme-common/internal';
import TagsListInline from '@theme/TagsListInline';

export default function HeaderWrapper(props) {
  const {metadata} = useDoc();
  const {tags} = metadata;
  
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
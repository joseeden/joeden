import React from 'react';
import Header from '@theme-original/DocItem/Header';
import {useDoc} from '@docusaurus/theme-common';
import TagsListInline from '@theme/TagsListInline';

export default function HeaderWrapper(props) {
  const {metadata} = useDoc();
  const tags = metadata?.tags || [];
  
  return (
    <>
      <Header {...props} />
      {tags.length > 0 && (
        <div className="custom-tags-header">
          <TagsListInline tags={tags} />
        </div>
      )}
    </>
  );
}
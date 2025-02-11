import React from 'react';
import ReadingTime from '../../../components/documentation/ReadingTime';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

function DocItemInfo() {
  const { metadata } = useDoc();
  const lastUpdated = metadata.lastUpdatedAt ? new Date(metadata.lastUpdatedAt) : null;null;

  return (
    <div className="flex justify-between">
      <ReadingTime lastUpdated={lastUpdated} />
    </div>
  );
}

export default DocItemInfo;

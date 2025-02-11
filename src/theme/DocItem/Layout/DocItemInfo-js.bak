import React from 'react';
import ReadingTime from '../../../components/documentation/ReadingTime';
// import ShareButton from '../ShareButton';
// import { useDoc } from '@docusaurus/theme-common/internal';
import {useDoc} from '@docusaurus/plugin-content-docs/client';     /* Reference: https://github.com/facebook/docusaurus/issues/10404 */

function DocItemInfo() {
  const { metadata } = useDoc();
  return (
    <div className="flex justify-between">
      <ReadingTime />
      {/* <ShareButton title={metadata.title} /> */}
    </div>
  );
}

export default DocItemInfo;
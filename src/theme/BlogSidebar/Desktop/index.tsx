import React from 'react';
import BlogSidebarDesktop from '@theme-original/BlogSidebar/Desktop';
import type {Props} from '@theme/BlogSidebar/Desktop';

export default function WritingsSidebarDesktop({sidebar}: Props): JSX.Element {
  // Preserve the original desktop list while mobile receives the complete list.
  return <BlogSidebarDesktop sidebar={{...sidebar, items: sidebar.items.slice(0, 5)}} />;
}

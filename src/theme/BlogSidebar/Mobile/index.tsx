import React, {memo} from 'react';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import {NavbarSecondaryMenuFiller} from '@docusaurus/theme-common';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import type {Props} from '@theme/BlogSidebar/Mobile';
import type {Props as ContentProps} from '@theme/BlogSidebar/Content';
import styles from './styles.module.css';

const ListComponent: ContentProps['ListComponent'] = ({items}) => (
  <BlogSidebarItemList
    items={items}
    ulClassName="menu__list"
    liClassName="menu__list-item"
    linkClassName={`menu__link ${styles.articleLink}`}
    linkActiveClassName="menu__link--active"
  />
);

function WritingsMobileMenu({sidebar}: Props): JSX.Element {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  return (
    <BlogSidebarContent
      items={items}
      ListComponent={ListComponent}
      yearGroupHeadingClassName={styles.yearGroupHeading}
    />
  );
}

function WritingsSidebarMobile(props: Props): JSX.Element {
  return <NavbarSecondaryMenuFiller component={WritingsMobileMenu} props={props} />;
}

export default memo(WritingsSidebarMobile);

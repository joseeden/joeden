---
title: "Writings Landing Page Customization"
sidebar_position: 41
description: "Replace default Writings index with a minimalist chronological list showing date, title, and reading time"
tags:
  - Docusaurus
---

## Overview

This KB documents the implementation of the custom Writings landing page (`/writings`).

The goal was to replace the default Docusaurus blog index experience with a minimalist list that is easier to scan.

The customized page now emphasizes only core post metadata:

- Date
- Blog title
- Reading time


## Before and After

### Before

The Writings navbar item routed to the default Docusaurus blog landing page.

Behavior before customization:

- Default blog list/index rendering from Docusaurus
- Standard blog landing structure and styling
- Not optimized for the requested minimalist row layout
- No enforced fixed title alignment when date length varied


### After

The Writings landing page is now a custom `BlogListPage` theme override.

Behavior after customization:

- Custom page heading: `Writings`
- Posts sorted in chronological order (newest to oldest)
- Every row shows:
  - Date in `Mon D, YYYY` format with 3-letter month
  - Title
  - Reading time (`N min read`)
- Desktop layout:
  - Date and title on the left section
  - Reading time right-aligned
  - Title starts at a consistent x-position due to fixed date column width
- Mobile layout (`<= 639px`):
  - First row: title (left), reading time (right)
  - Second row: date
- Dark mode heading color:
  - `#81e6d9`


## Implementation

### Files Added

- `src/theme/BlogListPage/index.tsx`
- `src/theme/BlogListPage/bloglistpage.module.css`


### 1. Theme Override for Writings Landing Page

A Docusaurus theme override was added at:

- `src/theme/BlogListPage/index.tsx`

This replaces the default blog list page rendering for `/writings`.


### 2. Data Rendering Logic

The page reads Docusaurus blog list items from `items` and uses each item's `content.metadata`:

- `title`
- `permalink`
- `date`
- `readingTime`


### 3. Chronological Sorting

Posts are explicitly sorted descending by date timestamp:

```ts
function sortByDateDesc(items: BlogListItem[]): BlogListItem[] {
  return [...items].sort((a, b) => {
    const aDate = a.content?.metadata?.date ? new Date(a.content.metadata.date).getTime() : 0;
    const bDate = b.content?.metadata?.date ? new Date(b.content.metadata.date).getTime() : 0;
    return bDate - aDate;
  });
}
```


### 4. Date and Reading Time Format

Date formatting uses:

```ts
new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
```

Output example:

- `Aug 26, 2021`

Reading time is taken from blog metadata and normalized:

```ts
const roundedMinutes = Math.max(1, Math.round(minutes));
return `${roundedMinutes} min read`;
```


### 5. Desktop Styling Strategy

In `bloglistpage.module.css`:

- Content width constrained to `700px`
- Row container uses grid with left metadata area and right reading time area
- Left metadata area (`postMain`) uses fixed date column width (`110px`) so titles remain visually aligned


### 6. Mobile Styling Strategy

For `@media (max-width: 639px)`:

- `postLink` switches to grid areas:
  - `"title reading"`
  - `"date date"`
- Keeps title and reading time on the same top row
- Moves date to the second row

Target result:

- `My first blog post                              1 min read`
- `Aug 26, 2021`


### 7. Heading Styling

A dedicated heading class was added for the section title:

- `font-size: 28px`
- Section top/bottom spacing configured in module CSS
- Dark mode override:

```css
[data-theme="dark"] .header {
  color: #81e6d9;
}
```


## Validation

1. Open `/writings` and verify the heading shows `Writings`.
2. Verify posts are sorted newest to oldest.
3. Verify each row shows date, title, and reading time.
4. Verify date uses 3-letter month format.
5. Verify on desktop that reading time is right-aligned.
6. Verify title alignment remains consistent even when date lengths differ.
7. Verify mobile layout (`<= 639px`) uses:
   - Row 1: title + reading time
   - Row 2: date
8. Verify dark mode heading color is `#81e6d9`.

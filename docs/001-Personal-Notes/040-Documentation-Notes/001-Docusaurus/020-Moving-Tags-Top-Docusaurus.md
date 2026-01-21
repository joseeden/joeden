---
title: "Moving Tag to Top"
description: "Moving Tags from Bottom to Top in Documentation Pages"
sidebar_position: 20
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---



## Overview

:::info 

This is still not implemented correctly. Still a working progress.

:::

This guide explains how to move tags from the bottom of documentation pages to just below the title and metadata (Updated/Reading time) for tablet, desktop, laptop, and larger screen sizes.

Features:

- Tags appear below title and metadata on larger screens
- Original bottom tags hidden on larger screens
- Mobile experience unchanged (tags remain at bottom)
- No "Tags" label - just the tag elements
- Uses native Docusaurus TagsListInline component
- Responsive breakpoint at 768px

## Directory Structure

```
src/
├── theme/
│   └── DocItem/
│       ├── Header/
│       │   └── index.js
│       └── Content/
│           └── index.js
└── css/
    └── custom.scss
```

Files modified/created:

1. `src/theme/DocItem/Header/index.js` - Custom header component
2. `src/theme/DocItem/Content/index.js` - Custom content component  
3. `src/css/custom.scss` - Responsive CSS rules


## Implementation

1. **Custom Theme Components**

    Created custom theme components to override Docusaurus default behavior:

    - [src/theme/DocItem/Header/index.js](https://github.com/joseeden/joeden/tree/master/src/theme/DocItem)
    - [src/theme/DocItem/Content/index.js](https://github.com/joseeden/joeden/tree/master/src/theme/DocItem)

2. **CSS Styling**

    Added responsive CSS to control tag visibility:

    ```scss
    // src/css/custom.scss
    /* Move tags to top on larger screens */
    @media (min-width: 768px) {
      .theme-doc-footer-tags-row {
        display: none;
      }
      
      .custom-tags-header {
        display: block;
      }
    }

    @media (max-width: 767px) {
      .custom-tags-header {
        display: none;
      }
    }
    ```



## How It Works

1. **Component Swizzling**: Uses Docusaurus theme swizzling to override default components

2. **Header Wrapper**: Adds tags after the document header (title, metadata)

3. **Content Wrapper**: Alternative approach for adding tags at content level

4. **Responsive Design**: Shows tags at top only on screens ≥768px wide

5. **Hide Original**: Hides the original bottom tags on larger screens

6. **Preserve Mobile**: Keeps original tag placement on mobile devices

## Breakpoints

This implementation ensures tags are repositioned only for larger screens while maintaining the original mobile experience.

- `≥768px`: Tags shown at top, hidden at bottom

- `<768px`: Original behavior (tags at bottom)



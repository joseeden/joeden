---
title: "Sidebar Accordion"
description: "Ensure only one section is expanded at a time in the sidebar"
sidebar_position: 21
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---


## Overview

This setup adds accordion behavior to the Docusaurus documentation sidebar so that only **one section at the same level** can be expanded at any given time.

This applies to both top-level sections and nested sections, and helpd keep the sidebar clean and easy to navigate.

## Problem

By default, Docusaurus allows multiple sidebar sections to remain expanded. As users navigate through different sections, previously opened sections stay open, which can clutter the sidebar and make navigation harder.

## Solution

A small JavaScript script is added to enforce accordion behavior in the sidebar.

The script:

- Listens for clicks on collapsible sidebar items
- Detects which section was clicked
- Automatically collapses sibling sections at the same level
- Leaves nested sections closed unless the user explicitly opens them

This ensures predictable and uncluttered sidebar behavior.

## How it works

The accordion logic works on **sibling sections only**, not globally.

```
Sidebar
│
├─ Section A (expanded)
│ ├─ Page 1
│ ├─ Page 2
│
├─ Section B (collapsed)
│
└─ Section C (collapsed)
```


When a user clicks **Section B**:

```
Sidebar
│
├─ Section A (collapsed)
│
├─ Section B (expanded)
│ ├─ Page 3
│ ├─ Page 4
│
└─ Section C (collapsed)
```

For nested sections:

```
Section B
│
├─ Subsection B1 (expanded)
│
├─ Subsection B2 (collapsed)
```


Clicking **Subsection B2** collapses **Subsection B1**, but does not affect other top-level sections.


## Implementation

### Script location

The accordion script is placed under the `static` directory so it is served as a public asset at runtime:

```
static/js/sidebar-accordion.js
```

Files in `static/` are copied directly to the site root during the build and can be loaded using a `<script>` tag.


### Docusaurus configuration

The script is registered in `docusaurus.config.ts`:

```ts
scripts: [
  {
    src: '/js/sidebar-accordion.js',
    defer: true,
  },
],
```

Using defer ensures the script runs after the sidebar DOM has been rendered.



## Why `static/` instead of `src/`

Docusaurus treats these directories differently:

- `src/`

  - Used for React components and hooks
  - Files are bundled by Webpack
  - Files do not exist as public URLs at runtime

- `static/`

  - Used for runtime assets (JS, images, files)
  - Files are copied as-is to the final build
  - Files are accessible via direct URLs

Because the sidebar accordion is loaded via a `<script src="...">`, it must live in `static/`. Files under `src/` cannot be reliably loaded this way.



## Troubleshooting

1. **Script is not running**

    - Open browser DevTools ➔ Network tab
    - Reload the page
    - Confirm the script is loaded successfully:

    ```
    /js/sidebar-accordion.js   200
    ```

    If you see a `404`, the script path is incorrect or the file is not under `static/`.


2. **Multiple sections still expand**

    - Confirm there is only **one accordion Script** loaded
    - Check that the sidebar uses the default Docusaurus classes:

      - `theme-doc-sidebar-menu`
      - `menu__list-item-collapsible`
    - Clear browser cache and hard reload

3. **Works on refresh but not on navigation**

    - Ensure the script uses `defer`
    - Confirm it listens for dynamically rendered sidebar content
    - Client-side navigation requires the script to handle DOM updates




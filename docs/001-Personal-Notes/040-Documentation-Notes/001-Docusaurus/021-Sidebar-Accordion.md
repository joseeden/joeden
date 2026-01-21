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

This implementation adds accordion behavior to the Docusaurus documentation sidebar to ensure only one top-level section is expanded at a time.

## Problem

By default, Docusaurus allows multiple sidebar sections to be expanded simultaneously. When users navigate through different sections, previously opened sections remain expanded. This leads to a cluttered sidebar with many open sections.

## Solution

I've created a JavaScript file that implements accordion behavior for the sidebar and added it to the Docusaurus configuration. The script:

- **Listens for clicks** on collapsible sidebar items
- **Identifies top-level sections** (not nested items)  
- **Closes other expanded sections** when a new top-level section is clicked
- **Preserves nested behavior** within the same section

The script will automatically close other top-level sections when a new section is expanded..

## Implementation

JavaScript script location:

```
/src/components/documentation/sidebar-accordion.js
```

Added to `docusaurus.config.ts`:

```typescript
scripts: [
  {
    src: '/src/components/documentation/sidebar-accordion.js',
    async: true,
  },
],
```


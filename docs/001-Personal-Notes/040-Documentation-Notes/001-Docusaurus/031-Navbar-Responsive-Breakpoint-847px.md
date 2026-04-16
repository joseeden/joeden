---
title: "Centering the Navbar Items"
sidebar_position: 31
description: "Responsive navbar styling for screens 847px and above with centered items"
tags:
  - Docusaurus
---

## Overview

Updated the navbar styling to center all navbar items and adjust layout on screens `847px` and above. This breakpoint ensures that the navbar items are properly centered and aligned without visual conflicts.

Notes:

- **847px breakpoint** - Enough space for centered navbar items without crowding
- **Centered alignment** - Matches with the landing page and provides a balanced look
- **Gap spacing** - Consistent spacing between navbar items is maintained


## CSS Media Query

Added a media query targeting screens with a minimum width of 847px in `/src/css/custom.scss`:

```scss
@media (min-width: 847px) {
  /* Center navbar inner container */
  .navbar__inner {
    justify-content: center;
  }

  /* Reset navbar items to fit content and center */
  .navbar__items {
    width: auto;
    flex-basis: auto;
    justify-content: center;
    gap: 1rem;
  }

  .navbar__item {
    margin-right: 0;
  }

  .navbar__items--right {
    display: none !important;
  }
}
```


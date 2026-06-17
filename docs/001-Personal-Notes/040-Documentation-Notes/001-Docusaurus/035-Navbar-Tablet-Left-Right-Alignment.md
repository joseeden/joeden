---
title: "Navbar Items Alignment Issue on Tablet Screens"
description: "Fixing centered navbar items on tablet screen sizes between 601px and 996px"
tags:
- Docusaurus
- CSS
- Navbar
sidebar_position: 35
---

## Overview

This page documents a navbar layout issue on screen sizes between `601px` and `996px`.

At this size range, the visible navbar controls were centered in the navbar instead of staying on their expected sides.

The affected items were:

- Sidebar toggle
- Navbar brand logo
- Search icon
- Light and dark mode toggle icon

The expected behavior already worked on screens `600px` and below. The fix was to apply the same left and right alignment behavior to the tablet range.

## Expected Behavior

The navbar should keep the remaining visible items on their natural sides:

| Item                                  | Expected side |
| ------------------------------------- | ------------- |
| Sidebar toggle                        | Left          |
| Navbar brand logo                     | Left          |
| Search icon                           | Right         |
| Light and dark mode toggle icon       | Right         |

This keeps the navbar predictable across mobile and tablet widths.

## Root Cause

The issue came from overlapping responsive navbar rules in `src/theme/Navbar/navbar.css`.

The broad `max-width: 996px` rule correctly kept `.navbar__items--right` visible as a flex row. However, a later `847px` to `996px` media query hid `.navbar__items--right` again:

```css
@media (min-width: 847px) and (max-width: 996px) {
  .navbar__items--right {
    display: none !important;
  }
}
```

This made the right-side search and theme toggle stop behaving like right-side navbar items in part of the tablet range.

There was also a related resize issue in `src/theme/Navbar/index.tsx`. The navbar script moved right-side items into the left-side `.navbar__items` container at `997px` and above, but it did not move them back when resizing below `997px`.

## Files Modified

| File                          | Change                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| `src/theme/Navbar/navbar.css` | Added tablet alignment rules for `601px` to `996px`.                   |
| `src/theme/Navbar/navbar.css` | Removed the tablet rule that hid `.navbar__items--right`.              |
| `src/theme/Navbar/index.tsx`  | Restored moved right-side navbar items when resizing below `997px`.    |

## CSS Fix

The fix adds a tablet-specific media query for `601px` to `996px`.

It keeps the left-side navbar items flexible and left aligned, and it keeps `.navbar__items--right` visible and pushed to the right.

```css
@media (min-width: 601px) and (max-width: 996px) {
  .navbar .navbar__inner {
    justify-content: space-between;
  }

  .navbar .navbar__items:not(.navbar__items--right) {
    flex: 1 1 auto;
    justify-content: flex-start;
    min-width: 0;
  }

  .navbar .navbar__items--right {
    display: flex !important;
    flex: 0 0 auto;
    justify-content: flex-end;
    margin-left: auto;
  }

  .navbar .navbar__toggle,
  .navbar .navbar__brand,
  .navbar .navbar__search,
  .navbar [class*="navbarSearchContainer_"],
  .navbar [class*="colorModeToggle_"] {
    flex: 0 0 auto;
  }
}
```

Then remove the conflicting rule from the `847px` to `996px` media query:

```css
.navbar__items--right {
  display: none !important;
}
```

## Resize Fix

The custom navbar component already reorganized the navbar at `997px` and above by moving right-side children into `.navbar__items`.

That behavior was fine for desktop, but it needed to be reversible for tablet widths.

The fix marks moved nodes with `data-navbar-moved-from-right` and moves them back into `.navbar__items--right` when the screen becomes smaller than `997px`.

```tsx
const restoreRightNavbarItems = () => {
  const navbarItems = document.querySelector('.navbar__items') as HTMLElement | null;
  const navbarItemsRight = document.querySelector('.navbar__items--right') as HTMLElement | null;

  if (navbarItems && navbarItemsRight) {
    const movedRightChildren = Array.from(navbarItems.children).filter(
      (child) => (child as HTMLElement).dataset.navbarMovedFromRight === 'true'
    );

    movedRightChildren.forEach((child) => {
      (child as HTMLElement).removeAttribute('data-navbar-moved-from-right');
      navbarItemsRight.appendChild(child);
    });

    navbarItemsRight.style.display = '';
  }
};
```

The resize condition then restores the right-side items before returning:

```tsx
if (window.innerWidth < 997) {
  restoreRightNavbarItems();
  return;
}
```

## Result

After the fix, the navbar behaves consistently from mobile to tablet widths:

- Left-side items stay on the left.
- Right-side items stay on the right.
- The `600px` and below behavior remains unchanged.
- Resizing across the `997px` breakpoint no longer leaves right-side items in the wrong container.

:::info[Note to self]

When a responsive fix uses JavaScript to move DOM nodes, make the move reversible before adding more CSS. Otherwise, resize behavior can keep stale layout state from a previous breakpoint.

:::

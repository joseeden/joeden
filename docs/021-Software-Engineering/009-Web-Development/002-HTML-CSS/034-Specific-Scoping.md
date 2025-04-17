---
title: "Specific Scoping"
description: "Specific Scoping"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 34
last_update:
  date: 04/29/2019
---

## Overview

In CSS, specific scoping means applying styles only to elements within a certain section or container. This is useful when....

Example: You have an HTML page divided into 8 sections, and you only want to apply styles to elements inside the section with `id="tracking"`.

```html
<!-- HTML structure (collapsed for brevity) -->
<section id="overview">...</section>
<section id="details">...</section>
<section id="tracking">...</section>
<!-- other sections -->
```

You can scope all those styles to a specific `id="tracking"` without repeating `#tracking` for every selector by nesting the rules inside `#tracking { ... }`, **but this only works in a CSS preprocessor** like **Sass** or **Less**, not in plain CSS.

## If you're using plain CSS

You **have to** prefix each selector manually like this:

```css
#tracking .form-check-input {
  transform: scale(1.5);
  --bs-form-switch-bg: lightgray;
  --bs-form-switch-indicator-bg: white;
  --bs-form-switch-focus-bg-image: none;
}

#tracking .form-check-input::before {
  background-color: white;
}

#tracking .form-check-input:checked {
  background-color: green;
  border-color: green;
}

#tracking .form-check-input:checked::before {
  background-color: yellow;
}

#tracking .form-check-input:focus {
  box-shadow: none;
}
```

## If you're using Sass (SCSS syntax)

You can nest them like this for cleaner code:

```scss
#tracking {
  .form-check-input {
    transform: scale(1.5);
    --bs-form-switch-bg: lightgray;
    --bs-form-switch-indicator-bg: white;
    --bs-form-switch-focus-bg-image: none;

    &::before {
      background-color: white;
    }

    &:checked {
      background-color: green;
      border-color: green;

      &::before {
        background-color: yellow;
      }
    }

    &:focus {
      box-shadow: none;
    }
  }
}
```

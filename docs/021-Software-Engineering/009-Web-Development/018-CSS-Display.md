---
title: "CSS Display"
description: "CSS Display"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 18
last_update:
  date: 03/21/2019
---


## Overview

The `display` property in CSS determines how elements are displayed on a webpage.

- `block` elements take up the full width of the container
- `inline` elements only use the space needed for their content
- `inline-block` allows setting the width but still keeps the element inline

For example:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="display.css">
  <title>Display Example</title>
</head>
<body>
  <div class="first">Block Element</div>
  <span class="second">Inline Element</span>
  <span class="third">Inline-Block Element</span>
</body>
</html>
```
```css title="display.css"
/* display.css */
.first {
  display: block;
}

.second {
  display: inline;
}

.third {
  display: inline-block;
  width: 100px;
}
```

How it looks like:

![](/img/docs/Screenshot-2025-03-31-004225.png)



## Inline Elements

Inline elements like `span` can be used to style parts of text differently without affecting the layout.

- Inline elements don’t break the line
- You can style parts of a block element with inline elements
- Common inline elements are `span`, `img`, and `a`

For example:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="display.css">
  <title>Inline Elements Example</title>
</head>
<body>
  <p>This is <span class="inline-text">important</span> text.</p>
</body>
</html>
```
```css title="display.css"
.inline-text {
  color: red;
}
```

How it looks like:

![](/img/docs/Screenshot-2025-03-31-004803.png)


## Hiding Elements

Sometimes, you may want to hide an element from view without deleting it.

- Use `display: none` to remove it from the page entirely
- Use `visibility: hidden` to hide the element but keep its space on the page

For example:

```html
<p style="display: none;">This is hidden.</p>
<p style="visibility: hidden;">This is invisible but still takes up space.</p>
```

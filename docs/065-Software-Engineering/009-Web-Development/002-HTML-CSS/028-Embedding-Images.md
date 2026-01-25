---
title: "Embedding Images"
description: "Embedding Images"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 28
last_update:
  date: 03/30/2019
---


## Overview

You can embed images in an HTML page using the `<img>` tag. It's a simple way to display pictures from a file or URL directly on your webpage.

```html
<img src="image.jpg" 
     alt="Description of image" 
     width="300" 
     height="200">
```

- `src` specifies the image file or URL  
- `alt` provides alternative text if the image can't be displayed  
- `width` and `height` control the image size on the page


## `loading="lazy"`

This is **not a CSS class**, but an **HTML attribute**:

```html
<img src="example.jpg" loading="lazy" />
```

It delays loading the image until it’s about to enter the viewport.

- Improves performance
- Speeds up page load
- Reduces initial network requests

**Use case:** Good for long pages with many images or images lower down the page.


## `img-fluid`

This **is a CSS class** (specifically from **Bootstrap**):

```html
<img src="example.jpg" class="img-fluid" />
```

It makes the image **responsive** by scaling it to the parent container’s width.

- Applies `max-width: 100%; height: auto;`
- Prevents images from overflowing containers
- Automatically resizes on different screen sizes

**Use case:** Essential in responsive layouts using Bootstrap.


## `loading="lazy"` vs. `img-fluid`

| Term        | Type       | What it does                          |
|-------------|------------|---------------------------------------|
| `loading="lazy"` | HTML attribute | Loads image only when needed           |
| `img-fluid` | CSS class (Bootstrap) | Makes image responsive to screen size |



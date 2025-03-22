---
title: "Bootstrap Grid"
description: "Bootstrap Grid"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 28
last_update:
  date: 03/20/2019
---


## Overview

Bootstrap's grid system makes it easy to create responsive layouts for your website. It helps you organize content into columns and adjust the layout depending on the screen size.

- Bootstrap uses a 12-column grid.
- Columns adjust automatically based on screen size (small, medium, large, extra-large).
- You can combine columns to create custom layouts.

## Example: Building a Basic Layout

Start with a basic container:

```html
<div class="container">
  <div class="row">
    <div class="col-sm-6" style="background-color: grey; border: 2px solid black;">Column 1</div>
    <div class="col-sm-6" style="background-color: grey; border: 2px solid black;">Column 2</div>
  </div>
</div>
```

How the layout works:

- **col-sm-6** means each column takes up 6 out of 12 available grid spaces (half of the screen).
- When you refresh the page, you'll see two columns side by side.


See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/011-Bootstrap-Grid/index.html)

## Responsive Grid

Bootstrap adjusts columns based on screen size. You can specify how columns behave on different devices.

Example with different grid sizes:

```html
<div class="container">
  <div class="row">
    <div class="col-sm-6 col-md-4 col-lg-3" style="background-color: grey; border: 2px solid black;">Column 1</div>
    <div class="col-sm-6 col-md-4 col-lg-3" style="background-color: grey; border: 2px solid black;">Column 2</div>
    <div class="col-sm-6 col-md-4 col-lg-3" style="background-color: grey; border: 2px solid black;">Column 3</div>
    <div class="col-sm-6 col-md-4 col-lg-3" style="background-color: grey; border: 2px solid black;">Column 4</div>
  </div>
</div>
```

How the layout works:

- On small screens (col-sm-6), columns stack in two rows.
- On medium screens (col-md-4), columns are displayed in three equal parts.
- On large screens (col-lg-3), columns take up one-fourth of the screen, arranged side by side.

## Customizing the Layout

You can change the grid's behavior at different screen widths. For example, on large screens, you can make all columns take up 12 spaces (full-width).

```html
<div class="container">
  <div class="row">
    <div class="col-lg-12" style="background-color: grey; border: 2px solid black;">Full width on large screens</div>
  </div>
</div>
```

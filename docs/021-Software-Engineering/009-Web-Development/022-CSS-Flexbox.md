---
title: "CSS Flexbox"
description: "CSS Flexbox"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 22
last_update:
  date: 03/20/2019
---



## Early Web Layouts

Web pages were originally structured using basic HTML tables.

- Used `<table>`, `<tr>`, and `<td>` elements
- Allowed multi-column layouts by adjusting column widths
- Still useful for tabular data but not for layouts

Tables are not ideal for layouts because they mix structure with design, making updates difficult.

## Transition to Display 

To improve layouts, developers started using display properties.

- `display: inline-block` for placing elements side by side
- `position: absolute` for precise positioning
- `float: left/right` for arranging elements in columns

While these methods improved layouts, they introduced complexities in alignment and responsiveness.

## The Problem with Floats

Floats were widely used but had drawbacks.

- Difficult to align elements properly
- Required clearfix hacks for layout stability
- Not designed for complex grid structures

Floats work well for wrapping text around images but are not ideal for building full-page layouts.

## Using Flexbox 

Flexbox simplifies layout creation with a flexible approach.

- `display: flex` creates a flex container
- Items adjust dynamically based on available space
- Aligns items easily with `justify-content` and `align-items`

Example: Creating a Flexbox Layout

Sample files: [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/Projects/001-Basics/008-CSS-Flexbox)

```html
<div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
</div>
```

```css
.container {
  display: flex;
  gap: 10px;
}
.box {
  background: #66D2CE;
  padding: 20px;
  flex: 1;
}
```

Each `.box` will be evenly spaced inside `.container`, adjusting dynamically based on the available width.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-230452.png)

</div>

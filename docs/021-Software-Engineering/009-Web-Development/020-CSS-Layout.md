---
title: "CSS Layout"
description: "CSS Layout"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 20
last_update:
  date: 03/20/2019
---

## Overview

CSS has different ways to create layouts. The best options today are Flexbox, CSS Grid, and Bootstrap.  

- **Flexbox** – Best for one-dimensional layouts (rows or columns)  
- **CSS Grid** – Best for two-dimensional layouts (rows and columns)  
- **Bootstrap** – A framework that helps with layout using a grid system  

Each method has its own strengths, but they can also work together for better results. 

## Flexbox  

Flexbox is useful when you need to arrange items in a row or column.  

- Makes it easy to align and distribute space  
- Best for layouts that focus on one direction  
- Works well for navigation bars, cards, and small sections  

Use Flexbox when working with a single direction, like arranging buttons in a row.  

In this example, the items are spread evenly in a row.

```css
.container {
  display: flex;
  justify-content: space-between;
}
```


## CSS Grid  

CSS Grid is useful when working with both rows and columns.  

- Allows precise placement of items  
- Best for complex layouts like dashboards or galleries  
- Gives full control over spacing and alignment  

Use CSS Grid when you need to control both horizontal and vertical placement.  

In this example, we're creating three equal columns.  

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

For more information, please see [CSS Grid.](/docs/021-Software-Engineering/009-Web-Development/023-CSS-Grid.md)

## Bootstrap  

Bootstrap is a framework that provides pre-built layout tools.  

- Uses a grid system to arrange elements  
- Helps create responsive designs quickly  
- Includes ready-to-use components like buttons and forms  

Use Bootstrap if you need a quick, structured layout without writing much CSS.  

Example: This creates a three-column layout on medium-sized screens. 

```html
<div class="row">
  <div class="col-md-4">Column 1</div>
  <div class="col-md-4">Column 2</div>
  <div class="col-md-4">Column 3</div>
</div>
```



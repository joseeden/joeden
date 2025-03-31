---
title: "CSS Positioning"
description: "CSS Positioning"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 19
last_update:
  date: 03/22/2019
---


## Overview 

CSS positioning controls how elements appear on a webpage. There are four types:

- Static
- Relative
- Absolute
- Fixed

The following sample files will be used for the examples:

- [index.html](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/Projects/001-Basics/006-CSS-Positioning)
- [styles.css](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/Projects/001-Basics/006-CSS-Positioning)

## Static Positioning

This is the default positioning of HTML elements.

- Elements appear in normal document flow
- No special position applied
- Left, top, right, bottom properties have no effect

Static positioning means elements appear in the order they are written in HTML.

In the example below, a box is defined. No special keywords is used and iit will be displayed as is.

```css
.box { 
  width: 100px; 
  height: 100px; 
  background-color: lightblue; 
  margin: 10px; 
} 
```

![](/img/docs/Screenshot-2025-03-31-133524.png)


## Relative Positioning

Moves an element relative to its original position.

- Uses `top`, `left`, `right`, `bottom`
- Shifts from default placement
- Other elements remain unchanged

Example:

```css
.relative { 
  position: relative; 
  top: 10px; 
  left: 20px; 
}
```

The element moves 10px down and 20px to the right from its original spot.

![](/img/docs/Screenshot-2025-03-31-133740.png)


## Absolute Positioning

Positions an element relative to the nearest positioned ancestor.

- If no positioned ancestor, defaults to page
- Removed from normal document flow
- Uses `top`, `left`, `right`, `bottom`

Example:

```css
.absolute-container { 
  position: relative; 
  width: 300px; 
  height: 200px; 
  border: 1px solid #000; 
}

.absolute { 
  position: absolute; 
  top: 50px; 
  left: 50px; 
}
```

In this example, the box with the class `.absolute` is positioned 50px from the top and 50px from the left of its closest positioned ancestor, which is the `.absolute-container`.

![](/img/docs/Screenshot-2025-03-31-133942.png)


## Fixed Positioning

Keeps an element fixed relative to the browser window.

- Stays in place even when scrolling
- Uses `top`, `left`, `right`, `bottom`
- Removed from normal document flow

Example:

```css
.fixed { 
  position: fixed; 
  bottom: 10px; 
  left: 10px; 
}
```

The element remains at the bottom-left corner of the browser, even when scrolling.

![](/img/docs/Screenshot-2025-03-31-134147.png)


## Sticky Positioning 

Sticky positioning makes an element stick to a specific position as you scroll, but only within its parent container. Once you scroll past it, it moves with the page content again.

```css
.sticky { 
  position: sticky; 
  top: 0; 
  background-color: yellow; 
  padding: 10px; 
}
```

In this example, the .sticky element will stay at the top of the viewport as you scroll, until the parent container's boundary is reached.



## Z-Index

Controls stacking order of elements.

- Higher values appear above lower values
- Works with `relative`, `absolute`, `fixed`
- Default is `0`

Example:

```css
.box {
  position: absolute;
  z-index: 10;
}
```

A higher `z-index` makes an element appear on top of others.



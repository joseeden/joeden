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

## Static Positioning

This is the default positioning of HTML elements.

- Elements appear in normal document flow
- No special position applied
- Left, top, right, bottom properties have no effect

Static positioning means elements appear in the order they are written in HTML.

## Relative Positioning

Moves an element relative to its original position.

- Uses `top`, `left`, `right`, `bottom`
- Shifts from default placement
- Other elements remain unchanged

Example:

```css
.box {
  position: relative;
  top: 20px;
  left: 30px;
}
```

The element moves 20px down and 30px to the right from its original spot.

## Absolute Positioning

Positions an element relative to the nearest positioned ancestor.

- If no positioned ancestor, defaults to page
- Removed from normal document flow
- Uses `top`, `left`, `right`, `bottom`

Example:

```css
.container {
  position: relative;
}

.box {
  position: absolute;
  top: 50px;
  left: 50px;
}
```

If `.container` has `position: relative;`, `.box` will be placed 50px down and right inside `.container`.

## Fixed Positioning

Keeps an element fixed relative to the browser window.

- Stays in place even when scrolling
- Uses `top`, `left`, `right`, `bottom`
- Removed from normal document flow

Example:

```css
.box {
  position: fixed;
  top: 10px;
  right: 10px;
}
```

The element remains at the top-right corner of the browser, even when scrolling.

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



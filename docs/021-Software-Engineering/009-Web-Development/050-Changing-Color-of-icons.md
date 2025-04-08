---
title: "Changing Color of Icons"
description: "Changing Color of Icons"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 50
last_update:
  date: 07/5/2021
---


## Overview 

I encountered this issue when I was working on a website and I needed to change the color of the social media icons at the footer sections, in the same way that you can change the color of fonts.

## PNG Icons

After some research, I learned that I **cannot directly change the color of icons in PNG format using CSS**, but there are some options.  

## Option 1: Use an SVG Instead of PNG

If possible, replace the PNG icons with **SVG files**, then use `fill` or `color` in CSS:  

```css
footer.footer img {
  fill: red; /* Works for SVG */
}
```

## Option 2: Use CSS `filter` to Tint the PNG Icons

If PNG icons cannot be replaced, use CSS `filter` to apply a color effect.

```css
footer.footer img {
  filter: brightness(0) invert(1); /* Turns the image white */
}
```

To change the color, adjust `invert()`, `sepia()`, and `hue-rotate()`, like this:  

```css
footer.footer img {
  filter: invert(32%) sepia(78%) saturate(897%) hue-rotate(200deg);
}
```

::info 

This method works best for **monochrome icons**.

:::


## Option 3: Use Transparent PNGs with `background-color`

If the PNG icons have transparency, set the`background-color`:  

```css
footer.footer img {
  background-color: red;
}
```

::info 

This works if the icons have a transparent background.

:::


## Option 4: Use Colored Overlay with `mix-blend-mode`

Modify the HTML and wrap the image inside a `div`, then use `mix-blend-mode`: 

```css
.icon-container {
  position: relative;
  display: inline-block;
}

.icon-container img {
  display: block;
}

.icon-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

This overlays a red tint on the icon.

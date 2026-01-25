---
title: "CSS Flex Sizing"
description: "CSS Flex Sizing"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 22  
last_update:
  date: 03/24/2019
---


## Overview

Flexbox helps control how items grow, shrink, and fit within a container. 

- Items are placed inside a flex container.
- By default, items shrink when the container resizes.
- The size is determined by a priority system.

Flexbox automatically adjusts sizes, but manual settings allow more control.

For more information, please see [CSS Flexbox.](/docs/065-Software-Engineering/009-Web-Development/002-HTML-CSS/021-CSS-Flexbox.md)

## Default Sizing Behavior

By default, Flexbox places items based on content size.

- Items align in a row.
- They shrink when space is limited.
- The longest word sets the minimum width.

Without manual settings, Flexbox adjusts items dynamically.

## Setting a Fixed Width

You can define a width for flex items.

```css
.item {
  width: 100px;
}
```

Fixed widths provide consistency but limit flexibility.

- All items become the same width.
- They remain that width until space runs out.
- If space is too small, items shrink dynamically.

## Using `flex-basis`

The `flex-basis` property sets the initial size of items.

```css
.item {
  flex-basis: 200px;
}
```

Flex-basis is more flexible than a fixed width.

- Overrides `width` if both are set.
- Determines size along the main axis.
- Items shrink when space is insufficient.

## Minimum and Maximum Width

You can set limits on how much an item can shrink or grow.

```css
.item {
  flex-basis: 200px;
  min-width: 100px;
  max-width: 300px;
}
```

Min and max width provide control over flexibility.

- `min-width`: Prevents shrinking below a limit.
- `max-width`: Prevents growing beyond a limit.
- Flexbox respects these limits when resizing.

## `flex-grow` and `flex-shrink` 

### `flex-grow`  

Allows an item to expand up to its defined `max-width` when space is available. 

```css
.container {
  display: flex;
}
.item {
  flex-grow: 1;       /* Grows to fill available space */
  max-width: 300px;   /* Won't grow beyond this */
}
```

### `flex-shrink`  

Allows an item to shrink but not smaller than its `min-width`.  

```css
.container {
  display: flex;
}
.item {
  flex-shrink: 1;     /* Shrinks if needed */
  min-width: 100px;   /* Won't shrink below this */
}
```

### Using `flex` Shorthand  

Instead of writing `flex-grow` and `flex-shrink` separately, we can use:  

```css
/* flex-grow: 1, flex-shrink: 1, flex-basis: auto */
.item {
  flex: 1 1 auto;   
}
```  

This means the item can grow (`1`), shrink (`1`), and use its default size (`auto`).  

This can also be rewritten as:  

```css
/* flex-basis set to 0, so size is fully determined by grow/shrink */
.item {
  flex: 1 1 0; 
}
```  

A much shorter way to write it is:  

```css
/* Same as flex: 1 1 0, allows growing and shrinking equally */
.item {
  flex: 1; 
}
```

## Order of Priority

Flexbox sizing follows a priority:

- Content size (default behavior)
- Set width (fixed size)
- Flex-basis (preferred sizing)
- Min/max width (limits flexibility)



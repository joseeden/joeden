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

## Float

Float allows elements to be positioned next to each other by taking them out of the normal document flow.  

- Moves elements left or right  
- Used mainly for text wrapping around images  
- Can affect layout, requiring a clear fix  

For layout positioning, Flexbox and Grid provide better control. Float remains useful for specific cases, such as text wrapping.

- Modern layouts use Flexbox or Grid instead  
- Float can cause unexpected issues in complex designs  
- Use it only when necessary  

## Using Float 

When an element is floated, content flows around it. Changing `float: left;` or `float: right;` moves the element to that side, letting other content wrap around it.  

Example:

```css
img { 
  float: left; 
  margin-right: 10px; 
}
```

In this example, an image floats to the left, and text wraps around it.  


## Clear

Clears floated elements so they don’t affect the layout of other elements.  

- `clear: left;` stops wrapping around left-floated elements  
- `clear: right;` stops wrapping around right-floated elements  
- `clear: both;` stops wrapping around both sides  

This ensures elements below a float stay in their expected position.  

Example:

```css
footer { 
  clear: both; 
}
```

This makes sure the footer stays below floated elements instead of wrapping around them.  

## Float-Based Layout  

Float can be used to position elements side by side.  

- `float: left;` moves an element to the left  
- `float: right;` moves an element to the right  
- Clearing helps maintain proper layout  

Example:

```css
.cat { 
  float: left; 
  width: 50%; 
}

.dog { 
  float: right; 
  width: 50%; 
}

footer { 
  clear: both; 
}
```

In this example, the `.cat` section is on the left, the `.dog` section is on the right, and the footer stays below both.  


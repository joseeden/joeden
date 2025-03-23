---
title: "CSS Selectors"
description: "Notes on CSS Selectors"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 21
last_update:
  date: 03/20/2019
---


## Dot or No Dot 

In CSS, whether a selector has a `.` (dot) or not depends on what type of element it is targeting:

1. **No dot (`.`) → Targets an HTML element (Tag Selector)**

    - This applies styles to **all** `<h1>` elements in the document.
    - Similarly, `hr {}` applies styles to **all** `<hr>` elements.
    - Example:  
      ```css
      h1 {
        font-size: 3.5rem;
        color: azure;
      }
      ```


2. **With a dot (`.`) → Targets a CSS class (Class Selector)**

    - This applies styles to **any** element with `class="buffer"`, like:
      ```html
      <button class="btn">Click Me</button>
      ```
    - Example:
      ```css
      .btn {
        font-weight: 700;
        border-radius: 300px;
        text-transform: uppercase;
      }
      ```

## Using the `class` Selector  

A `class` can be applied to multiple elements to style them consistently. Classes allow you to apply styles to **specific** elements without affecting all elements of the same type.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="class.css">
</head>
<body>
  <p class="highlight">This text is green and bold.</p>
</body>
</html>
```

```css title="class.css"
.highlight { 
  color: green; font-weight: bold; 
}
```


## Using the `id` Selector  

The `id` selector applies styles to a single unique element.


```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="id.css">
</head>
<body>
  <p id="unique">This text is red and larger.</p>
</body>
</html>
```


```css title="id.css"
#unique { color: red; font-size: 20px; }
```


## Header and Paragraph Selectors

Different selectors apply styles to headers and paragraphs in various ways.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="headers.css">
</head>
<body>
  <h1>Header 1</h1>
  <p>This paragraph is blue.</p>

  <h2>Header 2</h2>
  <p>This paragraph is green.</p>

  <h3>Header 3</h3>
  <p>Last paragraph.</p>
</body>
</html>
```

In the example below, the same rule applies to both `<h1>` and `<p>` elements.

```css
h1, p {
  color: blue;
}
```

On the other hand, this rule only applies to paragraphs inside an `<h1>`.

```css
h1 p {
  font-size: 18px;
}
```

The code below applies styles only to `<p>` elements that are direct children of an `<h2>`.

```css
h2 > p {
  color: green;
}
```

Another selector targets a `<p>` that immediately follows an `<h2>`.

```css
h2 + p {
  color: orange;
}
```

The `:hover` selector applies styles when a user hovers over an `<h3>`.

```css
h3:hover {
  text-decoration: underline;
}
```

The `:last-child` selector applies styles to the last `<h3>` in a parent element.

```css
h3:last-child {
  font-weight: bold;
}
```

Lastly, you can use `!important` to force a style, overriding all other rules. However, it is not recommended as it makes debugging difficult.

```css
p {
  color: blue !important;
}
```

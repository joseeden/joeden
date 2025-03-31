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
sidebar_position: 16
last_update:
  date: 03/20/2019
---


## Overview

CSS selectors control how elements look on a webpage. Instead of applying the same style everywhere, selectors help target specific elements.  

- Tag selectors style all elements of a specific type  
- Class selectors style only elements with a specific class  
- Comments help organize and disable styles in CSS  

## Tag Selectors  

Tag selectors apply styles to all elements of the same type.  

- Targets all instances of an element (e.g., all `<p>` tags)  
- Useful for general styles but lacks flexibility  

Example: This makes every paragraph text blue, which might not always be wanted.  

```css
p {
  color: blue;
}
```

## Class Selectors  

Class selectors target specific elements by assigning them a class.  

- Add `class="name"` to an element in HTML  
- Use `.` before the class name in CSS  
- Allows different styles for different elements  

It can also be applied to multiple elements to style them consistently. 

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="class.css">
</head>
<body>
  <p class="highlight bold-text">This text is both highlighted and bold.</p>
  <p class="highlight">This text is only highlighted.</p>
  <p class="bold-text">This text is only bold.</p>
</body>
</html>
```

```css title="class.css"
.highlight {
  background-color: yellow;
}

.bold-text {
  font-weight: bold;
}
```

In this example, the first paragraph gets both a yellow background and bold text, while the other paragraphs get only one style each.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-30-232604.png)

</div>


## ID Selectors  

The `id` selector applies styles to a single unique element.

- Use the `id` attribute in HTML.
- Prefix the ID name with `#` in CSS.

IDs are unique per page and should not be repeated.

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
#unique { 
  color: red; 
  font-size: 20px; 
}
```

## Attribute Selectors

Attribute selectors allow you to target elements based on the presence or value of attributes. You can apply styles to elements that have specific attributes or attribute values.

```html
<p class="intro">This is a paragraph.</p>
<a href="https://example.com">Visit Example</a>
<button disabled>Disabled Button</button>
```

```css
/* Select all links with a href attribute */
a[href] {
  color: blue;
}

/* Select all elements with a 'disabled' attribute */
button[disabled] {
  background-color: gray;
}
```

## Universal Selectors

The universal selector targets all elements on a page, allowing you to apply a rule to every element. It's useful when you want a general style to apply universally.

```html
<div>Content 1</div>
<span>Content 2</span>
<p>Content 3</p>
```

```css
/* Select all elements */
* {
  font-family: Arial, sans-serif;
  color: black;
}
```

## Pseudo-classes

Pseudo-classes apply styles based on an element's state.

- `:hover` changes style when an element is hovered over.
- `:focus` changes style when an element is focused.

```css
a:hover {
  color: orange;
}
input:focus {
  border: 2px solid blue;
}
```


## Combining CSS Selectors

Different CSS selectors apply styles to various elements based on their type, position, or interaction.

The examples below use the following HTML file:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button>Click Me</button>
  <input type="text" placeholder="Type here">
  
  <p>Paragraph with default color.</p>

  <div>
    <p>Direct paragraph inside div</p>
    <section>
      <p>Nested paragraph inside section</p>
    </section>
  </div>

  <div>
    <h2>This is an H2 header</h2>
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ul>
    <h2>This is another H2 header</h2>
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
      <li>Fourth item</li>
    </ul>
  </div>
</body>
</html>
```

### Grouping Selectors

The same rule can apply to multiple elements using a comma.  

```css
button, p {
  color: blue;
}
```

- Selects both h1 and h2
- Applies the same style to both

This is useful for reducing repetitive code.

### Descendant Selector (Space)

This rule targets elements nested within a specific ancestor. 

```css
div p {
  color: red;
}
```

- Selects all `<p>` elements inside `<div>`.  
- Works regardless of nesting depth

Use this when styling all occurrences of an element within a parent.

### Child Selector (`>`)

The `>` selector targets only direct children, ignoring nested ones.  

```css
div > h2 {
  color: green;
}

/* Only applies to direct <p> inside <div>, not nested ones */
div > p {
  font-style: italic;
} 
```

Note: 

- In the `<ul>`, only top-level `<li>` elements are green  
  - Sub-items remain unaffected  
- In the `<div>`, only the direct `<p>` is italic  
  - Nested `<p>` inside `<section>` is unaffected  

Use this to style only immediate child elements.


### Adjacent Sibling Selector (`+`)

The `+` selector targets an element immediately following a specified element. 

```css
button + input {
  border: 2px solid red;
}
```

- Selects an input that comes directly after a button
- Does not apply if another element is in between

Useful for styling elements based on their direct relation to others.

### Hover Selector (`:hover`)

The `:hover` selector applies styles when the user hovers over an element. 
```css
button:hover {
  background-color: lightgray;
}
```

-Changes the button's background when hovered
-Enhances interactivity for users

### Last Child Selector (`:last-child`)

The `:last-child` selector targets the last child of a parent. 

```css
li:last-child {
  font-weight: bold;
}
```

- Selects only the last li in each list
- Useful for styling the final item in a group

### Using Important 

Using `!important` forces a style, overriding all other rules. However, it should be used cautiously as it makes debugging harder.  

```css
input {
  background-color: yellow !important;
}
```  

### Combining Together 

How it all looks like:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-30-225703.png)

</div>

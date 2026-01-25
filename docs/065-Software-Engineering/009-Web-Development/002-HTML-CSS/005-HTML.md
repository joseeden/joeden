---
title: "HTML"
description: "Notes on HTML"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 5
last_update:
  date: 03/20/2019
---

## Overview 

HTML (HyperText Markup Language) is used for creating web pages. It structures content using elements like headings, paragraphs, links, and more.

In VSCode, create an `index.html` file, type `!`, and press `Tab`. This will generate a basic HTML structure automatically.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html> 
```

## Head and Body

Every HTML document has two main sections:

- **Head:** Contains metadata, styles, and scripts.
- **Body:** Contains the visible content of the webpage.

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to My Page</h1>
    <p>This is a simple HTML page.</p>
</body>
</html>
```

You can then test this by opening the HTML file in your web browser. Right-click on the file > Show in browser.

## Headings and Paragraph

Headings define the structure of content, and paragraphs hold text.

Example:

```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<p>This is a paragraph of text.</p>
```

💡 If you want to autopopulate a paragraph with random texts, you can type 'lorem' and press tab. It will generate a paragraph containing the *lorem ipsum* texts.


## Ordered Lists and Unordered Lists

Ordered lists (`<ol>`) display items in a numbered sequence, while unordered lists (`<ul>`) use bullet points.  

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>

<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>
```

Subfields:

- **Ordered List (`<ol>`)** – Uses numbers or letters to order items.  
- **Unordered List (`<ul>`)** – Uses bullets to list items.  
- **List Item (`<li>`)** – Represents each item inside a list.  

Lists can also be nested:

```html 
<ol>
  <li>Introduction to Computer Science
    <ul>
      <li>Monday - 10:00 AM to 12:00 PM</li>
      <li>Wednesday - 2:00 PM to 4:00 PM</li>
    </ul>
  </li>
  <li>Data Structures and Algorithms
    <ul>
      <li>Tuesday - 1:00 PM to 3:00 PM</li>
      <li>Thursday - 9:00 AM to 11:00 AM</li>
    </ul>
  </li>
  <li>Operating Systems
    <ul>
      <li>Monday - 3:00 PM to 5:00 PM
        <ul>
          <li>Room 101</li>
          <li>Room 102</li>
        </ul>
      </li>
      <li>Friday - 10:00 AM to 12:00 PM
        <ul>
          <li>Room 201</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>

```

Here's how it would look like:

1. Introduction to Computer Science
   - Monday - 10:00 AM to 12:00 PM  
   - Wednesday - 2:00 PM to 4:00 PM  
2. Data Structures and Algorithms
   - Tuesday - 1:00 PM to 3:00 PM  
   - Thursday - 9:00 AM to 11:00 AM  
3. Operating Systems
   - Monday - 3:00 PM to 5:00 PM  
     - Room 101  
     - Room 102  
   - Friday - 10:00 AM to 12:00 PM  
     - Room 201  




## Meta Tags

Meta tags provide extra information about a webpage. They help with mobile responsiveness and text encoding.  

- The `viewport` meta tag ensures the page works well on mobile devices  
- The `charset` meta tag defines the text encoding format  

Adding these tags improves compatibility and readability on different devices.  

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
```

This setup makes the page mobile-friendly and ensures proper text display.  


## Self-Closing Tags  

Self-closing tags do not require a closing tag because they don’t wrap content. They are commonly used for elements that insert media, line breaks, or metadata.  

Example Tags: `<br>`, `<img>`, `<hr>`, `<meta>`, `<input>`  

```html
<img src="image.jpg" alt="Sample Image">
<br>
<input type="text" placeholder="Enter name">
```

## Anchor Tag  

The `<a>` tag is used to create hyperlinks in HTML, allowing navigation between web pages.  

```html
<a href="https://www.example.com">Visit Example</a>
```

## `class` and `id`

Classes and IDs help style and identify elements uniquely.

Example:

```html
<p class="info">This is a paragraph with a class.</p>
<p id="unique">This is a paragraph with an ID.</p>
```

If you [linked a CSS file](#linking-css) to this HTML file, you can reference the classes by:

```css
.info {
  color: #661e46;
}
```


## Linking CSS

To apply CSS to an entire page, use the `<style>` tag inside the `<head>`.

```html
<head>
    <style>
        body {
            background-color: #62bbd9;
        }
    </style>
    <title>Hello World</title>
</head>
```

In practice, styles are placed in a separate CSS file and linked in the HTML.

```html
<head>
    <link href="./style.css" rel="stylesheet" />
    <title>Hello World</title>
</head>
```

## Custom Attributes (`data-*`) 

You can create your own custom attributes using the `data-` prefix; this allows you to store extra information on an element without affecting its functionality. These are called **data attributes** and are commonly used to embed custom data in HTML elements.

For example:

```html
<button class="show-modal" data-modal-target="modal-1">Choose your Pokemon!</button>
```

The `data-` prefix allows you to define your custom attribute, like `data-modal-target`, which doesn't interfere with the element’s normal behavior. 

**Why use `data-*` attributes?**

- Use them to store additional data on HTML element that can be accessed by JavaScript.
- Simple, flexible in associating metadata with elements (like linking a button to a modal).
- They don't interfere with the layout or styling of the page.

**Accessing the `data-*` attributes in JavaScript**

You can  access them using JavaScript by using the `getAttribute()` method or directly through the `dataset` property:

```javascript
const button = document.querySelector('.show-modal');
console.log(button.getAttribute('data-modal-target')); // "modal-1"

// Or using dataset
console.log(button.dataset.modalTarget); // "modal-1"
```

## Remove Default Browser Styles  

Browsers apply default CSS styles to elements, which can affect layout and spacing. 

- Some browsers add predefined margins and paddings  
- This can cause unexpected spacing in layouts  

To ensure consistent styling, you can reset these defaults.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-25-045823.png)

</div>

A common way is to remove default margins and paddings by setting them to `0`. 

```css
body {
  margin: auto 0;
  /* padding: 0;     ----> Optional */
}
```

Now, the body element will have no extra space.


<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-25-050034.png)

</div>

## Formatting HTML 

When working with HTML, it's common to place multiple attributes in a single line:

```html
<ul class="navbar-nav me-auto mb-2 mb-lg-0 navbar-items left-nav-items">

  <!-- ... list inside here ... -->

</ul>
```

You can also format it like this for better visual clarity:

```html
<ul class="navbar-nav 
           me-auto 
           mb-2 
           mb-lg-0 
           navbar-items">

  <!-- ... list inside here ... -->

</ul>
```

But searching for the whole line with all its attributes in your local IDE can be hard when it's formatted like this, especially if you want to find or change specific parts during development.

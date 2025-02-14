---
title: "HTML"
description: "Notes on HTML"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 10
last_update:
  date: 07/20/2019
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

## Forms

Forms allow user input through text fields, buttons, and more.

Example:

```html
<form>
    <p class="first">Please fill in this form</p>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <button type="submit">Submit</button>
</form>
```

Another way to write the form:

```html
  <form id="user-information">
    <p class="first">Please fill in this form</p>
    <input type="text" placeholder="First Name">
    <button>OK!</button>
  </form>
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


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

## Creating Forms 

The following is an example of an HTML registration form. 

- Set `type="email"` to ensures input is validated and follows proper email format.
- `required` attribute prevents users from leaving the field blank.  
- `name` attribute for gender buttons ensures only one option can be selected at a time. 
- `reset` button clears all inputs, and the checkboxes allow multiple selections.
- `select` with `option` allows users to choose from predefined choices in a dropdown.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register</title>
</head>
<body>
  <form>
    <label for="first-name">First Name:</label>
    <input type="text" id="first-name" required><br>

    <label for="last-name">Last Name:</label>
    <input type="text" id="last-name" required><br>

    <label for="email">Email:</label>
    <input type="email" id="email" required><br>

    <label for="birthday">Birthday:</label>
    <input type="date" id="birthday"><br>

    <label>Gender:</label><br>
    <input type="radio" name="gender" value="Male" id="male">
    <label for="male">Male</label><br>
    
    <input type="radio" name="gender" value="Female" id="female">
    <label for="female">Female</label><br>
    
    <input type="radio" name="gender" value="Other" id="other">
    <label for="other">Other</label><br>

    <label>Pets:</label><br>
    <input type="checkbox" name="pets" value="Cats" id="cats">
    <label for="cats">Cats</label><br>

    <input type="checkbox" name="pets" value="Dogs" id="dogs">
    <label for="dogs">Dogs</label><br>

    <label>Cars:</label><br>
    <select>
      <option value="audi" name="audi"><br>
        Audi
      </option>
      <option value="mercedes" name="mercedes"><br>
        Mercedes Benz
      </option>
      <option value="nissan" name="nissan"><br>
        Nissan
      </option>
    </select><br>

    <input type="submit" value="Register">
    <input type="reset" value="Reset">
  </form>
</body>
</html> 
```

How it looks like:

<div class="img-center"> 

![](/img/docs/html-samplesssss.png)

</div>


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

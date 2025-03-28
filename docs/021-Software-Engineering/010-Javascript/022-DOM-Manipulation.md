---
title: "DOM Manipulation"
description: "Manipulating the Document Object model (DOM)"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 22
last_update:
  date: 12/26/2020
---

## Overview 

When a web page loads, the browser creates the Document Object Model (DOM).  

- DOM represents the page as a structured tree  
- It lets JavaScript access and modify HTML elements  
- The `document` object is how JavaScript interacts with the DOM  

For more information, please see [Document Object Model (DOM).](/docs/021-Software-Engineering/010-Javascript/021-DOM.md)

## Select Elements in the DOM

We can use selectors to choose elements of the DOM and manipulate them.
 
- `getElementsByTagName` selects elements by tag name
- `getElementsByClassName` selects elements by class name
- `getElementById` selects an element by ID

These selectors are useful, but they return collections instead of single elements (except for `getElementById`).

:::info 

We'll be using this [sample HTML](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/010-Javascript/Projects/001-hello-world/003-DOM) for the examples

:::



## Check Browser Compatibility

Before using features, it's good practice to check browser support.

- `querySelector` and `querySelectorAll` are widely supported
- Use [Can I Use](https://caniuse.com/) to check compatibility

## Setting Attributes

We can get and modify attributes of elements.

- `getAttribute` retrieves an attribute value
- `setAttribute` updates an attribute

These methods allow interaction with custom and built-in attributes.

```js
let firstItem = document.querySelector("li");
console.log(firstItem.getAttribute("random")); // Gets the value
firstItem.setAttribute("random", "1000"); // Sets a new value
```

## Query Selectors

Query selectors are more flexible and work like CSS selectors.

- `querySelector` selects the first matching element
- `querySelectorAll` selects all matching elements

Example: 

```js
let heading = document.querySelector("h1");
let items = document.querySelectorAll("li");
```

## Modifying the DOM  

Given the sample HTML below:  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM Example</title>
</head>
<body>
    <p class="number">10</p>
    <input type="text" class="guess" />
    <button class="check">Check</button>
</body>
</html>
```  

To set the value of a `class` in the DOM, use `querySelector` with `textContent`. In the example below, we change the text inside the `.number` element to `"20"`:  

```js
document.querySelector('.number').textContent = 20;
```  

To set the value of an `input`, use `value`:  

```js
document.querySelector('.guess').value = 15;
```  

## Changing Styles

We can modify styles directly or use classes.

- `element.style.property` updates styles inline
- `className` changes the entire class
- `classList.add/remove/toggle` manages multiple classes

Using `classList` is better than modifying inline styles since it keeps structure separate from design.

```js
let title = document.querySelector("h1");
title.style.background = "yellow"; // Inline style

title.className = "cool-title"; // Replaces all classes
title.classList.add("highlight"); // Adds a class
title.classList.remove("cool-title"); // Removes a class
title.classList.toggle("dark-mode"); // Toggles a class
```

## Handling Events 

An **event** is something that happens on a web page, like a mouse click or a key press. We can use an **event listener** to detect when an event occurs and then react to it.  

The code below listens for a click on the `.check` button, then logs the value of the input field `.guess`.  

```js
document.querySelector('.check').addEventListener('click', function() {
    console.log(document.querySelector('.guess').value);
});
```  

An **event handler** is the function that runs when the event happens. In this case, it retrieves and logs the input value.  


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

## Selecting Elements 

We can use selectors to choose elements of the DOM and manipulate them.
 
- `getElementsByTagName` selects elements by tag name
- `getElementsByClassName` selects elements by class name
- `getElementById` selects an element by ID

These selectors are useful, but they return collections instead of single elements (except for `getElementById`).

:::info 

This [sample HTML](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/010-Javascript/Projects/001-hello-world/003-DOM) will be used for the succeeding examples.

:::

In the example below, we can use selectors to access headers and classes.

<div class="img-center"> 

![](/gif/docs/js-dom-2.gif)

</div>


## Query Selectors

Query selectors are more flexible and work like CSS selectors.

- `querySelector` selects the first matching element
- `querySelectorAll` selects all matching elements

Example: 

```js
let heading = document.querySelector("h1");
let items = document.querySelectorAll("li");
```

In this example, we have a list defined in the HTML. When we use `querySelector` on lists, it only retrieves the first item it sees. On the other hand, `querySelectorAll` will retrieve all the items.

<div class="img-center"> 

![](/gif/docs/js-dom-3.gif)

</div>

## Check Browser Compatibility

Before using features, it's good practice to check browser support.

- `querySelector` and `querySelectorAll` are widely supported
- Use [Can I Use](https://caniuse.com/) to check compatibility

## Getting Attributes

We can get and modify attributes of elements.

- `getAttribute` retrieves an attribute value
- `setAttribute` updates an attribute

In this example, the object is retrieved using `querySelector`, and its attribute is then accessed. The attribute can also be modified using `setAttribute`, but this only updates the element in the DOM, not the original HTML file.

<div class="img-center"> 

![](/gif/docs/js-dom-4.gif)

</div>


## Updating a Class 

:::info 

This [sample HTML](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/010-Javascript/Projects/001-hello-world/003-DOM) will be used for the succeeding examples.

:::

To set the value of a `class` in the DOM, use `querySelector` with `textContent`. In the example below, we change the text inside the `.description` class:  

```js
document.querySelector(".description").textContent = "These are the course list for the 2020 curriculum";
```  

Note that this will change the value of the class in the DOM but it will not modify the original HTML file.

<div class="img-center"> 

![](/gif/docs/js-dom-5.gif)

</div>


We could also set the value of an `input`, using`value`:  

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
document.querySelector("h1");
document.querySelector("h1").style.background = "yellow";    // Inline style

document.querySelector("h1").className = "large";       // Replaces all classes
document.querySelector("h1").classList.add("arial");     // Adds a class
document.querySelector("h1").classList.remove("red"); // Removes a class
document.querySelector("h1").classList.toggle("red");  // Toggles a class
```

Note that the changes made in the console only update the DOM and do not modify the original HTML. As a result, refreshing the page will revert all changes to the original settings defined in the HTML file.

<div class="img-center"> 

![](/gif/docs/js-dom-6.gif)

</div>

## `innerHTML` 


## Handling Events 

An **event** is something that happens on a web page, like a mouse click or a key press. We can use an **event listener** to detect when an event occurs and then react to it.  

The code below listens for a click on the `.check` button, then logs the value of the input field `.guess`.  

```js
document.querySelector('.check').addEventListener('click', function() {
    console.log(document.querySelector('.guess').value);
});
```  

An **event handler** is the function that runs when the event happens. In this case, it retrieves and logs the input value.  


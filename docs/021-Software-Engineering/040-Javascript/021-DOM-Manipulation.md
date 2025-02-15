---
title: "DOM Manipulation"
description: "Manipulating the Document Object model (DOM)"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 21
last_update:
  date: 12/24/2020
---


## Overview 

The DOM allows JavaScript to access and manipulate HTML elements and styles.  

- The browser automatically creates the DOM as soon as the HTML loads.  
- It represents the page as objects that JavaScript can interact with.  

The DOM is stored in a tree structure, where each element is an object. The document at the top serves as the entry point, and you can use `document.querySelector` to select elements.  


## DOM Tree Structure  

The DOM is structured like a tree.  

- The first child element is usually the `HTML` element because it is the root of all HTML documents.  
- `HTML` typically has two child elements: `Head` and `Body`.  
- As you go deeper, more child elements are added, forming the complete DOM tree.  

<div class="img-center">  

![](/img/docs/12232020-dom-manipulation.png)  

</div>  


## DOM is not JavaScript  

The DOM is part of the Web APIs, which are libraries browsers provide to interact with web pages.  

- JavaScript uses the DOM API to manipulate web pages
- However the DOM itself is **not part of JavaScript**.  
- Other Web APIs include timers, Fetch API, and many more.  

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


## Handling Events 

An **event** is something that happens on a web page, like a mouse click or a key press. We can use an **event listener** to detect when an event occurs and then react to it.  

The code below listens for a click on the `.check` button, then logs the value of the input field `.guess`.  

```js
document.querySelector('.check').addEventListener('click', function() {
    console.log(document.querySelector('.guess').value);
});
```  

An **event handler** is the function that runs when the event happens. In this case, it retrieves and logs the input value.  


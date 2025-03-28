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


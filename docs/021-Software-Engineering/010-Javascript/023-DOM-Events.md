---
title: "DOM Events"
description: "DOM Events"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 23
last_update:
  date: 12/27/2020
---


## Handling Events 

An **event** is something that happens on a web page, like a mouse click or a key press. We can use an **event listener** to detect when an event occurs and then react to it.  

The code below listens for a click on the `.check` button, then logs the value of the input field `.guess`.  

```js
document.querySelector('.check').addEventListener('click', function() {
    console.log(document.querySelector('.guess').value);
});
```  

An **event handler** is the function that runs when the event happens. In this case, it retrieves and logs the input value.  


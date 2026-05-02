---
title: "Javascript Engine"
description: "Javascript Engine and Runtime"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 7
last_update:
  date: 12/21/2020
---

## Overview  

A JavaScript engine is a program that interprets and executes JavaScript code. Every browser has its own engine, but the most popular one is Google’s **V8**, which powers both Google Chrome and Node.js.

## Components  

Every JavaScript engine has two main components: the call stack and the heap. These are used to manage and store the data and execution contexts while running JavaScript code.

- **Call Stack**  
  - Where functions are executed in a last-in, first-out (LIFO) order.  
  - It keeps track of the execution context for each function call.  
  - It helps manage function calls and handles the flow of execution.

- **Heap**  
  - Unstructured pool of memory used for dynamic memory allocation.  
  - stores objects that the application needs during execution.

## Just-in-Time Compilation  

Just-in-Time (JIT) compilation is used by JavaScript engines to improve performance. It converts JavaScript code into machine code at runtime, and is then executed immediately. In this scenario, there's no portable file to execute unlike on compiled languages.

<div class="img-center"> 

![](/img/docs/compile-interpret-jit.png)

</div>

## How JavaScript Works in the Browser

JavaScript runs inside the browser, just like HTML and CSS. 

- JavaScript is a file, just like HTML and CSS
- It can be written inside HTML or linked as a separate file

Using JavaScript in a separate file is better because it keeps things organized.

## Adding JavaScript to HTML

To add JavaScript, we use the `<script>` tag.

- JavaScript can be written inside a `<script>` tag in HTML
- It can also be linked using the `src` attribute, like CSS `href`
- Multiple script files can be included

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript in HTML</title>
</head>
<body>
    <h1>JavaScript in HTML</h1>

    <script>
        alert("Hello!");
    </script>
</body>
</html>
```

This will show an alert when the page loads.

## Using an External JS File

Instead of writing JavaScript inside HTML, we can put it in a separate file.

- Create a file called `script.js`
- Add JavaScript code inside it
- Link it in HTML using `<script src="script.js"></script>`

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript in HTML</title>
</head>
<body>
    <h1>JavaScript in HTML</h1>

    <script src="script.js"></script>
</body>
</html>
```

Example: `script.js`:

```js
alert("You're smart!");
```

## Multiple JS Files 

If you have multiple Javscript files, you can also add them the same way:


```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript in HTML</title>
</head>
<body>
    <h1>JavaScript in HTML</h1>

    <script src="script.js"></script>
    <script src="first-script.js"></script>
    <script src="second-script.js"></script>
    <script src="third-script.js"></script>
</body>
</html>
```

## Where to Place `<script>` in HTML

The position of `<script>` affects how the page loads.

- Placing `<script>` at the top delays content loading
- Placing `<script>` at the bottom lets the page load first
- Users see content faster if JavaScript loads last

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript in HTML</title>
</head>
<body>
    <h1>Not waiting for JavaScript</h1>

    <script src="script.js"></script>
</body>
</html>
```

Putting `<script>` at the bottom ensures the page loads before running JavaScript.

## Logging to the Console

Instead of showing alerts, we can log messages in the console.

- Use `console.log("message")` to print messages
- Open the browser console to see the output
- This helps in debugging

Example:

```js
console.log("Hello!");
```

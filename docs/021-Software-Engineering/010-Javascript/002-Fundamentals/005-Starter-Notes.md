---
title: "Starter Notes"
description: "Notes on Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 5
last_update:
  date: 12/21/2020
---


## Hello World 

Open Google Chrome > Ctrl + ShiFt + J > Developer Tools > Console > Type the following:

```javascript
alert("Hello World!") 
```

A pop-up window will appear at the top. This is the alert window.

![](/img/docs/12072024-js-hello-world.png)

Type in the command below and hit enter. Notice that it won't open an alert window. This is because it is evaluating the `if` condition. Since the `if` condition is not met, then it did not evaluate the alert message.

```bash
let js = 'boring'
if (js === 'amazing') alert('Javascript is FUN!') 
```

![](/img/docs/12072024-js-IF-EXAMPLE.png)


## In a Nutshell
 
JavaScript is a high-level, object-oriented, and multi-paradigm programming language that powers the dynamic and interactive aspects of web development. Here's a summary of its role:

- **High-Level Language**- Simplify complex processes like memory management using abstractions.

- **Object-Oriented**- Uses objects to organize and store data; foundation for programming techniques.

- **Multi-Paradigm**- Supports coding styles, including imperative and declarative programming.

In web development, JavaScript complements HTML (content) and CSS (style) by:

- Adding interactivity
- Manipulating content and styles
- Loading data from servers
- Creating full web applications. 

For instance, it enables dynamic effects like loading and displaying content, toggling visibility (e.g., tweet boxes), and showing data on hover, as seen on platforms like Twitter.


## Garbage-Collected

JavaScript automatically manages memory allocation and deallocation through a garbage collector. The garbage collector identifies unused memory and frees it up without the need for explicit memory management. This helps avoid memory leaks and ensures efficient resource usage.

## First-class Functions  

In JavaScript, functions are treated as first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions. This allows for high flexibility in programming.  

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

function callFunction(fn, name) {
  console.log(fn(name));
}

callFunction(greet, 'Alice'); // Output: Hello, Alice!
```

## Non-Blocking Event Loop  

JavaScript operates on a non-blocking event loop; this allows it to perform multiple tasks concurrently without waiting for one task to finish before starting another. This makes JavaScript highly efficient for handling asynchronous operations like I/O or network requests.

- Javascript runs in **single-thread** - it can only do one thing at a time.
- Long running tasks are placed and ran at the "background".
- Once finished, they are placed back at the main thread.

## Frameworks  

JavaScript frameworks simplify web development by providing reusable components and tools for faster application creation.  

- **React**  
  - Focuses on building dynamic user interfaces  
  - Uses a component-based architecture  

- **Angular**  
  - Full-featured framework for single-page applications  
  - Offers tools for routing and data binding  


## Javascript Releases 

JavaScript has evolved from ES5 to modern versions, starting with ES6 in 2015. Features like strict mode, promises, async/await, optional chaining, and BigInt enhance functionality. New versions are released yearly, often referred to as modern JavaScript.

![](/img/docs/12072024-js-releases.png)


## Inline and External scripts

An inline script is the Javascript code that is embedded another HTML file. To separate the website conten from the JavaScript logic, we can use external Javascript files and link them to the HTML file like this:

```bash
<script src="/path/to/name-of-script.js"></script>
```

## Data Types 

In JavaScript, values are either objects or primitive data types. These are the primitive data types:

- **Number**: All numbers are floating-point, even integers like `23` (i.e., `23.0`).

  ```javascript
  let num = 23; // Can be an integer or a floating-point number
  console.log(num); // Output: 23
  ```

- **String**: A sequence of characters, enclosed in quotes (single or double).

  ```javascript
  let str = "Hello, world!";
  console.log(str); // Output: Hello, world!
  ```

- **Boolean**: Logical values, either `true` or `false`.

  ```javascript
  let isActive = true;
  console.log(isActive); // Output: true
  ```

- **Undefined**: A variable declared but not assigned a value.

  ```javascript
  let x;
  console.log(x); // Output: undefined
  ```

- **Null**: Represents an empty value, used in different contexts than `undefined`.

  ```javascript
  let y = null;
  console.log(y); // Output: null
  ```

- **Symbol**: A unique, immutable value used in specific scenarios (introduced in ES2015).

  ```javascript
  let sym = Symbol('unique');
  console.log(sym); // Output: Symbol(unique)
  ```

- **BigInt**: For very large integers (introduced in ES2020).

  ```javascript
  let bigIntVal = 9007199254740991n; // 'n' denotes a BigInt
  console.log(bigIntVal); // Output: 9007199254740991n
  ```



## Code Commenting

Javscript will completely ignore the comments during execution.

  - **Single-line comments**: Use `//` to comment out a line.
  - **Multi-line comments**: Use `/* */` to comment multiple lines of code.


## Activating Strict Mode

Strict mode in JavaScript helps catch common coding mistakes and improves performance by enforcing stricter parsing and error handling. 

**Example 1: Global Strict Mode**

```js
"use strict";     // Enables strict mode for the entire script

x = 10;           // Throws an error because 'x' is not declared
```

**Example 2: Function-Level Strict Mode**

```js
function myFunction() {
  "use strict";   // Enables strict mode within this function
  y = 20;         // Throws an error because 'y' is not declared
}
myFunction();
``` 

Strict mode helps avoid issues like using undeclared variables or assigning values to read-only properties.


## Transpiling to ES5 

During development, you can use the latest features in JavaScript, such as ES6+, by testing in modern browsers like Google Chrome. However, in production, you need to transpile your code to ES5 using tools like **Babel** to ensure compatibility with older browsers.

- **ES5** is supported in all browsers, for broad compatibility.
- **ES6+** is supported in **most modern browsers** but may not work in older versions.

**Babel** is a tool that converts ES6+ code into ES5, which ensures your code runs across a wide range of browsers.
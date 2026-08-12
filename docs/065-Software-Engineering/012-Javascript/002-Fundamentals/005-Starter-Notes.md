---
title: "Starter Notes"
description: "Notes on Javascript"
tags: 
- Web Development
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

<div class='img-center'>

![](/img/docs/12072024-js-IF-EXAMPLE.png)

</div>

## Testing with VS Code Live Server

Instead of using Developer Tools in a browser, you can also test JavaScript code using **VS Code** with the **Live Server** extension. This allows you to run your HTML and JavaScript files in a local development server and see changes in real-time. 

First, open VS Code and create a folder with the following files (filenames can be different):

```text
javascript-test/
├── index.html
└── script.js
```

Add the following to `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Test</title>
</head>
<body>

  <script src="script.js"></script>
</body>
</html>
```

Add your JavaScript code to `script.js`:

```js
var userName = prompt("What is your name?");

alert("Hello " + userName);

console.log(userName);
```

Next, run the Code using **Live Server**

1. Install the **Live Server** extension in VS Code. 
2. Right-click on `index.html` and select **Open with Live Server**.
3. This will open your default web browser and load the `index.html` file.
4. Use the browser Developer Tools **Console** to view `console.log()` output.
5. Edit and save `script.js`, then refresh the browser to test your changes.

**Why Not Run `script.js` with Node.js?**

You can run standard JavaScript from the VS Code terminal using **node**:

```bash
node script.js
```

However, Node.js does not provide browser-specific features such as:

```js
prompt()
alert()
document
window
```

For example:

```js
var userName = prompt("What is your name?");
```

will return an error when executed with Node.js:

```text
ReferenceError: prompt is not defined
```

If the JavaScript uses browser features such as `prompt()`, use an HTML file and run the code in a browser instead.

For simple testing that doesn't require browser features, you can use Node.js. 

1. Install Node.js from [nodejs.org](https://nodejs.org/).

2. Open a terminal in VS Code and run:

    ```bash
    node 
    ```

    The `>` prompt indicates that Node.js is ready to accept JavaScript commands.

    Example:

    ```bash
    joseeden@PC1:Git$ node

    Welcome to Node.js v20.20.2.
    Type ".help" for more information.
    >  
    ```

## In a Nutshell
 
JavaScript is a high-level, object-oriented, and multi-paradigm programming language that powers the dynamic and interactive aspects of web development. 

- **High-Level Language** - Simplify complex processes like memory management using abstractions.

- **Object-Oriented** - Uses objects to organize and store data; foundation for programming techniques.

- **Multi-Paradigm** - Supports coding styles, including imperative and declarative programming.

In web development, JavaScript complements HTML (content) and CSS (style) by:

- Adding interactivity
- Manipulating content and styles
- Loading data from servers
- Creating full web applications. 

For instance, it enables dynamic effects like loading and displaying content, toggling visibility (e.g., tweet boxes), and showing data on hover, as seen on platforms like Twitter.


## Garbage-Collected

JavaScript automatically manages memory allocation and deallocation through a garbage collector. The garbage collector identifies unused memory and frees it up without the need for explicit memory management. This helps avoid memory leaks and ensures efficient resource usage.

## First-class Functions  

In JavaScript, functions are treated as *first-class citizens*, which means they can be:

- Stored in a variable and called using the variable name 

    ```javascript
    const greet = function () {
      console.log("Hello!");
    };

    greet();
    ```

- Passed as arguments to other functions

    ```javascript
    // "greet" is passed to "processUser" as an argument.
    function greet(name) {
      console.log(`Hello, ${name}!`);
    }

    function processUser(callback) {
      callback("Alice");
    }

    processUser(greet);
    ```

- Returned from other functions

    ```javascript
    // "createGreeting()" returns a function, which is stored in "sayHello"
    function createGreeting(greeting) {
      return function (name) {
        console.log(`${greeting}, ${name}!`);
      };
    }

    const sayHello = createGreeting("Hello");

    sayHello("Alice");
    ```

For more information, please see [Functions.](/docs/065-Software-Engineering/012-Javascript/002-Fundamentals/021-Functions.md)


## Non-Blocking Event Loop  

JavaScript operates on a non-blocking event loop. This allows it to perform multiple tasks concurrently without waiting for one task to finish before starting another. This makes JavaScript highly efficient for handling asynchronous operations like I/O or network requests.

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

JavaScript has evolved from ES5 to modern versions, starting with ES6 in 2015. Features like strict mode, promises, async/await, optional chaining, and BigInt enhance functionality. New versions are released yearly, which are often referred to as *modern JavaScript*.

![](/img/docs/12072024-js-releases.png)


## Transpiling to ES5 

During development, you can use modern JavaScript features such as ES6+. However, older browsers may not support these features.

**Transpiling** means converting modern JavaScript into an older version of JavaScript that is more widely supported.

- **ES5** provides broad compatibility with older browsers.
- **ES6+** provides newer JavaScript features but may not be supported by older browsers.
- **Babel** is a common tool used to transpile ES6+ code into ES5.

For example:

```javascript
// Modern JavaScript (ES6+)
const greet = (name) => `Hello, ${name}!`;

// Transpiled JavaScript (ES5)
var greet = function(name) {
  return "Hello, " + name + "!";
};
```


## Inline and External scripts

An inline script is the Javascript code that is embedded another HTML file. 

```html
<!doctype html>

<html>
  <head>
    <link rel="stylesheet" href="lib/style.css">
  </head>

  <body>
    <h1>Hello Plunker!</h1>
    <script>
      console.log("Hello from the other side")
    </script>
  </body>
</html>
 
```
To separate the JavaScript logic from the website content, we can use external Javascript files and link them to the HTML file like this:

```html
<!doctype html>

<html>
  <head>
    <link rel="stylesheet" href="lib/style.css">
  </head>

  <body>
    <h1>Hello Plunker!</h1>
    <script src="/path/to/name-of-script.js"></script>
  </body>
</html>
```

The Javascript code is separated from the HTML code:

```js title="name-of-script.js"
console.log("Hello from the other side")
```

This is also useful if you want to link multiple Javascript  code which does different things:

```html
<script src="/path/to/name-of-script.js"></script> 
<script src="/path/to/some-other-script.js"></script> 
<script src="/path/to/another-script.js"></script> 
<script src="/path/to/could-be-useful-script.js"></script> 
```

## Code Commenting

JavaScript ignores comments when running the code. Comments are useful for adding notes or explaining what the code does.

- **Single-line comments**: Use `//` to comment out a single line.

    ```javascript
    // This is a single-line comment
    const name = "Alice";
    ```

- **Multi-line comments**: Use `/* */` to comment out multiple lines.

    ```javascript
    /*
    This is a multi-line comment.
    It can span multiple lines.
    */
    const name = "Alice";
    ```


## Strict Mode

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



## Javascript Playground 

Below are some online tools where you can play around Javascript without the need to install any software:

- [JS Bin](https://jsbin.com/)
- [Plunker](https://plnkr.co/)

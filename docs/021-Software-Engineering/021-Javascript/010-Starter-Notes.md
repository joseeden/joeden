---
title: "Starter Notes"
description: "Notes on Javascript"
tags: [Computer Science, Application Development, Software Development, Javascript]
sidebar_position: 10
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

Type in the command below and hit enter. NOtice that it won't open an alert window. This is because it is evaluating the `if` condition. Since the `if` condition is not met, then it did not evaluate the alert message.

```bash
let js = 'boring'
if (js === 'amazing') alert('Javascript is FUN!') 
```

![](/img/docs/12072024-js-IF-EXAMPLE.png)


## Javascript in a Nutshell
 
JavaScript is a high-level, object-oriented, and multi-paradigm programming language that powers the dynamic and interactive aspects of web development. Here's a summary of its role:

- **Programming Language**- Enables developers to write code that instructs computers to perform tasks.

- **High-Level Language**- Simplifies complex processes like memory management using abstractions, making it easier to learn and write.

- **Object-Oriented**- Uses objects to organize and store data, forming a foundation for programming techniques.

- **Multi-Paradigm**- Supports various coding styles, including imperative and declarative programming.

In web development, JavaScript complements HTML (content) and CSS (style) by:

- Adding interactivity
- Manipulating content and styles
- Loading data from servers
- Creating full web applications. 

For instance, it enables dynamic effects like loading and displaying content, toggling visibility (e.g., tweet boxes), and showing data on hover, as seen on platforms like Twitter.

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

An inline script is the javascript code that is embedded another HTML file. To separate the website conten from the JavaScript logic, we can use external Javascript files and link them to the HTML file like this:

```bash
<script src="/path/to/name-of-script.js"></script>
```

## Declaring a variable 

To declare a variable, use:

```bash
let firstName = "John";
let lirstName = "Smith";
```

To print in a browser:

```bash
console.log(firstName);
```

Illegal variable names:

- Starting with a number:

  ```bash
  let 123variablename = "John";
  ```

- Special characters except dollar sign (`$`)

  ```bash
  let first&last = John";
  ```

- Using reserved Javascript keywords

  ```bash
  let new = 123;
  ```


On the other hand, variables starting with an uppercase letter are not reallyy illegal and will still be allowed, but this is reserved for contants which will never change.

```JavaScript
let Collector = "John";   
```

An example of constant is the number `Pi`:

```bash
let PI = 3.1415; 
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
## Dynamic Typing

In JavaScript, variables don’t need explicit data type declarations. This means you don't need to specify the data type of the value that a variable contains.

  - The type is determined based on the assigned value.
  - Variables can change data types during execution
  - Javascript automatically determines the data type.
  - This enables flexibility but possibly leading to bugs.

## Code Commenting

Javscript will completely ignore the comments during execution.

  - **Single-line comments**: Use `//` to comment out a line.
  - **Multi-line comments**: Use `/* */` to comment multiple lines of code.

## Type Checking

  - Use the `typeof` operator to check the type of a value. 
  - **Bug with `null`**: `typeof null` returns "object" (a legacy issue).

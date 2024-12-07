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
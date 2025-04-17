---
title: "Variables"
description: "Variables in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 10
last_update:
  date: 12/21/2020
---


## Declaring Variables 

To declare a variable, use:

```bash
let firstName = "John";
let lirstName = "Smith";
```

To print in a browser:

```bash
console.log(firstName);
```

## Illegal Naming 

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

On the other hand, variables starting with an uppercase letter are not really illegal and will still be allowed, but this is reserved for contants which will never change.

```JavaScript
let Collector = "John";   
```

## Undeclared Variables 

When calling an undeclared variable, we'll get an error: 

![](/img/docs/12082024-js-undeclared0varss.png)

## Changing the Value of a Variable 

When defining a variable for the first time, we need to use the keyword `let`. If we need to change the value of an existing variable, we don't need to use `let` anymore.

![](/img/docs/12082024-js-changing-value-of-vars.png)

Note that when we use `let` to assign a value to a variable, we can change that value later, as seen below:

```bash
let x = 3;
x = 24; 
x = 51; 
x = 72; 
```

If we use `const`, the variable becomes fixed, meaning its value can't be changed. Trying to update it will cause an `Uncaught TypeError`.

```bash
const name = 'Ken'
name = 'Barbie` 
```

![](/img/docs/02022025-js-error.png)

`var` is the old way of defining variables prior to ES6, working the same way as `let`.

```bash
var job = 'developer';
job = 'architect';  
```

The main difference between the two is that:

- `var` is **function-scoped**, meaning it’s only accessible inside the function where it’s declared.
- `let` is **block-scoped**, which means it’s limited to the block `{}` where it’s defined.

Example of `var` (function-scoped):  

```bash
function example() {
  var name = "Alice";
  console.log(name);    // Works inside the function
}
console.log(name);      // Error: name is not defined
```  

Example of `let` (block-scoped):  

```bash
if (true) {
  let age = 30;
  console.log(age);     // Works inside the block
}
console.log(age);       // Error: age is not defined
```  

Because of this, `let` is safer to use in modern JavaScript.

## Dynamic Typing

In JavaScript, variables don’t need explicit data type declarations. This means you don't need to specify the data type of the value that a variable contains.

  - The type is determined based on the assigned value.
  - Variables can change data types during execution
  - Javascript automatically determines the data type.
  - This enables flexibility but possibly leading to bugs.
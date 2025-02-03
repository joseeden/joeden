---
title: "Functions"
description: "Functions in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 13
last_update:
  date: 12/21/2020
---


## Overview 

Functions in JavaScript are blocks of reusable code that perform a specific task. You can define a function and then call it when needed. 

Functions in JavaScript can be called before or after they are defined, due to hoisting.

```js
logger();             // Output: "My name is John"

function logger() {
  console.log("My name is John");
}
```


## Function Samples

- **Example 1: Simple Function**

    ```js
    function logger() {
      console.log("My name is John");
    }

    logger();       // Output: "My name is John"
    ```

- **Example 2: Function with Argument**

    ```js
    function greet(name) {
      console.log(`Hello, ${name}!`);
    }

    greet("Alice");  // Output: Hello, Alice!
    ``` 

- **Example 3: Function with Multiple Arguments**

    ```js
    function add(a, b) {
      return a + b;
    }

    console.log(add(5, 3));  // Output: 8
    ```

- **Example 4: Function with Default Parameters**

    ```js
    function greet(name = "Guest") {
      console.log(`Hello, ${name}!`);
    }

    greet("Alice");  // Output: Hello, Alice!
    greet();         // Output: Hello, Guest!
    ```

    Here, the `greet` function uses a default parameter (`"Guest"`) if no argument is passed in.

- **Example 5: Returning Values from Functions**

    ```js
    function multiply(a, b) {
      return a * b;
    }

    let result = multiply(4, 2);
    console.log(result);  // Output: 8
    ```

    The `multiply` function returns the product of `a` and `b`, and we store the returned value in the variable `result`.


## Anonymous Functions

Anonymous functions are functions that are not given a name. They are typically used as function expressions, which means they must be defined before they are called.

```js
const getAge = function (birthYear) {
  return 2025 - birthYear;
}

const actualAge = getAge(1990);
console.log(actualAge); 
```

Unlike function declarations, anonymous functions are function expressions and need to be defined first before you can call them.

![](/img/docs/02032025-js-anonoymous-functions.png)


## Arrow Functions 

Arrow functions provide a shorter syntax for writing functions. They are often more concise and don't require the `function` keyword.

Using the previous example:

```js
const getAge = function (birthYear) {
  return 2025 - birthYear;
}

const actualAge = getAge(1990);
console.log(actualAge);         // Output: 35
```

This can be rewritten using an arrow function:

```js
const getAge = birthYear => 2025 - birthYear;
const actualAge = getAge(1990) ;
console.log(actualAge);         // Output: 35
```

If we expand the function to compute how many years are left before retirement (assuming retirement age is 65):

```js
const yearsBeforeRetirement = birthYear => {
  const getAge = 2025 - birthYear;
  const retirement = 65 - getAge;
  return retirement;
}

const actualAge = yearsBeforeRetirement(1990);
console.log(actualAge);         // Output: 30
```

## Multiple Parameters

You can pass multiple parameters to a function. 

```js
const yearsBeforeRetirement = (birthYear, firstName) => {
  const getAge = 2025 - birthYear;
  const retirement = 65 - getAge;
  return `${firstName} will retire in ${retirement} years`;
}

const actualAge = yearsBeforeRetirement(1990, 'John');
console.log(actualAge); 
```

This will return:

```plaintext 
John will retire in 30 years 
```

Modifying a bit, you can try running the functions with different values:

```js
console.log(yearsBeforeRetirement(1990, 'John'));
console.log(yearsBeforeRetirement(1988, 'Ted'));
console.log(yearsBeforeRetirement(1997, 'Andy'));
console.log(yearsBeforeRetirement(1979, 'Robin'));
```

Output:

```
John will retire in 30 years
Ted will retire in 28 years
Andy will retire in 37 years
Robin will retire in 19 years
```


## Calling Other Functions  

A function can call another function to reuse code and keep the logic organized.  

```js
const getAge = birthYear => 2025 - birthYear;

const yearsBeforeRetirement = (birthYear, firstName) => {
  const age = getAge(birthYear);
  const retirement = 65 - age;
  return `${firstName} will retire in ${retirement} years`;
}

console.log(yearsBeforeRetirement(1990, 'John'));
console.log(yearsBeforeRetirement(1985, 'Sarah'));
```

In this example, the  `yearsBeforeRetirement` function  is invoked twice with different inputs. This function will then invoke the `getAge` the age before computing for the remaining years before retirement.

```
John will retire in 30 years
Sarah will retire in 35 years
```
  

              
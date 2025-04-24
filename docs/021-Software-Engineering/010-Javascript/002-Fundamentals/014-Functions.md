---
title: "Functions"
description: "Functions in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 14
last_update:
  date: 12/21/2020
---


## Overview 

Functions in JavaScript are blocks of reusable code that perform a specific task. You can define a function and then call it when needed. 

- Some functions are built-in, like `alert()` and `prompt()`
- You can create your own functions

Example: 

```js
logger();             // Output: "My name is John"

function logger() {
  console.log("My name is John");
}
```


## Calling Functions

To run a function, use parentheses `()`. 

- Adding `logger()` runs the function
- Functions can take arguments inside `()`

Functions **can be called before or after they are defined**, due to **hoisting**.

```js

function logger() {
  console.log("My name is John");
}

logger();             // Output: "My name is John"
```

This can also be written as:

```js
logger();             // Output: "My name is John"

function logger() {
  console.log("My name is John");
}
```

## Creating Functions

You can create functions in two ways:

- **Function Declaration**

    ```javascript
    function sayHello() {
      console.log("Hello");
    }

    sayHello(); // Calls the function
    ```

- **Function Expression**

    ```javascript
    var sayBye = function() {
      console.log("Bye");
    };

    sayBye(); // Calls the function
    ```


## Using Arguments

We can also create a function that accepts an input. 

Example: The `calcAge` function accepts `birthYear` parameter, performs the operation, and returns the result.

```js
function calcAge(birthYear)  {
  const age = 2040 - birthYear 
  return age;
}
```

The function can be further simplified:

```js
function calcAge(birthYear) {
   return 2040 - birthYear
} 
```

:::info 

Without `return`, the function does not give back a result.

:::


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
const variable_name = function(parameter)  {
  // add operation here...
}
```

As an example, the function below doesn't have a function name but is assigned to the variable `getAge`. This variable will then hold the result, which is the age.

```js
const getAge = function(birthYear) {
  return 2040 - birthYear;
}

const actualAge = getAge(1990);
console.log(actualAge); 
```

Unlike function declarations, anonymous functions are **function expressions** and need to be defined first before you can call them. If you call the function before initiailize it, you will get an 'Uncaught ReferenceError`.

![](/img/docs/02032025-js-anonoymous-functions.png)


## Arrow Functions 

Arrow functions provide a shorter syntax for writing functions. They are often more concise and don't require the `function` keyword.

Using the previous example:

```js
const getAge = function (birthYear) {
  return 2040 - birthYear;
}

const actualAge = getAge(1990);
console.log(actualAge);         // Output: 35
```

This can be rewritten using an arrow function, where we specify first the parameter that it will accept (`birthYear`) and then use the "arrow" to specify the operation.

```js
birthYear => 2040 - birthYear;
```

To store the result, we can assign the function to a variable and then printed out. 

```bash
const getAge = birthYear => 2040 - birthYear ;
console.log(getAge(1990));      
```

For better readability, we can assigne the `getAge` variable to the variable `actualAge` which will then be printed out.

```JS 
const getAge = birthYear => 2040 - birthYear;
const actualAge = getAge(1990) ;
console.log(actualAge);         // Output: 35
```

If we expand the function to compute how many years are left before retirement (assuming retirement age is 65):

```js
const yearsBeforeRetirement = birthYear => {
  const getAge = 2040 - birthYear;
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
  const getAge = 2040 - birthYear;
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
const getAge = birthYear => 2040 - birthYear;

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
  

              
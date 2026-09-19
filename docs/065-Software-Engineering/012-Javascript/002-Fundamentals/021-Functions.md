---
title: "Functions"
description: "Functions in Javascript"
tags: 
- Web Development
- Javascript
sidebar_position: 21
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

    A function declaration uses the function keyword followed by the function name.

    ```javascript
    function sayHello() {
      console.log("Hello");
    }

    sayHello(); // Calls the function
    ```

- **Function Expression**

    A function expression creates a function and assigns it to a variable.

    ```javascript
    var sayBye = function() {
      console.log("Bye");
    };

    sayBye(); // Calls the function
    ```


## Using Arguments

We can also create a function that accepts an input. 

In the example below, the `calcAge` function accepts `birthYear` parameter, performs the operation, and returns the result.

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


## Examples 

1. Simple function

    ```js
    function logger() {
      console.log("My name is John");
    }

    logger();       
    // Output: "My name is John"
    ```

2. Function with a single argument

    ```js
    function greet(name) {
      console.log(`Hello, ${name}!`);
    }

    greet("Alice");  
    // Output: Hello, Alice!
    ``` 

3. Function with multiple arguments

    ```js
    function add(a, b) {
      return a + b;
    }

    console.log(add(5, 3));  
    // Output: 8
    ```

4. Function with default parameters

    Here, the `greet` function uses a default parameter (`"Guest"`) if no argument is passed in.

    ```js
    function greet(name = "Guest") {
      console.log(`Hello, ${name}!`);
    }

    greet("Alice");  // Output: Hello, Alice!
    greet();         // Output: Hello, Guest!
    ```

    

5. Returning values from functions

    The `multiply` function returns the product of `a` and `b`, and we store the returned value in the variable `result`.

    ```js
    function multiply(a, b) {
      return a * b;
    }

    let result = multiply(4, 2);
    console.log(result);  
    // Output: 8
    ```

    The `multiply` function returns the product of `a` and `b`, and we store the returned value in the variable `result`.


## Anonymous Functions

Anonymous functions are functions that are not given a name. They are typically used as function expressions, which means they must be defined before they are called.

Syntax: 

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

Using the anonymour function example:

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

For better readability, we can assign the `getAge` variable to the variable `actualAge` which will then be printed out.

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


## Can You Just Use Arrow Functions?

For learning and most everyday JavaScript, you can default to arrow functions:

```js
const add = (a, b) => {
  return a + b;
}; 
```

Even make it shorter:

```js
const add = (a, b) => a + b; 
```

However, there are situations where a regular function is needed or more appropriate.

The biggest difference you'll encounter is `this`.

Regular functions have their own `this` behavior:

```js
const person = {
  name: "Alice",

  greet: function() {
    console.log(this.name);
  }
};

person.greet(); // Alice 
```

An arrow function does **not** create its own `this`:

```js
const person = {
  name: "Alice",

  greet: () => {
    console.log(this.name);
  }
};

person.greet(); // Not "Alice"
```

So using an arrow function as an object method like this can cause problems.

**A Simple Rule to Follow:**

If you want to minimize switching between formats, I'd use this rule:

| Situation                              | Use                               |
| -------------------------------------- | --------------------------------- |
| Normal function stored in a variable   | Arrow function                    |
| Callback function                      | Arrow function                    |
| `map()`, `filter()`, `forEach()`, etc. | Arrow function                    |
| Function that needs its own `this`     | Regular `function`                |
| Object method using `this`             | Regular function or method syntax |
| Constructor with `new`                 | Regular `function` / `class`      |

To keep my code consistent, I use arrow functions by default. When regular function behavior is required, I use a regular function instead.

I still recognize and understand anonymous function syntax because it is commonly used in existing JavaScript code, but I do not use it as my default style.

Sample anonymous function:

```js
button.addEventListener("click", function() {
  console.log("Clicked!");
}); 
```

Same example, but using an arrow function:

```js
button.addEventListener("click", () => {
  console.log("Clicked!");
});
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
  

              
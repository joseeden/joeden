---
title: "Operators"
description: "Operators in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 11
last_update:
  date: 12/21/2020
---



## Assignment Operators  

The `=` operator assigns values:  

```js
let x = 10 + 5;
```

Another assignment operator is `+=`, which adds and reassigns a value:  

```js
let x = 10 + 5;
x += 10; // Equivalent to x = x + 10
```

Now `x` becomes `25`.  

We can also use **post-increment** and **post-decrement** operators which are shorthand for incrementing or decrementing the variable.

```js
x++;    // Equivalent to x = x + 1
x--;    // Equivalent to x = x - 1
```

## Math Operators

Math operators are used to perform arithmetic calculations.

```js
let a = 10;
let b = 5;

console.log(a + b);  // Addition: 15
console.log(a - b);  // Subtraction: 5
console.log(a * b);  // Multiplication: 50
console.log(a / b);  // Division: 2
console.log(a % b);  // Modulo (remainder): 0
console.log(a ** b); // Exponentiation: 100000
```

## Comparison Operators  

Comparison operators are used to compare values and return `true` or `false` based on the result.

```js
let x = 10;
let y = 5;

console.log(x > y);  // Greater than: true
console.log(x < y);  // Less than: false
console.log(x == y); // Equal to: false
console.log(x != y); // Not equal to: true
console.log(x >= y); // Greater than or equal to: true
console.log(x <= y); // Less than or equal to: false
```

## Concatenating Strings 

One use case for the `+` operator is string concatenation, which means joining strings together.  

For example, we can create two variables:  

```js
let firstName = "John";
let lastName = "Smith";
```

Then, we can combine them using the `+` operator:  

```js
console.log(firstName + lastName);
```

To add a space between them, include a space string in the concatenation:  

```js
console.log(firstName + " " + lastName);
```

This results in "John Smith".  



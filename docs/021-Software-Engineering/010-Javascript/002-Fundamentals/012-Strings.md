---
title: "Strings"
description: "Strings"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 12
last_update:
  date: 12/21/2020
---


## Overview

Strings are used to store text in JavaScript and are enclosed in single (`'`), double (`"`), or backticks (`` ` ``).  

```js
let str1 = "Hello, World!";
let str2 = 'JavaScript is fun!';
console.log(str1);  // Output: Hello, World!
console.log(str2);  // Output: JavaScript is fun!
```

## Template Literals  

Template literals use backticks (`` ` ``) and allow embedding variables and expressions using `${}`.  

```js
let name = "Alice";
let message = `Hello, ${name}! Great to see you!`;
console.log(message);  // Output: Hello, Alice! Great to see you!
```

## Multiple Lines  

Strings can include new lines using `\n` or template literals with backticks (`` ` ``) for multi-line text.  

```js
// Using \n for new lines
let text1 = "Hello,\nJavaScript!";

console.log(text1);

// Using template literals for multi-line strings
let name = "Alice";
let text2 = `Hello ${name},
How are you doing?`;
console.log(text2);
```

## `length` 

To get how many characters a string has, you can use `.length`.

- Every string in JavaScript has a `.length`  
- It gives the total number of characters  

This makes it easy to count what you typed.

```javascript
var name = "Sam";
console.log(name.length);  // Output: 3
```

##  `slice`

The `slice` function helps you get parts of a string, like grabbing just the first few letters from a name.

- You choose where to start
- You choose where to stop (but not including that position)
- Counting starts from 0

Always follow this pattern:

```js
variable.slice(start, end)
```


### Getting the First Character 

To get the first character: 

```js
var name = "Archimedes";
var firstLetter = name.slice(0, 1);
console.log(firstLetter);
```

We count from position 0 and stop before position 1, so "A" is at index 0. 

### Getting the Last Character 

To get the last letter, count the positions properly.

```js
var name = "Archimedes";
var lastLetter = name.slice(9, 10);
console.log(lastLetter);
```

- Output: `s`
- The sixth letter is at index 5

Another way to write this:

```js
var name = "Archimedes";
var lastLetter = name.slice(-1);
console.log(lastLetter);
```

`-1` is always the last index, regardless of the length of the string.


### Getting a Range of Characters

You can also grab more than one character at a time.

```js
var name = "Archimedes";
var part = name.slice(0, 3);
console.log(part);
```

- Output: `Arc`
- Goes from 0 to 3 (but not including 3)

Quick trick: subtract the two numbers. 3 - 0 = 3 characters.



## Changing Cases 

### Uppercase and Lowercase 

You can turn a string into all uppercase or all lowercase letters using built-in methods.

- `.toUpperCase()` - Change all letters to uppercase  
- `.toLowerCase()` - Change all letters to lowercase  

```javascript
var name = "harry";
console.log(name.toUpperCase()); // Output: "HARRY"
```

If you want to update the variable:

```javascript
name = name.toUpperCase();
console.log(name);              // Output: "HARRY"
```

And to go back to lowercase:

```javascript
name = name.toLowerCase();
console.log(name);              // Output: "harry"
```

Changing the case like this is useful when you're handling input, especially if users type in names or emails in different styles.

### Capitalize Only the First Letter

Sometimes, you want only the first letter to be uppercase, like for names. 

```javascript
var userInput = prompt("What is your name?");
var cleanName = userInput.slice(0).toUpperCase() + userInput.slice(1).toLowerCase();
alert("Hello, " + cleanName);
```

If a user types "joHn", this will fix it to say “Hello, John”. This makes your output look better and more consistent, no matter what the user types.


## Type Conversion  

Type conversion refers to changing a value from one type to another, such as converting a number to a string or vice versa.

Converting a Number to a String:

```js
let num = 42;
let str = num.toString();   // Number to string
console.log(str);  // "42"
```

Converting a String to a Number:

```js
let str = "42";
let num = Number(str);  // String to number
console.log(num);  // 42
```

Example:

```javascript
const year = `1995`;
console.log(year, Number(year));
console.log(typeof(year), typeof(Number(year))); 
```

This will return:

```javascript
1995 1995
string number  
```

When the string is converted to a number, it allows arithmetic operations to be performed.

```js
console.log(Number(year) + 35)  // Output: 2030
```


## Type Coercion 

Type coercion is the automatic or implicit conversion of values from one data type to another. JavaScript will attempt to convert one or both of the values to make the operation possible.

**Using the previous example:**
Since the variable is a string, if we concatenate a number, JavaScript converts the number "35" to a string and appends it to the existing string. 

```js
const year = `1995`;
console.log(year + 35)          // Output: 199535
```

Note that JavaScript doesn't always perform type coercion in the same way for different operators. In the example below, JavaScript automatically converts the strings to numbers because these operators only work on numbers.

```js
console.log(`45` - `13` - `8`);   // Output: 24
console.log(`24` / `2`);          // Output: 12
console.log(`100` * `2`);         // Output: 100
console.log(`100` * `2`);         // Output: 100
console.log(`25` < `49`);         // Output: true
```

:::info 

It is a bad practice to rely on type coercion in JavaScript because it can lead to unpredictable behavior and bugs. To avoid these issues, it's better to explicitly convert data types before performing operations. 

:::

## Truthy and Falsy Values 

In JavaScript, **truthy** and **falsy** values are important for type coercion. **Falsy values** convert to `false` when coerced to a boolean. These include:

  1. `0`
  2. `""` (empty string)
  3. `undefined`
  4. `null`
  5. `NaN`

Any other value is **truthy** and converts to `true`.

```js
console.log(Boolean(0));       // false
console.log(Boolean(``));      // false
console.log(Boolean(`James`)); // true
console.log(Boolean({}));      // true
```


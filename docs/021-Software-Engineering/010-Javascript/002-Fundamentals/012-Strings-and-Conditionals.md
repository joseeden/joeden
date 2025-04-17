---
title: "Strings and Conditionals"
description: "Strings and Conditionals"
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


## Strings in JavaScript  

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

## If-Else  

The `if-else` statement in JavaScript allows you to execute different blocks of code based on a condition.  

```js
let age = 18;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
```

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

In JavaScript, **truthy** and **falsy** values are important for type coercion.
**Falsy values** convert to `false` when coerced to a boolean. These include:

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

## Implicit Coercion in Conditions

In JavaScript, type coercion happens automatically, such as in `if` statements:

```js
let money = 0;
if (money) {
  console.log(`Don't spend it all!`);
} else {
  console.log(`You should get a job.`); // This runs because 0 is falsy
}
```

Be cautious when checking if something is "defined" because falsy values like `0` might cause issues. Here, `height` is `undefined`, a falsy value, so the else block runs.

```js
let height;
if (height) {
  console.log(`Yay! Height is defined.`);
} else {
  console.log(`Height is undefined.`);
}
```

However, this can lead to issues. For instance, if height is set to `0`, it’s a valid number but still falsy:

```js
let height = 0;
if (height) {
  console.log(`Height is defined.`);
} else {
  console.log(`Height is undefined.`); // This also runs because 0 is falsy
} 
```

## The `switch` statement

The `switch` statement evaluates an expression and compares it with multiple cases. It executes the code block corresponding to the first matching case and skips the rest.

```js
const day = prompt("What day is it today?");

switch (day) {
  case 'Monday':
    console.log(`Attend the sprint retroactive today.`);
    break;
  case 'Tuesday':
    console.log(`Work on the feature requests today.`);
    break;
  case 'Wednesday':
    console.log(`Meeting with the Vendor in the afternoon.`);
    break;
  case 'Thursday':
    console.log(`Test the changes in Dev environment`);
    break;
  case 'Friday':
    console.log(`Update the team`);
    break;
  default:
    console.log("Invalid day");
}
```

The `prompt` function asks the user to input the day, and depending on the value, the code will log the related task for that day. If the user inputs a day that's not listed, it will output "Invalid day".

:::info 

The `switch` statement is case-sensitive, if the user enters "monday" (lowercase) instead of "Monday" (capitalized), the code will default to the `default` case and log "Invalid day".

:::
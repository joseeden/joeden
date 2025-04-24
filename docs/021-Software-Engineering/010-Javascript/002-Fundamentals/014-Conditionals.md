---
title: "Conditionals"
description: "Conditionals"
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

## If-Else  

The `if-else` statement in JavaScript allows you to execute different blocks of code based on a condition.  

```js
var age = 18;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
```

## Implicit Coercion

In JavaScript, [type coercion](/docs/021-Software-Engineering/010-Javascript/002-Fundamentals/012-Strings.md#type-coercion) refers to the automatic or implicit conversion of values from one data type to another. JavaScript will attempt to convert one or both of the values to make the operation possible.

It happens automatically, such as in `if` statements:

```js
var money = 0;
if (money) {
  console.log(`Don't spend it all!`);
} else {
  console.log(`You should get a job.`); // This runs because 0 is falsy
}
```

Be cautious when checking if something is "defined" because falsy values like `0` might cause issues. Here, `height` is `undefined`, a falsy value, so the else block runs.

```js
var height;
if (height) {
  console.log(`Yay! Height is defined.`);
} else {
  console.log(`Height is undefined.`);
}
```

However, this can lead to issues. For instance, if height is set to `0`, it’s a valid number but still falsy:

```js
var height = 0;
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
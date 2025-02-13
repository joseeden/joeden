---
title: "Data Structures"
description: "Data Structures in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 15
last_update:
  date: 12/21/2020
---



## Overview

Arrays are used to store multiple values in a single variable. Instead of creating multiple variables for different values, we can bundle them into an array.  

```js
const friends = ["Michael", "Steven", "Peter"];
console.log(friends);
```

Output:

```js
["Michael", "Steven", "Peter"]
```

Another way to create an array is using the `new Array()` syntax:  

```js
const years = new Array(1991, 1984, 2008, 2020);
console.log(years);
```

Output:

```js
[1991, 1984, 2008, 2020]`
```

## Accessing Array Elements  

Arrays are **zero-based**, meaning the first element is at index `0`.  

```js
const friends = ["Michael", "Steven", "Peter", "Ted"];
console.log(friends[0]); // "Michael"
console.log(friends[2]); // "Peter"
```

To get the number of elements in the list:

```js
console.log(friends.length) ;     // 4
```

We can also get the **last element** dynamically:  

```js
console.log(friends[friends.length - 1]); // "Ted"
```

## Modifying an Array  

Arrays can be modified even when declared with `const`.  

```js
const friends = ["Michael", "Steven", "Peter", "Ted"];
friends[2] = "Jay";
console.log(friends);
```

Output:

```js
["Michael", "Steven", "Jay, "Ted""]
```

However, we **cannot** reassign or override the entire array with this method:  

```js
friends = ["Bob", "Alice"]; // ❌ Error: Assignment to constant variable
```

## Arrays with Different Data Types  

An array can hold different types of values:  

```js
const person = ["James", "Smith", 2025 - 1991, "Architect"];
console.log(person);
```

Output:

```js
["James", "Smith", 34, "Architect"]
```

Arrays can also contain variables and another array.

```js
const person = ["James", "Smith", 25, "Architect"];     // first Array
const organization = 'ABC Holdings';                    // variable
const platform = ["Singapore", organization, person]
console.log(platform);
```

Output:

![](/gif/docs/02142025-array-nested-variables.gif)



## Adding Elements  

Methods for adding elements to an array.

- `push()` – Adds an element to the **end** of the array.
- `unshift()` – Adds an element to the **beginning** of the array.  

Example:

Add "Jay" to the end of the list:

```javascript
const friends = ["Michael", "Steven", "Peter"];
friends.push("Jay");  
console.log(friends); // ["Michael", "Steven", "Peter", "Jay"]
```

Add "John" to the end of the list:

```js 
friends.unshift("John");  
console.log(friends); // ["John", "Michael", "Steven", "Peter", "Jay"]
```



## Removing Elements  

Methods for removing elements from an array.

- `pop()` – Removes the **last** element.
- `shift()` – Removes the **first** element.

Example:

```javascript
const friends = ["Michael", "Steven", "Peter", "Jay"] 

friends.pop();  
console.log(friends); // ["John", "Michael", "Steven", "Peter"]

friends.shift();  
console.log(friends); // ["Michael", "Steven", "Peter"]
```



## Finding Elements  

Methods to check for elements in an array.

- `indexOf()` 

  – Returns the position of an element.
  - Returns `-1` if the element is not found.

- `includes()` 
  – Returns `true` if the element exists, `false` otherwise.
  - Checks for **strict equality** (no type coercion).

Example:

```javascript
console.log(friends.indexOf("Steven"));   // 1
console.log(friends.indexOf("Bob"));      // -1

console.log(friends.includes("Steven"));  // true
console.log(friends.includes("Bob"));     // false
```

Checking for string versus number:

```javascript
friends.push(23);                         
console.log(friends);                     // ['Michael', 'Steven', 'Peter', 23]
console.log(friends.includes("23"));      // false (string vs number)
console.log(friends.includes(23));        // true
```

## Using `includes()` in Conditionals  

The `includes()` method is useful for writing conditions.

```javascript
const friends = ["Michael", "Steven", "Peter", "Jay"] 

if (friends.includes("Peter")) {
  console.log("You have a friend called Peter.");
}
```

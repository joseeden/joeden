---
title: "Arrays"
description: "Arrays in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 13
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
const friends = ["Michael", "Steven", "Peter", "Jay", "Bob"];

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

## Access Parts with `splice`

`splice` is used to change an array by removing or adding items. It updates the original array.

**Example 1: Remove from a position**

```js
var colors = ["red", "blue", "green", "yellow", "pink", "black"];
var removed = colors.splice(3);

console.log(colors);      // ["red", "blue", "green"]
console.log(removed);     // ["yellow", "pink", "black"]
```

This removes everything starting from index 3. The original array is shortened, and the removed items are returned.

**Example 2: Remove a few items from a position**

```js
var colors = ["red", "blue", "green", "yellow", "pink", "black"];
var removed = colors.splice(2, 3);

console.log(colors);      // ["red", "blue", "black"]
console.log(removed);     // ["green", "yellow", "pink"]
```

This removes 3 items starting from index 2. The rest stay in the original array.

## Looping with `forEach`  

`forEach` is a simple way to loop through each item in an array and do something with it.

- Runs a function once for each item  
- Does not return a new array  
- Works only on arrays  

Example:

```javascript
var fruits = ["apple", "banana", "cherry"];

fruits.forEach(function(fruit) {
  console.log(fruit);
});
```

Output:

```bash
"apple"
"banana"
"cherry" 
```

In the example above, `forEach` runs the function once for each fruit. Each time, `fruit` holds the current item in the array, and `console.log` prints it. This is useful when you want to do something for every item in an array without changing the array itself.
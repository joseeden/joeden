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

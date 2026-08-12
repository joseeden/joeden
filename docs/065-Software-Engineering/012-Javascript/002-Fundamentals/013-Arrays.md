---
title: "Arrays"
description: "Arrays in Javascript"
tags: 
- Web Development
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
console.log(friends[0]);  // Output: "Michael"
console.log(friends[2]);  // Output: "Peter"
```

To get the number of elements in the list:

```js
console.log(friends.length) ;     
// Output: 4
```

We can also get the **last element** dynamically:  

```js
console.log(friends[friends.length - 1]); 
// Output: "Ted"
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
friends = ["Bob", "Alice"]; 
// Output: ❌ Error: Assignment to constant variable
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
console.log(friends); 
// Output: ["Michael", "Steven", "Peter", "Jay"]
```

Add "John" to the end of the list:

```js 
friends.unshift("John");  
console.log(friends); 
// Output: ["John", "Michael", "Steven", "Peter", "Jay"]
```


## Removing Elements  

Methods for removing elements from an array.

- `pop()` – Removes the **last** element.
- `shift()` – Removes the **first** element.

Example:

```javascript
const friends = ["Michael", "Steven", "Peter", "Jay"] 

friends.pop();  
console.log(friends); 
// Output: ["John", "Michael", "Steven", "Peter"]

friends.shift();  
console.log(friends); 
// Output: ["Michael", "Steven", "Peter"]
```



## Finding Elements  

Methods for checking whether an element exists in an array:

- `indexOf()` 

  – Returns the position of an element.
  - Returns `-1` if the element is not found.

- `includes()` 

  – Returns `true` if the element exists, `false` otherwise.
  - Checks for **strict equality** (no type coercion).

Example:

```javascript id="7qemdx"
const friends = ["Michael", "Steven", "Peter", "Jay"];

console.log(friends.indexOf("Steven"));   // Output: 1
console.log(friends.indexOf("Bob"));      // Output: -1

console.log(friends.includes("Steven"));  // Output: true
console.log(friends.includes("Bob"));     // Output: false
```

`includes()` does not perform type coercion. This means that a number and a string containing the same value are treated as different values.

```javascript id="8dkz9a"
friends.push(23);

console.log(friends);                // Output: ["Michael", "Steven", "Peter", "Jay", 23]
console.log(friends.includes("23")); // Output: false
console.log(friends.includes(23));   // Output: true
```

The `includes()` method can also be used in conditionals:

```javascript id="aw0q61"
if (friends.includes("Peter")) {
  console.log("You have a friend called Peter.");
}
```

Since `"Peter"` exists in the array, `friends.includes("Peter")` returns `true` and the code inside the `if` statement runs.



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

**Note:** `fruit` can be any variable name. It is just a placeholder for the current item in the array. For example:

```javascript
var fruits = ["apple", "banana", "cherry"];

fruits.forEach(function(foobar) {
  console.log(foobar);
});
```


## `splice`

`splice` is used to change an array by removing or adding items. It updates the original array.

**Example 1: Remove from a position**

This removes everything starting from index 3. The original array is shortened, and the removed items are returned.

```js
var colors = ["red", "blue", "green", "yellow", "pink", "black"];
var removed = colors.splice(3);

console.log(colors);      // Output: ["red", "blue", "green"]
console.log(removed);     // Output: ["yellow", "pink", "black"]
```



**Example 2: Remove a few items from a position**

This removes 3 items starting from index 2. The rest stay in the original array.

```js
var colors = ["red", "blue", "green", "yellow", "pink", "black"];
var removed = colors.splice(2, 3);

console.log(colors);      // Output: ["red", "blue", "black"]
console.log(removed);     // Output: ["green", "yellow", "pink"]
```



## `slice`

`slice` lets you copy part of an array without changing the original. It creates a new array.

**Example: Copy part of an array**

```js
var fruits = ["apple", "banana", "cherry", "date", "fig"];
var someFruits = fruits.slice(1, 4);

console.log(fruits);      // Output: ["apple", "banana", "cherry", "date", "fig"]
console.log(someFruits);  // Output: ["banana", "cherry", "date"]
```

This copies items from index 1 up to, but not including, index 4.

:::info 

The main difference between `splice` and `slice` is that `splice` changes the original array, but `slice` does not. Use `slice` when you want to keep the original unchanged.

:::


## `filter`

`filter` lets you pick items from an array that meet a condition. It returns a new array.

```js
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.filter(
  function (value) {
    return value > 4;     // Output: [5, 6, 7, 8, 9]
  }
))

console.log(array);       // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

This keeps the original array the same and gives a filtered one with values greater than 4.


## `map`

`map` lets you change each item in an array and gives you a new array with the results.

In the example below, each value is multiplied by 2 and the original array remains unchanged.

```js
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.map(
  function (value) {
    return value * 2;     // Output: [2, 4, 6, 8, 10, 12, 14, 16, 18]
  }
))

console.log(array);       // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```



## `reverse`

`reverse` flips the order of items in an array and changes the original array.

This is useful when you want to work with the same array in the opposite order.

```js
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.reverse())    // Output: [9, 8, 7, 6, 5, 4, 3, 2, 1]

console.log(array);             // Output: [9, 8, 7, 6, 5, 4, 3, 2, 1]
```



## `concat`

`concat` joins two or more arrays into a new one without changing the originals.

```js
var array = [1, 2, 3, 4, 5];
var array2 = ['cherry', 'apple', 'orange'];

console.log(array.concat(array2))   // Output: [1, 2, 3, 4, 5, "cherry", "apple", "orange"]
```

The original arrays stay the same, and the combined version comes back as a new array.


## `join`

`join` combines all items in an array into a string. You can choose what to put between items.

In the example below, each number is converted to a string and the full `array2` string is placed between them.


```js
var array = [1, 2, 3];
var array2 = ['cherry', 'apple', 'orange'];

console.log(array.join(array2))    
// Output: "1cherry,apple,orange2cherry,apple,orange3"
```



## `reduce`

`reduce` goes through an array and combines items into a single value.

```js
var array = [1, 2, 3, 4, 5];

console.log(array.reduce(
  function(total, value) {
    return total + value;     
  }
))
// Output: 15
```



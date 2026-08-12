---
title: "For Loop"
description: "For Loop in Javascript"
tags: 
- Web Development
- Javascript
sidebar_position: 17
last_update:
  date: 12/21/2020
---

## Overview 

Instead of writing the same code multiple times, we can use loops to repeat actions efficiently.  

- Avoid repeating the same code manually  
- Follow the **Don't Repeat Yourself (DRY)** principle  
- Make code easier to update and maintain  

**Example: Counting Apples**  

Imagine you are picking apples from a tree. You want to count each apple as you pick it, up to 10 apples. Instead of writing `console.log("Picked apple 1")` ten times, we use a loop:  

```javascript
for (var apple =1; apple <= 10; apple++) {
  console.log(`Picked apple ${apple});
};
```  

How it works: 

- **Initialization (`let apple = 1`)**: Sets a counter variable (`apple`) starting at 1.  
- **Condition (`apple <= 10`)**: The loop runs as long as `apple` is 10 or less.  
- **Increment (`apple++`)**: After each loop, `apple` increases by 1.  

Output:

```
Picked apple 1  
Picked apple 2  
Picked apple 3  
...  
Picked apple 10  
```

Instead of repeating `console.log` multiple times, the loop automates counting and printing.  

## Changing the Loop  

To start at 5 and pick 15 apples, just change the values:  

```javascript
for (var apple = 5; apple <= 15; apple++) {
  console.log(`Picked apple ${apple}`);
}
```

This prints:  

```
Picked apple 5  
Picked apple 6  
...  
Picked apple 15  
```

## Looping Through an Array 

A `for` loop can be used to go through each element in an array.

For example:

```javascript 
const participants = ["Alice", "Bob", "Charlie", "David", "Eve"];

for (let i = 0; i < participants.length; i++) {
  console.log(participants[i]);
}
```

Output:

```text 
Alice
Bob
Charlie
David
Eve
```

The loop uses `participants.length` instead of a hardcoded number such as `5`.

```javascript 
// Avoid
for (let i = 0; i < 5; i++) {
  console.log(participants[i]);
}

// Better
for (let i = 0; i < participants.length; i++) {
  console.log(participants[i]);
}
```

Using `.length` allows the loop to automatically adjust when the size of the array changes.

For example, add another participant:

```javascript 
participants.push("Frank");
```

The array now has six elements. When the same loop runs again:

```javascript 
for (let i = 0; i < participants.length; i++) {
  console.log(participants[i]);
}
```

`participants.length` is now `6`, so `"Frank"` is automatically included without changing the loop.

```text 
Alice
Bob
Charlie
David
Eve
Frank
```

## Create New Array Inside a Loop

We can use a loop to generate an array based on another array.

```javascript
const nameLengths = [];

for (var i = 0; i < participants.length; i++) {
  nameLengths.push(participants[i].length);
}

console.log(nameLengths);
```

This code returns the length of each participant's name.

```
[5, 3, 7, 5, 3, 5]
```



## Arrays with Different Element Types 

We can use a `for` loop to iterate over an array and perform operations on its elements.  

Example: Logging Elements and Their Types  

```js
const data = [
  "Alice",
  "Smith",
  "Manager",
  1993,
  { age: 30},
  true
];

const types = [];

for (var i = 0; i < data.length; i++) {
  console.log(data[i]);
  types.push(typeof data[i])
};

console.log(types);
```

Output:

```
Alice
Bob
25
Charlie
{ age: 30 }
true
[ 'string', 'string', 'number', 'string', 'object', 'boolean' ]
```


## Arrays vs Objects

Arrays and objects both store multiple values, but they organize those values differently.

An **array** stores an ordered list of values. Each value has a numerical index starting from `0`.

```javascript
const friends = ["Alice", "Bob", "Charlie"];

console.log(friends[0]); // Alice
console.log(friends[1]); // Bob
```

An **object** stores values using named properties instead of numerical positions.

```javascript
const person = {
  name: "Alice",
  age: 28,
  city: "New York"
};

console.log(person.name);    // Alice
console.log(person["name"]); // Alice
```

| Item        | Array               | Object                                     |
| ----------- | ------------------- | ------------------------------------------ |
| Stores      | List of values      | Properties and values                      |
| Accessed by | Numerical index     | Property name                              |
| Example     | `friends[0]`        | `person.name`                              |
| Best for    | Ordered collections | Describing something with named properties |

## Looping Through an Object

Objects do not have numerical indexes like arrays. Instead, use a `for...in` loop to iterate through an object's property names.

Example: Logging Object Keys and Values  

```javascript
const person = {
  name: "Alice",
  age: 28,
  city: "New York",
  salary: 50000
};

for (var key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

On each iteration, `key` becomes one property name from the object.

```text
key = "name"
key = "age"
key = "city"
key = "salary"
```

Then `person[key]` gets the value connected to that property.

Output:

```
name: Alice
age: 28
city: New York
salary: 50000
```



## Looping Backwards

To loop through an array in reverse, start from the last index and decrement in each iteration.

- Initialize the counter at the last index.
- Loop while the counter is ≥ 0.
- Decrement the counter each iteration.

Example:

```javascript
const names = ["Alice", "Bob", "Charlie", "David", "Eve"];

for (var x = names.length - 1; x >= 0; x--) {
  console.log(names[x]);
};
```

Output:

```
Eve
David
Charlie
Bob
Alice
```


## Nested Loops (Loop Inside a Loop)

A nested loop is useful when handling repeated tasks within a set of repeated tasks. Nested loops are useful for working with grids, tables, and multi-dimensional data.

Example: Simulating three sets of exercises, each repeated five times.

```javascript
for (var exercise = 1; exercise <= 3; exercise++) {
  console.log(`-------Starting Exercise: ${exercise}-------`);

  for (var rep = 1; rep <= 5; rep++) {
    console.log(`  Repetition: ${rep}`);
  }
};
```

Output:

```
-------Starting Exercise 1-------
  Repetition 1
  Repetition 2
  Repetition 3
  Repetition 4
  Repetition 5
-------Starting Exercise 2-------
  Repetition 1
  Repetition 2
  Repetition 3
  Repetition 4
  Repetition 5
-------Starting Exercise 3-------
  Repetition 1
  Repetition 2
  Repetition 3
  Repetition 4
  Repetition 5
```


## Modern Looping (ES6)

### Loop through an Array 

Using the `for...of` loop is a more modern and readable approach for iterating through an array.  

```javascript
const dataArray = ["Alice", "Bob", 25, "Charlie", { age: 30 }, true];

for (const item of dataArray) {
  console.log(item);
}
```

Output:

```
Alice
Bob
25
Charlie
{ age: 30 }
true
```

### Using `for...of` with Index Access  

If you also need the index while iterating, you can use `entries()`.  

```javascript
const dataArray = ["Alice", "Bob", 25, "Charlie", { age: 30 }, true];

for (const [index, item] of dataArray.entries()) {
  console.log(`Index ${index}: ${item}`);
}
```

Output:

```
Index 0: Alice
Index 1: Bob
Index 2: 25
Index 3: Charlie
Index 4: [object Object]
Index 5: true
```

### `for...of` vs. `forEach()`

Another way to loop through an object is by `forEach()`.  

- `for...of`:  

  - Works well with `break` and `continue`
  - More readable for simple iteration  

- `forEach()`:  

  - Provides direct access to index  
  - Doesn't support `break` or `continue`  

Example using `forEach()`:  

```javascript
const dataArray = [
  "Jane", 
  "Doe", 
  1988, 
  "Charlie", 
  { age: 30 }, 
  true];

dataArray.forEach((item, index) => {
  console.log(`Index: ${index}: ${item}`)
});
```

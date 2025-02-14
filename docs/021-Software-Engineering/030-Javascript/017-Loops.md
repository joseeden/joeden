---
title: "For Loops"
description: "For Loops in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
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
for (let apple =1; apple <= 10; apple++) {
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
for (let apple = 5; apple <= 15; apple++) {
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

A `for` loop is useful for iterating over arrays. 

Consider the array of participant names. We'll use a `for` loop to print each name.

```javascript
const participants = ["Alice", "Bob", "Charlie", "David", "Eve"];

for (let i = 0; i < participant.length; i++) {
  console.log(participant[i]);
};
```

Output:

```
Alice
Bob
Charlie
David
Eve
```

:::info 

There is also more modern way of looping through lists and objects. 

Please see [Modern Looping through an Array](#modern-looping-es6)

:::


## Avoid Hardcoded Lengths

Instead of manually setting the loop limit, we use `array.length`. This ensures the loop works even if the array size changes.

```javascript
participants.push("Frank");
console.log(participants)
```

If we run the loop again, `"Frank"` is automatically included.

## Create New Array Inside a Loop

We can use a loop to generate an array based on another array.

```javascript
const nameLengths = [];

for (let i = 0; i < participants.length; i++) {
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

for (let i = 0; i < data.length; i++) {
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


## Looping Through an Object  

Objects don't have numerical indexes like arrays. Instead, we use a `for...in` loop to iterate through an object's properties.  

Example: Logging Object Keys and Values  

```javascript
const person = {
  name: "Alice",
  age: 28,
  city: "New York",
  salary: 50000
};

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

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

for (let x = names.length - 1; x >= 0; x--) {
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
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`-------Starting Exercise: ${exercise}-------`);

  for (let rep = 1; rep <= 5; rep++) {
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

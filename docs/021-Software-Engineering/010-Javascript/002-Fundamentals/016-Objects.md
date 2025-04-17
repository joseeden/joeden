---
title: "Objects"
description: "Objects in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 16
last_update:
  date: 12/21/2020
---


## Overview

As a recall, arrays are **ordered** collections, meaning elements are accessed by their position (index). We cannot assign names to individual values—only reference them by their index.  

Objects solve the naming problem by using **key-value pairs** instead of relying on order.  

- Instead of square brackets (`[]`), objects use **curly braces `{}`**.  
- Each property (key) is followed by a colon (`:`) and corresponding value.  
- Properties are separated by commas (`,`).  

Example:

```js
const Lily = {
  firstName: 'Lily',
  lastName: 'Page',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};
```

## Objects vs. Arrays  

| Feature     | Arrays              | Objects  |
|-------------|---------------------|---------|
| Structure   | Ordered list        | Key-value pairs |
| Access      | By index (`arr[0]`) | By property name (`obj.key`) |
| Best for    | Ordered data        | Unstructured, named data |


## Retrieve Data in Objects  

In JavaScript, you can access and modify object properties using **dot notation** or **bracket notation**.  

### Dot Notation (`.`)

The simplest way to access an object property.  

```javascript
const user1 = {
  firstName: "John",
  lastName: "Smith",
  birthYear: 1990,
  job: "Architect",
  permission: ['Administrator', 'Cloud', 'Devops']
};

console.log(user1.lastName);  // Output: Smith
```


### Bracket Notation (`[]`)

Allows dynamic property access.  

```javascript
console.log(user1["job"]);    // Output: Architect
```

Use bracket notation when:  

- The property name is stored in a variable.  
- You need to compute the property name dynamically.  

Example:  

```javascript
const nameKey = "Name";
console.log(John["first" + nameKey]); // John
console.log(John["last" + nameKey]);  // Smith
```

Dot notation does not work here:  

```javascript
console.log(John.first + nameKey); // ❌ Error
```




## Getting Property from User Input  

If the property name comes from user input, use bracket notation:  

```javascript
const getInput = prompt("Choose property: firstName, lastName, job")
console.log(user1[getInput]);     
```

If you use dot notation, it will return `undefined`. 

Similarly, if the property doesn't exist, it returns `undefined`.  

## Handling Undefined Properties  

To avoid errors when accessing unknown properties:  

```javascript
if (user1[getInput]) {
  console.log(user1[getInput]);
} else {
  console.log("Wrong request! Choose from firstName, lastName, or age.");
}
```

## Adding New Properties  

You can add properties using both dot and bracket notation:  

```javascript
user1.location = "Sweden";
user1["twitter"] = "@JohnSmith";

console.log(user1);
```


## Adding a Method 

We can add a function as a property inside an object. A function that is attached to an object is called a **method**.

```javascript
const user2 = {
  birthYear: 1991,
  hasDriversLicense: true,

  age: function () {
    return 2037 - this.birthYear;   // use 'this' to refer to another property.
  } 
};

console.log(user2.age());         // Using dot notation, output: 46
console.log(user2["age"]());      // Using bracket notation, output: 46
```

We can also rewrite the function so that the calculation will only need to be done once, and the output can then be reused or printed out multiple times.

```js
const user2 = {
  birthYear: 1991,
  hasDriversLicense: true,

  age: function () {
    this.age = 2037 - this.birthYear; 
    return this.age;
  } 
};

console.log(user2.age());    // Output: 46, compute once
console.log(user2.age);      // Output: 46
console.log(user2.age);      // Output: 46
console.log(user2["age"]);   // Output: 46
console.log(user2["age"]);   // Output: 46
```

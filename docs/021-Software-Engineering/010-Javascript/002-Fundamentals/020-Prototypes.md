---
title: "Prototypes"
description: "Prototypes in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 20
last_update:
  date: 12/23/2020
---


## Overview 

In JavaScript, objects can inherit properties from other objects. This is done using prototypes.

- Every object has a hidden `__proto__` property
- This links the object to another object (its prototype)

Here's an example:

```js
const person = {
  greet: function () {
    console.log('Hi there!');
  }
};

const Lily = Object.create(person);
Lily.name = 'Lily';

Lily.greet();             // Hi there!
console.log(Lily.name);   // Lily
```

In this example, `Lily` doesn't have a `greet` method, but it can still use `greet` from `person` because of the prototype link. 


## `toString`

Every object in JavaScript can be converted to a string using `.toString()`.

```js
const person = {
  greet: function () {
    console.log('Hi there!');
  }
};

console.log(person.toString());
```

Even if you don’t define it yourself, every object inherits this method from the base `Object` prototype.

This means you can always use `.toString()` to convert any object into a string, though the default output might not be very readable.


## Adding a New Method

You can add new functions to all objects by updating the base `Object.prototype`.

```js
const person = {
  greet: function () {
    console.log('Hi there!');
  }
};

Object.prototype.shakehands = function() {
  console.log("It's nice to meet you!");
};

person.greet();        
person.shakehands();   
```

This lets all objects use `shakehands()` because it’s added to the shared prototype. 

:::warn

Modifying built-in prototypes can cause problems in big projects!

:::


## Prototype Chain

Every object in JavaScript is part of a chain called the **prototype chain**.

- Objects can inherit from other objects
- Methods are looked up through the chain
- The chain ends at `Object.prototype`

This system helps JavaScript reuse methods and properties efficiently by checking one object at a time until it finds what it needs—or not at all.
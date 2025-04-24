---
title: "Types and Scopes"
description: "Types and Scopes in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Frontend Development
- Javascript
sidebar_position: 19
last_update:
  date: 12/21/2020
---


## Data Types 

### Primitive Types 

In JavaScript, primitive types are the basic building blocks of data. These values are simple and not objects.

- They are stored directly in memory
- They do not have methods or properties by default

Below are the most common primitive types:  

- **Number**: All numbers are floating-point, even integers like `23` (i.e., `23.0`).

  ```javascript
  let num = 23; // Can be an integer or a floating-point number
  console.log(num); // Output: 23
  ```

- **String**: A sequence of characters, enclosed in quotes (single or double).

  ```javascript
  let str = "Hello, world!";
  console.log(str); // Output: Hello, world!
  ```

- **Boolean**: Logical values, either `true` or `false`.

  ```javascript
  let isActive = true;
  console.log(isActive); // Output: true
  ```

- **Undefined**: A variable declared but not assigned a value.

  ```javascript
  let x;
  console.log(x); // Output: undefined
  ```

- **Null**: Represents an empty value, used in different contexts than `undefined`.

  ```javascript
  let y = null;
  console.log(y); // Output: null
  ```

- **Symbol**: A unique, immutable value used in specific scenarios (introduced in ES2015).

  ```javascript
  let sym = Symbol('unique');
  console.log(sym); // Output: Symbol(unique)
  ```

- **BigInt**: For very large integers (introduced in ES2020).

  ```javascript
  let bigIntVal = 9007199254740991n; // 'n' denotes a BigInt
  console.log(bigIntVal); // Output: 9007199254740991n
  ```




### Reference Types (Objects)

Reference types are more complex data structures. They can hold multiple values and are stored differently in memory.

- Objects store key-value pairs  
- Arrays hold ordered lists of values  
- Functions are also treated as objects  

Unlike primitive types, they can be updated without creating new values, which makes them useful for real-world applications. These types are passed by reference or **pointers**, meaning changes affect the original.

- **Objects**  

    Used to group related data together using keys.

    ```javascript
    let person = {
      name: "Sam",
      age: 30
    };
    ```

- **Arrays**  

    Used to store lists of values in a specific order.

    ```javascript
    let fruits = ["apple", "banana", "cherry"];
    ```

- **Functions**  

    Functions are objects too and can be stored in variables or passed around.

    ```javascript
    function greet() {
      console.log("Hello!");
    }
    ```

## Scopes

Scope refers to where a variable can be used. It decides if a variable is visible everywhere or only in specific places.

### Global Scope

Global scope means a variable can be accessed anywhere in your code.

- Declared outside all functions  
- Can be used in any part of the script  

Global variables are useful but should be used carefully to avoid unexpected changes from different parts of the code.

```javascript
var globalName = "Alex";

function sayHello() {
  console.log("Hello " + globalName);
}

sayHello(); // Hello Alex
```


### Local Scope

Local scope means a variable is only accessible inside the function or block where it’s defined.

- Declared inside a function or block  
- Cannot be used outside that function or block  

Local variables help keep things clean and safe by hiding them from the rest of the code. Use them when the variable is only needed in one place.

```javascript
function greet() {
  var localName = "Chris";
  console.log("Hi " + localName);
}

greet();       // Hi Chris
console.log(localName); // Error: localName is not defined
```


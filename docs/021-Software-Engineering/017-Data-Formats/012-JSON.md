---
title: "JSON"
description: "JavaScript Object Notation"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 12
last_update:
  date: 3/14/2022
---



## Overview

JSON (JavaScript Object Notation) is a lightweight data format used for representing structured data. It’s similar to how object literals are written in JavaScript and Python, and files typically have a ".json" extension.

Here’s an example of a JSON file with various data types:

```json
{
  "edit-config": {
    "default-operation": "merge",
    "test-operation": "set",
    "some-integers": [2, 3, 5, 7, 9],
    "a-boolean": true,
    "more-numbers": [225, -1.0735]
  }
}
```

This example shows a mix of text strings, a boolean, and arrays.


## JSON Basic Data Types

JSON supports simple data types for representing information.

- **Numbers**

  - Integers (whole numbers) or floats (with decimals)
  - In scientific notation for very large or small numbers.

    ```json
    "age": 30,
    "pi": 3.14159,
    "distance": 1.23E+8
    ```

- **Strings**

  - Text values are represented as strings.
  - Any sequence of characters enclosed in double quotes.
  - Always use double quotes. Single quotes are not allowed.

    ```json
    "name": "Alice",
    "city": "New York"
    ```

- **Booleans**

  - Booleans represent `true` or `false` values.
  - The values `true` and `false` are written without quotes.
  - They are useful for binary conditions or flags.

    ```json
    "isStudent": true,
    "isAdmin": false
    ```

- **Null**

  - Represents an empty value or an undefined state.

    ```json
    "middleName": null
    ```


## JSON Objects

JSON objects are collections of key/value pairs enclosed in curly braces (`{}`). They are similar to dictionaries in Python or objects in JavaScript.

- Each object is a set of key/value pairs, separated by a colon.
- Keys are always strings, values can be any data type.
- Numbers or booleans do not require quotes.
- Example: `{"keyname": "value"}`

Objects can also contain other objects, creating nested structures for more complex data representation.

```json
{
  "person": {
    "name": "Alice",
    "age": 30,
    "address": {
      "city": "New York",
      "postalCode": "10001"
    }
  }
}
```

## JSON Maps and Lists


JSON can represent more complex structures like maps (dictionaries) or lists (arrays). 

A JSON object is a **map** of key/value pairs, where each key is unique. The map allows representing complex relationships or attributes for an entity. In the example below, `user` is a map containing key/value pairs.

```json
{
  "user": {
    "username": "alice123",
    "email": "alice@example.com",
    "roles": ["admin", "editor"]
  }
}
```

On the other hand, **arrays** are ordered collections of values, enclosed in square brackets ([]). Each value in an array can be any data type, including another array or object.

```json
{
  "numbers": [1, 2, 3, 4, 5],
  "cities": ["New York", "Los Angeles", "Chicago"]
}
```

Arrays are useful for representing lists of related data, like numbers, strings, or objects.

## No Comments in JSON

JSON does **NOT** allow comments. Unlike other formats such as XML or YAML, which support comments to explain or annotate code, JSON strictly adheres to its data format without allowing extra text. 

- **Why no comments?**  
  JSON was designed for data exchange rather than as a markup language, so the specification keeps it simple and concise by not including comment support. If comments are necessary, they are usually added outside the JSON structure or included in the documentation.

- **Alternatives**:  
  If you need to include some context or notes in a JSON file, one workaround is to add an unused key-value pair. However, this method is not standardized and should be used with caution.

    ```json
    {
      "_comment": "This key explains the purpose of the following data",
      "name": "Alice"
    }
    ```

## Whitespace Insignificant

Whitespace (spaces, tabs, line breaks) in JSON is ignored by parsers, which makes it non-essential for data structure but helpful for readability.

The amount of whitespace between elements in JSON doesn't affect the meaning of the data. You can format it with spaces, tabs, or new lines for clarity, or remove all whitespace to reduce file size (useful in compact data transfers).

  - Example (spaced for clarity):  

    ```json
    {
      "name": "Alice",
      "age": 30
    }
    ```

  - Example (no whitespace):  

    ```json
    {"name":"Alice","age":30}
    ```

While parsers don't require it, adding whitespace (especially indentations) is a good practice for improving human readability, particularly in complex or nested structures.

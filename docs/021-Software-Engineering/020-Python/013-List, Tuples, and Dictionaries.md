---
title: "List and Tuples"
description: "List and Tuples"
tags: [Computer Science, Application Development, Software Development, Python]
sidebar_position: 13
last_update:
  date: 10/28/2019
---


## Lists

Lists are mutable sequences in Python, which allows you to change their contents.

### Common Sequence Operations

| Operation                                 | Description                                                                                   |
|-------------------------------------------|-----------------------------------------------------------------------------------------------|
| `len(sequence)`                           | Returns the number of elements in the sequence.                                                |
| `for element in sequence`                 | Iterates over each element in the sequence.                                                    |
| `if element in sequence`                  | Checks whether the element exists in the sequence.                                             |
| `sequence[i]`                             | Accesses the element at index `i`, starting at 0.                                              |
| `sequence[i:j]`                           | Returns a slice from index `i` to `j-1`. If `i` is omitted, starts at 0; if `j` is omitted, goes to the end. |
| `enumerate(sequence)`                     | Iterates over both the indexes and elements of the sequence at the same time.                  |

### List-Specific Operations

| Operation                                 | Description                                                                                   |
|-------------------------------------------|-----------------------------------------------------------------------------------------------|
| `list[i] = x`                             | Replaces the element at index `i` with `x`.                                                    |
| `list.append(x)`                          | Adds `x` to the end of the list.                                                               |
| `list.insert(i, x)`                       | Inserts `x` at position `i` in the list.                                                       |
| `list.pop(i)`                             | Removes and returns the element at index `i`. If `i` is omitted, the last element is removed.  |
| `list.remove(x)`                          | Removes the first occurrence of `x` in the list.                                               |
| `list.sort()`                             | Sorts the list in ascending order.                                                             |
| `list.reverse()`                          | Reverses the order of the elements in the list.                                                |
| `list.clear()`                            | Removes all elements from the list.                                                            |
| `list.copy()`                             | Returns a shallow copy of the list.                                                            |
| `list.extend(other_list)`                 | Appends all elements from `other_list` to the current list.                                    |


### List Comprehension

- **Basic**: Creates new list by evaluating the expression for each element in the sequence.

  ```python
  squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
  ```

- **With Condition**: Adds elements to the new list only if the condition is met.
- 
  ```python
  evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
  ```


## Tuples

Tuples are like lists but immutable and defined with parentheses `( )`.

- Useful when element positions must remain fixed, like function return values
- Unpacking stores tuple elements into separate variables

Example:

```python
my_tuple = (10, 20, 30)
a, b, c = my_tuple  # Unpacking
print(a, b, c)  # Output: 10 20 30
```



## Dictionaries

Dictionaries are a mutable data structure that organizes data into key-value pairs. Unlike lists, data in dictionaries is accessed using keys, which can be of various data types.

- Defined with curly brackets

  ```python
  animals = {"bears": 10, "lions": 1, "tigers": 2}  
  ```

- Use keys to access values

  ```python
  animals["bears"]        ## this will return 10  
  ```

- Use `in` to check for a key's existence

  ```python
  if "bears" in animals  
  ```

- Can add, remove, or modify elements

  ```python
  animals["zebras"] = 2     ## This adds a new pair
  ```

### Modifying Dictionaries

- Add or modify a value: `animals["bears"] = 11` changes the value for "bears".
- Remove a key-value pair: `del animals["lions"]` deletes the entry for "lions".

### Iterating Over Dictionaries

Use a for loop to iterate over keys or access values:

- Iterate keys: `for key in animals:`.
- Access key-value pairs: `for key, value in animals.items():`.
- Get only keys: `animals.keys()`.
- Get only values: `animals.values()`.

### Dictionary Methods 

| Method                                   | Description                                                                                                    |
|------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `len(dictionary)`                        | Returns the number of items in the dictionary                                                                   |
| `dictionary[key]`                       | Accesses the item with key `key`                                                                               |
| `dictionary[key] = value`               | Sets the value associated with `key`                                                                            |
| `del dictionary[key]`                   | Removes the item with key `key`                                                                                 |
| `dictionary.get(key, default)`          | Returns the element for `key`, or `default` if it's not present                                                |
| `dictionary.keys()`                      | Returns a sequence of the keys in the dictionary                                                                 |
| `dictionary.values()`                    | Returns a sequence of the values in the dictionary                                                               |
| `dictionary.update(other_dictionary)`    | Updates with items from another dictionary                                                                       |
| `dictionary.clear()`                     | Removes all items from the dictionary                                                                            |

For more information, refer to the official documentation for dictionary operations and methods.

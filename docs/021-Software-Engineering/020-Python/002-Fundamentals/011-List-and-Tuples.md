---
title: "List and Tuples"
description: "List and Tuples"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 11
last_update:
  date: 10/28/2019
---


## Lists

Lists are mutable sequences in Python, which allows you to change their contents.

Common sequence operations:

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

  ```python
  evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
  ```


## Tuples

Tuples are like lists but are **immutable** and defined with parentheses `( )`. They are **ordered**, which means the element positions are fixed, and we can access the elements by their index.

To create a tuple called `locations`:

```python
locations = ("New York", "Los Angeles", "Chicago")
print(locations)
```

Output:

```
('New York', 'Los Angeles', 'Chicago')
```

Just like lists, we can access elements in a tuple using an index.

```python
print(locations[1])
```

Output:

```
Los Angeles
```



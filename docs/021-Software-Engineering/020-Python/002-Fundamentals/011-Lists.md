---
title: "Lists"
description: "List"
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

Lists are ordered containers that hold multiple items. They are mutable, so you can add, remove, or update items easily. 

In the example below, we create a `cookies` list of and manipulate it:

```python
cookies = ["chocolate chip", "oatmeal", "sugar"]

# Add a new cookie
cookies.append("peanut butter")

# Combine with another list
more_cookies = ["ginger", "snickerdoodle"]
cookies.extend(more_cookies)

# Print the list
print(cookies)
```

Output:

```text
['chocolate chip', 'oatmeal', 'sugar', 'peanut butter', 'ginger', 'snickerdoodle']
```

You can access a specific item by its index:

```python
# Print the third cookie
print(cookies[2])
```

Output:

```text
sugar
```

## Common List Operations

- Get the number of elements using `len()`:

    ```python
    fruits = ["apple", "banana", "cherry"]
    print(len(fruits))
    ```

    Output:

    ```text
    3
    ```

- Loop over each element in a sequence:

    ```python
    for fruit in fruits:
        print(fruit)
    ```

    Output:

    ```text
    apple
    banana
    cherry
    ```

- Check if an element exists in a sequence:

    ```python
    if "banana" in fruits:
        print("Found banana!")
    ```

    Output:

    ```text
    Found banana!
    ```

- Access an element by index:

    ```python
    print(fruits[1])
    ```

    Output:

    ```text
    banana
    ```

- Get a slice of a sequence:

    ```python
    print(fruits[0:2])  # first two elements
    print(fruits[:2])   # same as above
    print(fruits[1:])   # from second element to end
    ```

    Output:

    ```text
    ['apple', 'banana']
    ['apple', 'banana']
    ['banana', 'cherry']
    ```

- Loop over indexes and elements together with `enumerate()`:

    ```python
    for i, fruit in enumerate(fruits):
        print(i, fruit)
    ```

    Output:

    ```text
    0 apple
    1 banana
    2 cherry
    ```

- Replace an element at a specific index:

    ```python
    fruits[1] = "blueberry"
    print(fruits)
    ```

    Output:

    ```text
    ['apple', 'blueberry', 'cherry']
    ```

- Add an element to the end with `append()`:

    ```python
    fruits.append("orange")
    print(fruits)
    ```

    Output:

    ```text
    ['apple', 'blueberry', 'cherry', 'orange']
    ```

- Insert an element at a specific position with `insert()`:

    ```python
    fruits.insert(1, "kiwi")
    print(fruits)
    ```

    Output:

    ```text
    ['apple', 'kiwi', 'blueberry', 'cherry', 'orange']
    ```

- Remove an element by index with `pop()`:

    ```python
    removed = fruits.pop(2)
    print(removed)
    print(fruits)
    ```

    Output:

    ```text
    blueberry
    ['apple', 'kiwi', 'cherry', 'orange']
    ```

- Remove the first occurrence of a value with `remove()`:

    ```python
    fruits.remove("kiwi")
    print(fruits)
    ```

    Output:

    ```text
    ['apple', 'cherry', 'orange']
    ```

- Sort the list in ascending order with `sort()`:

    ```python
    fruits.sort()
    print(fruits)
    ```

    Output:

    ```text
    ['apple', 'cherry', 'orange']
    ```

- Reverse the order of elements with `reverse()`:

    ```python
    fruits.reverse()
    print(fruits)
    ```

    Output:

    ```text
    ['orange', 'cherry', 'apple']
    ```

- Remove all elements with `clear()`:

    ```python
    fruits.clear()
    print(fruits)
    ```

    Output:

    ```text
    []
    ```

- Create a shallow copy with `copy()`:

    ```python
    fruits = ["apple", "banana"]
    fruits_copy = fruits.copy()
    print(fruits_copy)
    ```

    Output:

    ```text
    ['apple', 'banana']
    ```

- Append all elements from another list with `extend()`:

    ```python
    more_fruits = ["kiwi", "mango"]
    fruits.extend(more_fruits)
    print(fruits)
    ```

    Output:

    ```text
    ['apple', 'banana', 'kiwi', 'mango']
    ```


## List Comprehension

List comprehensions are a compact way to create new lists from existing sequences. They let you apply expressions and conditions in a single line.

- **Basic**: Creates new list by evaluating the expression for each element in the sequence.

    ```python
    squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
    ```

- **With Condition**: Adds elements to the new list only if the condition is met.

    ```python
    evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
    ```

For more information, please see [List Comprehensions.](/docs/021-Software-Engineering/020-Python/003-Advanced/014-List-Comprehensions.md)


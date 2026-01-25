---
title: "Generator Expressions"
description: "Generator Expressions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 18
last_update:
  date: 11/11/2019
---

## Overview

Generators are **similar to list comprehensions**, but they behave differently. Instead of storing all values in memory, a generator creates values one by one as needed.

- **List Comprehension:** Creates a list and stores all values in memory.
- **Generator:** Generates each value on the fly when needed.

Example: List comprehension

```python
numbers = [x**2 for x in range(5)]
print(numbers)
```

Output:

```python
[0, 1, 4, 9, 16]
```

Example: Generator

```python
numbers_gen = (x**2 for x in range(5))
print(numbers_gen)
```

Output:

```python
<generator object <genexpr> at 0x7f7e7c9b2f90>
```

## Using Generators

You can loop over a generator just like a list. You can also convert it to a list or use `next()` to retrieve individual values.

Example:

```python
numbers_gen = (x**2 for x in range(5))
for num in numbers_gen:
    print(num)
```

Output:

```python
0
1
4
9
16
```

You can also pass a generator to the function `list` to create a list.

```python
numbers_list = (x**2 for x in range(5))
print(list(numbers_list))
```

Output:

```python
[0, 1, 4, 9, 16] 
```

## Lazy Evaluation

Generators are useful for large datasets where storing the entire list in memory is impractical. This is called **lazy evaluation**, where values are computed only when needed.

Example:

```python
# Does not create the entire list in memory
large_gen = (x**2 for x in range(10**6))  
print(next(large_gen))  # 0
print(next(large_gen))  # 1
```

## Conditionals

Just like list comprehensions, you can use conditionals in generator expressions.

Example:

```python
numbers_gen = (x**2 if x % 2 == 0 else 0 for x in range(5))
for num in numbers_gen:
    print(num)
```

Output:

```python
0
0
4
0
16
```

## Generator Functions

A generator function uses `yield` instead of `return` to produce values one at a time. This is useful for creating more complex generators.

In this example, `count_up_to` is a generator function that yields values one by one until it reaches `n`.

```python
def count_up_to(n):
    """Generate values from 0 to N"""
    i = 0
    while i <= n:
        yield i
        i += 1

gen = count_up_to(5)
for num in gen:
    print(num)
```

Output:

```python
0
1
2
3
4
5
```

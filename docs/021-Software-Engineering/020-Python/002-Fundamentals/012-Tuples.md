---
title: "Tuples"
description: "Tuples"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 11
last_update:
  date: 10/28/2019
---



## Overview

Tuples are **immutable** containers that hold data like lists. However, unlike lists, we cannot add, remove, or change their elements. This makes tuples safer for storing data that should not be modified.

Tuples can be created by grouping elements with parentheses. We can then access elements using their index.

```bash
fruits = ("apple", "banana", "cherry")

print(fruits[0])  # apple
print(fruits[2])  # cherry
```

## Zipping Tuples

The `zip` function lets us pair elements from multiple lists into tuples. For example, we can match cookie popularity in two countries:

```python
us_cookies = ["Chips Ahoy", "Oreo", "Nilla"]
in_cookies = ["Treat", "Hide & Seek", "Oreo"]

top_pairs = list(zip(us_cookies, in_cookies))
print(top_pairs)
```

Output:

```
[('Chips Ahoy', 'Treat'), ('Oreo', 'Hide & Seek'), ('Nilla', 'Oreo')]
```

When two lists (or tuples) don’t have the same number of elements, the zip function will only pair up elements until the shortest sequence ends. Extra elements in the longer list are ignored.

```python
us_cookies = ["Chips Ahoy", "Oreo", "Nilla", "Amos"]
in_cookies = ["Treat", "Hide & Seek", "Oreo"]

top_pairs = list(zip(us_cookies, in_cookies))
print(top_pairs)
```

Output:

```
[('Chips Ahoy', 'Treat'), ('Oreo', 'Hide & Seek'), ('Nilla', 'Oreo')]
```

Notice that "Amos" from `us_cookies` is not included because `in_cookies` has only 3 elements.

## Unpacking Tuples

Tuple unpacking assigns elements of a tuple to variables in one step.

```python
top_pairs = [ ('Chips Ahoy', 'Treat'), 
              ('Oreo', 'Hide & Seek'), 
              ('Nilla', 'Oreo') ] 

us_num_1, in_num_1 = top_pairs[0]
print(us_num_1, in_num_1)
```

Output:

```
Chips Ahoy Treat
```

## Unpacking in Loops

We can also unpack tuples directly in loops to handle multiple values at once.

```python
top_pairs = [ ('Chips Ahoy', 'Treat'), 
              ('Oreo', 'Hide & Seek'), 
              ('Nilla', 'Oreo') ] 

for us_cookie, in_cookie in top_pairs:
    print(us_cookie, in_cookie)
```

Output:

```
Chips Ahoy Treat
Oreo Hide & Seek
Nilla Oreo
```

Each element of `top_pairs` is itself a tuple with 2 items. For example, the first element is a pair:

```python
('Chips Ahoy', 'Treat')
```

Using the `for` loop, it "unpacks" the element into two variables and executes the `print` statement.

```python
us_cookie = 'Chips Ahoy'
in_cookie = 'Treat'
```

## Enumerating Positions

The `enumerate` function creates tuples of index and element. This helps track positions in a list.

```python
top_pairs = [ ('Chips Ahoy', 'Treat'), 
              ('Oreo', 'Hide & Seek'), 
              ('Nilla', 'Oreo') ] 

for index, item in enumerate(top_pairs):
    us_cookie, in_cookie = item
    print(index, us_cookie, in_cookie)
```

Output:

```
0 Chips Ahoy Treat
1 Oreo Hide & Seek
2 Nilla Oreo
```

As we have seen, a tuple can be created with parentheses, `zip`, `enumerate`, or even a trailing comma. Always check how they are created because even a single stray comma can cause unexpected bugs.


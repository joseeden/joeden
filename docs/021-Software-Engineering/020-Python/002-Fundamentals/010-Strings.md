---
title: "Strings"
description: "Strings"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 10
last_update:
  date: 10/28/2019
---


## Overview

Strings are one of the most common types of data used in Python. We can loop over them, but they also have special methods for formatting, joining, and searching

## Formatted Strings

**Formatted strings**, or **f-strings**, let you insert variables and expressions directly into a string. You create them by placing an `f` before the opening quote and using curly braces `{}` for variables.

```python
cookie_name = "Anzac"
cookie_price = "1.99"

print(f"Each {cookie_name} cookie costs {cookie_price}")
```

Output:

```
Each Anzac cookie costs 1.99
```

## Joining with Strings

Strings have a `join()` method that combines elements from a list or other iterable into one string using the string as a separator.

```python
child_ages = ["3", "4", "7", "8"]

# Join with a comma
print(', '.join(child_ages))

# Combine with f-string
print(f"The children are ages {', '.join(child_ages[0:3])}, and {child_ages[-1]}")
```

Output:

```
3, 4, 7, 8
The children are ages 3, 4, 7, and 8
```


## Matching Parts of a String

You can check if a string starts or ends with certain characters using `startswith()` or `endswith()`. This is case-sensitive.

For example, we can use `startswith` to search a list for names starting with "A":

```python
boy_names = ["James", "John", "Bob", "Adam", "Ted", "Alex", "Robin"]
names_with_a = []

for name in boy_names:
    if name.startswith('A'):
        names_with_a.append(name)

print(names_with_a)
```

Output:

```
['Adam', 'Alex']
```


## Checking for Existence

The `in` operator checks if a substring exists inside a string. It is case-sensitive by default.

```python
quote = "Life is a long lesson in humility."

print("long" in quote)   # True
print("Long" in quote)   # False
print("life" in quote)   # False
```

To ignore case when searching, use the `lower()` method on the string to convert it to lowercase.

```python
quote = "Life is a long lesson in humility."

print("life" in quote.lower())  # True
```

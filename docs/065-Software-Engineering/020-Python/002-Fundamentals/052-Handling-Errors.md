---
title: "Handling Errors"
description: "Handling Errors"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 52
last_update:
  date: 10/31/2019
---

## Overview

Errors can be prevented or managed to help users and developers avoid issues when using our code. 

## Traceback

When working with packages, tracebacks show where an error occurred in the code.

In `pandas`, the terms `except` and `raise` handle errors like a `KeyError` when a column is missing.

Example:

```python
import pandas as pd
df = pd.DataFrame({"name": ["John", "Jane"]})
print(df["age"])  # KeyError: 'age'
```

Output:  

```bash
`KeyError: 'age'`
```

## Incorrect Input

When writing functions, it’s important to consider how users might incorrectly call them.

For example, a function may expect a list, but users might pass a dictionary. Handling such errors improves user experience.

```python
def average(values):
    return sum(values) / len(values)
```

Error if a dictionary is passed:
  
```python
average({"a": 1, "b": 2})  # TypeError
```

## Error-Handling Techniques

There are multiple ways to handle errors gracefully in functions, such as using `try-except` blocks or raising custom exceptions.

### try-except Block

Use `try` to test code and `except` to handle errors. This prevents crashes and allows custom messages.

Example:

```python
def average(values):
    try:
        return sum(values) / len(values)
    except TypeError:
        print("Expected a list or set, but got something else.")
```

Output if input is wrong:

```
Expected a list or set, but got something else.
```

### Raise Exception

We can use `raise` to force an error when the input is invalid and provide a custom message.

Example:

```python
def average(values):
    if not isinstance(values, (list, set)):
        raise TypeError("Input must be a list or set.")
    return sum(values) / len(values)
```

Output when invalid input is provided:

```
TypeError: Input must be a list or set.
```

### try-except vs. raise

Both `try-except` and `raise` have their advantages:

- **try-except**  
  - Allows the program to continue running if an error occurs.
  - Ideal for handling errors without stopping the script.

- **raise**  
  - Stops execution and raises a specific error when something goes wrong.
  - Best for scenarios where we want to prevent further code execution.

---
title: "Errors"
description: "Errors"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 51
last_update:
  date: 10/31/2019
---


## Overview

An error occurs when code violates a rule, causing the program to stop. Errors are also called **exceptions**, and they prevent code from running. To avoid errors, it's important to write clean and valid code.

## Common Errors

### TypeError

Occurs when incompatible data types are used together.

Example: Adding a string to an integer.
  
```python
print("Hello" + 10)
```

Output:  

```bash
`TypeError: can only concatenate str (not "int") to str`
```

### ValueError

Happens when a value is outside the expected range or type.

Example: Trying to convert a non-numeric string to an integer.

```python
print(int("Hello"))
```

Output:  

```bash
`ValueError: invalid literal for int() with base 10: 'Hello'`
```

## Tracebacks

A traceback is a report that shows what type of error occurred and where in the code it happened. The traceback details shows error type, file, and line number where the issue occurred.

Example: Converting an invalid string to a number.

```python
float("Hello")
```

Output:

```
Traceback (most recent call last):
  File "script.py", line 1, in <module>
    float("Hello")
ValueError: could not convert string to float: 'Hello'
```

## Errors from Packages

Errors can also occur when using code from external packages like `pandas`. You won’t see the code running behind the scenes, but it still executes.

### Tracebacks from Packages

Tracebacks from packages show where the error occurred in their source code.

Example: Accessing a non-existent column in a DataFrame.

```python
import pandas as pd
df = pd.DataFrame({"name": ["John", "Jane"]})
print(df["tag"])
```

Output:

```
Traceback (most recent call last):
  File "script.py", line 3, in <module>
    print(df["tag"])
KeyError: 'tag'
```

The traceback shows the location of the error in the package's source code (e.g., `script.py`).

- It will highlight the line in your code where the error happened.
- The error message (like `KeyError`) indicates the problem, such as accessing a non-existent key.
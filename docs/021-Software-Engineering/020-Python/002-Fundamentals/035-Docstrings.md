---
title: "Docstrings"
description: "Python Docstrings"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 35
last_update:
  date: 10/30/2019
---


## Overview

A docstring is a text description inside a function that explains what it does.  

- Shown when using the `help()` function  
- Helps document how to use the function  

Example:  

```python
help(round)
```  

Output (simplified):  

```
Help on built-in function round:
round(...)
    Round a number to a given precision.
```

## Getting a Docstring  

We can access a function’s docstring using `help()` or a special attribute.  

- `help(function_name)` shows full details  
- `function_name.__doc__` returns only the docstring  

To print just the docstring, use the `__doc__`.

```python
round.__doc__
```  

Output:  

```
'Round a number to a given precision in decimal digits.\n\nThe return value is an integer 
if ndigits is omitted or None.  Otherwise\nthe return value has the same type as the number.  ndigits may be negative.'
```

If you use the `help`:

```python
help(round)
```  

The output will be splitted into lines:

```
Help on built-in function round:
round(...)
    Round a number to a given precision.
```


:::info 

The two sets of underscores ("__") is called a **"dunder-doc"** attribute.

:::

## Creating a Docstring  

To add a docstring to our function, write a triple-quoted string at the start of a function.  

- Comes right after `def` line  
- Should be indented like the rest of the function  

Example:  

```python
def average(numbers):
    """Returns the average of a list of numbers."""
    return sum(numbers) / len(numbers)
```

To access the docstring:

```bash
average.__doc__ 
```

Output:

```bash
'Returns the average of a list of numbers.'  
```

## Updating a Docstring  

Since docstrings are attributes, they can be changed.  

Example:  

```python
average.__doc__ = "Calculates the mean of a list."
print(average.__doc__)
```  

Output:  

```
Calculates the mean of a list.
```

## Multi-line Docstrings  

For complex functions, use multi-line docstrings.  

- Start with a short summary  
- Leave a blank line  
- Describe arguments (`Args:`) and return value (`Returns:`)  

Example:  

```python
def multiply(a, b):
    """Multiply two numbers.

    Args:
        a (int): First number
        b (int): Second number

    Returns:
        int: The product of a and b
    """
    return a * b
```

## Displaying Multi-line Docstrings  

Using `help()` shows the full docstring with formatting.  

Example:  

```python
help(multiply)
```  

Output:  

```
Help on function multiply:
multiply(a, b)
    Multiply two numbers.

    Args:
        a (int): First number
        b (int): Second number

    Returns:
        int: The product of a and b
```
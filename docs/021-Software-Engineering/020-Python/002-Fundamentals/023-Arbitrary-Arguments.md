---
title: "Arbitrary Arguments"
description: "Arbitrary Arguments"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 23
last_update:
  date: 10/29/2019
---

## Overview 

Functions in Python need specific arguments, but we can make them more flexible. The following are different ways to handle function arguments.  

## Fixed Arguments  

A function expects a set number of arguments. If we pass the wrong type or too many, it will cause an error.  

- A function designed for a list or set won't work with a dictionary.  
- Passing multiple separate values instead of a single list causes an error.  

Example:  

```python
def average(values):
    return sum(values) / len(values)

print(average(10, 20, 30))  # Error: Too many arguments
```

## Arbitrary Positional Arguments (`*args`)  

We can allow any number of arguments by using an asterisk (`*`).  

- The function collects all arguments into a tuple.  
- We can pass one, five, or even a thousand values.  
- The standard name is `*args`, but any name works.  

Example:  

```python
def average(*args):
    return sum(args) / len(args)

print(average(10, 20, 30))  # Output: 20.0
```

## Passing Multiple Lists

Python treats `*args` as a single tuple. If we pass multiple lists, they can be merged automatically.  

Example:  

```python
def combine(*args):
    return args  # Returns a tuple of inputs

print(combine([1, 2], [3, 4]))  # Output: ([1, 2], [3, 4])
```

## Arbitrary Keyword Arguments (`**kwargs`)  

If we want to pass named arguments, we use `**`.  

- The function collects arguments into a dictionary.  
- The standard name is `**kwargs`, but any name works.  
- We can access values using `.values()`.  

Example:  

```python
def average(**kwargs):
    return sum(kwargs.values()) / len(kwargs)

print(average(a=10, b=20, c=30))  # Output: 20.0
```

## Passing a Dictionary   

Instead of passing key-value pairs manually, we can use `**` before a dictionary.  

Example:  

```python
def average(**kwargs):
    return sum(kwargs.values()) / len(kwargs)

data = {'a': 10, 'b': 20, 'c': 30}
print(average(**data))  # Output: 20.0
```

## Combining Multiple `**kwargs`  

We can pass multiple keyword argument dictionaries using `**`.  

Example:  

```python
def average(**kwargs):
    return sum(kwargs.values()) / len(kwargs)
    
data1 = {'a': 10, 'b': 20}
data2 = {'c': 30, 'd': 40}

print(average(**data1, **data2))  # Output: 25.0
```  

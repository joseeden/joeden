---
title: "Arbitrary Arguments"
description: "Arbitrary Arguments"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 37
last_update:
  date: 10/29/2019
---

## Overview 

Functions in Python need specific arguments, but we can make them more flexible. The following are different ways to handle function arguments.  

## Fixed Arguments  

A function expects a specific number and type of arguments. Passing the wrong type or extra arguments will cause an error.

- A function that expects a list or set will not work with a dictionary.
- Passing multiple values instead of a single list will result in an error.

Example:  

```python
def average(values):
    return sum(values) / len(values)

print(average(10, 20, 30))  # Error: Too many arguments
```

Here, the function expects one argument (a list of numbers), but multiple arguments are provided instead.

The correct way is to pass the values as a single list:


```python
print(average([10, 20, 30]))
```


## Arbitrary Positional Arguments (`*args`)  

Sometimes you do not know how many values a user will pass to a function. Flexible/arbitrary positional arguments solve this by accepting any number of positional values and grouping them into a tuple inside the function.

We can allow any number of arguments by using an asterisk (`*`).  

In the example below, the function `add_values` uses the variable `values`, which is created from `*args` and stored as a tuple.

```python
def add_values(*values):
    total = 0
    for value in values:
        total += value
    return total
```

You can now call the function with any number of numeric arguments.

```python
add_values(1, 2, 3, 4)
```

Output:

```text
10
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


When we want to pass named arguments without defining them in advance, we use `**kwargs`.

- Accepts any number of named (keyword) arguments
- Stores them as a dictionary
- `kwargs` is the common name, but any name can be used

This is useful for optional settings or labeled data.

#### Example 1: Printing key–value pairs

In this example, `details` comes from `**kwargs` and behaves like a dictionary.

```python
def show_details(**details):
    for key, value in details.items():
        print(f"{key}: {value}")
```

Calling the function with named arguments:

```python
show_details(user="Alex", role="Admin", active=True)
```

Output:

```text
user: Alex
role: Admin
active: True
```

#### Example 2: Using keyword argument values

Here, all keyword argument values are used to calculate an average.

```python
def average(**kwargs):
    return sum(kwargs.values()) / len(kwargs)

print(average(a=10, b=20, c=30))  # Output: 20.0
```


:::info 

The names `args` and `kwargs` are not special by themselves. What matters is using `*` for tuples and `**` for dictionaries, which brings flexibility back into function design.

:::

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

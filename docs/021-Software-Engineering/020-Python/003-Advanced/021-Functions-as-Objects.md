---
title: "Functions as Objects"
description: "Functions as Objects"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 23
last_update:
  date: 11/7/2019
---


## Overview

In Python, functions are just another type of object. You can treat them like numbers, strings, lists, or dictionaries.

- Functions can be assigned to variables
- Functions can be stored in lists or dictionaries
- Functions can be passed as arguments or returned from other functions

Because functions are objects, you can store them, pass them around, or manipulate them like any other value. 

## Assigning Functions to Variables

You can assign a function to a variable and call it through that variable.

```python
def greet():
    print("Hello")

x = greet
x()
```

Output:

```
Hello
```

The variable `x` now references the `greet` function. Notice there are no parentheses when assigning, because you are referencing the function, not calling it yet.

## Storing Functions in Lists and Dictionaries

Functions can be stored in lists or dictionaries and called from there.

```python
def foo():
    return "foo"

def bar():
    return "bar"

list_of_funcs = [foo, print, bar]
print(list_of_funcs[0]())   # Calls foo()
list_of_funcs[1]("Hi!")    # Calls print()
```

Dictionaries work the same way:

```python
dict_of_funcs = {"f1": foo, "f2": bar}
print(dict_of_funcs["f1"]())   # Calls foo()
```

This shows that functions can be grouped, stored, and called dynamically.

## Functions as Arguments

Since functions are objects, you can pass them to other functions.

```python
def has_docstring(fn):
    return fn.__doc__ is not None

def yes():
    """I have a docstring"""
    pass

def no():
    pass

print(has_docstring(yes))   # True
print(has_docstring(no))    # False
```

Passing functions around lets you build flexible, reusable code.

## Nested Functions

Functions can be defined inside other functions. These are called nested or inner functions. They are useful for organizing code and hiding helper logic.

```python
def multiply_if_in_range(x, y):
    def in_range(value):
        return 0 <= value <= 10

    if in_range(x) and in_range(y):
        return x - y
```

Nested functions help break complex logic into smaller pieces without exposing helpers globally.

For more information, please see [Nested Functions.](/docs/021-Software-Engineering/020-Python/003-Advanced/022-Nested-Functions.md)

## Functions as Return Values

Functions can also return other functions. This allows dynamic behavior and is a key idea behind decorators.

```python
def get_printer():
    def print_me():
        print("Hello from the inner function")
    return print_me

new_func = get_printer()
new_func()
```

Output:

```
Hello from the inner function
```

The outer function returned the inner function, which can now be called independently.

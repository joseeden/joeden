---
title: "Decorators"
description: "Decorators"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 25
last_update:
  date: 10/28/2019
---

## Overview

Decorators are functions that **wrap other functions** to modify their behavior. They can change inputs, outputs, or even the way the function works internally.

- Decorators take a function as an argument and return a new function
- They can modify inputs before passing them to the original function
- They can modify outputs after the original function runs
- They can completely change the behavior of the original function

A decorator in Python is usually applied with the `@` symbol above a function definition. This is a shortcut for assigning the decorated function to the original function name.


## Creating a Simple decorator

Lets consider a simple `multiply` function:

```python
def multiply(a, b):
    return a * b
```

Calling it normally:

```python
result = multiply(1, 5)
print(result)
```

Output:

```bash
5
```

We can use a decorator to wrap a function and return a new version of it. For example, we can create `new_multiply` using a simple decorator `double_args` (it doesn’t modify the original function yet):

```python
def multiply(a, b):
    return a * b

# decorator
def double_args(func):
    return func 

new_multiply = double_args(multiply)
print(new_multiply(1, 5))
```

Output:

```bash
5
```

## Adding a Wrapper Function

To modify behavior, decorators usually define a **nested function** inside them. We'll call it `wrapper`. The wrapper can manipulate arguments or results:

```python
def multiply(a, b):
    return a * b

def double_args(func):
    def wrapper(a, b):
        return func(a, b)  # still just calls original function
    return wrapper

new_multiply = double_args(multiply)
print(new_multiply(1, 5))
```

Output:

```bash
5
```

The wrapper is still just passing arguments through.


## Modifying Arguments

Now the decorator will modify each argument before calling the original function. 

Here, `wrapper` multiplies `a` and `b` by 2 before calling `multiply`.

```python
def multiply(a, b):
    return a * b

def double_args(func):
    def wrapper(a, b):
        return func(a * 2, b * 2)
    return wrapper

new_multiply = double_args(multiply)
print(new_multiply(1, 5))
```

Output:

```bash
20
```


## Overwriting the Original Function

We can also overwrite the original function with its decorated version:

```python
def multiply(a, b):
    return a * b

def double_args(func):
    def wrapper(a, b):
        return func(a * 2, b * 2)
    return wrapper
    
multiply = double_args(multiply)
print(multiply(1, 5))
```

Output:

```bash
20
```

Python still stores the **original multiply function** inside the closure of `wrapper`, which allows the decorator to call it.


## Decorator syntax with `@`

Python allows a **shortcut** for applying decorators using `@`:

```python
@double_args
def multiply(a, b):
    return a * b

print(multiply(1, 5))
```

This is equivalent to:

```python
def multiply(a, b):
    return a * b

multiply = double_args(multiply)
print(multiply(1, 5))
```

The `@double_args` line just automatically applies the decorator and assigns the result back to the function name.

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
    return "I'm from foo!"

def bar():
    return "I'm from bar!"

list_of_funcs = [foo, print, bar]

print(list_of_funcs[0]())     # Calls foo()

list_of_funcs[1]("Hello!")       # Calls print()
```

Output:

```bash
I'm from foo!
Hello!
```

Dictionaries work the same way:

```python
def foo():
    return "I'm from foo!"

def bar():
    return "I'm from bar!"

dict_of_funcs = {
  "f1": foo, 
  "f2": bar,
  "f3": print
  }
  
print(dict_of_funcs["f2"]())   

dict_of_funcs["f3"]("Hello from inside a dictionary!")
```

Output:

```bash
I'm from bar!
Hello from inside a dictionary!
```

Notice that we didn't call `print()` on `dict_of_funcs["f3"]` because `dict_of_funcs["f3"]` already references the built-in `print` function**. Calling it directly executes `print`, which sends the string to the console. 

```python
dict_of_funcs["f3"]("Hello from inside a dictionary!") 
```

If we wrapped it in another `print()`, it would print `None` because `print()` itself does not return a value.

```python
print(dict_of_funcs["f3"]("Hello from inside a dictionary!")) 
```

Output:

```bash
None 
```

## Functions as Arguments

Since functions are objects, you can pass them to other functions.

In the example below, we check if a function has a docstring using `has_docstring()`.

- `yes()` has a docstring, so `has_docstring(yes)` returns `True`.
- `no()` does not have a docstring, so `has_docstring(no)` returns `False`.

```python
def yes():
    """I have a docstring"""
    pass

def no():
    pass

def has_docstring(fn):
    return fn.__doc__ is not None

print(has_docstring(yes))   # True
print(has_docstring(no))    # False
```

This shows that functions can be passed as arguments and inspected like any other object in Python.


## Nested Functions

Functions can be defined inside other functions. These are called **nested functions** or **inner functions**. They are useful for organizing code and hiding helper logic.

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

In the example below, `get_printer()` returns an inner function `print_word()` that can be called independently:

```python
def get_printer():
    def print_word():
        print("Hello from the inner function")
    return print_word

new_func = get_printer()
new_func()
```

Output:

```
Hello from the inner function
```

You can also return functions that take arguments. Here, `print_word()` accepts a string and prints it:

```bash
def get_printer():
    def print_word(word):
        print(word)
    return print_word

new_func = get_printer()
new_func("This is a sentence processed by the inenr function!")
```

Output:

```bash
This is a sentence processed by the inenr function!
```
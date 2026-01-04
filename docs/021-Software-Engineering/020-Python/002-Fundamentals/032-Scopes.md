---
title: "Scopes"
description: "Scopes"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 32
last_update:
  date: 10/28/2019
---

## Overview

Scope determines where a variable or object can be accessed in a program. Python has three main types of scope:

- **Global scope**

  - Names defined in the main body of a script
  - Accessible anywhere in the script unless shadowed by a local name

- **Local scope**

  - Names defined inside a function
  - Only exist while the function is running
  - Cannot be accessed outside the function

- **Built-in scope**

  - Names provided by Python itself, such as `print()` or `sum()`
  - Always available unless overridden by local or global names



## Local Variables

Variables defined inside a function are local and cannot be accessed outside.

```python
def square(x):
    new_val = x ** 2
    return new_val

square(4)

print(new_val)  # Error: new_val is not defined
```

Here, `new_val` exists only inside the function and is gone after the function ends.

## Global Variables 

Functions can access global variables, which are declared outside any function. If a local variable has the same name, it takes priority over the global one.

In this example, the `multiply` function uses the global `multiplier` because no local variable named multiplier is defined.

```python
multiplier = 5      # Global

def multiply(x):
    return x * multiplier

print(multiply(3))  # Output: 15
print(multiplier)   # Output: 5
```

In this second example, the local `multiplier` inside the function takes precedence. The global `multiplier` is unchanged.

```python

multiplier = 5          # Global

def multiply_local(x):
    multiplier = 2      # Local 
    return x * multiplier

print(multiply_local(3))  # Output: 6
print(multiplier)         # Output: 5
```

## Global Variable Updates

A function sees the current value of a global variable when it is called.

Here, the global `new_val` is initially assigned `5`, so `square(3)` returns `14`. After updating `new_val` to `10`, the same function call returns `19`.

```python
new_val = 5

def square(x):
    return x ** 2 + new_val

print(square(3))  # Output: 14

new_val = 10
print(square(3))  # Output: 19
```



## Modifying Global Variables

Normally, a function cannot change a global variable unless you explicitly tell Python to do so. You use the `global` keyword to allow a function to modify a global variable.

In this example, the `square_global` updates the global `new_val` directly because of the `global` keyword.

```python
new_val = 4

def square_global():
    global new_val
    new_val = new_val ** 2

square_global()
print(new_val)  # Output: 16
```

You can also see how `global` works when changing a variable inside a function while printing it:

```python
value = 10  

def example_global():
    global value
    value = 5  
    print("Inside function:", value)

example_global()
print("Outside function:", value)
```

Output:

```bash
Inside function: 5
Outside function: 5
```


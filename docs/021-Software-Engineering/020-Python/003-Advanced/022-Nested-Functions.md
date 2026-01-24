---
title: "Nested Functions"
description: "Nested Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 22
last_update:
  date: 10/28/2019
---

## Overview

Functions can be defined inside other functions to avoid repeating code. With nested functions, the inner function can use variables from the outer function.

In this example, the function `outer_fn` defines an inner function called `inner_fn` that adds `x` (from `outer_fn`) to `y` (passed to `inner_fn`). 

```python
def outer_fn(x):
    def inner_fn(y):
        return x + y
    return inner_fn

add_num = outer_fn(5)
print(add_num(3)) 
```

Output:

```bash
8 
```

**Explanation:**

1. Python enters `outer_fn` with `x = 5` when calling:

   ```python
   add_num = outer_fn(5)
   ```

   Notes:

   - The inner function `inner_fn(y)` is defined but not executed.
   - `inner_fn(y)` remembers `x = 5` from the outer function (closure).
   - `outer_fn` returns `inner_fn`.
   - The variable `add_num` now points to this inner function.
   - Calling `add_num(y)` will execute `inner_fn` with `y` as input.

2. When this line runs:

   ```python
   print(add_num(3))
   ```

   Python passes `3` as `y` to the inner function stored in `add_num`. 
   It calculates `x + y` → `5 + 3 = 8`.

This shows that `add_num` is a function, `x` is captured in the closure, and `y` is provided when the returned function is called.


## Returning Functions

Outer functions can return inner functions to create customized behavior, and the inner function remembers variables from the outer function. This is called a **closure** because the inner function retains access to the outer function’s variables even after the outer function has finished executing.

In this example, `raise_val` returns the inner function `inner_fn` that raises a number to the power `n`. `square` and `cube` are functions created by `raise_val`.

```python
def raise_val(n):
    def inner_fn(x):
        return x ** n
    return inner_fn

square = raise_val(2)
cube = raise_val(3)

print(square(4))  # Output: 16
print(cube(2))    # Output: Output:  8
```

**Explanation:** The explanation below is for `square` but works the same way for `cube`.

1. Python enters `raise_val` with `n = 2` when calling:

    ```bash
    square = raise_val(2) 
    ```

    Notes: 

    - The `inner_fn(x)` is defined but not executed. 
    - The `inner_fn(x)` remembers `n = 2` from `raise_val` (this is the closure).
    - The `raise_val` returns `inner_fn`
    - The variable `square` now points to this function. 
    - Now, `square(x)` calls `inner_fn` with `x` as input.

2. When this line is ran:

   ```python
   print(square(4))
   ```

   Python passes `4` as `x` to the inner function stored in `square`. 
   It calculates `x ** n` → `4 ** 2 = 16`.

This shows that `square` and `cube` are functions, `n` is captured by the closure, and `x` is provided when the returned function is called.


## Using Nonlocal

`Nonlocal` lets inner functions modify variables in outer functions. It works like `global` but only for enclosing function variables.

In this example, `counter` defines `inc` that increases `n` from `counter` each time it is called.

```python
def counter():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc

c = counter()
print(c())  # 1
print(c())  # 2
```

**Explanation:**

1. Python enters `counter()` and sets `n = 0`.

2. The inner function `inc()` is **defined but not executed** yet.

3. `counter()` returns `inc`, so `c` now points to `inc`.

4. When `c()` is called the first time:

   - Python runs `inc()` with access to `n` from the enclosing scope.
   - `n` is increased by 1 (`n = 1`) and returned.

    :::info 

    When you use `nonlocal n` inside `inc`, Python looks up one level to the enclosing scope (the outer function `counter`) to find `n`.

    :::

5. When `c()` is called the second time:

   - `inc()` runs again, remembering the previous `n = 1`.
   - `n` is increased by 1 (`n = 2`) and returned.



## Scopes (LEGB Rule)

Python looks for variables in this order: 

```
Local → Enclosing → Global → Built-in.
```

Assigning without global or nonlocal affects only local scope.

In this example, `outer_fn` defines `x` and `inner_fn` prints it. Python finds `x` in the enclosing scope (the outer function `outer_fn`).

```python
x = 10

def outer_fn():
    x = 5
    def inner_fn():
        print(x)  
    inner_fn()

outer_fn()  # Output: 5
```

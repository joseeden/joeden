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


## Creating a Simple Decorator

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

We can use a decorator to wrap the function and return a new version of it. 

For example, we can create `new_multiply` using a simple decorator `double_args` (it doesn’t modify the original function yet):

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

We can update the decorator so that it transforms the arguments before calling the original function.

In the example below, the `wrapper` function multiplies `a` and `b` by 2 before passing them to the original `multiply` function.

```python
def multiply(a, b):
    return a * b

# decorator
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

Here, the decorator creates a new function called `new_multiply`, while the original `multiply` function remains unchanged.

```bash
multiply      → original function
new_multiply  → decorated version
```

Both functions can still be used:

```bash
print(multiply(1, 5))      # 5
print(new_multiply(1, 5))  # 20
```

The decorator creates a modified version of the function without replacing the original function.

## Overwriting the Original Function

Instead of creating a new function, we can also replace the original function with its decorated version.

This is done by assigning the result of the decorator back to the same function name:

```bash
multiply = double_args(multiply)
```

Now the name `multiply` points to the wrapper function instead of the original function.

```bash
multiply → wrapper
```

The complete code now looks like this:

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

Even though `multiply` now refers to `wrapper`, the wrapper can still call the original `multiply` function because it is stored in the wrapper's closure.

## Modifying vs Overwriting 

There are two ways to use a decorator.

- Creating a new function keeps the original function unchanged
- Overwriting replaces the original function with decorated version

When a new function is created, both versions are available. 

When the function is overwritten, only the decorated version is used.

Overwriting is commonly used when the decorated behavior should fully replace the original function. This is also how Python’s `@decorator` syntax works, where the decorated function automatically replaces the original function name.

## Decorator syntax with `@`

Python allows a **shortcut** for applying decorators using `@`:

```python
@double_args
def multiply(a, b):
    return a * b
```

This is equivalent to:

```python
def multiply(a, b):
    return a * b

multiply = double_args(multiply)
```

The `@double_args` line just automatically applies the decorator and assigns the result back to the function name.

## Examples

### Before and After a Function

The example below shows a decorator that runs code **before and after** another function. The decorator `print_before_and_after` wraps the `multiply` function and prints a message before and after it runs.

```python
def print_before_and_after(func):
  def wrapper(*args):
    print('Before {}'.format(func.__name__))
    func(*args)
    print('After {}'.format(func.__name__))

  return wrapper

@print_before_and_after
def multiply(a, b):
  print(a * b)

multiply(7, 24)
```

Output:

```bash
Before multiply
168
After multiply
```

Here, `print_before_and_after` receives the `multiply` function as the argument `func`. The decorator returns the `wrapper` function, which prints a message before calling `multiply`, and another message after it finishes. 

The `@print_before_and_after` syntax automatically applies the decorator and replaces `multiply` with the wrapped version.


### Timing a Function

You can measure how long a function takes using a timer decorator. This helps find slow parts of your code.

- Records start time before the function runs
- Runs the function and stores the result
- Prints how long the function took to run
- Returns the original function’s result

Example:

```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timer
def sleep_n_seconds(n):
    time.sleep(n)

sleep_n_seconds(5)
```

Output:

```bash
sleep_n_seconds took 5.00 seconds
```

You can use this for any function to quickly check performance.

### Memoizing a Function

Memoization stores the results of expensive function calls. When the function is called again with the same arguments, it returns the cached result instead of recalculating.

- Uses a dictionary to map arguments to results
- Checks cache before running the function
- Stores new results in the cache

Example:

```python
import time

def memoize(func):
    cache = {}
    def wrapper(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

@memoize
def slow_sum(a, b):
    time.sleep(5)
    return a + b

print(slow_sum(3, 4))  # Takes 5 seconds
print(slow_sum(3, 4))  # Returns immediately
```

Memoization is helpful for functions that are called often with the same inputs, saving time and resources.

:::info[Memorization vs Memoization]

They sound similar, but in programming **memoizing** and the everyday word **memorizing** are different.

- Memorizing is about remembering information in your brain.
- Memoizing is about storing function results in memory so a computer can reuse them without recalculating.

Think of memoizing like keeping a **mini cheat sheet for a function.** You “remember” results, but it’s the computer’s memory, not yours.

::: 

## When to Use Decorators

Decorators are ideal when you want to add the same behavior to multiple functions. Instead of repeating code, you wrap functions with a decorator.

- Adds shared behavior without repeating code
- Keeps functions clean and readable
- Follows the “DRY (Don't Repeat Yourself)” principle

Using decorators lets you maintain code consistency and simplifies updates. You can add features like timing, logging, or caching easily.

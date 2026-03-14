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

- They can modify inputs before passing to the original function
- They can modify outputs after the original function runs
- They can completely change the behavior of the original function

Decorators are ideal when you want to add the same behavior to multiple functions. Instead of repeating code, you wrap functions with a decorator.

- Adds shared behavior without repeating code
- Keeps functions clean and readable
- Follows the “DRY (Don't Repeat Yourself)” principle

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

Python allows a **shortcut** for applying decorators using `@`.

- Uses `@decorator_name` above a function
- Automatically applies the decorator to the function
- Reassigns the decorated function to the same name

Example using the decorator `double_args` with the function `multiply`:

```python
@double_args
def multiply(a, b):
    return a * b
```

This syntax is simply a shortcut. Python internally performs the same operation as the example below, where the function `multiply` is passed to `double_args` and the returned function replaces the original `multiply`.

```python
def multiply(a, b):
    return a * b

multiply = double_args(multiply)
```

Additionally, decorators have very similar docstrings because they follow the same structure. 

```python
def double_args(func):
    """
    Decorator that doubles the arguments 
    before calling the function.

    Args:
        func (function): The original function to be decorated.

    Returns:
        function: A new function that doubles its input arguments 
                  before calling the original function.
    """
    def wrapper(a, b):
        return func(a * 2, b * 2)
    return wrapper

@double_args
def multiply(a, b):
    return a * b

print(multiply(3, 4))
```

You can also just include only the description in the docstrings.

```python
def double_args(func):
    """
    Decorator that doubles the arguments 
    before calling the function.
    """
    def wrapper(a, b):
        return func(a * 2, b * 2)
    return wrapper

@double_args
def multiply(a, b):
    return a * b

print(multiply(3, 4))
```



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

    """
    A decorator that prints how long a function took to run.

    Args:
      func (callable): The function being decorated.add()

    Returns:
      callable: The decorated function.
    """ 

    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timer
def sleep_in_seconds(n):
    time.sleep(n)

sleep_in_seconds(5)
```

Output:

```bash
sleep_in_seconds took 5.00 seconds
```

Another way to write the code:

```python
import time

def timer(func):

    """
    A decorator that prints how long a function took to run.

    Args:
      func (callable): The function being decorated.add()

    Returns:
      callable: The decorated function.
    """ 

    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        total = time.time() - start
        print("{} took {} seconds".format(func.__name__, total))
        return result
    return wrapper

@timer
def sleep_in_seconds(n):
    time.sleep(n)

sleep_in_seconds(5)
```

### Memoizing a Function

Memoization stores the results of expensive function calls. When the function is called again with the same arguments, it returns the cached result instead of recalculating.

- Uses a dictionary to map arguments to results
- Checks cache before running the function
- Stores new results in the cache

Below is an example of a memoize function.

```python
import time

def memoize(func):
    """
    Store the results of the decorated function for a fast lookup
    """

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

print(slow_sum(6, 2))  # Takes 5 seconds
print(slow_sum(6, 2))  # Returns immediately
```

**Note:** The code above  handles only **positional arguments (`*args`)**. If you call `slow_sum(a=6, b=2)` with keyword arguments, it won’t work.

If you want to handle both **positional (`*args`)** and **keyword (`**kwargs`)** arguments, you can change the code a bit and convert `kwargs` into a sorted tuple to make it hashable for the cache key. 

Here, the cache key is now `(args, kwargs_key)`.

```python
import time

def memoize(func):
    """
    Store the results of the decorated function for a fast lookup
    """

    cache = {}

    def wrapper(*args, **kwargs):
        kwargs_key = tuple(sorted(kwargs.items()))
        if (args, kwargs_key) not in cache:
            cache[(args, kwargs_key)] = func(*args, **kwargs)
        return cache[(args, kwargs_key)]
    return wrapper

@memoize
def slow_sum(a, b):
    time.sleep(5)
    return a + b

print(slow_sum(6, 2))  # Takes 5 seconds
print(slow_sum(a=6, b=2))  # Returns immediately
```

:::info[Memorization vs Memoization]

They sound similar, but in programming **memoizing** and the everyday word **memorizing** are different.

- Memorizing is about remembering information in your brain.
- Memoizing is about storing function results in memory so a computer can reuse them without recalculating.

Think of memoizing like keeping a **mini cheat sheet for a function.** You “remember” results, but it’s the computer’s memory, not yours.

::: 

### Printing the Return Type 

You can use a decorator to automatically print the type of a function’s return value. This works for any combination of positional and keyword arguments.

```python
def print_return_type(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)

        # Convert args, kwargs to strings
        args_str = ",".join([str(a) for a in args])
        kwargs_str = ",".join([f"{k}={v}" for k, v in kwargs.items()])
        all_args = ",".join(filter(None, [args_str, kwargs_str]))

        print("{}({}) returned type: {}".format(
          func.__name__,
          all_args,
          type(result)
        ))
        return result
    return wrapper


@print_return_type
def my_func(value):
    return value


my_func(24)
my_func([16, 18, 31])
my_func({'Tom': 36})
```

Output:

```bash
my_func(24) returned type: <class 'int'>
my_func([16, 18, 31]) returned type: <class 'list'>
my_func({'Tom': 36}) returned type: <class 'dict'>
```

This decorator captures the function’s arguments and return value, then prints the return type while keeping the original function behavior intact.

### Counter 

Decorators can be used to track how many times a function is called, which is useful in web applications or any situation where you want to monitor usage.

```python
def counter(func):
  def wrapper(*args, **kwargs):
    wrapper.count += 1
    return func(*args, **kwargs)
  wrapper.count = 0
  return wrapper

@counter 
def my_webapp_func_a():
  print('calling my_webapp_func_a()')
  
my_webapp_func_a()
my_webapp_func_a()

print('my_webapp_func_a() was called {} times.'.format(my_webapp_func_a.count))
```

Output:

```bash
calling my_webapp_func_a()
calling my_webapp_func_a()
my_webapp_func_a() was called 2 times.
```

The decorator adds a `count` attribute to the wrapper function and increments it each time the function is called, which lets you keep track of usage without changing the original function code.


## Decorators and Metadata

Decorators can change a function, but they also hide some of the function's information.  For example:

- Functions have a docstring that explains what they do
- Functions store metadata like name and default arguments

When a function is decorated, its docstring and name may point to the wrapper instead of the original function. This can make it hard to understand what the function does.

### With vs Without Decorators 

#### Without Decorators 

Consider the simple function without a decorator:

```python
def sleep_in_seconds(n):
    """
    Pause execution for n seconds
    """
    import time
    time.sleep(n)
```

You can access the docstring and the function's name via:

```bash
print(sleep_in_seconds.__doc__)
print(sleep_in_seconds.__name__)
```

Output:

```bash
Pause execution for n seconds
sleep_in_seconds
```

Functions also store other information, like default arguments:

```python
def greet(name="World"):
    print(f"Hello, {name}!")
```

Here, the default argument is "World" if no argument is passed to the function. You can access the default argument via:

```bash
print(greet.__defaults__)
```

Output:

```bash
('World',)
```

:::info 

Metadata gives insight into the function before decoration.

::: 


#### With Decorators 

If we decorate `sleep_in_seconds` with a `timer` decorator, the metadata is lost:

```python
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print("Elapsed: ", (end - start))
        return result
    return wrapper

@timer
def sleep_in_seconds(n):
    """
    Pause execution for n seconds
    """
    import time
    time.sleep(n)

print(sleep_in_seconds.__doc__)
print(sleep_in_seconds.__name__)
```

This returns:

```bash
None        # docstring 
wrapper     # function name
```


### Preserving Function Metadata

As seen in the previous exmaple, decorators overwrite the original function, so metadata appears from the wrapper. Python’s `functools.wraps` fixes this problem. 

The `wraps` keeps the metadata of original function even after decoration:

```python
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print("Elapsed: ", (end - start))
        return result
    return wrapper

@timer
def sleep_in_seconds(n):
    """Pause execution for n seconds"""
    import time
    time.sleep(n)

print(sleep_in_seconds.__doc__)
print(sleep_in_seconds.__name__)
```


Output:
    
```bash
Pause execution for n seconds
sleep_in_seconds
```

### Access to the Original Function

`wraps` also allows easy access to the original function via the `__wrapped__` attribute:

```python
original_func = sleep_in_seconds.__wrapped__
print(original_func.__name__)  
```

Output:

```bash
sleep_in_seconds
```

You can call or inspect the original function directly. This is simpler than digging through closures.

For example, you can run the original function without the decorator effects:

```bash
import time

# Call the original function directly
original_func(2)  # pause execution for 2 seconds
print("Original function executed without timer")
```

Output (after 2 seconds pause):

```bash
Original function executed without timer
```

This shows that `__wrapped__` lets you bypass the decorator. You can test, debug, or reuse the original function easily

### Example: Measuring Decorator Overhead

You can use a decorator to wrap a function and see how much extra time it adds. Here, the main function is `duplicate`, which repeats a list twice. 

We then test it both with the decorator `check_everything` and without it to compare execution time.

```python
from functools import wraps
import time

def check_everything(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return wrapper

@check_everything
def duplicate(my_list):
    """Return a new list that repeats the input twice"""
    return my_list + my_list

#################### TEST CASES #################### 

# Measure decorated function
start = time.time()
duplicated_list = duplicate(list(range(50_000_000)))  # make it slow enough to see time
end = time.time()
decorated_time = end - start

# Measure undecorated function 
start = time.time()
duplicated_list = duplicate.__wrapped__(list(range(50_000_000))) # make it slow enough to see time
end = time.time()
undecorated_time = end - start

print('Decorated time: {:.5f}s'.format(decorated_time))
print('Undecorated time: {:.5f}s'.format(undecorated_time))
```
Output:

```bash
Decorated time: 5.58940s
Undecorated time: 5.78278s 
```

As seen here, the `decorated_time` will be slightly larger than `undecorated_time` due to the tiny overhead of the wrapper function.


## Decorators with Arguments

Sometimes we want a decorator to take extra arguments, like how many times a function should run. We do this by nesting functions: 

- The outer function gets the argument, and
- the inner function gets the function to decorate.

Here’s a simple decorator that runs a function three times. The main function is `print_sum()`.

```python
def run_three_times(func):
    def wrapper(*args, **kwargs):
        for _ in range(3):
            func(*args, **kwargs)
    return wrapper

@run_three_times
def print_sum(a, b):
    print(a + b)

print_sum(3, 5)
```

Output:

```text
8
8
8
```


If we want to run a function **n times**, we need a **decorator factory**.

```python
def run_n_times(n):
  def decorator(func): 
    def wrapper(*args, **kwargs):
      for i in range(n):
        func(*args, **kwargs)
    return wrapper
  return decorator 
```

We can call `run_n_times(n)` with the number of repetitions, and it will return the a decorator function. The decorator wraps the original function and runs it `n` times

```python
@run_n_times (7)
def print_sum(a, b):
  print(a + b) 

@run_n_times (4)
def print_greeting(greet):
  print(greet)
  
print_sum(6, 9)
print_greeting("Hola!")
```

Output:

```text
15
15
15
15
15
15
15
Hola!
Hola!
Hola!
Hola!
```

You can also create new decorators from the original decorator:

```bash
run_two_times = run_n_times(2)
run_three_times = run_n_times(3)

@run_two_times 
def print_greeting(greet):
  print(greet)
print_greeting("Obrigado!")

@run_three_times 
def print_greeting(greet):
  print(greet)
print_greeting("Salamat!")
```

Output:

```text
Obrigado!
Obrigado!
Salamat!
Salamat!
Salamat!
```


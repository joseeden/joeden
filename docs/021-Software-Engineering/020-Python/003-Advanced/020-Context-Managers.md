---
title: "Context Managers"
description: "Context Managers in Python"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 20
last_update:
  date: 11/7/2019
---


## Overview

Context managers help you set up a temporary context for your code to run in and automatically clean up afterward. 

- Run code inside a controlled context
- Clean up after the code finishes
- Can return values to use inside the context

They are useful whenever you need to manage resources like files or network connections.

## Using a Context Manager

To use a context manager, you need to use the `with` keyword, followed by a function to enter a context.

- Add a colon and indent the block of code
- Use `as` to assign any returned value 

The syntax:

```python
with context_manager_function() as value:
    # code to run inside the context
    # code to run inside the context
```

## Example: Working with a File

The `open()` function is a an example of built-in context manager. It opens a file, lets you read or write, and closes it automatically when done.

```python
with open("example.txt") as my_file:
    text = my_file.read()
    length = len(text)

print(length)
```

In this example:

- `my_file` is returned by the context manager
- File is automatically closed after the indented block
- Safely use `text` and `length` after the block




## Example: Suppressing Exceptions

Python’s `contextlib` module has a context manager that can suppress specified exceptions.

```python
from contextlib import suppress

with suppress(ZeroDivisionError):
    result = 10 / 0
    print("This will not run if an error occurs")

print("Code continues safely")
```

Here, any `ZeroDivisionError` inside the block is ignored, and the code continues running.


## Writing a Context Manager

There are two ways to create a context manager:

1. Using a class that implements `__enter__` and `__exit__` methods
2. Using a generator function with the `contextlib.contextmanager` decorator

This page focuses on the second method: writing a context manager using a function. 

The steps are as follows:

1. Use a function to define the context manager
2. Decorate it with `@contextlib.contextmanager`
3. Include any setup code before `yield`
4. Include any cleanup code after `yield`

The function temporarily gives control to the code inside the `with` block and resumes afterward to finish cleanup.

```python
@contextlib.contextmanager
def my_context():
    # Include any setup code before `yield`
    # Include any setup code before `yield`
    yield 
    Include any cleanup code after `yield`
```

## The `yield` keyword

The `yield` keyword pauses a function, returns a value, and then continues running later. 

- Returns a value to the `with` block
- Pauses the function until the block finishes
- Continues running after the block for cleanup

The value yielded can be assigned to a variable using `as`, and any code after `yield` runs once the context ends.

In the example below, `my_context` yields the value `2103`, which is assigned to the variable `foo`. The message `"goodbye"` is printed after the `with` block finishes.

```python
from contextlib import contextmanager

@contextmanager
def my_context():
    print("hello")
    yield 2103
    print("goodbye")

with my_context() as foo:
    print("Value of foo inside context:", foo)
```

Output:

```bash
hello
Value of foo inside context: 2103
goodbye
```

Here, `foo` receives the value `2103` from `yield`. The function prints `hello` before the block and `goodbye` after, showing the setup and teardown behavior.


## Example: Context Manager for Resources

A context manager can handle setup and cleanup for resources, such as a database connection.

```python
from contextlib import contextmanager

@contextmanager
def database():
    conn = "Connected to database"
    print(conn)                 # setup code
    yield conn                  # gives control to the with block
    print("Disconnected")       # cleanup code

with database() as db:
    print("Using", db)
```

Output:

```
Connected to database
Using Connected to database
Disconnected
```

Here, the context manager connects before the block and disconnects after, which lets you focus only on using the resource.


## Example: Yielding None

Some context managers don’t return a value. For example, a directory manager can temporarily change the current working directory.

```python
import os
from contextlib import contextmanager

@contextmanager
def in_dir(path):
    old_dir = os.getcwd()
    os.chdir(path)
    yield
    os.chdir(old_dir)

with in_dir("/tmp"):
    print("Current directory inside block:", os.getcwd())

print("Back to original directory:", os.getcwd())
```

Output:

```bash
Current directory inside block: /tmp
Back to original directory: /mnt/c/Git/johnsmith
```

This lets you temporarily run code in another directory without manually changing back.


## Nested Context Managers

Python allows context managers to be nested so multiple resources can be safely used together.

- Open more than one resource at once
- Access all active resources inside the inner block
- Clean up all resources automatically

In the example below, `f_src` represents the source file and `f_dst` represents the destination file. Each line is read and written one at a time.

```python
def copy(src, dst):
    with open(src, "r") as f_src:
        with open(dst, "w") as f_dst:
            for line in f_src:
                f_dst.write(line)

copy("input.txt", "output.txt")
```

This works safely for large files because the function reads and writes one line at a time, and both files are automatically closed when the operation finishes.

## Handling Errors

Context managers need to release resources even when an error occurs. If cleanup code does not run, resources such as connections or devices may stay locked. To make sure cleanup always runs, whether an error happens or not, use `try` and `finally`.

In this example, the `get_printer` context manager provides a printer connection through the variable `printer`. The connection is always closed after the with block ends.

```python
from contextlib import contextmanager

@contextmanager
def get_printer():
    p = connect_to_printer()
    try:
        yield p
    finally:
        p.disconnect()

with get_printer() as printer:
    printer.print("Hello world")

```

If an error occurs while using the printer, the `finally` block still runs and disconnects it. This keeps the system safe and usable.

## Common Context Manager Patterns

Context managers are useful whenever code follows a setup and cleanup pattern.

| Setup Action                | Cleanup Action             |
| --------------------------- | -------------------------- |
| Open a file                 | Close the file             |
| Acquire a lock              | Release the lock           |
| Open a database connection  | Close the connection       |
| Start a transaction         | Commit or rollback         |
| Allocate a resource         | Free the resource          |
| Open a network socket       | Close the socket           |
| Change working directory    | Restore previous directory |
| Redirect stdout/stderr      | Restore original streams   |
| Start a timer               | Stop the timer             |
| Enter a thread/process pool | Shutdown the pool          |


These patterns appear often when working with files, network connections, devices, and locks. 

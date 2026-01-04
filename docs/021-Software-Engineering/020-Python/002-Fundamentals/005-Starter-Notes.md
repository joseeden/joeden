---
title: "Starter Notes"
description: "Notes on Python"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 5
last_update:
  date: 10/28/2019
---

## Install Python 

For Windows:

1. **Download Python:**
   - Go to the [official Python website](https://www.python.org/downloads/).
   - Click the "Download Python 3.x.x" button.

2. **Run the Installer:**
   - Open the downloaded `.exe` file.
   - On the installer screen, **check the box** for "Add Python to PATH" at the bottom.
   - Click on "Install Now."

3. **Verify Installation:**
   - Open Command Prompt (`cmd`) and type:
     ```bash
     python --version
     ```

4. **Install pip (if needed):**
   - `pip`, Python’s package installer, comes with Python 3.x. To verify, type:
     ```bash
     pip --version
     ```

For other OS, please see [official documentation.](https://www.python.org/downloads/)

## Running a Python script 

You can run a Python script using the `python` or `python3` keyword, followed by the name of the script:

```python
python3 script-name.py 
```


## Strings

Strings are one of the most common types of data used in Python. We can loop over them, but they also have special methods for formatting, joining, and searching data.

For more information, please see [Strings.](/docs/021-Software-Engineering/020-Python/002-Fundamentals/010-Strings.md)

## Lists and Tuples

Lists and tuples are containers that store multiple items in order. 

- Lists are changeable and you can add, remove, or modify items
- Tuples are immutable, so their items cannot be changed once created

For more information, please see [Lists](/docs/021-Software-Engineering/020-Python/002-Fundamentals/011-Lists.md) and [Tuples.](/docs/021-Software-Engineering/020-Python/002-Fundamentals/012-Tuples.md)


## Dictionaries 

Dictionaries are used to store related data as key and value pairs. They map a key to a value. 

- The key is usually a string or number
- The value can be any data type.

For more information, please see [Dictionaries.](/docs/021-Software-Engineering/020-Python/002-Fundamentals/013-Dictionaries.md)

## Numeric Data Types 

Python has several built-in ways to handle numbers. 

- Integers are for whole numbers
- Floats are for approximate or fractional numbers
- Decimals are for precise values, like money

For more information, please see [Numeric Data Types.](/docs/021-Software-Engineering/020-Python/002-Fundamentals/014-Numeric-Types.md)


## Implicit vs. Explicit Conversion

Type conversion changes a value from one data type to another. Python can do this automatically or manually.

- **Implicit conversion** happens automatically by Python when needed
- **Explicit conversion** is done manually using functions like `str()`, `int()`, or `float()`

Implicit conversion is convenient but limited, while explicit conversion gives you full control over how data types are changed.

For example, when adding an integer and a float, Python converts automatically to avoid errors:

```python
x = 5       # Integer     
y = 2.5     # Float
z = x + y   

print(z)    
print(type(z))  
```

Output:

```bash
7.5 
<class 'float'>
```

In contrast, explicit conversion lets you manually change a value’s type using functions like `str()`:

```python
num = 10
num_str = str(num)  

print(num_str)      
print(type(num_str))  
```

Output:

```bash
10
<class 'str'>
```

## Functions and Keywords

**Functions** perform specific tasks in code. They help organize logic and make code reusable.

- Functions take inputs (arguments) and may return outputs
- Functions can be built-in or user-defined
- Example: `print()` outputs a message to the screen

**Keywords** are reserved words that Python uses to form instructions. You cannot use them as variable names.

- Keywords have special meaning in Python
- Examples: `for`, `in`, `if`, `def`
- Full list includes: `False`, `True`, `None`, `return`, `break`, etc.

For more information, please see [Functions.](/docs/021-Software-Engineering/020-Python/002-Fundamentals/030-Functions.md)


## Common Pitfalls

Reminders:

- Uninitialized variables can lead to `NameError`.
- Ensure proper initialization before use.
- Infinite loops occur when loop conditions never change.
- Error messages may indicate timeout due to infinite loops.

Use the code below to get website statue:

```python
# get-website-status.py 

import requests
response = requests.get("https://youtube.com")
print(response)
```

Run the code:

```python
python3 get-website-status.py 
```

Output:

```python
<Response [200]> 
```
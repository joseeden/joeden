---
title: "Starter Notes"
description: "Notes on Python"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 10
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

If you have script, you can run it by:

```python
python3 script-name.py 
```


## Functions and Keywords  

**Functions** perform specific tasks in code.  

- Example: `print()` outputs a message to the screen.

**Keywords** are reserved words used to form instructions in Python.

- Examples: `for`, `in`, `if`, `def`.
- Full list includes: `False`, `True`, `None`, `return`, `break`, etc.

## Implicit vs. Explicit Conversion

- **Implicit Conversion**: Automatic type conversion by the interpreter.
- **Explicit Conversion**: Manual conversion using functions (e.g., `str()`).

## Defining Functions 

To define functions:

- Use `def` followed by the function name and parameters in parentheses.
- Indented code following the colon, using consistent spacing. 

Use `return` to send data back to the caller. Functions can return several values; ensure to store them appropriately.

## Recursion

**Recursive Functions** call themselves with modified parameters and must have a base case to stop the recursion.

```python
def recursive_function(n):
    if n <= 1:  # Base case
        return 1
    else:
        return n * recursive_function(n - 1)  # Recursive case
```

## Common Pitfalls

Reminders:

- Uninitialized variables can lead to `NameError`.
- Ensure proper initialization before use.
- Infinite loops occur when loop conditions never change.
- Error messages may indicate timeout due to infinite loops.

Use the code below to get website statue:

```python
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
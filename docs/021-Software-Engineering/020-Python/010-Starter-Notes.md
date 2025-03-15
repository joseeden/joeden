---
title: "Starter Notes"
description: "Notes on Python"
tags: [Computer Science, Application Development, Software Development, Python]
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


## Operators 

### Arithmetic Operators  

Python uses standard and special operators for math operations.

| Operator | Description                           | Example                  |
|----------|---------------------------------------|--------------------------|
| `+`      | Addition                              | `a + b`                  |
| `-`      | Subtraction                           | `a - b`                  |
| `*`      | Multiplication                        | `a * b`                  |
| `/`      | Division                              | `a / b`                  |
| `**`     | Exponentiation (power)               | `a ** b` (e.g., `a ** 2` for square) |
| `//`     | Integer division (quotient)          | `a // b`                 |
| `%`      | Modulus (remainder)                  | `a % b`                  |

### Comparison Operators

Comparison operators return boolean results (True/False).

| Operator | Description             | Example                        |
|----------|-------------------------|--------------------------------|
| `==`     | Equal                   | `5 == 5` → `True`              |
| `!=`     | Not equal               | `5 != 3` → `True`              |
| `<`      | Less than               | `3 < 5` → `True`               |
| `<=`     | Less than or equal      | `3 <= 3` → `True`              |
| `>`      | Greater than            | `5 > 3` → `True`               |
| `>=`     | Greater than or equal   | `5 >= 5` → `True`              |

### Logical Operators

Logical operators are used to combine conditional statements and determine the truth value of expressions.

| Operator | Description                | Example                                  |
|----------|----------------------------|------------------------------------------|
| `and`    | True if both sides are True | `True and False` → `False`               |
| `or`     | True if either side is True | `True or False` → `True`                 |
| `not`    | Inverts the boolean value   | `not True` → `False`, `not False` → `True` |

### Modulo Operator

**Modulo Operator (`%`)** returns the remainder of division.
Example: `5 % 2` returns `1`.

## If and Else

An **If Statement** begins with `if`, followed by a condition and a colon. The indented code runs if the condition is True.

```python
if x > 5:
    print("x is greater than 5")
```

#### Else Statement

An **Else Statement** executes code when the preceding `if` condition evaluates to False.

```python
if x > 5:
    print("x is greater than 5")
else:
    print("x is less than or equal to 5")
```

#### Branching Syntax

In the example below, multiple conditions are checked using `if`, `elif`, and `else`:

```python
if condition1:
    # if-block
elif condition2:
    # elif-block
else:
    # else-block
```

If `condition1` is not met, `condition2` is checked. If both are not met, then it goes through the `else` block.

## Loops 

### While Loop

A **While Loop** executes as long as the specified condition is True.

```python
while x < 5:
    print(x)
    x += 1
```

### For Loop

A **For Loop** iterates over a sequence (like a list or a string).

```python
for i in range(5):
    print(i)
```

### Break & Continue

Ways to stop or control loops:

- **break**: Exits the loop entirely.
- **continue**: Skips to the next iteration of the loop.

Example:

```python
for i in range(5):
    if i == 3:
        break  # Loop stops when i equals 3
    print(i)
```


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
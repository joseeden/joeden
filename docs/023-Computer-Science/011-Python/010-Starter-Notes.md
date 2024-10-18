---
title: "Starter Notes"
description: "Notes on Python"
tags: [Computer Science, Application Development, Software Development, Python]
sidebar_position: 10
last_update:
  date: 6/13/2020
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
- More functions will be introduced later.

**Keywords** are reserved words used to form instructions in Python.

- Examples: `for`, `in`, `if`, `def`.
- Full list includes: `False`, `True`, `None`, `return`, `break`, etc.
- No need to memorize; each will be covered as needed.

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

Here's a table summarizing the arithmetic operators in Python:

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
  
| Operator | Description                         |
|----------|-------------------------------------|
| `==`     | Equal                               |
| `!=`     | Not equal                           |
| `<`      | Less than                           |
| `<=`     | Less than or equal                  |
| `>`      | Greater than                        |
| `>=`     | Greater than or equal               |

### Logical Operators

Used to combine conditional statements and determine the truth value of expressions. 

  - `and`: True if both sides are True.
  - `or`: True if either side is True.
  - `not`: Inverts the boolean value.

### Modulo Operator

**Modulo Operator (`%`)** returns the remainder of division.
Example: `5 % 2` returns `1`.

## If and Else

- **If Statement**: 

  - Begins with `if`, followed by a condition and a colon.
  - Indented code runs if the condition is True.

- **Else Statement**: 

  - Executes code when the preceding `if` evaluates to False.

- **Branching Syntax**:

    ```python
    if condition1:
        if-block
    elif condition2:
        elif-block
    else:
        else-block
    ```


## Loops 

### While Loop

**While Loop** executes as long as the condition is True.

```python
while condition:
    body
```

### For Loops Recap

**For Loop** iterates over a sequence.

  ```python
  for variable in sequence:
      body
  ```

### Break & Continue

Ways to stop loops:

- **break**: Exits the loop.
- **continue**: Skips to the next iteration.


## Recursion

**Recursive Functions** must have a base case and a recursive case.

  ```python
  def recursive_function(parameters):
      if base_case_condition(parameters):
          return base_case_value
      recursive_function(modified_parameters)
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
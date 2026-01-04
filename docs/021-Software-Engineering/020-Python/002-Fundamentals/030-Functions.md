---
title: "Functions"
description: "Python Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 30
last_update:
  date: 10/28/2019
---

## Overview

Functions let you group code to reuse it easily. You define them with a name, optional parameters, and a block of indented code.

## Built-in functions

Python has many built-in functions that perform common tasks. 

Examples: 

1. `str()` converts a value to a string::
  
    ```bash
      num = 10
      text = str(num)
    print(text)       # Output: '10'
    ```

2. `int()` converts a value to an integer:

    ```python
    value = "25"
    number = int(value)
    print(number)     # Output:  25
    ```

3. `float()` converts a value to a float:

    ```python
    value = "3.14"
    pi = float(value)
    print(pi)         # Output:  3.14
    ```

4. `len()` returns the length of a sequence:

    ```python
    fruits = ["apple", "banana", "cherry"]
    print(len(fruits))  # Output:  3
    ```

5. `abs()` returns the absolute value of a number:

    ```python
    num = -7
    print(abs(num))   # Output:  7
    ```


## Defining a Function  

To create a custom function, we use `def`, which stands for "define", followed by function name and parentheses.

```python
def my_function():
    print("Hello, world!")
```

The functions names should also be short and descriptive. For example, a function that calculates the total of two numbers:

```python
def calculate_total(a, b):
    return a + b
```

To call the function:

```bash
my_function()
calculate_total(2, 3)   # Requires two argumenst
```

Output:

```bash
Hello, world!
5  
```

The function body can also have multiple lines:

```python
def average(numbers):
    total = sum(numbers)     
    count = len(numbers)     
    return total / count     

print(average([80, 90, 100]))  # Output: 90.0   
```

We can also store the result in a variable for later use.  

```python
average_sales = average([80, 90, 100])
print(average_sales)  # Output: 90.0  
```


## Arguments/Parameters

Functions take **arguments/parameters**, which are values provided inside parentheses when calling a function. 

In the example below, the `square` function takes a number as input, squares it, and prints the result.

```python
def square(value):
    new_value = value ** 2
    print(new_value)

square(5)  # Output: 25
square(10) # Output: 100
```


### Argument Types 

There are two main types: 

- **Positional arguments** - Provided in order, separated by commas. The function assigns them based on position.  
    
    ```python
    round(3.14159, 2)  # 3.14
    ```  

- **Keyword arguments** - Each argument is assigned using its name. This makes the function call clearer.  

    ```python
    round(number=3.14159, ndigits=2)  # 3.14
    ```  

### Default Arguments  

Some functions have **default arguments**, which are used if no value is provided when calling the function.

Example with `round()`:

```python
num = 3.14159

print(round(num))       # Output: 3, default rounds to 0 decimals
print(round(num, 2))    # Output: 3.14, rounds to 2 decimals
```  

### Modifying the `average()` Function  

We update the function to include a **keyword argument** with a default value.  

```python
def average(values, rounded=False):  
    avg = sum(values) / len(values)  
    return round(avg, 2) if rounded else avg  

sales = [100, 200, 300]  

print(average(sales))          # 200.0  
print(average(sales, True))    # 200.00  
```  

Note: 

- **Using positional arguments**  
  
  - average(sales, False)` returns `200.0`. 
  - Omitting `rounded` gives the same result.  

- **Using keyword arguments**  
  - `average(values=sales, rounded=True)` returns `200.00`.




## Return Values 

Instead of printing a result, a function can return a value using `return`. This lets you assign the result to a variable.

In the example below, the `square` function returns the square of a number:

```python
def square(value):
    return value ** 2

num = square(6)
print(num)  # Output: 36
```

## Docstrings

Docstrings describe what a function does. They are written inside triple quotes (`"""`) immediately after the function header.

For more information, please see [Docstrings.](/docs/021-Software-Engineering/020-Python/002-Fundamentals/035-Docstrings.md)

```python
def square(value):
    """Returns the square of a value."""
    return value ** 2
```

## Recursive Functions

**Recursive functions** call themselves with modified parameters and must have a base case to stop the recursion.

- The base case ends the recursion
- The recursive case calls the function again with changed parameters

For example, a function to calculate factorial using recursion:

```python
def recursive_function(n):
    if n <= 1:  # Base case
        return 1
    else:
        return n * recursive_function(n - 1)  # Recursive case
```

Output:

```bash
120
```

This shows how recursion repeats a process until the base case is reached. 


## Examples

1. **Rounding a Calculation** 

    We can round results before returning them.  

    ```python
    def average(numbers):
        return round(sum(numbers) / len(numbers), 2)
    ```

    Functions return a result using `return`.  


2. **Arguments with Default Values**

    This function replaces spaces with underscores and converts text to lowercase by default.

    ```python
    def clean_text(text, lower=True):
      if lower == False:
        clean_text = text.replace(" ", "_")
        return clean_text
      else:
        clean_text = text.replace(" ", "_")
        clean_text = clean_text.lower()
        return clean_text
      if remove != None:
        clean_text = text.replace(remove, "")
        clean_text = clean_text.lower()
        return clean_text
      else:
        clean_text = text.lower()
        return clean_text

    ```

    To call the function:

    ```bash
    clean_text("ThIs iS a DirTy sEntENCe")
    ```

    Output:

    ```plaintext
    'this_is_a_dirty_sentence'  
    ```

3. **Data Structure Converter**

    This function converts a collection into a **list, set, or tuple** based on the specified `data_type`. If no `data_type` is provided, it defaults to `"list"`. 

    ```python
    def convert_data_structure(data, data_type="list"):
      if data_type == "tuple":
        data = tuple(data)
      elif data_type == "set":
        data = set(data)
      else:
        data = list(data)
      return data
    ```

    To call the function and store in a variable:

    ```bash
    texts = convert_data_structure({"a", 1, "b", 2, "c", 3})
    print(texts)
    print(type(texts))
    ```

    Since no `data_type` is provided, the function defaults to a **list**.  

    ```plaintext
    [1, 'a', 3, 2, 'b', 'c']
    <class 'list'>
    ```

    If `data_type="set"`, the function returns a **set**:  

    ```bash
    texts = convert_data_structure({"a", 1, "b", 2, "c", 3}, "set")
    print(texts)
    print(type(texts))
    ```

    Output:

    ```plaintext
    {1, 'a', 3, 2, 'b', 'c'}
    <class 'set'>  
    ```


4. **Check Disk and CPU Usage**

    Get the script here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/020-Python/000-Projects/001-Basic-Scripts)


    This Python script checks disk and CPU usage using the `shutil` and `psutil` modules:

    - **shutil**: `disk_usage()` to return disk statistics (total, used, and free space).
      
    - **psutil**: `cpu_percent()` function retrieves the current CPU usage percentage.

    Make sure to install `psutil` first:

    ```python
    pip3 install psutil 
    ```

    To run the script:

    ```bash
    ./check-disk-cpu-usage.py
    ```

    If you encounter a "permission denied" error, it indicates the script lacks execute permissions. Fix this by updating the permissions:

    ```bash
    sudo chmod +x check-disk-cpu-usage.py
    ```

    Another way to run it is:

    ```bash
    python3 check-disk-cpu-usage.py
    ```


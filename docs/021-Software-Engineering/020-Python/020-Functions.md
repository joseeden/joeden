---
title: "Functions"
description: "Python Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 20
last_update:
  date: 10/28/2019
---

## Overview

If there's no existing module or package for a task, we can create our own function. This helps avoid writing long, repetitive code. A common rule is **DRY** (Don't Repeat Yourself).  

- Useful for repeated tasks  
- Simplifies complex syntax  
- Makes code reusable  

## Defining a Function  

To create a function, we use `def`, which stands for "define".  

```python
def my_function():
    print("Hello, world!")
```

Notes:

- Add parentheses `()` after the function name.  
- Inside the parentheses, define the **arguments**.  
- The function header ends with a colon `:`.

## Naming a Function  

Functions can have any name, but they should be short and descriptive.  

```python
def calculate_total():
    pass
```

## Writing Function Code  

The function body is indented and can have multiple lines.  

```python
def average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count
```


## Using the Function  

We call a function by using its name and passing arguments.  

```python
result = average([10, 20, 30])
print(result)  # Output: 20.0
```

## Storing the Output  

We can save the result in a variable for later use.  

```python
average_sales = average([100, 200, 300])
print(average_sales)  # Output: 200.0
```


## Arguments 

### Function Arguments  

Functions take **arguments**, which are values provided inside parentheses when calling a function. There are two main types: **positional** and **keyword** arguments.  

- **Positional arguments**  

  Provided in order, separated by commas. The function assigns them based on position.  
  ```python
  round(3.14159, 2)  # 3.14
  ```  

- **Keyword arguments**  

  Each argument is assigned using its name, making the function call clearer.  
  ```python
  round(number=3.14159, ndigits=2)  # 3.14
  ```  

### Default Arguments  

Some functions have **default arguments**, meaning a value is already assigned if none is provided.  

- **Example with `round()`**  
  ```python
  help(round)  
  ```  
  Output shows `ndigits=None`, meaning if omitted, it rounds to an integer.  

- **Why use default arguments?**  
  - Reduces required inputs for common cases  
  - Allows flexibility to override when needed  

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


## Example: Rounding a Calculation  

We can round results before returning them.  

```python
def average(numbers):
    return round(sum(numbers) / len(numbers), 2)
```

Functions return a result using `return`.  


## Example: Arguments with Default Values 

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

## Example: Data Structure Converter

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


## Example: Check Disk and CPU Usage 

Get the script here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/assets/code/python/basics)


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


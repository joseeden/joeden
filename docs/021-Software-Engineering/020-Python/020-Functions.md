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

## Example: Rounding a Calculation  

We can round results before returning them.  

```python
def average(numbers):
    return round(sum(numbers) / len(numbers), 2)
```

Functions return a result using `return`.  


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


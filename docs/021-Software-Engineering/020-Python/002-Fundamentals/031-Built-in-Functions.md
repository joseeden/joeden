---
title: "Built-in Functions"
description: "Built-in Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 31
last_update:
  date: 10/29/2019
---


## Overview  

Python has many built-in functions to simplify tasks. Some functions are used often are:

- `print()`: Displays output.  
- `type()`: Shows the type of a value.  
- `range()`: Generates numbers, often used in loops.  

## Finding Min and Max  

Python makes working with numbers easy.  

- `max()`: Finds the highest value in a list.  
- `min()`: Finds the lowest value.  

```python
sales = [200, 150, 300, 100]
print(max(sales))  # 300
print(min(sales))  # 100
```

## Summing and Rounding  

We can calculate totals and round numbers.  

- `sum()`: Adds up all values in a list.  
- `round()`: Rounds a number to a set number of decimal places.  

```python
total_sales = sum(sales)  
rounded_sales = round(total_sales, 2)  
print(rounded_sales)  
```

## Nested Functions  

Functions can be used inside other functions.  

```python
print(round(sum(sales), 2))  
```

This directly sums and rounds in one step.  

## Counting Items  

We can count elements using `len()`. This works on lists, strings, dictionaries, sets, and tuples.  

```python
print(len(sales))  # 4 transactions  
print(len("Hello World"))  # 11 characters (including space)  
```

## Sorting Data  

We can sort lists and strings.  

- `sorted()`: Orders values in ascending order.  

```python
print(sorted(sales))  # [100, 150, 200, 300]  
print(sorted("Alice"))  # ['A', 'c', 'e', 'i', 'l']  
```

## Getting Help  

The `help()` function provides details about other functions.  

```python
help(sorted)  
```

It shows arguments like `key` and `reverse`, which modify sorting behavior.  

## Why Use Functions?

Functions save time and reduce mistakes. For example, instead of looping manually, we use built-in functions like `sum()`.  

```python
total = 0  
for sale in sales:  
    total += sale  
print(total)  # Same as sum(sales)  
```

Using `sum(sales)` is shorter and cleaner.  


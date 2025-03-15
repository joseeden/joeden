---
title: "2D NumPy Array"
description: "2D NumPy Array"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Data Analysis
sidebar_position: 21
last_update:
  date: 8/17/2021
---


## Overview 

NumPy arrays are of type `numpy.ndarray`, indicating they are n-dimensional arrays.  

- Arrays like `np_height` and `np_weight` are 1D arrays.  
- NumPy supports higher dimensions, including 2D, 3D, or more.  

Example:  

```python
import numpy as np  
np_height = np.array([1.56, 1.75, 1.89])  
print(type(np_height))  
```

Output: 

```bash
<class 'numpy.ndarray'>
```

## Working with 2D Arrays  

A 2D NumPy array is like a grid or a table.  

- Create it from a list of lists.  
- Each sublist corresponds to a row.  
- The `shape` attribute shows the array's dimensions.  

Example:  

```python
np_2d = np.array([[1.56, 65.3], [1.75, 72.4], [1.89, 89.1]])  
print(np_2d.shape)  
```

This will return the following output, indicating the array has 3 rows with 2 columns each.

```bash
(3, 2)
```

:::info 

All elements must be of the same type. If one element is a string, all will convert to strings.

:::


## Accessing Specific Data  

You can subset a 2D array to access specific rows, columns, or elements. 

Syntax: Use `np_2d[row][column]` or `np_2d[row, column]`.  

Using the previous example, we can get the 2nd row's 2nd element by: 

```python
print(np_2d[1][1])     # Output: 72.4  
print(np_2d[1, 1])     # Output: 72.4
```

## Slicing Rows and Columns  

- Use `np_2d[:, 1]` for all rows in column 1.  

Using the Numpy array below: 

```python
np_2d = np.array([
          [1.56, 65.3], 
          [1.75, 72.4], 
          [1.89, 89.1]])  
```

To select column 1 for all rows:

```python
subset = np_2d[:, 1]  
print(subset)          
```

Output: 

```python
[65.3 72.4 89.1]
```

To select rows 0-2, column 1:

```python
subset = np_2d[0:2, 0]  
print(subset)          
```

Output:

```python
[1.56 1.75]
```  

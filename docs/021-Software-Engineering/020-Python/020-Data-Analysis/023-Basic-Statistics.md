---
title: "Basic Statistics"
description: "Basic Statistics"
tags:
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 23
last_update:
  date: 6/13/2020
---


## Overview 

The first step in analyzing data is understanding it.  

- NumPy allows for efficient statistical analysis.  
- It’s perfect for crunching large datasets

Imagine a city survey of 5000 adults on their height and weight.  

- Data is stored in a 2D NumPy array, `np_city` (5000 rows, 2 columns).  
- Analyzing raw numbers directly isn’t useful
- For this one, you need summarizing statistics.  

## Summarizing Statistics  

NumPy simplifies data analysis by providing built-in functions.  

- Use `np.mean()` for the average value.  
- `np.median()` calculates the median value.  

Example:  

```python
import numpy as np  
np_city = np.array([[1.75, 70], [1.80, 80], [1.60, 65]])  
avg_height = np.mean(np_city[:, 0])  
median_height = np.median(np_city[:, 0])  
print(avg_height, median_height)
```

## More NumPy Statistical Functions  

NumPy offers additional statistical functions:  

- `np.corrcoef()` for correlation between height and weight.  
- `np.std()` for standard deviation.  
- `np.sum()` and `np.sort()` are also available, with the advantage of speed.  

## Simulating Data with NumPy 

You can generate data using NumPy for analysis.  

- Use `np.random` to create random datasets.  
- `np.column_stack()` can combine columns into a 2D array.  

Example:  

```python
heights = np.random.normal(1.75, 0.1, 5000)  
weights = np.random.normal(70, 15, 5000)  
np_city = np.column_stack((heights, weights))  
```  

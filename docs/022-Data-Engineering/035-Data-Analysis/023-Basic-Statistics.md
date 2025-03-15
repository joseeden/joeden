---
title: "Basic Statistics"
description: "Basic Statistics"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- NumPy
- Data Analysis
sidebar_position: 23
last_update:
  date: 8/17/2021
---


## Overview 

The first step in analyzing data is understanding it.  

- NumPy allows for efficient statistical analysis.  
- It’s perfect for crunching large datasets

Imagine a city survey of 5000 adults on their height and weight.  

- Data is stored in a 2D NumPy array, `np_city` (5000 rows, 2 columns).  
- Analyzing raw numbers directly isn’t useful

Implementing it:

```python
import numpy as np
np_city = np.array([
    [1.75, 70], 
    [1.80, 80], 
    [1.60, 65],
    .........
  ])          
]) 
```

For this one, you need summarizing statistics.  

## Summarizing Statistics  

NumPy simplifies data analysis by providing built-in functions.  

- Use `np.mean()` for the average value.  
- `np.median()` calculates the median value.  

Example:  

```python
```python
import numpy as np
np_city = np.array([
    [1.75, 70], 
    [1.80, 80], 
    [1.60, 65],
    .........
  ])          
]) 

avg_height = np.mean(np_city[:, 0])  
median_height = np.median(np_city[:, 0])  
print(avg_height, median_height)
```

## More Statistical Functions  

NumPy offers additional statistical functions:  

- `np.corrcoef()` for correlation between height and weight.  
- `np.std()` for standard deviation.  
- `np.sum()` and `np.sort()` are also available, with advantage of speed.  

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

## Use in an example 

Consider the track players data below which is a 2D Numpy array with 3 columns: height (cm), weight (kg), age (years). The data has 8024 rows, but for simplicity, we'll just use the first few rows.

```python
import numpy as np

track = [
    [180, 78.4, 22],  
    [215, 102.7, 28],
    [210, 98.5, 25],
    [188, 75.2, 22],
    [176, 73.6, 20],
    [209, 99.3, 30],
    [200, 95.5, 27],
    [190, 86.4, 24],
    .......
]

np_track = np.array(track)
```

Create numpy array `np_height_in` that is equal to first column of `np_track`. Then print the median and mean height of the players.

```python
np_height_in = np_track[:,0]
track_mean = np.mean(np_height_in)
track_median = np.median(np_height_in)

print("Mean: " + str(track_mean))
print("Median: " + str(track_median))
```

Output:

```python
Mean: 196.0  
Median: 195.0
```

Next, get the standard deviation on height.

```python
track_stddev = np.std(np_height_in) 
print("Standard Deviation: " + str(track_stddev))
```

Output:

```python
Standard Deviation: 13.683932183404009 
```

Finally, determine if big players tend to be heavier. To do this, we can find the correlation between the height and weight, which is the first and second column of the numpy array.

```python
track_correl = np.corrcoef(
  np_track[:,0],
  np_track[:,1]
) 
print("Correlation: " + str(track_correl))
```

Output:

```python
Correlation: [[1.         0.95853218]
              [0.95853218 1.        ]] 
```   
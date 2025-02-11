---
title: "Merging Ordered and Time-Series Data"
description: "Merging Ordered and Time-Series Data"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 46
last_update:
  date: 6/13/2020
---



## Overview

The `merge_ordered()` method is used for merging time-series or ordered data. This method merges two tables while maintaining their order and sorting the result. It's similar to the standard **merge()**, but designed for ordered data like time-series.  

- **Default join**: "outer" (includes all records, fills missing values with NaN).  
- **Sorted output**: Ensures the merged data is in order. 

![](/img/docs/02112025-mergin-timeseries-data.png)

Comparison between `merge()` and `merge_ordered()`:

| **Feature**               | **merge()**                               | **merge_ordered()**                        |
|---------------------------|-------------------------------------------|-------------------------------------------|
| **Column(s) to Join On**  | `on`, `left_on`, and `right_on`           | `on`, `left_on`, and `right_on`           |
| **Type of Join**          | `how` (left, right, inner, outer)         | `how` (left, right, inner, outer)         |
|                           | Default: `inner`                          | Default: `outer`                          |
| **Overlapping Columns**   | `suffixes`                                | `suffixes`                                |
| **Calling the Method**    | `df1.merge(df2)`                          | `pd.merge_ordered(df1, df2)`              |


## Using `merge_ordered()`

Consider the stock data for Apple and McDonald's below.

```python
import pandas as pd

# Apple stock data
apple = pd.DataFrame({
    'date': ['2007-02-01', '2007-03-01', '2007-04-01'],
    'price': [90, 92, 95]
})

# McDonald's stock data
mcd = pd.DataFrame({
    'date': ['2007-01-01', '2007-03-01', '2007-05-01'],
    'price': [60, 62, 65]
})
```

To merge the two data: 

```python 
merged = pd.merge_ordered(apple, mcd, on='date', suffixes=('_apple', '_mcd'))
print(merged)
```

Output:

```
         date  price_apple  price_mcd
0  2007-01-01          NaN       60.0
1  2007-02-01         90.0        NaN
2  2007-03-01         92.0       62.0
3  2007-04-01         95.0        NaN
4  2007-05-01          NaN       65.0
```

## Forward Fill  

Missing values can be filled using **forward fill** (`'ffill'`), which fills gaps by using the last known value.  

![](/img/docs/02112025-mergin-forward-fill.png)

```python
merged_ffill = pd.merge_ordered(apple, mcd, on='date', 
                                suffixes=('_apple', '_mcd'), 
                                fill_method='ffill')
print(merged_ffill)
```

Without forward filling:

```python
         date  price_apple  price_mcd
0  2007-01-01          NaN       60.0
1  2007-02-01         90.0        NaN
2  2007-03-01         92.0       62.0
3  2007-04-01         95.0        NaN
4  2007-05-01          NaN       65.0 
```

After applying forward fill:

```python
         date  price_apple  price_mcd
0  2007-01-01          NaN         60
1  2007-02-01         90.0         60
2  2007-03-01         92.0         62
3  2007-04-01         95.0         62
4  2007-05-01         95.0         65
```

Notice that the stock price of Apple is still showing `NaN` because there is no row preceding it.

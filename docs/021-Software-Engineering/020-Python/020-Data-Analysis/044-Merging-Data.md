---
title: "Merging Data"
description: "rging Data using Pandas"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 44
last_update:
  date: 6/13/2020
---


## Overview

In data analysis, merging combines two datasets into one based on a common column or index. Pandas provides powerful functions like `merge()` for this purpose.

Example tables:

**Table A**:  

| x   | y   | z   |  
|-----|-----|-----|  
| 1   | 10  | 20  |  
| 2   | 15  | 25  |  
| 3   | 20  | 30  |  

**Table B**:  
| x   | y   | w   |  
|-----|-----|-----|  
| 1   | 50  | 100 |  
| 2   | 60  | 110 |  
| 4   | 70  | 120 |  

First, make sure to create the dataframes:

```python
import pandas as pd

table_a = pd.DataFrame({
    'x': [1, 2, 3],
    'y': [10, 15, 20],
    'z': [20, 25, 30]
})

table_b = pd.DataFrame({
    'x': [1, 2, 4],
    'y': [50, 60, 70],
    'w': [100, 110, 120]
})
```

To merge Table A and Table B on column "x":

```python
merged_data = table_a.merge(table_b, on='x')
print(merged_data)
```

Output:

| x   | y_x | z   | y_y | w   |  
|-----|-----|-----|-----|-----|  
| 1   | 10  | 20  | 50  | 100 |  
| 2   | 15  | 25  | 60  | 110 |  

:::info 

To see more examples, please see [Merging Data with Pandas Notebook.](/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Sample-Notebooks)

:::

## Set Custom Suffixes

To distinguish columns with the same name, you can use the `suffixes` parameter.

```python
merged_data_custom = table_a.merge(table_b, on='x', suffixes=('_A', '_B'))

print(merged_data_custom)
```

**Output:**
| x   | y_A | z   | y_B | w   |  
|-----|-----|-----|-----|-----|  
| 1   | 10  | 20  | 50  | 100 |  
| 2   | 15  | 25  | 60  | 110 |  


## Merging Multiple DataFrames

Merging multiple DataFrames allows you to combine related data from different tables into a single table for analysis. This is useful when data is spread across multiple sources.

To merge two tables:  

```python
merged_df = df1.merge(df2, on='id')
```  

To merge three tables:

```python
merged_df = df1.merge(df2, on='id') \
  .merge(df3, on='id')
```  


To merge four tables (and so on):

```python
merged_df = df1.merge(df2, on='id') \
  .merge(df3, on='id') \
  .merge(df4, on='id')
```  

:::info 

To see more examples, please see [Merging Data with Pandas Notebook.](/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Sample-Notebooks)

:::
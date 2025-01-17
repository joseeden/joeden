---
title: "Aggregating Data"
description: "Aggregating Data"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 42
last_update:
  date: 6/13/2020
---


## Summarizing Numerical Data  

The mean is a common way to identify the "center" of numeric data. You can compute it using `.mean()` on a column. Other summary statistics include median, mode, min, max, variance, standard deviation, sums, and quantiles.  

```python
my_dataframe['column_name'].mean()
my_dataframe['column_name'].median()
my_dataframe['column_name'].quantile(0.25)  # 25th percentile
```

## Summarizing Dates 

Date columns can also have summary statistics. For example, to find the oldest and youngest dates in a column, use `.min()` and `.max()`.  

```python
my_dataframe['date_column'].min()
my_dataframe['date_column'].max()
```

## Using `.agg()` Method  

The `.agg()` method lets you apply custom summary functions. For example, we can create a `compute_30th` function which takes the column and computes the 30th percentile. This function can then be used with the `agg()` function.

```python
def compute_30th(column):
    return column.quantile(0.3)

my_dataframe['weight'].agg(compute_30th)
```

## Summarizing Multiple Columns  

You can apply `.agg()` to multiple columns at once, like so:  

```python
my_dataframe[['weight', 'height']].agg(compute_30th)
```

## Multiple Summaries 

Use `.agg()` to calculate multiple statistics at once by passing a list of functions:  

```python
def compute_40th(column):
    return column.quantile(0.4)

my_dataframe['weight'].agg([compute_30th, compute_40th])
```

## Cumulative Sum  

The `.cumsum()` method computes cumulative sums. Each value in the result is the running total up to that row.  

```python
my_dataframe['weight'].cumsum()
```

## Cumulative Statistics  
Other cumulative methods include `.cummax()`, `.cummin()`, and `.cumprod()`. These return cumulative maximum, minimum, and product values, respectively.  

```python
my_dataframe['weight'].cummax()
my_dataframe['weight'].cummin()
my_dataframe['weight'].cumprod()
```

## Statistics in Action 

To see how these functions work, access the Jupyter notebook here: [Sample Notebooks](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Sample-Notebooks)



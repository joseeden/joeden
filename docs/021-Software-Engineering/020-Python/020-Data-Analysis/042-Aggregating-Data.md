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


## Avoiding Double Counting  

Counting can be tricky when items appear multiple times in your data. Consider the DataFrame below which shows vet visits.

```python
     Name             Breed   Visit Date
0     Ted           Labrador   2023-01-10
1  Stella   Golden Retriever   2023-01-12
2     Ted          Chow Chow   2023-01-15
3   Robin             Poodle   2023-01-18
4     Ted           Labrador   2023-01-20
5  Stella   Golden Retriever   2023-01-22
```

Note that some pets, like Ted and Stella, have visited multiple times. To count Breeds correctly, we must address duplicates.

### Dropping Duplicate Names  

We can remove rows with duplicate names using `drop_duplicates()`. By setting `subset` to the name column, we ensure each name appears only once. However, if two pets share the same name but are different Breeds, this method might not work.  

```python
vet_dataframe.drop_duplicates(subset='Name')
```

Output:

```python
	Name	            Breed	  Visit Date
0	Ted	            Labrador	2023-01-10
1	Stella  Golden Retriever	2023-01-12
3	Robin	            Poodle	2023-01-18 
```

### Dropping Duplicate Pairs  

To handle duplicates more accurately, drop rows based on both `name` and `Breed` by passing both columns to `subset`. This ensures all unique name-Breed combinations are retained.

```python
vet_dataframe.drop_duplicates(subset=['Name', 'Breed'])
```

Output:

```python
	Name	            Breed	  Visit Date
0	Ted	            Labrador	2023-01-10
1	Stella  Golden Retriever	2023-01-12
2	Ted	           Chow Chow	2023-01-15
3	Robin	            Poodle	2023-01-18 
```


### Counting Breeds  

Use the `value_counts()` method on the Breed column to count each Breed, and add `sort=True` to display the most common Breeds first.

```python
vet_dataframe['Breed'].value_counts(sort=True)
```

Output:

```python
Breed
Labrador            2
Golden Retriever    2
Chow Chow           1
Poodle              1
Name: count, dtype: int64
```

### Proportions  

Set `normalize=True` in `value_counts()` to calculate proportions, showing percentages instead of raw counts. For example, 25% of the pets might be Labradors.  

```python
vet_dataframe['Breed'].value_counts(normalize=True)
```

Output:

```python
Breed
Labrador            0.333333
Golden Retriever    0.333333
Chow Chow           0.166667
Poodle              0.166667
Name: proportion, dtype: float64 
```

## See Jupyter Notebook

To see how these functions work, access the Jupyter notebook here: [Sample Notebooks](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Sample-Notebooks)



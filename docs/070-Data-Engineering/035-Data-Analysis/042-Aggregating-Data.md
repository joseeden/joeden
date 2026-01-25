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
  date: 8/17/2021
---


## Explore the Jupyter Notebooks

This page includes my notes on this topic.  
To see these functions in action, check out the Jupyter notebook here: [Sample Notebooks](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/001-Using-Pandas).  

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

- **Dropping Duplicate Names**

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

- **Dropping Duplicate Pairs**

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

- **Counting Breeds**

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

- **Proportions**

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

## Grouped Summaries

Grouped summaries allow you to get insights by calculating statistics for specific groups in your data. Consider the following dog data:

```python
     Name             Breed           Color   Visit Date  Weight
0     Ted           Labrador          Black  2023-01-10      30
1  Stella   Golden Retriever          Golden 2023-01-12      25
2     Ted          Chow Chow          Brown  2023-01-15      28
3   Robin             Poodle          White  2023-01-18      20
4     Ted           Labrador          Black  2023-01-20      32
5  Stella   Golden Retriever          Golden 2023-01-22      26
```

Instead of manually subsetting and calculating statistics for each group, the `groupby()` method simplifies the process.

- **Grouped Summaries**

    Group by a single column and calculate statistics. For instance, count visits for each breed:

    ```python
    dogs.groupby("Breed")["Name"].count()
    ```

    Output:

    ```python
    Breed
    Chow Chow           1
    Golden Retriever    2
    Labrador            2
    Poodle              1
    Name: Name, dtype: int64 
    ```

- **Multiple Summaries**

    You can calculate multiple statistics at once using `.agg()`. For example, count unique visitors and total visits for each color:

    ```python
    dogs.groupby("Color").agg({
        "Name": "nunique",
        "Visit Date": "count"
    })
    ```
    
    Output:

    ```python
            Name	Visit Date
    Color		
    Black	  1	    2
    Brown	  1	    1
    Golden  1	    2
    White	  1	    1      
    ```

- **Grouping by Multiple Columns**

    Group by multiple columns to calculate more specific statistics, such as the number of visits by breed and color:

    ```python
    dogs.groupby(["Color", "Breed"])["Name"].count()
    ```
    
    Output:

    ```python
    Color   Breed           
    Black   Labrador            2
    Brown   Chow Chow           1
    Golden  Golden Retriever    2
    White   Poodle              1
    Name: Name, dtype: int64      
    ```    

- **Aggregating Multiple Columns**

    You can group by multiple columns and aggregate across multiple columns. For example, count unique names and total visits:

    ```python
    dogs.groupby(["Color", "Breed"]).agg({
        "Name": "nunique",
    "Visit Date": "count"
    })
    ```
    
    Output:

    ```python
                              Name	Visit Date
    Color	  Breed		
    Black	  Labrador	        1	    2
    Brown	  Chow Chow	        1	    1
    Golden	Golden Retriever	1	    2
    White	  Poodle	          1	    1      
    ```

## Pivot Tables

Pivot tables offer a powerful way to calculate grouped summaries, similar to those in spreadsheets. Consider the following dog data:

```python
     Name             Breed           Color   Visit Date  Weight
0     Ted           Labrador          Black  2023-01-10      30
1  Stella   Golden Retriever          Golden 2023-01-12      25
2     Ted          Chow Chow          Brown  2023-01-15      28
3   Robin             Poodle          White  2023-01-18      20
4     Ted           Labrador          Black  2023-01-20      32
5  Stella   Golden Retriever          Golden 2023-01-22      26
```

- **Basic Pivot Table**

    Create a pivot table to calculate grouped summaries. For example, to find the mean weight of dogs by color:

    ```python
    dogs.pivot_table(values="Weight", index="Color")
    ```

    Output:

    ```python
            Weight
    Color	
    Black	  31.0
    Brown	  28.0
    Golden	25.5
    White	  20.0
    ```

- **Custom Statistics**

    Use the `aggfunc` argument to specify a different summary statistic, such as the median:

    ```python
    import numpy as np
    dogs.pivot_table(values="Weight", index="Color", aggfunc=np.median)
    ``` 
    
    Output:

    ```python
            Weight
    Color	
    Black	  31.0
    Brown	  28.0
    Golden	25.5
    White	  20.0  
    ```

- **Multiple Statistics**

    Pass a list of functions to `aggfunc` to calculate multiple statistics, such as the mean and median:

    ```python
    dogs.pivot_table(values="Weight", index="Color", aggfunc=[np.mean, np.median])
    ```
    
    Output:

    ```python
            mean	  median
            Weight	Weight
    Color		
    Black	  31.0	  31.0
    Brown	  28.0	  28.0
    Golden	25.5	  25.5
    White	  20.0	  20.0
    ```

- **Pivoting on Two Variables**

    Group by two variables using the `columns` argument. For example, to find mean weights by color and breed:

    ```python
    dogs.pivot_table(values="Weight", index="Color", columns="Breed")
    ```

    Missing values appear as `NaN` if no data exists for a combination.

    ```python
    Breed	  Chow Chow	Golden Retriever	Labrador	Poodle
    Color				
    Black	  NaN	      NaN	              31.0	    NaN
    Brown	  28.0	    NaN	              NaN	      NaN
    Golden	NaN	      25.5	            NaN	      NaN
    White	  NaN	      NaN	              NaN	      20.0
    ```    

- **Filling Missing Values**

    Fill missing values with `fill_value` to replace `NaN` with a default value:

    ```python
    dogs.pivot_table(values="Weight", index="Color", columns="Breed", fill_value=0)
    ```

    Output:

    ```python
    Breed	  Chow Chow	 Golden Retriever	 Labrador  Poodle
    Color				
    Black	  0	          0	                31.0	      0
    Brown	  28.0	      0	                0	          0
    Golden	0	          25.5	            0	          0
    White	  0	          0	                0	          20.0
    ```

- **Adding Totals**

    Enable the `margins` argument to include row and column totals, summarizing the dataset:

    ```python
    dogs.pivot_table(values="Weight", index="Color", columns="Breed", fill_value=0, margins=True)
    ```

    This adds a summary row and column with mean values for each group and the overall dataset.

    ```python
    Breed	    Chow Chow	Golden Retriever	Labrador	Poodle	All
    Color					
    Black	    0.0	      0.0	              31.0	    0.0	    31.000000
    Brown	    28.0	    0.0	              0.0	      0.0	    28.000000
    Golden	  0.0	      25.5	            0.0	      0.0	    25.500000
    White	    0.0	      0.0	              0.0	      20.0	  20.000000
    All	      28.0	    25.5	            31.0	    20.0	  26.833333
    ```





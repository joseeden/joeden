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


## Explicit Indexes

Indexes provide an efficient way to manage and subset data in pandas DataFrames. They offer efficient filtering, but they have limitations: they add complexity and break "tidy data" rules. 

Consider the dataset below:

```python
       Name             Breed           Color   Visit Date  Weight
0      Ted           Labrador          Black  2023-01-10      30
1   Stella   Golden Retriever          Golden  2023-01-12      25
2      Ted          Chow Chow          Brown  2023-01-15      28
3    Robin             Poodle          White  2023-01-18      20
4      Ted           Labrador          Black  2023-01-20      32
5   Stella   Golden Retriever          Golden  2023-01-22      26
```

Indexing operations:

- **Accessing Columns and Index**

      You can access column names and row indexes directly.  

      ```python
      print(dogs.columns)  # Access column names
      print(dogs.index)    # Access row index
      ```

      Output:  

      ```plaintext
      Index(['Name', 'Breed', 'Color', 'Visit Date', 'Weight'], dtype='object')
      RangeIndex(start=0, stop=6, step=1)
      ```


- **Setting an Index**

      Set a column (e.g., `Name`) as the index.  
      ```python
      dogs_indexed = dogs.set_index("Name")
      print(dogs_indexed)
      ```

      Output:  

      ```plaintext
                  Breed           Color   Visit Date  Weight
      Name                                                
      Ted      Labrador          Black  2023-01-10      30
      Stella   Golden Retriever  Golden  2023-01-12      25
      Ted      Chow Chow          Brown  2023-01-15      28
      Robin    Poodle            White   2023-01-18      20
      Ted      Labrador          Black  2023-01-20      32
      Stella   Golden Retriever  Golden  2023-01-22      26
      ```

- **Resetting the Index**

      Reset the index to move it back to the DataFrame body.  

      ```python
      dogs_reset = dogs_indexed.reset_index()
      print(dogs_reset)
      ```

      Output:  

      ```plaintext
            Name             Breed           Color   Visit Date  Weight
      0      Ted           Labrador          Black  2023-01-10      30
      1   Stella   Golden Retriever          Golden  2023-01-12      25
      2      Ted          Chow Chow          Brown  2023-01-15      28
      3    Robin             Poodle          White  2023-01-18      20
      4      Ted           Labrador          Black  2023-01-20      32
      5   Stella   Golden Retriever          Golden  2023-01-22      26
      ```


- **Dropping an Index**

      Remove the index entirely using the `drop` argument.  

      ```python
      dogs_dropped = dogs_indexed.reset_index(drop=True)
      print(dogs_dropped)
      ```

      Output:  

      ```plaintext
                  Breed           Color   Visit Date  Weight
      0      Labrador          Black  2023-01-10      30
      1   Golden Retriever  Golden  2023-01-12      25
      2      Chow Chow          Brown  2023-01-15      28
      3      Poodle            White   2023-01-18      20
      4      Labrador          Black  2023-01-20      32
      5   Golden Retriever  Golden  2023-01-22      26
      ```


- **Subsetting with Indexes**

      Indexes make filtering data simpler. For example, filter rows where `Name` is "Ted."  

      ```python
      ted_rows = dogs_indexed.loc["Ted"]
      print(ted_rows)
      ```

      Output:  

      ```plaintext
                  Breed   Color   Visit Date  Weight
      Name                                            
      Ted      Labrador  Black  2023-01-10      30
      Ted      Chow Chow  Brown  2023-01-15      28
      Ted      Labrador  Black  2023-01-20      32
      ```

- **Multi-Level Indexing**

      Set multiple columns (e.g., `Breed` and `Color`) as the index.  

      ```python
      dogs_multi = dogs.set_index(["Breed", "Color"])
      print(dogs_multi)
      ```

      Output:  

      ```plaintext
                                    Name   Visit Date  Weight
      Breed            Color                                    
      Labrador         Black               Ted  2023-01-10      30
      Golden Retriever Golden           Stella  2023-01-12      25
      Chow Chow        Brown               Ted  2023-01-15      28
      Poodle           White             Robin  2023-01-18      20
      Labrador         Black               Ted  2023-01-20      32
      Golden Retriever Golden           Stella  2023-01-22      26
      ```

- **Subsetting Multi-Level Indexes**

      Subset rows using outer and inner indexes.  

      **Outer Index**: Filter rows for "Labrador."  

      ```python
      labs = dogs_multi.loc["Labrador"]
      print(labs)
      ```

      Output:  

      ```plaintext
                  Name   Visit Date  Weight
      Color                                  
      Black           Ted  2023-01-10      30
      Black           Ted  2023-01-20      32
      ```

      **Inner Index**: Filter rows for specific combinations (e.g., Labrador and Black). 
      
      ```python
      brown_labs = dogs_multi.loc[[("Labrador", "Black")]]
      print(brown_labs)
      ```

      Output:  

      ```plaintext
                              Name   Visit Date  Weight
      Breed      Color                                  
      Labrador   Black             Ted  2023-01-10      30
      Labrador   Black             Ted  2023-01-20      32
      ```

- **Sorting Indexes**

      Sort rows by index values using `sort_index()`.  

      ```python
      sorted_dogs = dogs_multi.sort_index()
      print(sorted_dogs)
      ```

      Output:  

      ```plaintext
                                    Name   Visit Date  Weight
      Breed            Color                                    
      Chow Chow        Brown               Ted  2023-01-15      28
      Golden Retriever Golden           Stella  2023-01-12      25
      Golden Retriever Golden           Stella  2023-01-22      26
      Labrador         Black               Ted  2023-01-10      30
      Labrador         Black               Ted  2023-01-20      32
      Poodle           White             Robin  2023-01-18      20
      ``` 


## See Jupyter Notebook

To see how these functions work, access the Jupyter notebook here: [Sample Notebooks](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Sample-Notebooks)



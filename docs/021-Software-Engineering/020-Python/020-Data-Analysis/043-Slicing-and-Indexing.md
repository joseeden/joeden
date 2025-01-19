---
title: "Slicing and Indexing"
description: "Slicing and Indexing"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 43
last_update:
  date: 6/13/2020
---

## Explore the Jupyter Notebooks

This page includes my notes on this topic.  
To see these functions in action, check out the Jupyter notebook here: [Sample Notebooks](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Sample-Notebooks).  

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

## Slicing and Subsetting  

Slicing is a way to select consecutive elements or subsets of data from lists and DataFrames. pandas provides versatile methods like `.loc` and `.iloc` for this purpose.  

Consider the dogs data:

```python
       breed     color  age  weight date_of_birth
0   Labrador     Brown    3      25    2016-01-01
1  Chow Chow       Tan    4      18    2015-06-15
2     Poodle     White    2      12    2017-03-20
3   Labrador     Black    7      30    2014-09-10
4     Beagle     Brown    5      10    2015-12-01
5  Chihuahua      Grey    1       3    2018-05-05
```

Operations:

- **Slicing Lists**  

  You can slice a list by specifying start and end positions with a colon. The end position is exclusive.  

  ```python
  breeds = ["Labrador", "Poodle", "Chow Chow", "Golden Retriever", "Labrador", "Chihuahua"]
  print(breeds[2:5])  # Slice from index 2 to 4
  print(breeds[:3])   # Slice first three elements
  ```
  
  Output:
  
  ```
  ['Chow Chow', 'Golden Retriever', 'Labrador']
  ['Labrador', 'Poodle', 'Chow Chow']
  ```

- **Sort Index Before Slicing**  

  To slice rows in a DataFrame, sort the index first.  

  ```python
  dogs = dogs.set_index(["Breed", "Color"]).sort_index()
  print(dogs)
  ```
  
  Output:
  
  ```
                             Name Visit Date
  Breed          Color                    
  Chow Chow      Brown       Ted 2023-01-15
  Golden Retriever Golden   Stella 2023-01-12
  Labrador        Black       Ted 2023-01-10
  Labrador        Black       Ted 2023-01-20
  ```

- **Slicing Outer Index Level**  

  Use `.loc[]` to slice rows by index values. The last value is included.  

  ```python
  print(dogs.loc["Labrador":"Poodle"])
  ```
  
  Output:
  
  ```
                             Name Visit Date
  Breed          Color                    
  Labrador       Black       Ted 2023-01-10
  Labrador       Black       Ted 2023-01-20
  ```

- **Slicing Inner Index Levels**  

  For inner index levels, use tuples for start and end positions.  

  ```python
  print(dogs.loc[("Labrador", "Black"):("Poodle", "White")])
  ```
  
  Output:
  
  ```
                             Name Visit Date
  Breed          Color                    
  Labrador       Black       Ted 2023-01-10
  ```

- **Slicing Columns**  

  Slice columns while keeping all rows by passing a colon for rows.  

  ```python
  print(dogs.loc[:, "Name":"Visit Date"])
  ```
  
  Output:
  
  ```
                             Name Visit Date
  Breed          Color                    
  Chow Chow      Brown       Ted 2023-01-15
  Golden Retriever Golden   Stella 2023-01-12
  ```

- **Slicing Rows and Columns**  

  Simultaneously slice rows and columns by specifying slices for both.  

  ```python
  print(dogs.loc["Labrador":"Poodle", "Name":"Visit Date"])
  ```
  
  Output:
  
  ```
                             Name Visit Date
  Breed          Color                    
  Labrador       Black       Ted 2023-01-10
  ```

- **Slicing by Dates**  

  Set a date column as the index to slice by date ranges.  

  ```python
  dogs = dogs.set_index("Visit Date").sort_index()
  print(dogs.loc["2023-01-10":"2023-01-15"])
  ```
  
  Output:
  
  ```
                 Name            Breed   Color
  Visit Date                                  
  2023-01-10     Ted         Labrador   Black
  2023-01-12  Stella Golden Retriever Golden
  ```

- **Partial Date Slicing**  

  Slice by year only to include all dates within the range.  

  ```python
  print(dogs.loc["2023"])
  ```
  
  Output:
  
  ```
                 Name            Breed   Color
  Visit Date                                  
  2023-01-10     Ted         Labrador   Black
  2023-01-12  Stella Golden Retriever Golden
  ```

- **Subsetting by Position with .iloc**  

  Use `.iloc` for slicing by row and column numbers. The end value is exclusive.  

  ```python
  print(dogs.iloc[1:3, 0:2])
  ```
  
  Output:
  
  ```
                 Name            Breed
  Visit Date                          
  2023-01-12  Stella Golden Retriever
  2023-01-15     Ted         Chow Chow
  ```

## Pivoting and Summary Stats

Pivot tables are created using `.pivot_table()`. The `values` argument specifies the column to aggregate, while `index` and `columns` define row and column grouping. The default aggregation is mean.

Consider the dogs data:

```python
        breed     color  age  weight date_of_birth  height
0    Labrador     Brown    3      25    2016-01-01      23
1   Chow Chow       Tan    4      18    2015-06-15      20
2      Poodle     White    2      12    2017-03-20      20
3    Labrador     Black    7      30    2014-09-10      23
4      Beagle     Brown    5      10    2015-12-01      21
5   Chihuahua      Grey    1       3    2018-05-05      18
6      Poodle     Brown    3      20    2017-03-20      22
7    Labrador     Black    6      28    2014-09-10      24
8      Beagle     White    4      12    2015-12-01      21
9   Chow Chow       Tan    5      17    2015-06-15      19
```

- **Pivoting**  

  You can create a pivot table to group and aggregate data by rows and columns.
  
  ```python
  dogs.pivot_table(values='height', index='breed', columns='color', aggfunc='mean')
  ```
  
  Output:
  
  ```
  color         Black  Brown  Grey   Tan  White
  breed
  Beagle        NaN    21.0   NaN   NaN   21.0
  Chihuahua     NaN    NaN    18.0   NaN   NaN
  Chow Chow     NaN    NaN    NaN    19.5  NaN
  Labrador      23.5   23.0   NaN    NaN   NaN
  Poodle        NaN    22.0   NaN    NaN   20.0
  ```

- **.loc[] + slicing is a power combo**  

  Pivot tables are DataFrames with sorted indexes, so slicing and `.loc[]` functionality can be used for subsetting.
  
  ```python
  dogs.loc[dogs['breed'] == 'Poodle', ['height']]
  ```
  
  Output:
  
  ```
    height
  2	20
  6	22
  ```

- **The axis argument**  

  Use the `axis` argument to specify whether to calculate summary stats across rows (`axis=0`, default) or columns (`axis=1`).
  
  ```python
  dogs.mean(axis="index")  # Across rows
  ```
  
  Output:
  
  ```
  height   22.5
  ```

- **Calculating summary stats across columns**  

  Set `axis=1` to calculate summary stats across columns, useful when all columns contain the same data type.
  
  ```python
  dogs.mean(axis=1)  # Across columns
  ```
  
  Output:
  
  ```
  breed
  Labrador  22.5
  Poodle    21.0
  ```

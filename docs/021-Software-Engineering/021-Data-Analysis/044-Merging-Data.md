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

To see more examples, please see [Merging Data with Pandas Notebook.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Using-Pandas)

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

To see more examples, please see [Merging Data with Pandas Notebook.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Using-Pandas)

:::

## Left Join  

A **left join** keeps all rows from the left table and only matching rows from the right table. 

<div class="img-center"> 

![](/img/docs/joins-left-join.png)

</div>


**Example**: Two tables, "left" and "right," merged on column C 

  - All rows from "left" are included  
  - Only matching rows from "right" are included  
  - If no match, right-side values are null  

As an example, we'll use the following tables:

- `movies`

    - Contains movie details
    - Title, popularity, and unique ID  

        | movie_id | title              | popularity |  
        |----------|--------------------|------------|  
        | 1        | Inception          | 90.5       |  
        | 2        | Interstellar       | 87.3       |  
        | 3        | The Dark Knight    | 95.0       |  
        | 4        | Tenet              | 75.2       |  
        | 5        | Dunkirk            | 80.4       |  
        | 6        | Memento            | 70.1       |  

- `taglines`

    - Contains movie taglines:  
    - Movie ID and tagline text  

        | movie_id | tagline                         |  
        |----------|---------------------------------|  
        | 1        | "Your mind is the scene of the crime." |  
        | 2        | "Mankind was born on Earth. It was never meant to die here." |  
        | 3        | "Welcome to a world without rules." |  
        | 5        | "When 400,000 men couldn’t get home, home came for them." |  

To combine the tables using a left join:  

- Merge on the `movie_id` column  
- Use `how='left'` to specify a left join  
- Movies without a matching tagline get a null value (NaN in pandas)  

The code:

```python
import pandas as pd

movies = pd.DataFrame({
    'movie_id': [1, 2, 3, 4, 5, 6],
    'title': ["Inception", "Interstellar", "The Dark Knight", "Tenet", "Dunkirk", "Memento"],
    'popularity': [90.5, 87.3, 95.0, 75.2, 80.4, 70.1]
})

taglines = pd.DataFrame({
    'movie_id': [1, 2, 3, 5],
    'tagline': [
        "Your mind is the scene of the crime.",
        "Mankind was born on Earth. It was never meant to die here.",
        "Welcome to a world without rules.",
        "When 400,000 men couldn’t get home, home came for them."
    ]
})

merged_table = movies.merge(taglines, on="movie_id", how="left")
print(merged_table)
```

Expected output:

| movie_id | title            | popularity | tagline                                         |  
|----------|----------------|------------|-------------------------------------------------|  
| 1        | Inception       | 90.5       | "Your mind is the scene of the crime."         |  
| 2        | Interstellar    | 87.3       | "Mankind was born on Earth. It was never meant to die here." |  
| 3        | The Dark Knight | 95.0       | "Welcome to a world without rules."            |  
| 4        | Tenet           | 75.2       | **NaN** (no match found)                       |  
| 5        | Dunkirk         | 80.4       | "When 400,000 men couldn’t get home, home came for them." |  
| 6        | Memento         | 70.1       | **NaN** (no match found)                       |  

To count the number of rows with missing taglines, we can use `isnull()` function to find the rows then count them using `sum()`.

```python
missing = merged_table['tagline'].isnull().sum()
print(missing)
```

This will return the number of rows, which is only two rows.


## Right Join

## Right Join  

A **right join** returns all rows from the right table and only matching rows from the left table. If no match is found, columns from the left table will be null.  

<div class="img-center"> 

![](/img/docs/joins-right-join.png)

</div>


Example tables:  

- `movies`

    | id | title              | popularity |  
    |----|--------------------|------------|  
    | 1  | Inception         | 90.5       |  
    | 2  | Interstellar      | 87.3       |  
    | 3  | The Dark Knight   | 95.0       |  
    | 4  | Tenet             | 75.2       |  
    | 5  | Dunkirk           | 80.4       |  
    | 6  | Memento           | 70.1       |  

- `tv_genre`

    | movie_id | genre    |  
    |----------|---------|  
    | 3        | Action  |  
    | 5        | War     |  
    | 7        | TV Movie |  
    | 8        | TV Movie |  

We use **pandas** to perform a right join. Note that the `movies` table uses `id`, while the `tv_genre` table uses `movie_id`.  

```python
import pandas as pd

movies = pd.DataFrame({
    'id': [1, 2, 3, 4, 5, 6],
    'title': ["Inception", "Interstellar", "The Dark Knight", "Tenet", "Dunkirk", "Memento"],
    'popularity': [90.5, 87.3, 95.0, 75.2, 80.4, 70.1]
})

tv_genre = pd.DataFrame({
    'movie_id': [3, 5, 7, 8],
    'genre': ["Action", "War", "TV Movie", "TV Movie"]
})


# Performing the Right Join
merged_table = movies.merge(tv_genre, left_on="id", right_on="movie_id", how="right")
print(merged_table)
```

Expected output:

| id        | title             | popularity | movie_id | genre    |  
|-----------|-------------------|------------|----------|----------|  
| 3         | The Dark Knight   | 95.0       | 3        | Action   |  
| 5         | Dunkirk           | 80.4       | 5        | War      |  
| **NaN**   | **NaN**           | **NaN**    | 7        | TV Movie |  
| **NaN**   | **NaN**           | **NaN**    | 8        | TV Movie |  

---
title: "Pandas"
description: "Dictionaries and Pandas"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 40
last_update:
  date: 6/13/2020
---


## Dictionaries

A dictionary in Python is a collection of key-value pairs, where each key is unique and is mapped to a value. It allows you to store and retrieve data efficiently using the key.

- Keys in a dictionary must be unique and immutable.
- Values in a dictionary can be of any data type.

Consider the sample dictionary for Asia, where the keys are countries and the values are their capitals:

```python
asia = {
    'china': 'beijing',
    'india': 'new delhi',
    'japan': 'tokyo',
    'south korea': 'seoul',
    'thailand': 'bangkok',
    'malaysia': 'kuala lumpur',
    'singapore': 'singapore',
    'indonesia': 'jakarta',
    'vietnam': 'hanoi',
    'philippines': 'manila'
}
```

To get the keys in the dictionary:

```python
print(asia.keys()) 
```

Output:

```python
dict_keys(['china', 'india', 'japan', 'south korea', 'thailand', 'malaysia', 'singapore', 'indonesia', 'vietnam', 'philippines'])
```

To print out the value that belongs to "Thailand":

```python
print(asia['thailand']) 
```

Output:

```python
bangkok
```

Dictionaries are **immutable** in the sense that their keys cannot be changed once set. Unlike lists, which allow you to modify elements, dictionaries require you to add or remove key-value pairs to modify their contents.


## Modifying Dictionaries

To add an entry to a dictionary, you can simply assign a value to a new key.
Using the previous example, we can add "North Korea":

```python
asia["north korea"] = "pyongyang"
print(asia)
```

Output:

```python
{
  'china': 'beijing', 
  'india': 'new delhi', 
  'japan': 'tokyo', 
  'south korea': 'seoul', 
  'thailand': 'bangkok', 
  'malaysia': 'kuala lumpur', 
  'singapore': 'singapore', 
  'indonesia': 'jakarta', 
  'vietnam': 'hanoi', 
  'philippines': 'manila', 
  'north korea': 'pyongyang'
}
```

To verify if "North Korea" has been added:

```python
"north korea" in asia
```

This will return:

```python
True
```

To delete an entry from the dictionary, use the `del` keyword:

```python
del asia["north korea"]
print(asia)
```

Output:

```python
{
  'china': 'beijing', 
  'india': 'new delhi', 
  'japan': 'tokyo', 
  'south korea': 'seoul', 
  'thailand': 'bangkok', 
  'malaysia': 'kuala lumpur', 
  'singapore': 'singapore', 
  'indonesia': 'jakarta', 
  'vietnam': 'hanoi', 
  'philippines': 'manila', 
}
```


## Pandas 

Data scientists often work with large datasets, usually in a table format like a spreadsheet. To manage such data in Python, a rectangular data structure is needed. While 2D NumPy arrays are an option, they aren't suited for datasets with mixed data types.  

Consider the BRICS table below.

| Country        | Capital      | Area (million km²) | Population (millions) |  
|----------------|--------------|---------------------|-----------------------|  
| Brazil         | Brasília     | 8.5                 | 211                   |  
| Russia         | Moscow       | 17.1                | 144                   |  
| India          | New Delhi    | 3.3                 | 1380                  |  
| China          | Beijing      | 9.6                 | 1393                  |  
| South Africa   | Pretoria     | 1.2                 | 58                    |  

For these cases, the **Pandas** library is a better choice. It is built on NumPy and it provides advanced tools for data manipulation. In Pandas, tabular data is stored in a **DataFrame**.

## Creating a DataFrame  

### From a Dictionary  

You can create a DataFrame from a dictionary, where keys are column labels, and values are lists of column data. For example:  

```python
import pandas as pd

data = {
    "country": ["Brazil", "Russia", "India", "China", "South Africa"],
    "capital": ["Brasília", "Moscow", "New Delhi", "Beijing", "Pretoria"],
    "area": [8.5, 17.1, 3.3, 9.6, 1.2],
    "population": [211, 144, 1380, 1393, 58]
}

brics = pd.DataFrame(data)
print(brics)
```

You can manually set row labels:  

```python
brics.index = ["BR", "RU", "IN", "CH", "SA"]
print(brics)
```

The result is a DataFrame version of the BRICS table. 

```python
        country      capital  area (million km²)  population (millions)  
BR       Brazil     Brasília                 8.5                   211  
RU       Russia       Moscow                17.1                   144  
IN        India    New Delhi                 3.3                  1380  
CH        China      Beijing                 9.6                  1393  
SA  South Africa    Pretoria                 1.2                    58  
```

### From a CSV File  

To work with large datasets, it's easier to import them from external files. Let's say you have a CSV file called `brics.csv` containing the details below:  

```csv
country,capital,area,population
Brazil,Brasília,8.5,211
Russia,Moscow,17.1,144
India,New Delhi,3.3,1380
China,Beijing,9.6,1393
South Africa,Pretoria,1.2,58
```

You can use the `read_csv` function from the Pandas library to load this data into a DataFrame.

```python
brics = pd.read_csv("brics.csv", index_col=0)
```

The `read_csv` function reads the CSV file, while the `index_col` parameter specifies that the first column (country) should be used as row labels (indexes).



## Column access using brackets

### Retrieve Single Column 

To select a single column, use square brackets. Using the previous example:

```python
        country      capital  area (million km²)  population (millions)  
BR       Brazil     Brasília                 8.5                   211  
RU       Russia       Moscow                17.1                   144  
IN        India    New Delhi                 3.3                  1380  
CH        China      Beijing                 9.6                  1393  
SA  South Africa    Pretoria                 1.2                    58  
```

To select just the country column:

```python
brics["country"]
```

This returns the column as a Pandas Series, a labeled 1D array. You can verify this by using the `type` function:

```python
type(brics["country"]) 
```

Output:

```python
pandas.core.series.Series 
```


To keep the column as a DataFrame, use double brackets:  

```python
brics[["country"]]
```

Output:

```python
        country 
BR       Brazil 
RU       Russia 
IN        India 
CH        China 
SA  South Africa
```

Checking the type:

```python
type(brics[["country"]]) 
```

Output:

```python
pandas.core.frame.DataFrame 
```

### Retrieve Multiple Columns

You can also select multiple columns by passing a list of column labels inside double brackets:  

```python
brics[["country", "capital"]]
```  

Output:

```python
        country      capital
BR       Brazil     Brasília  
RU       Russia       Moscow 
IN        India    New Delhi 
CH        China      Beijing 
SA  South Africa    Pretoria 
```


## Row Access Using `[]`  

Using the same example:

```python
        country      capital  area (million km²)  population (millions)  
BR       Brazil     Brasília                 8.5                   211  
RU       Russia       Moscow                17.1                   144  
IN        India    New Delhi                 3.3                  1380  
CH        China      Beijing                 9.6                  1393  
SA  South Africa    Pretoria                 1.2                    58  
```

To select rows, use slicing. For example, to get the 2nd, 3rd, and 4th rows:  

```python
brics[1:4]
```

Remember, slicing in Python is zero-indexed (which means first index is zero) and the end index is exclusive (which means the 2nd argument specified is nto included.) 

This will return:

```python
        country      capital  area (million km²)  population (millions)  
RU       Russia       Moscow                17.1                   144  
IN        India    New Delhi                 3.3                  1380  
CH        China      Beijing                 9.6                  1393  
```


## Using `loc`  

`loc` allows you to select rows and columns using labels (the first column)  

- **Single Row**: Select Russia's row by its label:  

    ```python
    brics.loc["RU"]
    ```

    To keep it as a DataFrame, use double brackets:  

    ```python
    brics.loc[["RU"]]
    ```

- **Multiple Rows**: Select rows for Russia, India, and China:  

    ```python
    brics.loc[["RU", "IN", "CN"]]
    ```

- **Rows & Columns**: Select specific rows and columns, like `country` and `capital`:
  
    ```python
    brics.loc[["RU", "IN"], ["country", "capital"]]
    ```

- **All Rows, Some Columns**: Use `:` to include all rows:  

    ```python
    brics.loc[:, ["country", "capital"]]
    ```



## Using `iloc`  

`iloc` uses positions instead of labels.  

- **Single Row**: Select the second row:  

    ```python
    brics.iloc[1]
    ```

    Output:

    ```python
            country      capital  area (million km²)  population (millions)  
    RU       Russia       Moscow                17.1                   144  
    ```


- **Multiple Rows**: Select rows 2, 3, and 4:  

    ```python
    brics.iloc[1:4]
    ```

    Output:

    ```python
            country      capital  area (million km²)  population (millions)  
    RU       Russia       Moscow                17.1                   144  
    IN        India    New Delhi                 3.3                  1380  
    CH        China      Beijing                 9.6                  1393  
    ```

- **Rows & Columns**: Select specific rows and columns by position:  

    ```python
    brics.iloc[1:4, [0, 1]]
    ```

    Output:

    ```python
            country      capital
    BR       Brazil     Brasília
    RU       Russia       Moscow 
    IN        India    New Delhi  
    CH        China      Beijing   
    SA  South Africa    Pretoria  
    ```

- **All Rows, Some Columns**: Include all rows but only certain columns:  

    ```python
    brics.iloc[:, [0, 1]]
    ```

    Output:

    ```python
            country      capital  
    RU       Russia       Moscow   
    IN        India    New Delhi   
    CH        China      Beijing   
    ```

## Filtering 

Consider the previous example:

```python
        country      capital  area (million km²)  population (millions)  
BR       Brazil     Brasília                 8.5                   211  
RU       Russia       Moscow                17.1                   144  
IN        India    New Delhi                 3.3                  1380  
CH        China      Beijing                 9.6                  1393  
SA  South Africa    Pretoria                 1.2                    58  
```

To select the countries with area over 8 million square kilometers:

1. Select the area column


2. Perform a comparison
3. Use result to select the countries 


install

import JupyterCell from '@theme/JupyterCell';

<JupyterCell 
  source={`print('Hello world')
for i in range(10):
  print(i)
`}
  jupyterServerUrl='http://localhost:8686/api/jupyter-server'
  jupyterServerToken='60c1661cc408f978c309d04157af55c9588ff9557c9380e4fb50785750703da6'
/>
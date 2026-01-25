---
title: "Loop Data Structures"
description: "Looping over NUmpy Arrays and Pandas Dataframes"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 41
last_update:
  date: 8/17/2021
---

## Iterating Over Dictionaries

To iterate through a dictionary's key-value pairs, use the `items()` method. This ensures each iteration retrieves a key and its corresponding value. Note that dictionaries in Python (prior to version 3.7) do not guarantee a fixed order of iteration.

```python
world = {
    "Afghanistan": 38928346,
    "Belgium": 11589623,
    "China": 1439323776,
    "Denmark": 5822763,
    "Ethiopia": 114963588,
    "France": 65273511
}

for k, v in world.items():
    print(f"Key: {k}, Value: {v}")

```

Where: 

- The variable `k` and `v` are arbitrary
- Order of iteration may vary in Python versions before 3.7.

Output:

```bash
Key: Afghanistan, Value: 38928346
Key: Belgium, Value: 11589623
Key: China, Value: 1439323776
Key: Denmark, Value: 5822763
Key: Ethiopia, Value: 114963588
Key: France, Value: 65273511
```

## Iterating Over NumPy Arrays

NumPy arrays can be iterated over using a basic `for` loop. For 2D arrays, a simple `for` loop yields entire sub-arrays, not individual elements.

```python
import numpy as np

np_height = np.array([1.75, 1.80, 1.65, 1.70, 1.68]) 
np_weight = np.array([68, 74, 59, 72, 65])           
meas = np.array([np_height, np_weight])

for row in meas:
    print(row)
```

Output:

```bash
[1.75 1.8  1.65 1.7  1.68]
[68.  74.  59.  72.  65. ]
```

To access each element of a 2D array, use the `nditer()` function, which efficiently iterates over every value.

```python
# Iterating with nditer()
for element in np.nditer(meas):
    print(element)
```

Output:

```bash
1.75
1.8
1.65
1.7
1.68
68.0
74.0
59.0
72.0
65.0
```


## Iterating Through Pandas DataFrame

Consider the sample Pandas dataframe below:

```python
import pandas as pd

data = {
    "country": ["Brazil", "Russia", "India", "China", "South Africa"],
    "capital": ["Brasília", "Moscow", "New Delhi", "Beijing", "Pretoria"],
    "area": [8.5, 17.1, 3.3, 9.6, 1.2],
    "population": [211, 144, 1380, 1393, 58]
}

brics = pd.DataFrame(data)
brics.index = ["BR", "RU", "IN", "CH", "SA"]
print(brics)
```

Output:

```bash
country    capital  area  population
BR        Brazil   Brasília   8.5         211
RU        Russia     Moscow  17.1         144
IN         India  New Delhi   3.3        1380
CH         China    Beijing   9.6        1393
SA  South Africa   Pretoria   1.2          58
```

To iterate over each row, use `iterrows()` which provides the row label and data as a Pandas Series.

```python
for label, row in brics.iterrows():
    print(label)
    print(row)
```

Output:

```bash
BR
country         Brazil
capital       Brasília
area               8.5
population         211
Name: BR, dtype: object
RU
country       Russia
capital       Moscow
area            17.1
population       144
Name: RU, dtype: object
IN
country           India
capital       New Delhi
area                3.3
population         1380
Name: IN, dtype: object
CH
country         China
capital       Beijing
area              9.6
population       1393
Name: CH, dtype: object
SA
country       South Africa
capital           Pretoria
area                   1.2
population              58
Name: SA, dtype: object
```

## Selective Print 

We can also use subsetting to print selected columns, let's say the labels and the  'capital' column:

```python
for label, row in brics.iterrows():
    print(label + ": " + row["capital"])
```

Output:

```python
BR: Brasília
RU: Moscow
IN: New Delhi
CH: Beijing
SA: Pretoria
```

## Adding a New Column 

You can calculate a new column, such as the length of each country name, and add it to the DataFrame.

```python
for label, row in brics.iterrows():
    brics.loc[label, "name_length"] = len(row["country"])

print(brics)
```

Output:

```bash
         country    capital  area  population  name_length
BR        Brazil   Brasília   8.5         211          6.0
RU        Russia     Moscow  17.1         144          6.0
IN         India  New Delhi   3.3        1380          5.0
CH         China    Beijing   9.6        1393          5.0
SA  South Africa   Pretoria   1.2          58         12.0
```

This is okay for small datasets but will be extremely problematic for larger datasets. or better performance, use `apply()` to calculate the `name_length` column without needing a for loop.

```python
brics["name_length"] = brics["country"].apply(len)
print(brics)
```

This will yield the same output:

```bash
         country    capital  area  population  name_length
BR        Brazil   Brasília   8.5         211            6
RU        Russia     Moscow  17.1         144            6
IN         India  New Delhi   3.3        1380            5
CH         China    Beijing   9.6        1393            5
SA  South Africa   Pretoria   1.2          58           12
```

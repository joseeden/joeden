---
title: "Packages"
description: "Python packages"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 30
last_update:
  date: 10/28/2019
---



## Overview  

A package is a collection of modules. These are sometimes called **libraries**. Many packages are publicly available and free to use. To use a package, we first need to download it from the Python Package Index (PyPI).  

Some popular packages:  

- **NumPy**: For arrays.
- **Matplotlib**: For visualization.
- **Scikit-learn**: For machine learning.

## Installing Pip  

Install packages using pip, Python's package management tool.

1. Download `get-pip.py` from link below:

      ```bash
      https://pip.pypa.io/en/stable/installation
      ```

2. Run `python3 get-pip.py` from the terminal.
3. Install packages with `pip3 install <package_name>` (e.g., `pip3 install numpy`).

## Installing a Package 

To install a package, run:  

```sh
python3 -m pip install package_name
```

For example, to install `pandas`:  

```sh
python3 -m pip install pandas
```


## Import a Package  

When using a package, we import it just like a module. Some packages, like `numpy`, are commonly given an alias to shorten the code.  

- Import entire package: 

    ```bash
    import numpy
    ```

- Use alias:

    ```bash
    import numpy as np
    ```

- Import specific function:

    ```bash
    from numpy import array  
    ```

When importing entire package, to use a specific function from the package (e.g.array function), the function has to be appended like this:

```bash
import numpy
numpy.array([1,2,3]) 
```

When importing the specific package, can simply call the function directly:

```bash
from numpy import array 
array([1,2,3]) 
```

However, simply calling the function might confuse others; using `import numpy` is clearer as it shows the package in the function call (`numpy.array()`).


## Sample Package: Math 

Calculate the area and circumference of a circle using the formula below:

```
C = 2 * π * r
A = π * r²
```

Using code below:

```python
# circle-area-circumference.py
import math

C = 2 * 0.43 * math.pi

A = math.pi * 0.43 ** 2

print("Circumference: " + str(C))
print("Area: " + str(A)) 
```

Run the code:

```python
python3  circle-area-circumference.py
```

Output:

```python
Circumference: 2.701769682087222
Area: 0.5808804816487527 
```


## Sample Package: Pandas 

To import Pandas:

```python
import pandas as pd  # 'pd' is a common alias for pandas
```

#### Creating a DataFrame  

We can use pandas to create a table-like structure called a DataFrame.  
```python
import pandas as pd

data = {"user_id": [1, 2, 3], "order_value": [100, 200, 150]}
sales_df = pd.DataFrame(data)

print(sales_df)
```
**Output:**  
```
   user_id  order_value
0        1         100
1        2         200
2        3         150
```

#### Reading a CSV File  

To read data from a CSV file into a DataFrame:  

```python
sales_df = pd.read_csv("sales_data.csv")
print(type(sales_df))  # <class 'pandas.core.frame.DataFrame'>
```

#### Previewing Data  

If a dataset has many rows, we can preview the first five:  

```python
print(sales_df.head())  # Shows the first 5 rows
```
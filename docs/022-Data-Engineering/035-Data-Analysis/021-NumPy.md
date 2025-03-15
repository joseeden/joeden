---
title: "NumPy"
description: "Python Virtual Environments"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Data Analysis
sidebar_position: 21
last_update:
  date: 8/17/2021
---

## Overview 

Python lists are flexible but slow for data analysis, especially when working with large datasets. NumPy (Numeric Python) solves this by providing **NumPy arrays**, which enable fast, element-wise calculations.  

To use NumPy:  

- Install it.

    ```bash
    pip install numpy 
    ```
- Import it using:

    ```bash
    import numpy as np
    ```

## Usage  

You can create a NumPy array with `np.array()`. Unlike lists, NumPy arrays let you perform operations like BMI calculation across all elements efficiently, making it a powerful tool for data analysis.

Consider the two NumPy arrays below for height and weight for a sports team comprising of 6 athletes.

```python
import numpy as np 

height = [1.56, 1.62, 1.75, 1.80, 1.85, 1.89]  # Heights in meters
weight = [65.3, 68.5, 72.4, 76.0, 80.2, 89.1]  # Weights in kilograms

np_height = np.array(height)
np_weight = np.array(weight)
```

If you try to calculate the BMI directly with lists, Python will raise an error because mathematical operations like squaring (**) or division cannot be applied element-wise to lists:

```bash
bmi = weight / height ** 2
print(bmi)
```

Output:

```bash
TypeError: unsupported operand type(s) for ** or pow(): 'list' and 'int' 
```

Using NumPy arrays, you can easily perform the BMI calculation:

```bash
bmi = np_weight / np_height ** 2 
print(bmi)
```

Output:

```python
array([26.83267587, 26.10120408, 23.64081633, 23.45679012, 23.43316289, 24.94331066]) 
```

## NumPy Array Type Rules

NumPy arrays are designed to hold values of a single type, such as floats, booleans, or strings. It assumes that the values inside an array are of the same type.

- If you mixed types, they are automatically converted to one type
- A NumPy array is simply a new kind of Python type.
- it comes with unique methods that behave differently from lists.

For example, the array below contains different types.

```python
np.array([1.0, "is", True])  
```

The boolean and the float will be converted to strings, as shown in the output:

```bash
array(['1.0', 'is', 'True'], dtype='<U32')
```

## Python Lists vs. NumPy Arrays

Operations on Python lists and NumPy arrays can produce different results.

- Adding two Python lists combines their elements into a single list.

    ```python
    python_list = [1, 2, 3] 
    python_list
    ```

    Output:

    ```python
    [1, 2, 3, 1, 2, 3]
    ```

- Adding two NumPy arrays performs element-wise addition.

    ```python
    numpy_array = np.array([1, 2, 3])
    numpy_array + numpy_array
    ```

    Output:

    ```python
    array([2, 4, 6])
    ```

## NumPy Subsetting

Subsetting works similarly to lists using square brackets. NumPy supports boolean subsetting:

- Create a boolean array by comparing values.
- Use the boolean array for subsetting.
- This filters data and provides useful insights.

Using the previous example:

```python
import numpy as np 

height = [1.56, 1.62, 1.75, 1.80, 1.85, 1.89]  # Heights in meters
weight = [65.3, 68.5, 72.4, 76.0, 80.2, 89.1]  # Weights in kilograms

np_height = np.array(height)
np_weight = np.array(weight)

bmi = np_weight / np_height ** 2 
print(bmi)
``` 

Output:

```python
array([26.83267587, 26.10120408, 23.64081633, 23.45679012, 23.43316289, 24.94331066]) 
```

To retrieve the BMI of the third athlete, use an index (remember, indexing starts at 0):

```bash
bmi[2]
```

Output:

```bash
23.640816326530615
```

To filter BMIs greater than 24, first create a boolean array by performing the comparison:

```bash
bmi > 24 
```

This will return a Numpy array of boolean values.

```bash
array([ True,  True, False, False, False,  True])
```

You can then use this boolean array to subset the original BMI array:

```python 
bmi[bmi > 24]
```

Output:

```python
array([26.83267587, 26.10120408, 24.94331066]) 
```


## Comparison and Boolean Operators 

Operational operators like `<` and `>=` worked with NumPy arrays out of the box. They allow you to perform element-wise comparisons without additional modifications. 

Example:

```python
import numpy as np
my_array = np.array([10, 15, 20, 25])
print(my_array > 15)  
```

Output:

```python
[False False  True  True]  
```

Unfortunately, this is not true for the boolean operators like `and`, `or`, and `not`. To use these operators with NumPy, you will need to use the  equivalent:

-  `np.logical_and()`
-  `np.logical_or()`
-  `np.logical_not()`

Consider two NumPy arrays representing house areas:

```python
import numpy as np
house_x = np.array([18.0, 20.0, 10.75, 9.50])
huose_y = np.array([14.0, 24.0, 14.25, 9.0]) 
```

To determine the areas in `house_x` which greater than 18.5 but smaller than 10:

```bash
print(np.logical_or(house_x > 18.5, house_x < 10))
```

Output:

```python
[False  True False  True]
```

To find areas smaller than 11 in both `house_x` and `huose_y`:

```python
print(np.logical_and(house_x < 11, huose_y < 11))
```

Output:

```python
[False False False  True]  
```

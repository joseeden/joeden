---
title: "Packages"
description: "Python packages"
tags: [Computer Science, Application Development, Software Development, Python]
sidebar_position: 15
last_update:
  date: 10/28/2019
---



## Overview  

**Packages** are directories of scripts (modules) with functions and methods to solve specific problems.  

**Popular packages**:  

- **NumPy**: For arrays.
- **Matplotlib**: For visualization.
- **Scikit-learn**: For machine learning.

## Install Package  

Install packages using pip, Python's package management tool.

- **Steps**:  
  1. Download `get-pip.py` from link below:

        ```bash
        https://pip.pypa.io/en/stable/installation
        ```

  2. Run `python3 get-pip.py` from the terminal.
  3. Install packages with `pip3 install <package_name>` (e.g., `pip3 install numpy`).

## Import Package  

To use a package, import it.

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


## Sample Package: Requests 
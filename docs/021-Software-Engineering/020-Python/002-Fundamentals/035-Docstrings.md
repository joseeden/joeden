---
title: "Docstrings"
description: "Python Docstrings"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 35
last_update:
  date: 10/30/2019
---


## Overview

A docstring is a text description inside a function that explains what it does. A typical docstring may include:

- What the function does
- The arguments it takes and their types
- The return value(s)
- Errors it may raise
- Additional notes or examples

You can view a function’s docstring by using the `help` function.

For example, calling `help` on Python’s built-in `round` function:

```python
help(round)
```  

Output (simplified):  

```
Help on built-in function round:
round(...)
    Round a number to a given precision.
```



## Docstring Formats

The two most common formats are:

1. **Google Style**

    - Starts with a short, imperative description of the function
    - Uses an `Args` section for each argument with type and description
    - Marks optional arguments clearly
    - Has a `Returns` section describing the return type and value
    - Optionally includes `Raises` for errors and extra notes at the end

    Example:

    ```python
    def split_and_stack(df, columns):
        """
        Split the data frame and stack the columns.

        Args:
            df (DataFrame): The input data frame
            columns (list): List of columns to stack

        Returns:
            DataFrame: A new data frame with stacked columns

        Raises:
            ValueError: If any column in columns does not exist in df
        """
        # function code here
    ```

2. **Numpydoc Style**

    - Similar to Google style but more common in scientific Python
    - Takes more vertical space
    - Separates sections for description, parameters, returns, and notes

    Example:

    ```python
    def split_and_stack(df, columns):
        """
        Split the data frame and stack the columns.

        Parameters
        ----------
        df : DataFrame
            The input data frame
        columns : list
            List of columns to stack

        Returns
        -------
        DataFrame
            A new data frame with stacked columns

        Raises
        ------
        ValueError
            If any column in columns does not exist in df

        Notes
        -----
        This function assumes that the input data frame is well-formed.
        """
        # function code here
    ```


## Accessing a Docstring  

We can access a function’s docstring using `help()` or a special attribute.  

- `help(function_name)` shows full details  
- `function_name.__doc__` returns only the docstring  

Every Python function has a `__doc__` attribute containing its docstring.

```python
round.__doc__
```  

Output:  

```
'Round a number to a given precision in decimal digits.\n\nThe return value is an integer 
if ndigits is omitted or None.  Otherwise\nthe return value has the same type as the number.  ndigits may be negative.'
```

If you use the `help`:

```python
help(round)
```  

The output will be splitted into lines:

```
Help on built-in function round:
round(...)
    Round a number to a given precision.
```


:::info 

The two sets of underscores ("__") is called a **"dunder-doc"** attribute.

:::

## Creating a Docstring  

To add a docstring to our function, write a triple-quoted string at the start of a function.  

- Comes right after `def` line  
- Should be indented like the rest of the function  

Example:  

```python
def average(numbers):
    """Returns the average of a list of numbers."""
    return sum(numbers) / len(numbers)
```

To access the docstring:

```bash
average.__doc__ 
```

Output:

```bash
'Returns the average of a list of numbers.'  
```

## Updating a Docstring  

Since docstrings are attributes, they can be changed.  

Example:  

```python
average.__doc__ = "Calculates the mean of a list."
print(average.__doc__)
```  

Output:  

```
Calculates the mean of a list.
```

## Multi-line Docstrings  

For complex functions, use multi-line docstrings.  

- Start with a short summary  
- Leave a blank line  
- Describe arguments (`Args:`) and return value (`Returns:`)  

Example:  

```python
def multiply(a, b):
    """Multiply two numbers.

    Args:
        a (int): First number
        b (int): Second number

    Returns:
        int: The product of a and b
    """
    return a * b
```

## Displaying Multi-line Docstrings  

Using `help()` shows the full docstring with formatting.  

Example:  

```python
help(multiply)
```  

Output:  

```
Help on function multiply:
multiply(a, b)
    Multiply two numbers.

    Args:
        a (int): First number
        b (int): Second number

    Returns:
        int: The product of a and b
```
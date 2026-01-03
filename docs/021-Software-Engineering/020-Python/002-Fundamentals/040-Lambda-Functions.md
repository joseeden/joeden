---
title: "Lambda Functions"
description: "Lambda Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 40
last_update:
  date: 10/30/2019
---


## Overview

Lambda functions are shorter and don't need a name. They are used for simple tasks where you don’t need to create a full function. 

- Syntax: `lambda arguments: expression`  
- You can use `x` for the argument, or any other name.  
- The expression is like the function body.
- The result is automatically returned.  

**When to use Lambda:** 

- **Lambda**: 
  - Use for simple tasks
  - When the function will only be used once
  
- **Custom Functions**: 
  - Use for more complex logic 
  - When the function will be reused many times


## Using Lambda

If you only need to use the function once, you can directly define and call it with Lambda like this:

```bash
(lambda x: function(x))(x)
```

Example: To calculate the average, use `sum(x)/len(x)` as the function and pass the argument `x`.

```bash
## Computes the average of multiple values
(lambda x: sum(x)/len(x))([10, 20, 30])   # Output: 20.0
```

## Storing Lambda 

You can also store a lambda function in a variable and then call it like a regular function.

Example:

```python
average = lambda x: sum(x) / len(x)
print(average([10, 20, 30]))  # Output: 20.0
```

## Multiple Arguments  

Lambda functions can take more than one argument. 

Example: Raising one number to the power of another.

```python
(lambda x, y: x ** y)(2,3) # Output: 8
```

Which could also be written as: 

```python
power = lambda x, y: x ** y
print(power(2, 3))  # Output: 8
```

## Using Lambda with Iterables  

Lambda functions work well with iterables, like lists. You can use them inside functions like `map` to modify every element and then convert to a data structure using the `list` function.

Example:

```python
names = ['alice', 'bob', 'charlie']
capitalized_names = list(map(lambda x: x.capitalize(), names))
print(capitalized_names)  
```

Output:

```python
['Alice', 'Bob', 'Charlie']
```


## Calling Lambda In-Line 

You can also define the function and print the output in one line.

Example: alculate the tax (20% of the sale price)

```bash
sale_price = 29.99

print((lambda x: x * 1.2)(sale_price)) ## Output: 35.988
```

If `sale_price` is a list of prices, you can use `map` to apply the tax calculation to each value, and `list` to convert the result into a list.

```bash
sales_prices = [29.99, 9.95, 14.50, 39.75, 60.00]

add_taxes = map(lambda x: x*1.2, sales_prices)
print(list(add_taxes))
```

Output:

```bash
[35.988, 11.94, 17.4, 47.699999999999996, 72.0] 
```
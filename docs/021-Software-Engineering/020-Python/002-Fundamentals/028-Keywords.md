---
title: "Keywords"
description: "Keywords"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 28
last_update:
  date: 10/28/2019
---


## `in`

Use the `in` keyword to check if a value is present in a variable or data structure. For example, checking if a product ID exists in a dictionary.

```python
products_dict = {'OS31': 20, 'HT91': 15, 'MX01': 30}
print('OS31' in products_dict)  # Check if OS31 is a key in the dictionary
```

Output:

```plaintext
True
```

This prints `True` because `OS31` is a key in the dictionary.


## `not`

The `not` keyword helps confirm that a value is **not** in a data structure.

```python
print('OS31' not in products_dict)  # Check if OS31 is not a key
```

Output:

```plaintext
False
```

It prints `False` because `OS31` **is** a key in the dictionary.


## `and`

The `and` keyword allows us to check if multiple conditions are met at once.

```python
print('HT91' in products_dict and min(products_dict.values()) > 5)
```

Output:

```plaintext
True
```

It checks if both conditions are true: "HT91" is a key, and the minimum price is more than 5.


## `or`

The `or` keyword checks if at least one of several conditions is true.

```python
print('HT91' in products_dict or min(products_dict.values()) < 5)
```

Output:

```plaintext
True
```

It prints `True` because "HT91" is a key in the dictionary, even though the minimum price is above 5.


## Update Variables

We can modify variables within loops using operators like `+=` or `-=`.

```python
stock = 10
stock -= 1  # Decrease stock by 1
print(stock)
```

Output:

```plaintext
9
```

The stock is decreased by 1 and the updated value is printed.


## Store Values in a List

You can append values that meet certain conditions to a list.

```python
product_ids = []
for product, price in products_dict.items():
    if price >= 20:
        product_ids.append(product)

print(product_ids)
```

Output:

```plaintext
['OS31', 'MX01']
```

This code appends product IDs where the price is at least 20 to a list, and the result shows `OS31` and `MX01` as meeting the condition.
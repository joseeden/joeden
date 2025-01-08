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
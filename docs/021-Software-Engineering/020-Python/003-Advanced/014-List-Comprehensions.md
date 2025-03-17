---
title: "List Comprehensions"
description: "List Comprehensions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 14
last_update:
  date: 11/8/2019
---


## Overview

List comprehensions let you create lists in a single line instead of using a for loop. It works with any iterable (lists, ranges, strings, etc) and shortens for loops.

Basic syntax: 

```python
[output_expression for item in iterable]
```


## Comparison  

List comprehensions work just like for loops but in a more compact way.  

For example, consider the `for` loop below:

```python
nums = [1, 2, 3, 4]  
new_nums = []  
for num in nums:
  new_nums.append(num + 1)
print(new_nums)     ## Output: [2, 3, 4, 5]
```

This can rewritten as:

```python
nums = [1, 2, 3, 4]  
new_nums = [num + 1 for num in nums]  
print(new_nums)     ## Output: [2, 3, 4, 5]
```



## Using `range()`

List comprehensions can work with `range()` too.  

```python
squares = [x**2 for x in range(5)]
print(squares)
```

Output:

```bash
[0, 1, 4, 9, 16]
```


## Nested Loops   

You can use nested for loops inside a list comprehension.  

Example: Creating Pairs  

```python
pairs = [(x, y) for x in range(2) for y in range(6, 8)]
print(pairs)
```

Output:

```bash
[(0, 6), (0, 7), (1, 6), (1, 7)]
```

Nested comprehensions can save space but may reduce readability. Use them when they make sense, but keep your code easy to understand.

## Example: Matrices 

One of the ways in which lists can be used are in representing multi-dimension objects such as matrices. Matrices can be represented as a list of lists in Python. For example a 5 x 5 matrix with values 0 to 4 in each row can be written as:

```python
matrix = [[0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4]]
```

Your task is to recreate this matrix by using nested listed comprehensions. Recall that you can create one of the rows of the matrix with a single list comprehension. Note that here, the output expression is itself a list comprehension.

Solution:

```python
# 5 x 5 matrix using a list of lists
matrix = [[col for col in range(0, 5)] for row in range(0, 5)]

for row in matrix:
    print(row)
```

Output:

```bash
  [0, 1, 2, 3, 4]
  [0, 1, 2, 3, 4]
  [0, 1, 2, 3, 4]
  [0, 1, 2, 3, 4]
  [0, 1, 2, 3, 4]
```
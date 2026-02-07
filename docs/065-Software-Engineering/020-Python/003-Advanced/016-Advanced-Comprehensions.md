---
title: "Advanced Comprehensions"
description: "Advanced Comprehensions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 16
last_update:
  date: 11/10/2019
---

## Overview

Comprehensions can include conditions to filter or modify values dynamically.  

## Filtering with Conditions  

You can filter values in a list comprehension using a condition.  

Consider the `for` loop below:

```python
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x**2)

print(squares)
```

This can be rewritten as:

```python
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares)
```  

Note: 

- The `%` (modulo) operator checks if `x` is even (`x % 2 == 0`).  
- Only even numbers are squared and added to the list.  

Output:

```bash
[0, 4, 16, 36, 64]
```  

The list comprehension only includes **squares of even numbers**, and it doesn't include anything for odd numbers.


## Condition on Output  

You can also apply a condition to the output instead of filtering.  

```python
values = [x**2 if x % 2 == 0 else 0 for x in range(10)]
print(values)
```  

Output:

```bash
[0, 0, 4, 0, 16, 0, 36, 0, 64, 0]
```  

The list comprehension includes both:

- squares of even numbers, and 
- 0 for odd numbers.  

## Dictionary Comprehensions  

Dict comprehensions create dictionaries using a similar syntax. 

- The syntax uses `{}` instead of `[]` 
- The key-value pair is separated by `:`.

Consider the example below:

```python
num_dict = {}
for x in range(1, 6):
    num_dict[x] = -x

print(num_dict)
```

This can be written as:

```python
num_dict = {x: -x for x in range(1, 6)}
print(num_dict)
```  

Both will return the same output:

```bash
{1: -1, 2: -2, 3: -3, 4: -4, 5: -5}
```  

## Example: LoR Characters 

In this example, we are working with a list of characters from *The Lord of the Rings (LoR)*. We'll filter and modify the list using list comprehensions.

```python
fellowship = ['frodo', 'samwise', 'merry', 'aragorn', 'legolas', 'boromir', 'gimli']

new_fellowship = [member for member in fellowship if len(member) >= 7]

print(new_fellowship)
```

Output:

```python
'samwise', 'aragorn', 'legolas', 'boromir']
```

If you want to replace the characters whose names are shorter than 7 characters with an empty string (`""`), you can modify the list comprehension:

```python
fellowship = ['frodo', 'samwise', 'merry', 'aragorn', 'legolas', 'boromir', 'gimli']

new_fellowship = [member if len(member) >= 7 else "" for member in fellowship]

print(new_fellowship)
```

Output:

```python
['', 'samwise', '', 'aragorn', 'legolas', 'boromir', '']
```

Finally, if you want to create a dictionary where each character's name is a key, and the length of their name is the value, we can use a dictionary comprehension:

```python
fellowship = ['frodo', 'samwise', 'merry', 'aragorn', 'legolas', 'boromir', 'gimli']

new_fellowship = {member: len(member) for member in fellowship}

print(new_fellowship)
```

Output:

```python
{'frodo': 5, 'samwise': 7, 'merry': 5, 'aragorn': 7, 'legolas': 7, 'boromir': 7, 'gimli': 5}
```


## Example: Time-stamped Data 

In this example, we'll use a list comprehension to extract the time from Twitter data with timestamps.

- Extract 'created_at' column and assign it to `tweet_time`.
- Extract characters 12 to 19 from each timestamp in `tweet_time`.
- Assign the result to `tweet_clock_time`.

Download the Twitter dataset here: [tweets.csv](@site/assets/datasets/tweets.csv)

Solution:

```bash
import pandas as pd 
df = pd.read_csv("tweets.csv")

tweet_time = df['created_at']
tweet_clock_time = [entry[11:19] for entry in tweet_time]

print(tweet_clock_time)
```

Output:


```bash
['23:40:17', '23:40:17', '23:40:17', '23:40:17', '23:40:17', '23:40:17', 
'23:40:18', '23:40:17', '23:40:18', '23:40:18', '23:40:18', '23:40:17', 
'23:40:18', '23:40:18', '23:40:17', '23:40:18', '23:40:18', '23:40:17', 
'23:40:18', '23:40:17', '23:40:18', '23:40:18', '23:40:18', '23:40:18', 
'23:40:17', '23:40:18', '23:40:18', '23:40:17', '23:40:18', '23:40:18', 
............]
```

This code extracts only the time part of each timestamp from the 'created_at' column.


## Example: Time-stamped Data with Conditions

In this example, we'll extract the time from time-stamped Twitter data, but only for timestamps where the seconds (`entry[17:19]`) are '19'.

- Extract the `created_at` column from `df` and assign it to `tweet_time`.
- Extract the time from each timestamp in `tweet_time` (characters 12 to 19).
- Add a condition to select only the timestamps where `entry[17:19] == '19'`.

Download the Twitter dataset here: [tweets.csv](@site/assets/datasets/tweets.csv)

Solution:

```bash
import pandas as pd 
df = pd.read_csv("tweets.csv")

tweet_time = df['created_at']
tweet_clock_time = [entry[11:19] for entry in tweet_time if entry[17:19] == '19']

print(tweet_clock_time)
```

Output;

```bash
['23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', 
'23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', 
'23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '
23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', '23:40:19', 
......................] 
```
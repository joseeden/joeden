---
title: "Counting Problems in DataFrame"
description: "Counting Problems in DataFrame"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 50
last_update:
  date: 10/28/2019
---


## Problem

You are given a CSV file named `tweets.csv` that contains Twitter data. One of the columns in the dataset is `lang`, which stores the language of each tweet.

:::warning[Real Twitter data]

The dataset contains real Twitter data and may include offensive content.
Get the dataset here: [tweets.csv](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/020-Python/003-Problem-Sets/050-Counting-Values-in-DataFrame) 

:::

**Task**

- Count how many tweets exist for each language.

**Requirements – Part 1**

- Import the pandas library as `pd`
- Load `tweets.csv` into a DataFrame named `df`
- Iterate over the `lang` column
- Build a dictionary and print the result

**Requirements – Part 2**

- Define a function named `count_entries`
- The function should accept a DataFrame and a column name
- Return the dictionary instead of printing it
- Call the function using the `lang` column

**Details on the dictionary**

- Keys represent language codes
- Values represent the number of tweets in that language


## Thought process

**Without using a function**

1. Start with an empty dictionary
2. Loop through each value in the `lang` column
3. If the language already exists, increase its count
4. If it does not exist, add it with a count of 1

**Using a function**

1. Move the dictionary and loop logic inside a function
2. Use the column name as a parameter to make the function reusable
3. Return the result so it can be stored or reused


## Solution – Part 1

> See project files here: [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/020-Python/003-Problem-Sets/050-Counting-Values-in-DataFrame).

Install the packages using a `requirements.txt`:

```bash
pip install -r requirements.txt
```

The first step is to solve the problem without using a function. This helps verify that the logic works correctly.

```python
## count_langs_v1.py
import pandas as pd

df = pd.read_csv('tweets.csv')
langs_count = {}

col = df['lang']

for entry in col:
    if entry in langs_count:
        langs_count[entry] += 1
    else:
        langs_count[entry] = 1

print(langs_count)
```

At this stage, the dictionary contains the count of tweets per language.

Running the script:

```bash
python count_langs_v1.py
```

Output:

```bash
{'en': 97, 'et': 1, 'und': 2}
```


## Solution – Part 2

Once the logic is confirmed, the next step is to convert it into a reusable function.

```python
## count_langs_v2.py
import pandas as pd

df = pd.read_csv('tweets.csv')
langs_count = {}

col = df['lang']

def count_entries(df, col_name):
    langs_count = {}
    col = df[col_name]

    for entry in col:
        if entry in langs_count:
            langs_count[entry] += 1
        else:
            langs_count[entry] = 1

    return langs_count

result = count_entries(df, 'lang')
print(result)
```

Running the script:

```bash
python count_langs_v2.py
```

Output:

```bash
{'en': 97, 'et': 1, 'und': 2}
```
---
title: "Loading in Chunks"
description: "Loading data in chunks"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 12
last_update:
  date: 11/7/2019
---

     
## Loading Data 

When dealing with large datasets, loading everything at once may not be possible. Instead, we can load data in smaller chunks, process each chunk, and discard it before moving to the next.  

- Useful for large files, databases, or API responses  
- Uses `pandas.read_csv()` with the `chunksize` argument  
- Each chunk is processed separately to save memory  

Example:  

```python
import pandas as pd

# Load data in chunks
chunks = pd.read_csv("data.csv", chunksize=1000)

for chunk in chunks:
    print(chunk.head())  # Process each chunk separately
```

Output (First 5 rows of each chunk):

```
      A    B    C
0   1.2  2.3  3.1
1   4.5  5.6  6.2
...
```


## Summing a Column 

If a CSV has a column `x` with numbers, we can sum the values without loading everything into memory.  

- Read data in chunks  
- Sum values in each chunk  
- Store partial results and combine them later  

Example:  

```python
total_sum = 0

for chunk in pd.read_csv("data.csv", usecols=["x"], chunksize=1000):
    total_sum += chunk["x"].sum()

print("Total sum:", total_sum)
```

Output:

```
Total sum: 12345678
```


## Summing Without a List  

Instead of storing results in a list, we can update a total sum directly.  

- No need for extra memory  
- Adds sums during iteration  

Example:  

```python
total = sum(chunk["x"].sum() for chunk in pd.read_csv("data.csv", usecols=["x"], chunksize=1000))

print("Total sum:", total)
```

Output:

```
Total sum: 12345678
```

## Example: Processing Twitter Data 

Large datasets can't always fit into memory, so we process them in chunks. In the example below, we analyze a CSV file of Twitter data by processing 10 entries at a time.  

- Use `pd.read_csv()` with `chunksize=10`  
- Count occurrences of languages in tweets  
- Store results in a dictionary  

Download the Twitter dataset here: [tweets.csv](@site/assets/datasets/tweets.csv)

Solution:  

```python
import pandas as pd

counts_dict = {}

# Iterate, chunk by chunk
for chunk in pd.read_csv("tweets.csv", chunksize=10):

    # Iterate over Language column
    for entry in chunk['lang']:
        if entry in counts_dict.keys():
            counts_dict[entry] += 1
        else:
            counts_dict[entry] = 1

print(counts_dict)

```


Output:  

```python

{'en': 15, 'es': 8, 'fr': 6, 'de': 4, 'it': 2}
```

The output is a dictionary where the keys represent different language codes found in the dataset, and the values indicate the number of times each language appears in the tweets. For example, 'en': 15 means that 15 tweets were in English, while 'es': 8 means 8 tweets were in Spanish. This confirms that the script correctly counted the occurrences of each language while processing the data in chunks.


## Example: Making Code Reusable 

Instead of rewriting the same code for similar tasks, it's better to use functions. The example below defines a function to count occurrences of values in a specific column while processing a CSV file in chunks.  

- Reads the file in chunks using `pd.read_csv()`  
- Counts occurrences of values in a given column  
- Returns the results as a dictionary  

Download the Twitter dataset here: [tweets.csv](@site/assets/datasets/tweets.csv)

Solution:

```python 
import pandas as pd

def count_entries(csv_file, c_size, colname):
    """Return a dictionary with counts of occurrences as value for each key."""
    
    counts_dict = {}

    # Process file in chunks
    for chunk in pd.read_csv(csv_file, chunksize=c_size):
        for entry in chunk[colname]:
            if entry in counts_dict.keys():
                counts_dict[entry] += 1
            else:
                counts_dict[entry] = 1

    return counts_dict

result_counts = count_entries('tweets.csv', 10, 'lang')

print(result_counts)
```

Output:

```bash
{'en': 97, 'et': 1, 'und': 2}
```

The output is a dictionary where each key represents a language code, and the value indicates how many tweets were in that language. `'en': 97` means there were 97 English tweets, `'et': 1` means 1 tweet was in Estonian, and `'und': 2` means 2 tweets had an undefined language.
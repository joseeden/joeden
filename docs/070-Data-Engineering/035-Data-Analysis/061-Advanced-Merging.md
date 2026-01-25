---
title: "Advanced Merging"
description: "Advanced Merging and Concatenation"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 61
last_update:
  date: 8/17/2021
---


## Filtering Joins  

Filtering joins help select rows from one table based on matches (or lack of matches) in another table. Unlike mutating joins, they don't combine columns but filter data instead.  

### Semi Join  

A semi join keeps only the rows from the left table that have a match in the right table. To perform a semi-join:

- Merge the left and right tables on key column using an inner join.
- Check if key column in left table is in the merged table using `isin()`.
- Subset the rows of the left table.

Consider the  two tables below:  
- `genres` (genre ID, name)  
- `top_tracks` (track ID, genre ID)  

```python
import pandas as pd

genres = pd.DataFrame({
    'gid': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'genre': ['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical', 'EDM', 'Country', 
              'Blues', 'Metal', 'Reggae', 'Folk', 'Soul']
})

top_tracks = pd.DataFrame({
    'tid': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    'gid': [1, 2, 2, 3, 6, 6, 7, 8, 10, 12]  # Some genres appear in top_tracks
})
```

Use inner join to find matching `gids`, then use the `isin()` method to compare every `gid` in the `genres` table to the `gid` in the `top_tracks` table.

```python
genres_tracks = genres.merge(top_tracks, on='gid', how='inner')

# Below line returns a table of boolean values
matchinggids = genres['gid'].isin(genres_tracks['gid'])

# Instead of boolean values, we can get the actual values by subsetting the genres table.
top_genres = genres[genres['gid'].isin(genres_tracks['gid'])    ]
print(top_genres)
```

Output:

```
      gid      genre
0    1      Rock
1    2       Pop
2    3      Jazz
5    6       EDM
6    7   Country
7    8     Blues
9   10    Reggae
11  12      Soul
```

### Anti Join  

An anti join keeps only the rows from the left table that do *not* have a match in the right table.  

Using the previous example, we can use anti join to find which genres are not in the table of top tracks. Setting `indicator` to `True`, a `_merge` column will be added which will show the source of each row, which means some rows might be a match from both tables, while some rows may only be found in the left table.

```python
genres_tracks = genres.merge(top_tracks, on='gid', how='left', indicator=True)

gid_list = genres_tracks.loc[
                    genres_tracks['_merge'] == 'left_only',
                   'gid']
```

Finally, use the `isin()` method to filter only for the rows with `gid` in the `gid_list`.

```python
non_top_genres = genres[genres['gid'].isin(gid_list)]
print(not_top_genres)
```

Output:

```python
   gid      genre
3    4   Hip-Hop
4    5 Classical
8    9    Metal
10  11     Folk
```


## Concatenating Tables Vertically  

Sometimes, data for different periods is stored in separate tables. To analyze them together, we need to combine them into one.  

- The tables have the same column names.  
- We use `pandas.concat()` to stack them vertically.  '

Note that the Pandas `concat()` method can concatenate both vertical and horizontal.

### Basic Concatenation 

Consider the three sample invoice data from January to March.

```python
import pandas as pd 

# Invoice data for three months
inv_jan = pd.DataFrame([
    [101, 1, '2019-01-10', 100], 
    [102, 2, '2019-01-15', 200], 
    [103, 3, '2019-01-20', 150]
], columns=['iid', 'cid', 'invoice_date', 'total'])

inv_feb = pd.DataFrame([
    [104, 4, '2019-02-05', 170], 
    [105, 5, '2019-02-12', 250], 
    [106, 6, '2019-02-18', 300], 
    [107, 7, '2019-02-25', 190]
], columns=['iid', 'cid', 'invoice_date', 'total'])

inv_mar = pd.DataFrame([
    [108, 8, '2019-03-03', 210], 
    [109, 9, '2019-03-10', 280], 
    [110, 10, '2019-03-17', 190], 
    [111, 11, '2019-03-24', 240], 
    [112, 12, '2019-03-30', 270]
], columns=['iid', 'cid', 'invoice_date', 'total'])
```

To concatenate these tables: 

```python 
combined = pd.concat([inv_jan, inv_feb, inv_mar])
print(combined)
```

Output:

```
   iid  cid invoice_date  total
0  101    1   2019-01-10    100
1  102    2   2019-01-15    200
2  103    3   2019-01-20    150
0  104    4   2019-02-05    170
1  105    5   2019-02-12    250
2  106    6   2019-02-18    300
3  107    7   2019-02-25    190
0  108    8   2019-03-03    210
1  109    9   2019-03-10    280
2  110   10   2019-03-17    190
3  111   11   2019-03-24    240
4  112   12   2019-03-30    270
```

### Ignoring Index  

By default, the index values from the original tables are kept. If the index contains no valuable information, we can ignore it using the `ignore_index`.

```python
combined_reset = pd.concat([inv_jan, inv_feb, inv_mar], ignore_index=True)
print(combined_reset)
```

The result will be that the index will go from zero to `N-1`.

```
    iid  cid invoice_date  total
0   101    1   2019-01-10    100
1   102    2   2019-01-15    200
2   103    3   2019-01-20    150
3   104    4   2019-02-05    170
4   105    5   2019-02-12    250
5   106    6   2019-02-18    300
6   107    7   2019-02-25    190
7   108    8   2019-03-03    210
8   109    9   2019-03-10    280
9   110   10   2019-03-17    190
10  111   11   2019-03-24    240
11  112   12   2019-03-30    270
```

### Add Labels to Original Tables  

We can add labels to track which table each row came from using the `keys` argument.  

```python
combined_keys = pd.concat(
              [inv_jan, inv_feb, inv_mar], 
              ignore_index=False,
              keys=['Jan', 'Feb', 'Mar'])
print(combined_keys)
```

The result is a multi-index table, with label as the first level.

```
       iid  cid invoice_date  total
Jan 0  101    1   2019-01-10    100
    1  102    2   2019-01-15    200
    2  103    3   2019-01-20    150
Feb 0  104    4   2019-02-05    170
    1  105    5   2019-02-12    250
    2  106    6   2019-02-18    300
    3  107    7   2019-02-25    190
Mar 0  108    8   2019-03-03    210
    1  109    9   2019-03-10    280
    2  110   10   2019-03-17    190
    3  111   11   2019-03-24    240
    4  112   12   2019-03-30    270
```

### Tables with Different Columns  

If tables have different columns, `concat()` includes all columns by default. Missing values appear as `NaN`.  

Let's say the February invoice table has an additional column called 'billing_country`.

```python
inv_feb = pd.DataFrame([
    [104, 4, '2019-02-05', 170, 'US'], 
    [105, 5, '2019-02-12', 250, 'CA'], 
    [106, 6, '2019-02-18', 300, 'UK'], 
    [107, 7, '2019-02-25', 190, 'FR']
], columns=['iid', 'cid', 'invoice_date', 'total', 'billing_country'])

combined_diff = pd.concat([inv_jan, inv_feb])
print(combined_diff)
```

Output:

```
   iid  cid invoice_date  total billing_country
0  101    1   2019-01-10    100             NaN
1  102    2   2019-01-15    200             NaN
2  103    3   2019-01-20    150             NaN
0  104    4   2019-02-05    170              US
1  105    5   2019-02-12    250              CA
2  106    6   2019-02-18    300              UK
3  107    7   2019-02-25    190              FR
```

You can also sort the different column names alphabetically using the `sort` argument.

```bash
sort_diff = pd.concat([inv_jan, inv_feb], sort=True)
print(sort_diff)
```

Output:

```python
  billing_country  cid  iid invoice_date  total
0             NaN    1  101   2019-01-10    100
1             NaN    2  102   2019-01-15    200
2             NaN    3  103   2019-01-20    150
0              US    4  104   2019-02-05    170
1              CA    5  105   2019-02-12    250
2              UK    6  106   2019-02-18    300
3              FR    7  107   2019-02-25    190
```

### Keep Only Matching Columns  

To keep only the columns that all tables have in common, set `join="inner"`. The default value is `outer`, which is why the `concat` method will always return columns including the non-matching ones. 

```python
combined_inner = pd.concat([inv_jan, inv_feb], join="inner")
print(combined_inner)
```

Now, the `billing_country` column is gone, and only the common columns remain.

```
   iid  cid invoice_date  total
0  101    1   2019-01-10    100
1  102    2   2019-01-15    200
2  103    3   2019-01-20    150
0  104    4   2019-02-05    170
1  105    5   2019-02-12    250
2  106    6   2019-02-18    300
3  107    7   2019-02-25    190
```




## Verifying integrity

When merging or concatenating tables, we need to ensure that data relationships are correct. Python provides ways to check for duplicates and unexpected structures. 

**Why Verify Data?**  

- Prevents errors due to unexpected duplicates.  
- Ensures calculations (like averages) are accurate.  
- Helps maintain data consistency.  

If an error occurs, clean the data or remove duplicates before merging or concatenating.

### Checking Merges  

We use `merge()` to combine tables based on a common column. However, unexpected duplicates can turn a one-to-one merge into a one-to-many. The `validate` argument helps detect such issues.  

- **one_to_one**: Ensures each value appears only once in both tables.  
- **one_to_many**: Allows duplicates in the right table but not in the left.  

Consider the two tables below: 

```python
import pandas as pd

tracks = pd.DataFrame([
    [1, 'Song A'], 
    [2, 'Song B'], 
    [3, 'Song C']
], columns=['tid', 'track'])

specs = pd.DataFrame([
    [1, 'MP3'], 
    [2, 'FLAC'], 
    [2, 'WAV'], 
    [3, 'AAC']
], columns=['tid', 'format'])
```

When we attempt to do a one-to-one merge, this will return an error.

```python 
merged = pd.merge(tracks, specs, on='tid', validate='one_to_one')
```

Output:

```
MergeError: Merge keys are not unique in right dataset; not a one-to-one merge
```

**Solution**: Use one-to-many merging.

```python
merged = pd.merge(tracks, specs, on='tid', validate='one_to_many')
print(merged)
```

Output:

```python
   tid   track format
0    1  Song A    MP3
1    2  Song B   FLAC
2    2  Song B    WAV
3    3  Song C    AAC 
```

### Checking Concatenations  

The `concat()` method stacks tables vertically. The `verify_integrity` argument checks for duplicate index values and raises an error if found.  

Conside the two invoice tables below. 

```python
inv_feb = pd.DataFrame([
    [8, 1, '2019-02-10', 100], 
    [9, 2, '2019-02-15', 200]
], columns=['iid', 'cid', 'invoice_date', 'total']).set_index('iid')

inv_mar = pd.DataFrame([
    [9, 3, '2019-03-05', 250],  # Duplicate iid=9
    [10, 4, '2019-03-10', 300]
], columns=['iid', 'cid', 'invoice_date', 'total']).set_index('iid')
```

When we set the `verify_integrity` to True, it will check if there are duplicate records between the two tables. 

```python 
combined = pd.concat([inv_feb, inv_mar], verify_integrity=True)
```

Expected error:

```
ValueError: Indexes have overlapping values
```

**Solution**: Ignore Integrity Check  

```python
combined = pd.concat([inv_feb, inv_mar], verify_integrity=False)
print(combined)
```

Output:

```python
     cid invoice_date  total
iid                         
8      1   2019-02-10    100
9      2   2019-02-15    200
9      3   2019-03-05    250
10     4   2019-03-10    300
```


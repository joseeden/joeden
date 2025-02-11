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
sidebar_position: 45
last_update:
  date: 6/13/2020
---


## Filtering Joins  

Filtering joins help select rows from one table based on matches (or lack of matches) in another table. Unlike mutating joins, they don't combine columns but filter data instead.  

### Semi Join  

A semi join keeps only the rows from the left table that have a match in the right table.  

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

Use inner join to find matching `gids`, then use semi join to filter specific genres.

```python
genres_tracks = genres.merge(top_tracks, on='gid', how='inner')

# Semi join: Keep only genres found in top_tracks
top_genres = genres[genres['gid'].isin(genres_tracks['gid'])]
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

```python
# Left join with indicator
genres_tracks = genres.merge(top_tracks, on='gid', how='left', indicator=True)

# Anti join: Keep only genres *not* in top_tracks
not_top_genres = genres_tracks.loc[
     genres_tracks['_merge'] == 'left_only', 
     ['gid', 'genre']]

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
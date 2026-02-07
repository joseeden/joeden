---
title: "Multiple Criteria"
description: "SQL Fundamentals"
tags: 
- Data Engineering
- Databases
- SQL
sidebar_position: 9
last_update:
  date: 8/23/2019
---


## Overview

To enhance our filters using WHERE, we can add multiple criteria with the keywords OR, AND, and BETWEEN. These help us refine our queries more effectively.

- **OR**: Filters when at least one condition is true.
- **AND**: Filters when all conditions are true.
- **BETWEEN**: Filters values within a specific range.


We'll use the **films** table for the examples:

| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |



## OR Operator

To filter films released in either 2010 or 2019:

```sql
SELECT title, release_year
FROM films
WHERE release_year = 2010 OR release_year = 2019;
```

Output:

| title    | release_year |
|----------|--------------|
| Inception | 2010         |
| Parasite  | 2019         |



## AND Operator

To filter films that are in English and have a certification of PG-13:

```sql
SELECT title, language, certification
FROM films
WHERE language = 'English' AND certification = 'PG-13';
```

Output:

| title    | language | certification |
|----------|----------|---------------|
| Inception | English  | PG-13         |



## Combining AND and OR

To filter films released in 2010 OR 2019, AND with a certification of either PG-13 or PG:

```sql
SELECT title, release_year, certification
FROM films
WHERE (release_year = 2010 OR release_year = 2019)
AND (certification = 'PG-13' OR certification = 'PG');
```

Output:

| title    | release_year | certification |
|----------|--------------|---------------|
| Inception | 2010         | PG-13         |



## BETWEEN Keyword

To filter films released between 2000 and 2010:

```sql
SELECT title, release_year
FROM films
WHERE release_year BETWEEN 2000 AND 2010;
```

Output:

| title   | release_year |
|---------|--------------|
| Inception | 2010         |
| Amélie  | 2001         |



## Combining BETWEEN, AND, and OR

To filter films released between 2000 and 2010 and from the USA:

```sql
SELECT title, release_year, country
FROM films
WHERE release_year BETWEEN 2000 AND 2010
AND country = 'USA';
```

Output:

| title    | release_year | country |
|----------|--------------|---------|
| Inception | 2010         | USA     |
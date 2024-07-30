---
title: "Filtering Texts"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases]
sidebar_position: 9
last_update:
  date: 2/27/2022
---

## Sample Table 

We'll use this **people** table for the examples.

| id | name              | birthdate  | deathdate  |
|----|-------------------|------------|------------|
| 1  | Leonardo DiCaprio | 1974-11-11 | NULL       |
| 2  | Bong Joon-ho      | 1969-09-14 | NULL       |
| 3  | Marlon Brando     | 1924-04-03 | 2004-07-01 |
| 4  | Hayao Miyazaki    | 1941-01-05 | NULL       |
| 5  | Christopher Nolan | 1970-07-30 | NULL       |
| 6  | Tom Hardy         | 1977-09-14 | NULL       |
| 7  | Quentin Tarantino | 1963-03-27 | NULL       |
| 8  | Sofia Coppola     | 1971-05-14 | NULL       |
| 9  | Natalie Portman   | 1981-06-09 | NULL       |
| 10 | Ridley Scott      | 1937-11-30 | NULL       |
| 11 | Emma Watson       | 1990-04-15 | NULL       |

## Pattern Matching in SQL

In real-world scenarios, we often need to search for patterns rather than specific text strings. We use SQL keywords LIKE, NOT LIKE, and IN to achieve this.

- Search for patterns
- Use SQL keywords

## Using LIKE

The `LIKE` operator, combined with the `WHERE` clause, helps search for patterns in a field using wildcards as placeholders. There are two wildcards: percent (%) and underscore (_). The percent wildcard matches zero, one, or many characters, while the underscore wildcard matches a single character.

To search for names that starts with the letter 'A':

```sql
SELECT name 
FROM people 
WHERE name LIKE 'A%';
```

Output:

| name              |
|-------------------|
| Adele             |
| Adelaide          |
| Aden              |


To search for names that starts and ends with the letter 'E':

```sql
SELECT name 
FROM people 
WHERE name LIKE 'E_e';
```

Output:

| name              |
|-------------------|
| Eve               |
| Eva               |


## Using NOT LIKE

The NOT LIKE operator helps find records that don't match a specified pattern. This operation is case-sensitive, so be mindful of the query's case.

To search for names that DOES NOT start with the letter 'A':

```sql
SELECT name 
FROM people 
WHERE name NOT LIKE 'A%';
```

Output:

| name              |
|-------------------|
| Bong Joon-ho      |
| Marlon Brando     |
| Hayao Miyazaki    |
| Christopher Nolan |
| Tom Hardy         |
| Quentin Tarantino |
| Sofia Coppola     |
| Natalie Portman   |
| Ridley Scott      |
| Emma Watson       |


## Wildcard Placement

Wildcards can be placed anywhere in the pattern to find values that start, end, or contain specific characters. They can also be combined to search for records of a certain length.

To find names that end with the letter 'o':

```sql
SELECT name 
FROM people 
WHERE name LIKE '%o';
```

Output:

| name              |
|-------------------|
| Leonardo DiCaprio |
| Bong Joon-ho      |
| Marlon Brando     |
| Hayao Miyazaki    |
| Christopher Nolan |
| Quentin Tarantino |
| Ridley Scott      |

## Using WHERE and OR

To filter based on multiple conditions or a range of numbers, we can chain several `OR` conditions to the `WHERE` clause. However, this can become messy with many conditions.

As an example, to find people who have the specified birth dates, we can specify multiple `OR` statements like this:

```sql
SELECT name 
FROM people 
WHERE birthdate = '1969-09-14' 
   OR birthdate = '1974-11-11';
```

Output:

| name              |
|-------------------|
| Leonardo DiCaprio |
| Bong Joon-ho      |
| Tom Hardy         |

## Using IN

The IN operator simplifies specifying multiple values in a WHERE clause, making it easier and quicker to set multiple conditions. For example, instead of chaining OR conditions, use WHERE birthdate IN ('1969-09-14', '1974-11-11').

Similar to the previous example but instead of using multiple `OR` statements, we can specify the birth dates in a "list".

```sql
SELECT name 
FROM people 
WHERE birthdate IN ('1969-09-14', '1974-11-11');
```

Output:

| name              |
|-------------------|
| Leonardo DiCaprio |
| Bong Joon-ho      |
| Tom Hardy         |

## Text Field Example with IN

Using IN with text fields helps find records where a field matches any value in a specified list. For example, find titles where the associated country is either Germany or France.

Example:

```sql
SELECT name 
FROM people 
WHERE name IN ('Leonardo DiCaprio', 'Emma Watson');
```

Output:

| name              |
|-------------------|
| Leonardo DiCaprio |
| Emma Watson       |
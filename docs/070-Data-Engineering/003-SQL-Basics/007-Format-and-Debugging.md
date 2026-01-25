---
title: "Format and Debugging"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 7
last_update:
  date: 8/23/2019
---



## SQL Execution Order

In SQL, the order in which the code is executed differs from the order in which it is written.

- `FROM` statement processed first
- `SELECT` of data follows
- Refinement of results, such as using `LIMIT`, comes last
- Aliases are declared in the `SELECT` statement

Using the `LIMIT` keyword restricts the number of returned records. When referring to an alias in the query, the alias must be declared in the SELECT statement first.

## Debugging SQL Code

Some error messages are highly informative, even suggesting solutions for the errors. For instance, misspelling the "name" field might trigger a message that highlights the exact issue.

- Misspelling
- Incorrect capitalization
- Incorrect or missing punctuation

### Handling Comma Errors

Some error messages are less explicit, requiring a thorough review of the code. A common mistake is forgetting a comma. 

- Comma errors often indicated by caret in error message
- Review code for missing commas when errors occur

See sample queries below. When ran, it returns an error:

```sql
SELECT title, country duration
FROM films;
```

![](/img/docs/handling-errors-missing-commmaaa.png)

![](/img/docs/handling-comma-errorssss.png)

The correct statement would be:

```bash
SELECT title, country, duration
FROM films;
```

### Keyword Errors

When a keyword is misspelled, SQL provides an error message with a caret indicator below the problematic line, accurately highlighting the issue.

When this query is ran, it returns an error:

```sql
SELCT title, country, duration
FROM films;
```

![](/img/docs/handling-errors-misspelling.png)

The correct statement would be:

```bash
SELECT title, country, duration
FROM films;
```


## SQL Formatting 

Unlike some other programming languages, SQL doesn't require specific capitalization, indentation, or new lines. 

- Flexible formatting rules in SQL
- Importance of readable queries

For the example, we're using the sample **patrons** table:


| card_num | name           | member_year | total_fine |
|----------|----------------|-------------|------------|
| 123456   | John           | 2021        | 15.75      |
| 234567   | Jane           | 2020        | 5.00       |
| 345678   | Alice          | 2019        | 0.00       |
| 456789   | Bob            | 2022        | 7.50       |
| 567890   | Charlie        | 2021        | 12.30      |

To get just the `card_num` and `name`, we can run:

```sql
SELECT card_num, name
FROM  patrons 
LIMIT 3; 
```

Since SQL isn't exactly strict about the formatting, we can also run:

```sql
select card_num, name from patrons limit 3 
```

Both statements will return the same output:

| card_num | name           |
|----------|----------------|
| 123456   | John           |
| 234567   | Jane           |
| 345678   | Alice          |


## Best Practices

Over time, SQL users have established style standards that are widely accepted in various industries. Both statements returns the same results but the first statement is much more readable due to capitalized keywords and better use of new lines.

- Style standards improve readability
- Capitalized keywords and new lines are common practices

While capitalization and new lines are generally standard, finer details of SQL style vary.

- Different users have varying style preferences
- New lines and indents for multiple fields are common practices

For example, the statement below also returns the same output:

```sql
SELECT
    card_num,
    name,
FROM patrons
LIMIT 3
```

For more information, please see [Holywell's guide.](https://www.sqlstyle.guide/)

## The Importance of Semicolons

Although PostgreSQL doesn't require semicolons, using them is a good habit. Some SQL variants require semicolons, making the code more adaptable. Additionally, a semicolon clearly marks the end of a query, which is useful in files with multiple queries.

- Semicolons enhance code clarity
- Adaptability to different SQL variants

## Non-Standard Field Names

We may encounter poorly formatted SQL written by others. A common mistake is using spaces in field names. To query such tables, enclose the field name in double quotes. 

- Dealing with poorly formatted SQL
- Adjusting queries for non-standard field names

For example, if a field is named "card num" instead of `card_num` we need to adjust our query to include double quotes.


```sql
SELECT "card num", name
FROM  patrons 
LIMIT 3; 
```

---
title: "Dates and Times"
description: "Dates and Times in Pandas"
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
  date: 8/17/2021
---

## Explore the Jupyter Notebooks

To see these functions in action, check out the Jupyter notebook here: [Using Pandas](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/021-Jupyter-Notebooks/001-Using-Pandas).  


## Loading Data

> To learn more about datetime objects, please see [Dates and Times in Python.](/docs/021-Software-Engineering/020-Python/003-Advanced/025-Dates-and-Times.md)

Pandas makes it easy to load and explore data from CSV files. We usually import it as `pd` and use `read_csv()` to load our data.

1. Import Pandas with the alias `pd`
2. Load CSV file using `pd.read_csv('filename.csv')`
3. Store the result in a variable, e.g., `my_var`

In this example, we are using a bike CSV file, which contains ride data like start date, end date, start station, end station, bike number, and whether the rider is a member or casual user.

```python
import pandas as pd

rides = pd.read_csv('capital_onebike.csv')
print(rides.head(3))
```

Expected output shows first 3 rows of the table with all columns and the index starting at 0.

## Columns and Rows

We can access specific columns or rows easily.

- Get a column using `rides['Start date']`
- Get a row using `rides.iloc[2]`
- Note that date columns are treated as strings by default

Working with strings for dates is limiting, so we usually convert them to datetime objects.

```python
print(rides['Start date'])
print(rides.iloc[2])
```

This lets us select and inspect data before doing any calculations.

## Converting Columns to Datetime

Pandas can automatically convert columns to datetime when loading CSVs.

- Use `parse_dates` argument in `read_csv()`
- Pass a list of column names to convert, e.g., `['Start date', 'End date']`
- Pandas guesses the format; use `pd.to_datetime()` if needed

```python
rides = pd.read_csv('capital_onebike.csv', parse_dates=['Start date', 'End date'])
print(type(rides.loc[2, 'Start date']))
```

Now the `Start date` column is a `Timestamp`, which behaves like a standard Python datetime object.

## Calculating Duration

Once dates are datetime objects, we can calculate durations easily.

- Create a new column: `rides['Duration'] = rides['End date'] - rides['Start date']`
- The result is a timedelta for each row
- Print first 5 rows to see durations

```python
rides['Duration'] = rides['End date'] - rides['Start date']
print(rides['Duration'].head())
```

This shows ride lengths in hours, minutes, and seconds.

## Converting Duration to Seconds

Pandas provides a convenient namespace for datetime operations.

- Use `.dt` to access datetime methods
- Convert timedeltas to seconds using `.dt.total_seconds()`
- Method chaining improves readability with line breaks and backslashes

```python
rides['Duration_seconds'] = rides['Duration'].dt.total_seconds()
print(rides['Duration_seconds'].head())
```

Now durations are numeric, which is easier for analysis and calculations.

This workflow shows how to load CSV data, convert date columns, calculate durations, and convert them to seconds. Each step builds on the previous, making Pandas powerful for time-based data analysis.

If you want, I can also make a **single compact cheat-sheet version*- of this for quick reference with **all code and output together**, which would be perfect for notes. Do you want me to do that?

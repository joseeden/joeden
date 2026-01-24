---
title: "Dates and Times"
description: "Dates and Times in Python"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 25
last_update:
  date: 11/7/2019
---

## Overview

Python has a special **date class** for working with dates. It makes it easy to create dates, access parts of a date, and perform calculations like finding the number of days between two dates or determining the day of the week.

Each date has attributes like:

- `year`
- `month`
- `day`

To create a date, import the `date` class from the `datetime` module. The order of inputs is **year, month, day**, from largest to smallest.

In this example, we create two date objects representing hurricanes in Florida.

- `hurricane1` represents October 7, 2016
- `hurricane2` represents June 21, 2017

```python
from datetime import date

hurricane1 = date(2016, 10, 7)
hurricane2 = date(2017, 6, 21)
```


## Attributes of a Date

Each date has attributes to access its components directly.

```python
print(hurricane1.year)   # Output: 2016
print(hurricane1.month)  # Output: 10
print(hurricane1.day)    # Output: 7
```

The `weekday()` method returns the day of the week as a number, where Monday is `0` and Sunday is `6`.

- `0` is Monday
- `1` is Tuesday
- `2` is Wednesday
- `3` is Thursday
- `4` is Friday
- `5` is Saturday
- `6` is Sunday

In this example, `4` means Friday:

```python
print(hurricane1.weekday())  # Output: 4
```

Python handles the counting, so you don’t have to memorize which day corresponds to each date.



## Comparing Dates

Dates can be put into a list and compared just like numbers. Python can tell which date is the earliest using `min()`.

```python
from datetime import date

d1 = date(2017, 11, 5)
d2 = date(2017, 12, 4)

dates = [d1, d2]
print(min(dates)) 
```

Output:

```bash
2017-11-05
```

Here, the `min(dates)` returns the earliest date.



## Subtracting Dates

Subtracting two dates gives a `timedelta` object, which represents the time between them. You can then access the number of days.

```python
from datetime import date

d1 = date(2017, 11, 5)
d2 = date(2017, 12, 4)

delta = d2 - d1
print(delta.days)  # Output: 29
```

The `delta` is a `timedelta` object, and calling `.days` on it gives the number of days between the dates

This works like subtracting numbers but accounts for months and years automatically.


## Adding or Subtracting Days

The `timedelta` class can also be used to move forward or backward by a number of days.

```python
from datetime import date, timedelta

d1 = date(2017, 11, 5)
d2 = date(2017, 12, 4)

td = timedelta(days=29)
new_date = d1 + td
print(new_date)  # Output: 2017-12-04
```

Adding a `timedelta` moves the date forward while subtracting a `timedelta` moves the date backward

Python handles month lengths automatically, so you don’t have to remember which months have 30, 31, or 28 days.


## Incrementing Variables with `+=`

The `+=` operator is a shorthand for increasing a variable by a value.

In this example, the `x += 1` is the same as `x = x + 1`:

```python
x = 0
x = x + 1
print(x)  # Output: 1

x = 0
x += 1
print(x)  # Output: 1
```

This operator keeps code simple and is used often when working with dates or loops.


## ISO 8601 format

Python prints dates in **ISO 8601 format** by default: `YYYY-MM-DD`. This is a standard format that always uses two digits for month and day.

Consider the example below:

```python
from datetime import date

d = date(2017, 11, 5)
print(d)             # Output: 2017-11-05
```

To convert a date to an ISO 8601 string, we can use `isoformat()`:

```python
print([d.isoformat()])  # Output: ['2017-11-05']
```

ISO 8601 is useful for filenames or files like CSV because the dates stay in chronological order when sorted.

```python
some_dates = ['2000-01-01', '1999-12-31']
print(sorted(some_dates))  # Output: ['1999-12-31', '2000-01-01']
```

## Custom Date Formats with `strftime()`

We can use the `strftime()` method to convert dates into custom string formats using special format codes.

- `%Y` gives the year
- `%m` gives the month
- `%d` gives the day

Example: 

```python
d = date(2017, 1, 5)

print(d.strftime("%Y"))           # Output: 2017
print(d.strftime("Year is %Y"))   # Output: Year is 2017
print(d.strftime("%d/%m/%Y"))     # Output: 05/01/2017
print(d.strftime("%B (%Y)"))      # Output: January (2017)
print(d.strftime("%Y-%j"))        # Output: 2017-005
```

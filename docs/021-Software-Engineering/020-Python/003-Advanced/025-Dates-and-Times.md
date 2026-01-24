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

## Working with Dates and Times

Python can track both the **date** and **time** together. This allows you to record exact moments, not just days.

- Python uses 24-hour time, e.g. 3 PM is `15`
- You can change parts of an existing datetime

The `datetime` class from the `datetime` module lets you represent a specific date and time. Arguments are passed as numbers: 

```
year, month, day, hour, minute, second, and optional microseconds.
```

Consider the example below:

```python
from datetime import datetime

dt = datetime(2017, 10, 1, 15, 23, 25)                # October 1, 2017 at 3:23:25 PM
dt_micro = datetime(2017, 10, 1, 15, 23, 25, 500000)  # adds 0.5 seconds
```

Notes: 

- `dt` represents a full datetime
- `dt_micro` adds microsecond precision
- All values must be integers

Using microseconds allows for precise timing, which is useful in science, finance, or event tracking.


## Replacing Parts of a Datetime

You can create a new datetime from an existing one using the `replace()` method. This is helpful for rounding or adjusting parts of a datetime without changing the others.

```python
dt = datetime(2017, 10, 1, 15, 23, 25)   

dt_start_hour = dt.replace(minute=0, second=0, microsecond=0)
print(dt_start_hour)  
```

Output:

```bash
Output: 2017-10-01 15:00:00
```

## Parsing Datetimes

Python can convert datetimes to strings for display or storage, and it can also turn strings back into datetimes. This is useful when working with files, APIs, or datasets.

- `strftime()` formats a datetime as a string
- `isoformat()` gives a standard ISO 8601 string
- `strptime()` parses a string into a datetime
- `fromtimestamp()` converts a Unix timestamp into a datetime

Consider the example below: 

1. Formatting a datetime as a string: 

    ```python
    from datetime import datetime

    dt = datetime(2017, 12, 30, 15, 19, 13)

    print(dt.strftime("%Y-%m-%d"))              # Output: 2017-12-30
    print(dt.strftime("%Y-%m-%d %H:%M:%S"))     # Output: 2017-12-30 15:19:13
    print(dt.strftime("%Y-%m-%d %I:%M:%S %p"))  # Output: 2017-12-30 03:19:13 PM
    ```

    Notes: 

    - `%Y` is year, `%m` is month, `%d` is day
    - `%H` is hour (24-hour), `%M` is minute, `%S` is second
    - `%I` is hour (12-hour), `%p` prints AM or PM

2. For a standard format, use `isoformat()`.

    ```python
    print(dt.isoformat())  # Output: 2017-12-30T15:19:13
    ```

3. To turn a string into a datetime using `strptime()`, you must provide the exact format the string uses.

    ```python
    dt_str = "12/30/2017 15:19:13"
    dt_parsed = datetime.strptime(dt_str, "%m/%d/%Y %H:%M:%S")

    print(type(dt_parsed))  # Output: <class 'datetime.datetime'>
    print(dt_parsed)        # Output: 2017-12-30 15:19:13
    ```

    Notes:

    - First argument is the string to parse
    - Second argument is the format string using the same codes as `strftime()`
    - The string must exactly match the format

4. Convert Unix timestamps to datetimes using  `fromtimestamp()`:


    ```python
    timestamp = 1514631553  # corresponds to 2017-12-30 15:19:13
    dt_from_ts = datetime.fromtimestamp(timestamp)

    print(dt_from_ts)  # Output: 2017-12-30 15:19:13
    ```

    This timestamp is useful for timestamps from servers or logs. Python interprets the number and returns a full datetime

    :::info 

    Unix timestamps count seconds since January 1, 1970.

    :::




## Working with Durations

Python can calculate the time between datetimes and adjust them by adding or subtracting intervals. This is useful for measuring how long events last or shifting times.

When you subtract two datetimes, Python returns a `timedelta` object showing the duration between them.

```python
from datetime import datetime

start = datetime(2017, 12, 30, 15, 19, 13)
end = datetime(2017, 12, 30, 15, 43, 23)

duration = end - start
print(duration)                   # Output: 0:24:10
print(duration.total_seconds())   # Output: 1450.0
```

Notes: 

- `duration` is a timedelta representing 24 minutes and 10 seconds
- `total_seconds()` converts it to 1450 seconds

You can create a `timedelta` manually to represent a specific duration. Inside the `timedelta` function, you need to specify weeks, days, hours, minutes, seconds, or microseconds:

In this example, we added a timedelta to shift the datetime forward by that duration:

```python
from datetime import timedelta

delta1 = timedelta(seconds=1)
new_time = start + delta1
print(new_time)               # Output: 2017-12-30 15:19:14
```

## Longer and Negative Timedeltas

Timedeltas can also represent multiple days, weeks, or even negative durations.

```python
delta2 = timedelta(days=1, seconds=1)
print(start + delta2)  # Output: 2017-12-31 15:19:14

delta3 = timedelta(weeks=-1)
print(start + delta3)  # Output: 2017-12-23 15:19:13

delta4 = timedelta(weeks=1)
print(start - delta4)  # Output: 2017-12-23 15:19:13
```

Notes: 

- Positive timedeltas move time forward
- Negative timedeltas or subtracting a positive timedelta moves time backward

---
title: "Datetimes"
description: "Datetimes"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 75
last_update:
  date: 8/24/2023
---

## The `Date` class 

Ruby’s `Date` class is used to represent a specific day without any time information. You can create a date by providing the year, month, and day, and access parts of the date or check weekdays.

Before anything else, make sure to import the date library first:

```ruby
require 'date'
```

To create a date with just the year:

```ruby
date_1 = Date.new(1991)
puts date_1  
```

Output:

```bash
1991-01-01
```

Note that this defaults to **January 1st** since month and day are not provided. 

You can also add month and day later to specify a complete date.

```ruby
my_bday = Date.new(1991, 8, 12)
puts my_bday  # Output: 1991-04-12
```

You can get parts of a date using the `year`, `month`, or `day` methods.

```ruby
puts my_bday.year   # Output: 1991
puts my_bday.month  # Output: 8
puts my_bday.day    # Output: 12
```

Finally, you can check the weekday using predicate methods like `monday?`, `tuesday?`,and so on.

```ruby
puts my_bday.monday?  # Output: true
```

## The `Time` class 

Unlike `Date`, the `Time` class represents the specific date and time, including year, month, day, hour, minute, second, and time zone. The older `DateTime` class exists but is mostly deprecated.

To get the current time:

```ruby
now = Time.new
puts now
```

Output:

```bash
2022-08-13 00:48:27 +0800
```

Using `Time.now` gives the same result:

```ruby
now = Time.now
puts now    # Output: 2022-08-13 00:48:27 +0800
```

To specify a custom date and time:

```ruby
time_1 = Time.new(2022)               
time_2 = Time.new(2022, 9, 6)         
time_3 = Time.new(2022, 9, 12, 18)   
time_4 = Time.new(2022, 9, 12, 18, 43, 51)  

puts time_1   # Output: 2022-01-01 00:00:00 +0800
puts time_2   # Output: 2022-09-06 00:00:00 +0800
puts time_3   # Output: 2022-09-12 18:00:00 +0800
puts time_4   # Output: 2022-09-12 18:43:51 +0800
```

To access part of the time object, you can use the following methods:

- `year`, `month`, `day` return the date
- `hour`, `min`, `sec` return the time

Example: 

```ruby
random_time = Time.new(2022, 9, 12, 18, 43, 51)

puts random_time.year   # Output: 2022
puts random_time.month  # Output: 9
puts random_time.day    # Output: 12
puts random_time.hour   # Output: 18
puts random_time.min    # Output: 43
puts random_time.sec    # Output: 51
```

Other useful methods:

- `mday` returns the day of the month
- `yday` returns the day of the year
- `wday` returns the weekday number (0 = Sunday, 1 = Monday, …)
- predicate methods like `monday?`, `friday?` return true if it matches

Example: 

```ruby
puts random_time.mday    # Output: 12
puts random_time.yday    # Output: 255
puts random_time.wday    # Output: 1
puts random_time.friday? # Output: false
```

## Adding and Subtracting Time 

You can move a time object forward or backward using addition and subtraction. Ruby works with **seconds**, so any hour, minute, or day must be converted to seconds first.

- Add or subtract seconds with `+` or `-`
- Multiply seconds to represent minutes, hours, or days

**Note:** The original time object is not changed; each operation returns a new time object.

Examples:

1. Start with a time at the beginning of 2023:

    ```ruby
    start_of_year = Time.new(2023, 1, 1)
    puts start_of_year
    # Output: 2023-01-01 00:00:00 +0800
    ```

2. Add 60 seconds (1 minute):

    ```ruby
    one_minute_later = start_of_year + 60
    puts one_minute_later
    # Output: 2023-01-01 00:01:00 +0800
    ```

3. Add 1 hour (60 * 60 seconds):

    ```ruby
    one_hour_later = start_of_year + 3600
    puts one_hour_later
    # Output: 2023-01-01 01:00:00 +0800
    ```

4. Add 1 day (3600 * 24 seconds):

    ```ruby
    one_day_later = start_of_year + 3600 * 24
    puts one_day_later
    # Output: 2023-01-02 00:00:00 +0800
    ```

5. Add multiple days (e.g., 45 days):

    ```ruby
    forty_five_days_later = start_of_year + 3600 * 24 * 45
    puts forty_five_days_later
    # Output: 2023-02-15 00:00:00 +0800
    ```

6. Subtract time works the same way:

    ```ruby
    forty_five_days_earlier = start_of_year - 3600 * 24 * 45
    puts forty_five_days_earlier
    # Output: 2022-11-17 00:00:00 +0800
    ```

## Comparing Time Objects

Time objects can be compared using operators like `<`, `>`, `==`, and `!=` because Ruby mixes in the `Comparable` module. This lets you check order, equality, or ranges of times easily.

For more information, please see [Mixins: Comparable Module.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/071-Mixins.md#mixins-comparable-module)


To start with, create some time objects:

```ruby
birthday = Time.new(2023, 4, 12)
summer_start = Time.new(2023, 6, 21)
independence_day = Time.new(2023, 7, 4)
winter_start = Time.new(2023, 12, 21)
```

These time objects can be used to compare times:

1. Check order:

    ```ruby
    puts birthday < summer_start
    # Output: true

    puts winter_start > summer_start
    # Output: true
    ```

2. Check equality and inequality:

    ```ruby
    same_birthday = Time.new(2023, 4, 12)
    puts birthday == same_birthday
    # Output: true

    puts birthday != independence_day
    # Output: true
    ```

3. Check if a time falls between two others:

    ```ruby
    puts independence_day.between?(summer_start, winter_start)
    # Output: true
    ```


## Convert Time Object to String

Time objects can be turned into strings for display or storage. You can use the simple `to_s` method for a quick conversion or `strftime` for custom formatting.

The `to_s` method converts a time object to a default string showing full date, time, and time zone.

```ruby
some_day = Time.new(2023, 3, 31)
puts some_day.to_s
# Output: 2023-03-31 00:00:00 +0000
```

`strftime` allows precise control of the output. You provide a format string using special symbols:

```ruby
puts some_day.strftime("%Y-%m-%d")
# Output: 2023-03-31

puts some_day.strftime("%B %d, %Y")
# Output: March 31, 2023

puts some_day.strftime("%m/%d/%Y")
# Output: 03/31/2023
```

Common symbols with explanations:

- `%Y` full year, e.g., 2025
- `%y` two-digit year, e.g., 25
- `%m` month number with leading zero, e.g., 03
- `%B` full month name, e.g., March
- `%d` day of the month with leading zero, e.g., 31

These symbols can be combined with dashes, slashes, spaces, or commas to create any desired date format.


## Convert String to Time Object

When the date and time are stored as strings, like in a CSV or text file, Ruby cannot work with them directly, so we convert it into a time object first.

- Use `Time.parse` to let Ruby guess the string format
- Use `Time.strptime` to explicitly define the string format

**Note:** You need to add `require "time"` to use these parsing methods because Ruby separates core time methods (like `Time.new`) from extra methods for parsing strings. This helps programs load faster and only include extra functionality when needed.

### Using `Time.parse`

`Time.parse` is simple. It tries to guess the date from the string format.

```ruby
require "time"

time_1 = Time.parse("2023-04-03")
puts time_1
# Output: 2023-04-03 00:00:00 +0000

time_2 = Time.parse("03/04/2023")
puts time_2
# Output: 2023-04-03 00:00:00 +0000
```

It works for many formats, but the guess may be wrong if the string is ambiguous.


### Using `Time.strptime`

`Time.strptime` lets you explicitly tell Ruby how to interpret the string using format symbols:

```ruby
require "time"

time_str = "03-04-2023"
time_obj = Time.strptime(time_str, "%m-%d-%Y")
puts time_obj
# Output: 2023-03-04 00:00:00 +0000

time_obj2 = Time.strptime(time_str, "%d-%m-%Y")
puts time_obj2
# Output: 2023-04-03 00:00:00 +0000
```

Common format symbols:

- `%Y` full year, `%y` two-digit year
- `%m` month number, `%B` full month name
- `%d` day of the month

`Time.strptime` is safer than `Time.parse` because it removes ambiguity and ensures the string is interpreted correctly. Once converted, you can use all time methods like `year`, `month`, `day`, add or subtract time, or convert it back to a string for output or storage.

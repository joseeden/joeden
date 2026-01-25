---
title: "Sets"
description: "Sets"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 38
last_update:
  date: 8/24/2023
---



## Overview

A **set** is an unordered collection that guarantees all values are unique. It is useful when you want to avoid duplicates.

In older Ruby versions, you need to add this at the top to use it.

```bash
require 'set'
```

To create a set from an array:

```ruby
seasons = Set.new(["fall", "winter", "spring", "summer"])
puts seasons
```

Output:

```text
#<Set: {"fall", "winter", "spring", "summer"}>
```

As mentioned, sets are used to avoid duplicates. If we try to add duplicate values, they will be ignored:

```ruby
seasons.add("winter")
seasons.add("fall")

puts seasons
```

Output:

```text
#<Set: {"fall", "winter", "spring", "summer"}>
```

Note that sets are **case-sensitive**, which means values like "Fall" and "fall" are considered different and can both exist in the same set.

```ruby
seasons.add("Fall")
puts seasons
```

Output:

```text
#<Set: {"fall", "winter", "spring", "summer", "Fall"}>
```

## Common Set Methods

Sets provide a few familiar methods that help you inspect and work with unique values.

- `length` returns how many unique elements are in the set
- `include?` checks whether a value exists in the set
- `each` iterates over every element in the set

These methods behave similarly to arrays and hashes, except they always respect the set’s uniqueness rules.

Examples:

1. Iterating over a set:

    ```ruby
    seasons = Set.new(["fall", "winter", "spring", "summer"])

    seasons.each do |season|
      puts season
    end
    ```

    Output (order is not guaranteed):

    ```text
    fall
    winter
    spring
    summer
    ```

2. Using `length`:

    ```ruby
    seasons = Set.new(["fall", "winter", "spring", "summer"])

    puts seasons.length
    ```

    Output:

    ```text
    4 
    ```


3. Using `include?`:

    ```ruby
    seasons = Set.new(["fall", "winter", "spring", "summer"])

    puts seasons.include?("winter")
    puts seasons.include?("Winter")
    ```

    Output:

    ```text
    true
    false
    ```




## Adding Elements

You can add new elements using the `add` method. 

```ruby
books = Set.new(["1984", "Animal Farm"])

books.add("Brave New World")
p books
```

Output:

```text
#<Set: {"1984", "Animal Farm", "Brave New World"}>
```

The new value is added because it did not already exist in the set. The `add` method also returns the set itself, which shows the updated state immediately.

If you try to add the same value again, nothing changes.

```ruby
books.add("Brave New World")
p books
```

Output:

```text
#<Set: {"1984", "Animal Farm", "Brave New World"}>
```

Duplicate values are ignored because a set always enforce uniqueness.


## Removing elements

You can remove values using the `delete` method.

```ruby
books = Set.new(["1984", "Animal Farm", "Brave New World"])

books.delete("Animal Farm")
p books
```

Output:

```text
#<Set: {"1984", "Brave New World"}>
```

The value is removed if it exists, and the updated set is returned.

If you try to delete a value that is not in the set, Ruby does nothing and does not raise an error.

```ruby
books.delete("Unknown Book")
p books
```

Output:

```text
#<Set: {"1984", "Brave New World"}>
```

## Example: Generate unique phone numbers from a file

> The files can be found here: [Github](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/017-Practice-17)

In this example, we have a text file of customers who visited a shop. Each line contains a name and a phone number. For example:

```bash
Alex Tan,91234567
Jamie Lim,98765432
Alex Tan,91234567
```

Some entries are repeated. The task is to extract and return only the unique phone numbers.

1. Read the file line by line
2. Remove the newline character
3. Split the line by the comma
4. Add the phone number to a set

Solution:

```bash
def gen_uniq_phone_nums
  phone_nums = Set.new 

  File.open('customers.txt').each do |customer|
    newline = customer.chomp 
    elems = newline.split(',')
    nums = elems[1]
    phone_nums.add(nums)
  end

  phone_nums
end

report_page = gen_uniq_phone_nums

puts report_page
puts report_page.length
```

Running the script:

```bash
ruby main.rb  
```

Output:

```text
#<Set: {"91234567", "98765432", "90112233", "93445566", "95667788", "92334455", "98887766", "94556677", "97778899", "91112222", "92223333", "93334444", "94445555", "95556666", "96667777", "98889900", "90001111", "98990011", "97881234", "96782345", "95683456", "94584567", "93485678", "92386789", "91287890", "90188901"}>
```

To check the number of unique phone numbers:

```ruby 
puts report_page.length
```

Output:

```text
26
```


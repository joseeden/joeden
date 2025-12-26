---
title: "Arrays"
description: "Arrays"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 25
last_update:
  date: 8/24/2023
---


## Overview

Arrays are useful  for storing multiple items in a specific order. You can use it to keep things organized and access them by their position.

- Arrays store items in sequence
- Arrays are objects and have methods you can use

Arrays are mutable, so you can add, remove, or change items later. Ruby preserves the order of items, and the length shows how many items are inside.

```ruby
numbers = []       # empty array
p numbers          

numbers = [4, 8, 15, 16, 23, 42]
p numbers          
p numbers.length   
```

Output:

```bash
[]
[]

[4, 8, 15, 16, 23, 42]
6
```

You can mix types, but usually arrays hold similar items. 

For example, a shopping list:

```ruby
shopping_list = ["teddy bear", "water gun", "board game"]
p shopping_list     
```

Output:

```bash
["teddy bear", "water gun", "board game"]
```

Arrays can also hold booleans or duplicates:

```ruby
attendees = [true, true, false, true, false]
p attendees         
```

Output:

```bash
[true, true, false, true, false]
```

## Nested Arrays 

Arrays can also contain other arrays. This is useful for modeling structured data like tables.

- Each inner array can represent one row
- The outer array keeps all rows in order

A common use case is representing a table, similar to a spreadsheet. Each row is an array, and all rows are stored inside one main array. 

```ruby
spreadsheet = [
  ["student", "class", "grade"],
  ["Alex", "computer science", 95],
  ["Jamie", "physics", 45]
]

p spreadsheet
```

Output:

```text
[["student", "class", "grade"], ["Alex", "computer science", 95], ["Jamie", "physics", 45]]
```

You can also assign each row to its own variable using parallel assignment.

```ruby
## arrays.rb
header_row, first_row, second_row = spreadsheet

p header_row
p first_row
p second_row
```

Run the file:

```bash
ruby arrays.rb  
```

Ruby processes the array one element at a time. Since each element is a nested array, the first nested array is assigned to `header_row`, the second to `first_row`, and the last to `second_row`.

Output:

```text
["student", "class", "grade"]
["Alex", "computer science", 95]
["Jamie", "physics", 45]
```

## Creating Arrays

Arrays can be created directly, from ranges, or from words. 

- Use brackets for explicit values
- Use `%w` for arrays of strings
- Use `to_a` for ranges only

There are different tools depending on where the data comes from, but the goal is always to produce an ordered list of elements.

### Explicit Arrays of Strings

The standard way is to list each string with quotes and commas.

```ruby
names = ["Alex", "Jamie", "Morgan", "Taylor", "Riley"]
p names
```

Output:

```text
["Alex", "Jamie", "Morgan", "Taylor", "Riley"]
```


### `%w` Shorthand for Strings

When an array contains only strings, `%w` can be used to remove quotes and commas.

```ruby
names = %w[Alex Jamie Morgan Taylor Riley]
p names
```

Output:

```text
["Alex", "Jamie", "Morgan", "Taylor", "Riley"]
```

Each space-separated word becomes a string, which keeps array declarations short while preserving order.

### Converting Ranges to Arrays

Ranges can be converted into arrays using `to_a`.

```ruby
numbers = 1..10
p numbers.to_a
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

This works only for ranges and is useful when you need a full list of values.

### Strings cannot use `to_a`

Strings do not support `to_a` and will raise an error.

```ruby
text = "Time flies fast"
p text.to_a
```

Instead, `%w` can be used to turn words into an array.

```ruby
p %w(Time flies fast)
```

Output:

```ruby
["Time", "flies", "fast"]
```

## Accessing an Element

Arrays keep items in a fixed order, just like characters in a string. Ruby tracks this order using index positions that start at zero (`0`)

For more information, please see [Array Indexing.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/026-Array-Manipulation.md)

## Adding Elements at the End

You can add new elements to the end of an array using built-in tools. 

- `push` adds one or more elements
- `append` works the same way as push
- `<<` adds elements using operator syntax

**NOTE:** All these options update the original array directly.

For more information, please see [Array Methods.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/027-Array-Methods.md)

## Numbers Range  

If we want to create an array of numbers without typing each one, we can use a **range** and then convert it to an array with `to_a`. A range can be specified with a starting and ending number, like this:

```ruby
hundred = 1..100
p hundred.to_a
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ..., 100]
```

**Note:** `to_a` works to convert ranges into arrays, but it cannot be used to convert a string or sentence into an array.

To shuffle the array, we can use `shuffle`:

```ruby
hundred = 1..100
p hundred.to_a.shuffle
```

Output:

```ruby
[93, 83, 24, 40, 51, 37, 6, 39, 16, 86, 68, 45, ...]
```

We can also store the converted array in a variable:

```ruby
tens = (1..10).to_a
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```


## Letters Range 

We can also create a range of letters:

```ruby
my_letters = "a".."z"
p my_letters.to_a
```

Output:

```ruby
["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
"u", "v", "w", "x", "y", "z"]
```

Just like with numbers, we can shuffle the letters using `shuffle`:

```ruby
my_letters = "a".."z"
p my_letters.to_a.shuffle
```

Output:

```ruby
["h", "p", "m", "r", "v", "f", "s", "w", "l", 
"d", "q", "a", "n", "x", "z", "t", "i", "e", 
"c", "g", "k", "j", "o", "y", "b", "u"]
```



## Mutate using a Bang

Some methods return a modified version of an array without changing the original.

- Methods with `!` change the array permanently
- The bang affects the variable itself

Without a bang, the array stays the same:

```ruby
tens = (1..10).to_a
p tens
p tens.reverse
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

With a bang, the change is permanent:

```ruby
tens = (1..10).to_a
p tens
p tens.reverse!
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```




## Prepend 

We can add items to the beginning of an array using `unshift`, 

**NOTE:** The array is mutated immediately.

Example:

```ruby
tens = (1..10).to_a
p tens

tens.unshift("Hello")
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
["Hello", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Prepending shifts all existing elements to the right and changes the array.


## `pop` 

We can remove items from the end of an array using `pop`.

**NOTE:** The array is always mutated.

Example:

```ruby
items = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p items.pop
```

Output:

```ruby
"kiwis"
```

Multiple pops show the changes are actually being saved on the variable:

```ruby
items = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p items

p items.pop
p items.pop
p items.pop

p items
```

Output:

```ruby
["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

"kiwis"
38
"pears"

["apples", 23, 18, "oranges"]
```

Unlike some methods, `pop` always mutates the array without needing a bang.



## Iterators 

Arrays can be looped through using different approaches.

- `for` loops are supported
- `each` is the Ruby-preferred way
- Blocks can be multi-line or one-line

All methods iterate through the array, but `each` follows Ruby conventions.

- Using a `for` loop:

    ```ruby
    items = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

    for item in items
      p item
    end
    ```

    Output:

    ```ruby
    "apples"
    23
    18
    "oranges"
    "pears"
    38
    "kiwis"
    ```

- Using `each` with a block:

    ```ruby
    items.each do |item|
      p item
    end
    ```

    Output:

    ```ruby
    "apples"
    23
    18
    "oranges"
    "pears"
    38
    "kiwis"
    ```

- Using `each` in a single line:

    ```ruby
    items.each { |item| p item }
    ```

    Output:

    ```ruby
    "apples"
    23
    18
    "oranges"
    "pears"
    38
    "kiwis"
    ```


## `select` Operator 

We can filter values from an array based on a condition.

- `select` checks each item
- Only matching items are returned
- The original array is not changed

Examples: 

- Selecting odd numbers:

    ```ruby
    nums = (1..10).to_a
    p nums
    p nums.select { |n| n.odd? }
    ```

    Output:

    ```ruby
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    [1, 3, 5, 7, 9]
    ```

- Selecting even numbers:

    ```ruby
    p nums.select { |n| n.even? }
    ```

    Output:

    ```ruby
    [2, 4, 6, 8, 10]
    ```

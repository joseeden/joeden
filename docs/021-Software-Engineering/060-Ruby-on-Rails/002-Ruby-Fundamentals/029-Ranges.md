---
title: "Ranges"
description: "Ranges"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 29
last_update:
  date: 8/24/2023
---


## Number Ranges

A range is a sequence of numbers or letters in order. It represents a span of values from a starting point to an ending point.

- Two dots (`..`) create an *inclusive* range, includes the last value
- Three dots (`...`) create an *exclusive* range, excludes last value
- Ranges can be used like arrays to get first, last, or slices of elements

Example:

```ruby
inclusive_nums = 1..5
exclusive_nums = 1...5
```

Where: 

- `inclusive_nums` includes 1, 2, 3, 4, 5
- `exclusive_nums` includes 1, 2, 3, 4

To get first or last elements:

```ruby
p inclusive_nums.first      
p inclusive_nums.last       

p exclusive_nums.first      
p exclusive_nums.last       
```

Output:

```bash
1
5

1
5
```

Note that the exclusive dots (`...`) only affect enumeration, not the stored upper bound.

- `1..5` means **go up to and include** 5
- `1...5` means **go up to but do not include** 5
- In both cases, the upper bound is still 5

The `.last` returns the **end boundary for both**, but they differ with the last iterated values.

To get multiple elements as an array:

```ruby
p inclusive_nums.first(3)  # Output: [1, 2, 3]
p exclusive_nums.first(3)  # Output: [1, 2, 3]

p inclusive_nums.last(3)   # Output: [3, 4, 5]
p exclusive_nums.last(3)   # Output: [2, 3, 4]
```

Where:

- First and last return a single value without an argument
- Providing a number returns an array of that many elements

When calling methods on a range in one line, use parentheses to avoid confusion:

```ruby
p (2...10).last(2)         # Output: [8, 9]
p (5..13).last(2)          # Output: [12, 13]
```

## Alphabetic Ranges

An alphabetic range is a sequence of letters from a starting character to an ending character. 

- Two dots (`..`) include the final letter
- Three dots (`...`) exclude the final letter
- Uppercase and lowercase letters are treated as different characters

Example of a lowercase alphabet range:

```ruby
alphabet = "a".."z"
```

To get values from the range:

```ruby
p alphabet.first
p alphabet.last
```

Output:

```ruby
"a"
"z"
```

To retrieve multiple values from a range, pass a number to `first` or `last`:

```ruby
p alphabet.first(3)
p alphabet.last(5)
```

When an argument is provided, the result is always returned as an array:

```ruby
["a", "b", "c"]
["v", "w", "x", "y", "z"]
```

Example with uppercase and lowercase:

```ruby
alphabet = "A".."z"
p alphabet.first(5)
```

Output:

```ruby
["A", "B", "C", "D", "E"]
```

Ruby orders uppercase letters before lowercase letters and includes other characters in between based on internal sorting rules. This means mixing cases in a single range can produce unexpected results.

Example of a partial alphabet range:

```ruby
letters = "g".."w"
p letters.to_a
```

Output:

```ruby
["g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w"]
```

:::info

The `to_a` method converts the range to an array.

:::
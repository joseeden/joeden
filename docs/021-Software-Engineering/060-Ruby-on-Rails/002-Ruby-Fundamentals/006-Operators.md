---
title: "Methods and Operators"
description: "Methods and Operators"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 6
last_update:
  date: 8/24/2023
---

## Basic Arithmetic

Ruby supports standard math operations.

- Addition uses `+`
- Subtraction uses `-`
- Multiplication uses `*`

Example:

```ruby
puts 5 + 3
puts 10 - 4
puts 6 - 7
```

Output:

```ruby
8
6
42
```

## Division

Ruby supports basic math operations for working with numbers.

- Division behaves differently for integers and floats
- Integer division removes decimals
- Floats keep decimal values

Example using integer division:

```ruby
puts 10 / 2
puts 10 / 4
```

Output:

```ruby
5
2
```

When both numbers are integers, Ruby drops the decimal part. To keep decimals, convert one value to a float:

```ruby
puts 10.0 / 4
puts 10 / 4.0
```

Output:

```ruby
2.5
2.5
```

You can also convert using `to_f`:

```ruby
puts 10 / 4.to_f
```

Output:

```ruby
2.5
```

Be careful with the order of operations:

```ruby
puts (10 / 4).to_f
```

Output:

```ruby
2.0
```

Here, division happens first, so the decimal is already lost. Understanding this helps avoid incorrect calculations.


## Modulus

The modulus operator returns the remainder after division.

```ruby
puts 10 % 3
```

Output:

```ruby
1
```

Modulus is useful when you need to know what is left after division, such as checking even or odd numbers.

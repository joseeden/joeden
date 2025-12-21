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

## Comparison Operators 

Comparison operators are used to compare values and return `true` or `false`.

Example with numbers:

```ruby
puts 10 == 10
puts 10 == 5
puts 10 != 5
```

Output:

```ruby
true
false
true
```

Ruby also allows string comparisons:

```ruby
puts "hello" == "hello"
puts "hello" == "helo"
puts "hello" == "bye"
puts "hello" != "bye"
```

Output:

```ruby
true
false
false
true
```

Comparing an empty string with a space returns false because they are different values:

```ruby
puts "" == " "
```

Output:

```ruby
false
```

Other examples of comparison operators:

```ruby
puts 10 > 9

puts 23 < 23
puts 23 < 40

puts 101 >= 99
puts 101 >= 101

puts 98 <= 100
puts 98 <= 98
```

Output:

```ruby
true

false
true

true
true

true
true
```


## Comparing Types 

Some comparisons also check the type of a value.

- Values can look similar but differ in type
- Type sensitive comparisons are stricter

Example:

```ruby
puts 10.eql?(10.0)
```

This returns false because `10` is an integer and `10.0` is a float.

```ruby
false
```


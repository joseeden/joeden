---
title: "Operators"
description: "Operators"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 5
last_update:
  date: 8/24/2023
---



## Arithmetic

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

Division behaves differently for integers and floats:

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


## Booleans 

Booleans represent truth values. They can only be `true` or `false`, and are used to express whether something is valid, correct, or meets a condition.

```bash
puts true         # Output: true
puts false        # Output: false

handsome = true
stupid = false
puts handsome     # Output: true
puts stupid       # Output: false
```


## Comparison Operators 

Comparison operators are used to compare values and return `true` or `false`.

- Equality operator `==` checks if two values are equal
- Inequality operator `!=` checks if two values are not equal.

Example:

```ruby
puts 10 == 10               # Output: true
puts 10 == 5                # Output: false
puts "hello" == "hello"     # Output: true
puts "hello" == "Hello"     # Output: false
puts "5".to_i == 5          # Output: true

puts 10 != 5                # Output: true
puts 10 != 10               # Output: false
puts "hello" != "goodbye"   # Output: true
puts "Hello" != "hello"     # Output: true
puts 5 != "5"               # Output: true
```

**Note:** Ruby evaluates equality logically, not by class. An integer 5 and a float 5.0 are considered equal, but a string "5" is not equal to the number 5 without conversion.

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

## Mathematical Comparisons

Mathematical comparison operators let you compare numbers and get a Boolean result (`true` or `false`). 

| Operator                     | Meaning                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| Less than (`<`)              | Checks if the left number is smaller than the right             |
| Greater than (`>`)           | Checks if the left number is larger than the right              |
| Less than or equal (`<=`)    | Checks if the left number is smaller than or equal to the right |
| Greater than or equal (`>=`) | Checks if the left number is larger than or equal to the right  |

Example: 

```ruby
puts 1 < 9       # true
puts 10 < 5      # false
puts 1 <= 5      # true
puts 5 <= 5      # true
puts 8 <= 5      # false

puts 10 > 5      # true
puts -1 > -5     # true
puts 12 > 20     # false
puts 8 >= 5      # true
puts 5 >= 5      # true
puts 3 >= 5      # false
```




---
title: "Variables"
description: "Variables"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 2
last_update:
  date: 8/24/2023
---

## Running the Script

All examples in this page are written in a `main.rb` file and executed from the terminal.

To run the file:

```ruby
ruby /path/to/your/main.rb
```


## Assigning Variables

Variables store values that you can reuse in your program.

- Assign a value using `=`
- Use `puts` to display the variable

Example:

```ruby
greeting = "Hey there!"
puts greeting
```

Output:

```ruby
Hey there!
```

Variables can be given new values at any time.

- Variables hold references to values
- Assigning a new value does not affect other variables
- Each variable updates independently

Example:

```ruby
first_name = "Adam"
new_first_name = "James"
puts new_first_name
```

Output:

```ruby
James
```

Reassigning the original variable does not change the other one:

```ruby
first_name = "Adam"
new_first_name = "James"
puts new_first_name

first_name = "Chris"
puts new_first_name
```

Output:

```ruby
James
James
```

This shows that variables store values, not links to other variables.

## Parallel Assignment

Parallel variable assignment is a shortcut to assign multiple variables in one line.

You declare all variables on the left, separate them with commas, and assign matching values on the right. Ruby assigns each value to the corresponding variable in order.

```ruby
a, b, c = 10, 20, 30
puts a, b, c
```

Output:

```
10
20
30
```

A few notes:

- This approach is handy when variables are related
- Example: coordinates or configuration values.
- For unrelated variables, separate assignments can be clearer.
- 

## Swapping Variable Values

Sometimes we want to flip the values of two variables without using a third variable.

- Use parallel assignment to swap values
- Place variables on the left, values on the right

Example: 

```ruby
a = 1
b = 2
puts a, b

a, b = b, a
puts a, b
```

Output:

```
1
2

2
1
```

Ruby evaluates the right-hand side first, so `a` gets the value of `b` and `b` gets the value of `a`. This allows you to swap two variables in one simple line without needing extra storage.

## Shorthand Assignment 

Ruby provides shortcuts to perform operations on a variable and assign the result back to it. These are called **shorthand assignments**.

- Plus equals `+=` adds a value and reassigns it
- Minus equals `-=` subtracts a value and reassigns it
- Multiplication equals `*=` multiplies and reassigns
- Works with strings for concatenation

Example: 

```ruby
a = 10
a += 5
puts a
# Output: 15

b = 100
b -= 40
puts b
# Output: 60

c = 3
c *= 4
puts c
# Output: 12

name = "Boris"
name += " the Great"
puts name
# Output: Boris the Great
```

These shortcuts first perform the operation on the current value of the variable, then assign the result back to the same variable. They work for numbers, strings, and many common operations, which makes the  code shorter and easier to read. 

The main idea is to update a variable’s value without repeating the variable name.

## Constants 

Constants are like variables, but their values are meant to stay the same throughout a program. They give context to fixed values so your code is easier to read.

- Constants start with a capital letter
- Common convention is to use all uppercase letters
- They provide a name for a value that shouldn’t change

Example: 

```ruby
PI = 3.14159
puts PI
# Output: 3.14159

TAX_RATE = 0.077
puts TAX_RATE
# Output: 0.077

# Trying to change a constant
TAX_RATE = 0.13
puts TAX_RATE
# Output: 0.13
# Warning: already initialized constant TAX_RATE
```

Constants are technically changeable in Ruby, but the language will warn you. This helps enforce the principle that the value is not meant to change. 

- Use constants for fixed values like mathematical constants or tax rates
- Use variables for values that may change during program execution.

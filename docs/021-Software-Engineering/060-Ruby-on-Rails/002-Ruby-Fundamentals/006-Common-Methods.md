---
title: "Common Methods"
# description: "Methods"
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

## Converting Objects

Ruby allows you to convert objects between different types. This is useful when you want to perform operations on data that is in a different format.

- `to_i` converts a string or float to an integer
- `to_f` converts a string or integer to a float
- `to_s` converts an integer or float to a string

Example: 

```ruby
text = "5"
puts text.class         # Output: String

number = text.to_i
puts number.class       # Output: Integer

text2 = "15 apples"
puts text2.to_i         # Output: 15

number2 = 5
puts number2.to_f       # Output: 5.0

float_val = 0.9
puts float_val.to_s     # Output: "0.9"
```

Conversions create new objects without changing the original. For example, `to_i` on a string makes a new integer, but the string stays the same.

- Works if the string starts with numbers, even with extra text
- Returns 0 for `to_i` and 0.0 for `to_f` if no numeric content is found
- Safe to use on objects that are already that type

Example: 

```ruby
puts "apples 15".to_i   # Output: 0
puts 10.to_i            # Output: 10
puts 3.14.to_f          # Output: 3.14
puts "hello".to_s       # Output: "hello"
```

Ruby lets you call these conversion methods on any type safely. This is called **polymorphism**, meaning you can focus on what an object can do (its methods) rather than what class it is.

## `inspect` 

The `inspect` method converts an object into a string representation that is useful for debugging. It shows more technical details than the regular `puts` method.

- Converts an object to a detailed string
- Used internally by the `p` method

Example: 

```ruby
str = "Hello\nWorld"

puts str
p str
```

Output:

```bash
Hello
World
"Hello\nWorld"
```

In this example, `p str` is equivalent to `str.inspect`. It shows escape characters and quotes, which gives a more technical view of the object. The `inspect` method works on any Ruby object, not just strings.

:::info 

Using `p` is just a shortcut for calling `inspect` and displaying the result.

:::

## `class` 

Every value in Ruby has a type that describes what it is.

- Types describe the kind of data
- You can check types using `.class`
- Different values have different types

Example with a string variable:

```ruby
first_name = "Adam"
puts first_name.class
```

Output:

```ruby
String
```

More examples:

- Using a value

    ```ruby
    puts "Taylor".class
    ```

    Output:

    ```ruby
    String
    ```

- Using an integer

    ```ruby
    puts 10.class
    ```

    Output:

    ```ruby
    Integer
    ```

- Using a float 

    ```ruby
    puts 10.0.class
    ```

    Output:

    ```ruby
    Float
    ```




## `length` 

You can measure the size of a string using `length`. This counts all the characters, including spaces.

```ruby
first_name = "Maximilian"
last_name = "Jefferson"
full_name = first_name + " " + last_name
puts full_name
puts full_name.length
```

Output:

```ruby
Maximilian Jefferson
20
```

## `reverse` 

Strings can be reversed using a built in  `reverse` method.

```ruby
first_name = "Maximilian"
last_name = "Jefferson"
full_name = first_name + " " + last_name
puts full_name
puts full_name.reverse
```

Output:

```ruby
Maximilian Jefferson
nosreffeJ nailimixaM
```

This is useful when you need to manipulate or inspect text in different ways.

## `capitalize` 

The `capitalize` method formats text by adjusting letter case. It capitalizes the first letter but lowercases the rest.

```ruby
first_name = "maximilian"
last_name = "jefferson"
full_name = first_name + " " + last_name
puts full_name
puts full_name.capitalize
```

Output:

```ruby
maximilian jefferson
Maximilian jefferson
```



## `empty?` 

You can check whether a string contains any characters using `empty?`.

```ruby
first_name = "maximilian"
last_name = "jefferson"
full_name = first_name + " " + last_name
puts full_name.empty?
puts "".empty?
```

Output:

```ruby
false
true
```

An empty string is different from `nil`. You can check for `nil` like this:

```ruby
puts "".nil?
puts nil.nil?
```

Output:

```ruby
false
true
```


## `sub`

The `sub` method replaces the specified part of a string.

```ruby
banner = "Welcome to Jurassic Park"
puts banner.sub("Jurassic Park", "Zootopia")
```

Output:

```ruby
Welcome to Zootopia
```



## `times` 

The `times` method is useful for repeating actions a specific number of times.

```ruby
20.times { print "-" }
```

This prints the "-" ...

Output:

```ruby
--------------------
```

Another exampke is..

```ruby
10.times { puts "hello" } 
```

This prints.. on separate lines..

```ruby
hello
hello
hello
hello
hello
hello
hello
hello
hello
hello 
```

You can also print random numbers using `rand`..

```bash
14.times { puts rand(10) } 
```

This generates 10 randoms numbers in 14 times..

```bash
8
8
1
7
7
8
9
2
5
0
9
6
3
8
```

## `gets` 

The `gets` method lets you collect input from the user. You can save the input to a variable and use it in your program.

Example: 

```ruby
puts "Hi, what's your name?"
name = gets.chomp
# User types "Alice"

puts "Your name is #{name}."
```

Output:

```bash
Your name is Alice.
```

`gets` captures what the user types, including the enter key as a newline. Using `.chomp` removes that newline so the output is clean.

You can also collect multiple inputs and use string interpolation to display them:

```ruby
puts "Hi, what's your name?"
name = gets.chomp
# User types "Alice"

puts "What's your age?"
age = gets.chomp
# User types "25" 

puts "Your name is #{name} and you are #{age} years old."
```

Output:

```bash
Your name is Alice and you are 25 years old.
```

The value from `gets` is always a string. This works well for display, but for calculations you need to convert it to an integer first.



## `floor`

The `floor` method always rounds a float down to the nearest integer.

```ruby
puts 10.5.floor
# 10

puts 10.9.floor
# 10
```

No matter the decimal value, `floor` moves down and returns an integer, which keeps the rule simple.

## `ceil`

The `ceil` method does the opposite of `floor`. It always rounds up.

```ruby
puts 10.2.ceil
# 11

puts 10.8.ceil
# 11
```


## `round`

The `round` method can work in two ways, depending on how it is called.

- Without arguments, rounds to the nearest integer
- With an argument, rounds to a specific number of decimals
- Returns an integer or a float based on usage

Examples:

- Rounding to an Integer

    ```ruby
    puts 3.14.round
    # 3

    puts 3.86.round
    # 4
    ```

- Rounding with Precision

    With an argument, `round` returns a float rounded to the specified number of decimal places.

    ```ruby
    puts 3.1493.round(2)
    # 3.15

    puts 3.1493.round(3)
    # 3.149
    ```

    

## `abs`

The `abs` method returns the distance of a number from zero.

- Always returns a positive value
- Works on floats and integers

`abs` removes the sign and gives the positive value:

```ruby
puts 5.35.abs
# 5.35

puts (-5.35).abs
# 5.35

puts (-35).abs
# 35
```


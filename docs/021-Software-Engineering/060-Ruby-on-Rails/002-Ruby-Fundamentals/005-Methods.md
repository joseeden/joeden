---
title: "Methods"
# description: "Methods"
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

## Running the Script

All examples in this page are written in a `main.rb` file and executed from the terminal.

To run the file:

```ruby
ruby /path/to/your/main.rb
```

## Objects and Methods 

Ruby is an object-oriented language, which means everything is an object. Objects store data and provide ways to interact with that data using methods.

- Objects hold data and define behaviors
- Methods are commands we send to objects
- Methods can return a new object or value

Example: 

```ruby
text = "Hello World"
puts text.length
# Output: 11

puts text.upcase
# Output: HELLO WORLD

puts text.downcase
# Output: hello world
```

Objects like strings or numbers have built-in methods. The dot `.` is used to call a method on an object. 

- Value produced by a method is called the return value
- Return value can be the same (or different) type of object
- Parentheses are optional when calling methods

Variables can reference objects, and calling a method on a variable is really calling it on the object it holds.

```ruby
greeting = "Totally Different"
puts greeting.downcase
```

Output:

```bash
totally different
```

Some methods are exclusive to certain objects, like strings having `upcase` or `length`, while others may be shared across objects. 



## Integer Methods

Since integers are objects too, we can call methods on them the same way we do with strings. 

Example: 

```ruby
num = 10
puts num.next
# Output: 11

puts num.succ
# Output: 11

puts num.pred
# Output: 9

puts (-1).next
# Output: 0

puts (-1).pred
# Output: -2
```

Notes: 

- `next` and `succ` returns the number after the current integer. 
- `pred` returns the number before it. 

Calling a method on an integer produces a new integer object, just like calling a method on a string produces a new string object.

## Check Available Methods 

Ruby objects come with many built in methods.

- Each type has its own methods
- You can list methods using `.methods`
- The list depends on the object type

Example:

```ruby
first_name = "John"
puts first_name.methods
```

Because `first_name` is a string, Ruby shows all methods available for strings:

```ruby
encoding
each_grapheme_cluster
slice
valid_encoding?
ascii_only?
unicode_normalize!
force_encoding
b

(output truncated)
```

## Method Chaining 

Method chaining is a way to call multiple methods in a sequence on objects, one after another. Each method returns a new object that can use more methods.

```ruby
str = "hi there"
result = str.upcase.length

puts result
```

Here, `upcase` returns a new string `"HI THERE"`, and then `length` returns the integer `8`. 

```bash
8
```

You can continue chaining on integers:

```ruby
num = 10
result = num.next.next.pred

puts result
```

This starts with `10`, calls `next` twice to get `12`, then `pred` to return `11`. 

```bash
11 
```

Method chaining works because every returned value is an object with its own methods. 

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

## Custom Methods 

Custom methods let you define your own reusable actions in Ruby.

- Methods are defined using `def`
- Methods are called by name
- Methods can accept input values

Basic method syntax:

```bash
def say_hello
  puts "Nice to see you!"
end

say_hello
```

## Parameters 

Parameters allow methods to accept data and change behavior.

- Without parameters:

    ```ruby
    def say_hello
      puts "Nice to see you!"
    end

    say_hello
    ```

    Output:

    ```ruby
    Nice to see you!
    ```

- With parameters:

    ```ruby
    def say_hello(message)
      puts message
    end

    say_hello("How is your day?")
    ```

    Output:

    ```ruby
    How is your day?
    ```

- Multiple Parameters

    ```ruby
    first_num = 4
    second_num = 3

    def multiply(first_num, second_num)
      return first_num.to_f * second_num.to_f
    end

    puts "The product of #{first_num} and #{second_num} is #{multiply(first_num, second_num)}"
    ```

    Output:

    ```ruby
    The product of 4 and 3 is 12.0
    ```

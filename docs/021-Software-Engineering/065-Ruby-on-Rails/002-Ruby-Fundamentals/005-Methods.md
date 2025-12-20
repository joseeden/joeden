---
title: "Methods"
# description: "Methods"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby on Rails
sidebar_position: 5
last_update:
  date: 8/24/2023
---



## Methods 

Methods help organize code into reusable actions.

- Methods are defined using `def`
- Methods are called by name
- Methods can accept input values

The examples will be written in a `main.rb` file. To run the file:

```ruby
ruby /path/to/your/main.rb
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

## Available Methods 

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


## Convert to String

Ruby provides the `to_s` method to convert values between types.

```ruby
puts 10.class
puts 10.to_s
puts 10.to_s.class
```

Output:

```ruby
Integer
10
String
```

Calling one method after another is called **method chaining** and is commonly used in Ruby.

## Length 

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

## Reverse 

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

## Capitalize 

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



## Empty 


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


## Substitute

The `sub` method replaces the specified part of a string.

```ruby
banner = "Welcome to Jurassic Park"
puts banner.sub("Jurassic Park", "Zootopia")
```

Output:

```ruby
Welcome to Zootopia
```



## Times 

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
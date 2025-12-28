---
title: "Exceptions"
description: "Exceptions"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 81
last_update:
  date: 8/24/2023
---


## Overview

Errors help you identify problems and learn how to fix them. 

- Errors are called **exceptions** in Ruby
- They happen when Ruby can’t run a line of code
- Common causes include typos, wrong object types, or logical mistakes

## `TypeError` 

This exception occurs when an object is not the expected type

- Raised when operations receive incompatible data types
- Ruby shows the line number and type of error

Example: 

```ruby
puts "4" + 3
```

Ruby expected a string for concatenation but received a number, so it raised a type error.

```
TypeError: no implicit conversion of Integer into String
```

Errors can also occur if you reverse values:

```ruby
# puts "4" + 3
puts 3 + "4"
```

Output:

```
TypeError: String can't be coerced into Integer
```

Ruby reads left to right, expects addition with a number, but sees a string, and raises a type error.


## `NameError` 

A **name error** exception happens when Ruby cannot find a name you reference in your program. This usually occurs with variables or methods that don’t exist or are misspelled.

Example:

```ruby
puts favorite_food
```

Ruby cannot find `favorite_food` because it was never defined.

```
NameError: undefined local variable or method `favorite_food' 
```


## `NoMethodError` 

A `NoMethodError` happens when you try to call a method that an object does not have. This can occur due to typos or using a method on the wrong type of object.

Example: 

```ruby
str = "Hello"
puts str.lenght
```

Output:

```ruby
undefined method 'lenght' for an instance of String (NoMethodError)
Did you mean?  length
```

The same error also occurs if the method does not exist for that object type. For example, using `length` with an integer:

```ruby
num = 5
puts num.length
```

Output:

```ruby
undefined method 'length' for an instance of Integer (NoMethodError)
```



## `ArgumentError`

This exception occurs when... 

Consider the method below: 

```ruby
def dinosaur_name(name)
  puts "#{name} is powerful"
  puts "#{name} is legendary"
  puts "#{name} rules the park"
end
```

If you call the method without passing an argument: 

```ruby
dinosaur_name
```

This returns:

```
'dinosaur_name': wrong number of arguments (given 0, expected 1) (ArgumentError)
```

Similarly, if you provide too many arguments:

```ruby
praise_dinosaur("Rex", "Blue")
```

Output:

```
'dinosaur_name': wrong number of arguments (given 2, expected 1) (ArgumentError)
```

## Ruby’s Hint Feature

Ruby sometimes suggests similar names that exist in the program to spot typos.

```ruby
fav_food = "pizza"
puts fov_food
```

Output:

```
NameError: undefined local variable or method `fov_food'. Did you mean `fav_food`?
```


## Using Comments 

The line of code causing the error can be commented out to handle the error temporarily. 

```ruby
# puts "4" + 3
puts 2 + 2
```

Output:

```
4
```

This allows the rest of the code to run without stopping due to an error.

---
title: "Custom Methods"
# description: "Methods"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 9
last_update:
  date: 8/24/2023
---



## Methods

A method is a simple way to group steps so you can reuse them easily.

- Sequence of steps that gives consistent results
- Accepts inputs and returns a result
- Runs only when invoked, can be reused many times

Just like built-in Ruby methods such as `puts` or `print`, custom methods can be called whenever we need them.


## Defining a Method 

We can define a method using the `def` and `end` keywords.

Everything between `def` and `end` is the method body. This body contains the steps Ruby will run each time the method is called.

```ruby
def jurassic_park
  puts "Welcome to Jurassic Park"
  puts "Dinosaurs are alive again"
  puts "Please stay on the tour path"
end
```

To call the method, write the method name:

```bash
jurassic_park
```

Output:

```bash
Welcome to Jurassic Park
Dinosaurs are alive again
Please stay on the tour path
```

Methods can also be called multiple times without rewriting logic.

```bash
jurassic_park
jurassic_park
jurassic_park
```

Output:

```bash
Welcome to Jurassic Park
Dinosaurs are alive again
Please stay on the tour path
Welcome to Jurassic Park
Dinosaurs are alive again
Please stay on the tour path
Welcome to Jurassic Park
Dinosaurs are alive again
Please stay on the tour path
```



## Parameters 

Parameters allow a method to receive data and adjust its behavior. They exist only while the method is running, which means they cannot be used outside the method. 

A parameter is created when the method starts and is removed when the method finishes.

- Without parameters:

    ```ruby
    def say_hello
      puts "Nice to see you!"
    end

    # Calling the method
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

    # Calling the method
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

## Using Arguments Inside a Method

Arguments behave like variables inside a method and can be used directly in its logic. Once values are passed in, the method can work with them just like normal variables.

- Strings can call string methods
- Numbers can be used in calculations
- Behavior depends on the input type

Example: 

```ruby
def describe_character(name, age)
  puts name.upcase
  puts age + 5
end

describe_character("Luna", 25)
describe_character("Milo", 30)
```

Output:

```
LUNA
30
MILO
35
```

## Dynamic Typing and Runtime Errors

Ruby does not require data type declarations and does not enforce types ahead of time. 

This means that errors will occur at runtime if the inputs do not support the methods being used.

Example: 

```ruby
def describe_character(name, age)
  puts name.upcase
  puts age + 5
end

describe_character(10, 25)
```

Output:

```
NoMethodError: undefined method `upcase` for 10:Integer
```

Ruby assumes the inputs are valid, so incorrect values cause errors when the method runs.

## Local Variables

A local variable is a variable declared inside a method and exists only while that method runs. It cannot be used outside the method because it is limited to the method's execution environment.

For example, we can define a method to store a movie star's name:

```ruby
def film_movie
  action_star = "Arnold Schwarzenegger"
  puts action_star
end
```

Here, `action_star` is a local variable. If you try to access it outside the method, Ruby will raise an error because its scope is limited to the `film_movie` method.

```ruby
puts action_star
```

Output:

```ruby
undefined local variable or method 'action_star' for main (NameError)
```

You can also have a variable with the same name at the top level of your file:

```ruby
action_star = "Jean-Claude Van Damme"
puts action_star

film_movie
puts action_star
```

Output:

```ruby
Jean-Claude Van Damme

Arnold Schwarzenegger
Jean-Claude Van Damme
```

This shows that variables with the same name in different scopes are completely separate. The top-level `action_star` exists throughout the file, while the one inside the method is temporary and isolated.


## Return Values

A return value is the final output that a method gives back after it runs. Unlike printing with `puts`, which just shows something on the screen, a return value can be stored and used elsewhere in your program.

For example, calling `upcase` on a string produces a new string:

```ruby
word = "maximilian"
all_caps = word.upcase

puts all_caps
```

Output:

```ruby
MAXIMILIAN
```

Here, `upcase` returns the string in all caps, which we store in `all_caps`.


## Method Return Values 

We can also return values from our own methods. For example:

```ruby
def add_two_numbers(num_one, num_two)
  puts "Solving the math problem"
  return num_one + num_two
end

result = add_two_numbers(1, 5)
puts result
```

Output:

```
Solving the math problem
6
```


**Note:** Every method always produces a return value, even if it seems like it does nothing. If a method has no explicit `return` statement, Ruby automatically returns `nil` by default. This ensures that every method produces some kind of object.

## Multiple `return` 

Consider the following example:

```ruby
def add_two_numbers(num_one, num_two)
  return "Solving the math problem"
  return num_one + num_two
  return num_one * num_two
  return num_one / num_two
end

result = add_two_numbers(1, 5)
puts result
```

As soon as a `return` runs, the method stops immediately and nothing after it is executed. If a method has multiple `return` statements, Ruby executes only the first one it encounters and exits the method.

Output:

```ruby
Solving the math problem
```

## Implicit Returns in Methods

If a method does not have an explicit `return`, Ruby returns the result of the last evaluated expression automatically.

```ruby
def add_two_numbers(num_one, num_two)
  num_one + num_two
end

result = add_two_numbers(3, 4)
puts result
```


Output:

```ruby
7
```

Here, the sum `7` is returned implicitly because it is the last evaluation.

Using `return` is optional if you want the last line as the return value. It's mainly helpful when you need to stop the method early or return a value from a conditional branch.

```ruby
def check_number(num)
  return "Too small" if num < 5
  "Just right"
end

puts check_number(3)
puts check_number(7)
```

Output:

```ruby
Too small
Just right
```

This shows that `return` can be used to exit a method early. Otherwise, Ruby will automatically return the last evaluated expression.

## Optional Parameters and Default Arguments

**Optional parameters** allow a method to be called without giving a value for every parameter.

**Default arguments** set a fallback value for optional parameters when no value is provided.

- Optional parameters can be skipped when calling a method
- Default arguments are used if no value is given
- Required parameters must be listed before optional ones

Condier the method `title_assigner`:

```ruby
def title_assigner(name, suffix="The Great")
  "#{name} #{suffix}"
end

puts title_assigner("Henry", "The Navigator") 
puts title_assigner("Alexander")                   
```

Output:

```ruby
Henry The Navigator
Alexander The Great
```

In this example, `name` is required, while `suffix` is optional. If we do not provide a value for `suffix`, Ruby uses the default `"The Great"`.

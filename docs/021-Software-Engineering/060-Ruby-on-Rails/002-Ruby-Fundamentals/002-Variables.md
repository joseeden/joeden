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

Constants are like variables, but their values are meant to stay the same throughout a program. 

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


Constants in Ruby can be changed, but Ruby will give a warning. This signals that the value is meant to stay the same.

- Use constants for fixed values like `pi` or tax rates
- Use variables for values that can change while the program runs

## Object References 

Variables are just names pointing to objects in memory. Two variables can refer to the same object or different objects that look the same.

- Variables can share the same object
- Creating a new object generates a separate copy
- Modifying a shared object affects all variables pointing to it

When you assign one variable to another, Ruby does not create a copy. Both variables point to the same object in memory.

```ruby
a = [1, 2, 3]
b = a

puts a.object_id  # Output: => 123
puts b.object_id  # Output: => 123
```

Here, `a` and `b` share the same array. Changing one changes the other:

```ruby
a.push(4)

puts a.inspect   # Output: => [1, 2, 3, 4]
puts b.inspect   # Output: => [1, 2, 3, 4]
```

If you want a separate copy, you must create a new object:

```ruby
c = [1, 2, 3]
d = [1, 2, 3]

puts c.object_id  # Output: => 234
puts d.object_id  # Output: => 756
```

Even though `c` and `d` have the same elements, they are separate objects. Modifying one does not affect the other.

```ruby
d.push(5)

puts c.inspect  # Output: => [1, 2, 3]
puts d.inspect  # Output: => [1, 2, 3, 5]
```


## Object Copies: `dup` and `clone`

To create an independent copy of an object, use `dup` or `clone`. These methods make a new object in memory with the same contents.

- `dup` creates a copy that is not frozen
- `clone` creates a copy and preserves frozen state if original is frozen
- Copies can be made for arrays, strings, or other objects

Examples: 

1. Copying an array:

    ```ruby
    a = [1, 2, 3]
    b = a.dup
    c = a.clone

    puts a.object_id  # Output: => 123
    puts b.object_id  # Output: => 567
    puts c.object_id  # Output: => 953

    a.push(4)
    puts a.inspect    # Output: => [1, 2, 3, 4]
    puts b.inspect    # Output: => [1, 2, 3]
    puts c.inspect    # Output: => [1, 2, 3]
    ```

    Modifying the original array `a` does not affect the copies `b` and `c` because they are separate objects.

2 Copying a string:

    ```ruby
    a = "Kurt Vonnegut"
    b = a.dup
    c = a.clone

    a.upcase!

    puts a            # Output: KURT VONNEGUT
    puts b            # Output: Kurt Vonnegut 
    puts c            # Output: Kurt Vonnegut 
    ```

    Changing the original string `a` does not change `b` or `c`. The duplicates or clones are independent objects.



## Object Copies: `freeze` and Frozen Objects

The `freeze` method makes objects immutable. Once frozen, objects cannot be changed, which helps prevent accidental modifications.

- `freeze` works on strings, arrays, and other objects
- Mutating methods like `<<` or `upcase!` will fail on frozen objects
- Once frozen, an object stays frozen for the entire program

Examples: 

```ruby
name = "James".freeze
hobbies = ["coding", "sushi"].freeze

# Updating the variable
name << " the Genius"   
hobbies << "winning"    
name.upcase!            
```

The three updates will raise an error because the objects are frozen:

```bash
can't modify frozen String: "James" (FrozenError)
```

When an object is frozen, `dup` and `clone` behave differently. Both create a new object, but each handle the frozen state in different ways:

- `dup` makes a copy that **can be modified** even if original is frozen
- `clone` makes a copy that **keeps the frozen state** of the original
- Both work with strings, arrays, and other objects

Examples:

1. Working with a frozen string:

   ```ruby
   name = "James".freeze

   name_dup = name.dup
   name_clone = name.clone

   puts name_dup << " the Genius"   # Works
   puts name_clone << " the Genius" # Fails
   ```

   Output:

   ```bash
   James the Genius
   can't modify frozen String: "James" (FrozenError)
   ```

2. Working with a frozen array:

   ```ruby
   hobbies = ["coding", "sushi"].freeze

   hobbies_dup = hobbies.dup
   hobbies_clone = hobbies.clone

   puts hobbies_dup << "winning"    # Works
   puts hobbies_clone << "winning"  # Fails
   ```

   Output:

   ```bash
   ["coding", "sushi", "winning"]
   can't modify frozen Array: ["coding", "sushi"] (FrozenError)
   ```

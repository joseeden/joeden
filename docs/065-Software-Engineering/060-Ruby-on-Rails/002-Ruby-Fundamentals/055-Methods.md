---
title: "Methods"
# description: "Methods"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 55
last_update:
  date: 8/24/2023
---


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

## Predicate Methods

Predicate methods, also called **Boolean methods**, are methods that return a Boolean value. They ask an object a question about itself.

- Predicate methods return `true` or `false`
- Method names usually end with a question mark `?`
- The question mark is part of the name, not a special symbol

Some common predicate methods:

- `.odd?` checks if a number is odd
- `.even?` checks if a number is even
- `.positive?` checks if a number is positive
- `.negative?` checks if a number is negative

Examples:

```ruby
puts 10.odd?       # false
puts 11.odd?       # true
puts 1.even?       # false
puts 2.even?       # true
puts 10.positive?  # true
puts 10.negative?  # false
puts -8.positive?  # false
puts -8.negative?  # true
```

## Methods with Arguments 

Some Ruby methods need input values, called **arguments**, to work. These arguments tell the method what to do.

- Arguments are passed to a method for it to process
- Methods may require one, more, or no arguments
- Parentheses around arguments are optional but can improve clarity

Example:

```ruby
food = "Big Mac"

puts food.include?("B")   # true
puts food.include?("M")   # true
puts food.include?("z")   # false
puts food.include?("b")   # false
```

Notes: 

- `include?` checks if a string contains a given value
- The argument is the value to search for
- Case matters in string comparisons

If you call a method with the wrong number of arguments, Ruby will raise an error:

```ruby
puts food.include?            # ArgumentError: wrong number of arguments (given 0, expected 1)
puts food.include?("B", "M")   # ArgumentError: wrong number of arguments (given 2, expected 1)
```

You can also call methods with or without parentheses:

```ruby
puts food.include?("B")
puts food.include?"B"
```

Both work the same way. Using parentheses is optional but recommended for methods with arguments to improve readability.


## Methods with Multiple Arguments

Some Ruby methods need more than one input to work. These inputs help the method make a clear decision.

When a method takes multiple arguments, Ruby follows clear syntax rules.

- Arguments are separated by commas
- Order of arguments matters
- Parentheses improve readability

Example using `between?` :

```ruby
puts 20.between?(10, 30)
```

Output:

```bash
true 
```

Parentheses are optional, but they make the code easier to read, especially when multiple arguments are involved.


### `between?`

The `between?` method checks if a number falls within a range.

- Works on integers and floats
- Takes two arguments
- Includes the start and end values

The first argument is the lower limit, and the second argument is the upper limit. Ruby uses both to decide if the value fits in the range.

```ruby
puts 20.between?(10, 30)
puts 20.between?(10, 15)
```

Output:

```bash
true
false
```

Note that the `between?` method includes the boundaries meaning both start and end value.

```ruby
puts 20.between?(20, 30)
puts 20.between?(10, 20)
```

Output:

```bash
true
true
```

If the number matches either boundary, Ruby still returns true. This confirms that the range is inclusive.


### Using `between?` with Floats and Negatives

The same rules apply to floats and negative numbers.

```ruby
puts 1.2.between?(1.1, 1.3)
puts (-10).between?(-13, -8)
puts (-8.3).between?(-9.5, -7.2)
```

Output:

```bash
true
true
true
```

No matter the numeric type, Ruby applies the same logic to determine if the value fits the range.



## Arguments in Other Methods

Top-level methods like `puts` also take arguments:

```ruby
puts "Double Whopper", "Triple Whopper"
```

Output:

```bash
Double Whopper
Triple Whopper
```

Notes: 

- `"Double Whopper"` and `"Triple Whopper"` are arguments to `puts`
- Arguments are separated by commas
- Parentheses can be used but are often omitted 


## Commonly Used Methods 

Here are some commonly used methods in Ruby:

- `class`
- `length` 
- `times`
- `gets`
- `sub` 

Reference: [Common Methods.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/056-Common-Methods.md)

## Custom Methods 

We can define a method using the `def` and `end` keywords. Everything between `def` and `end` is the method body.

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

For more information, please see [Custom Methods.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/057-Custom-Methods.md)



## Recursion

Recursion is when a method calls itself. It helps solve problems by breaking them into smaller, simpler subproblems.

- Requires a base case to stop infinite calls
- Factorials are a classic example. 

For example, `5!` (5 factorial) is:

```
5 × 4 × 3 × 2 × 1 = 120
```

Each factorial can be broken down as:

- `5! = 5 × 4!`
- `4! = 4 × 3!`
- `3! = 3 × 2!`
- `2! = 2 × 1!`
- `1! = 1` (base case)

In Ruby, we can implement factorial recursively:

```ruby
def factorial(number)
  return 1 if number == 1
  number - factorial(number - 1)
end

puts factorial(5)  # 120
puts factorial(6)  # 720
```

When we call `factorial(5)`, Ruby evaluates:

1. `5 - factorial(4)` (waiting for factorial(4))
2. `4 - factorial(3)` (waiting for factorial(3))
3. `3 - factorial(2)` (waiting for factorial(2))
4. `2 - factorial(1)` → returns 1

Now we go back up the recursion (the “unwinding” phase):

1. `factorial(2)` → 2 - 1 = 1
2. `factorial(3)` → 3 - 1 = 2
3. `factorial(4)` → 4 - 2 = 2
4. `factorial(5)` → 5 - 2 = 3


## Recursive String Reversal

Let's say we want to create our own method that reverses a string. There are two ways we can do this:

1. Iteratively, using a loop
2. Using recursive string reversal

Starting with using a loop:

- Start from the last character
- Move backward one character at a time
- Build a new string as you go

Code:

```ruby
def reverse_text(text)
  first_index = 0
  last_index = text.length - 1
  reversed_text = ""

  while last_index >= first_index
    reversed_text << text[last_index]
    last_index -= 1
  end

  reversed_text
end

puts reverse_text("straw")
```

Output:

```text
warts
```

Now let’s solve the same problem using recursive string reversal. Instead of looping, the method calls itself with a shorter string each time until a stopping condition is met.

- Take the last character
- Reverse the remaining string
- Combine the results

Let's use the word "straw" as an example:

```bash
reverse_text("straw") 
w + reverse_text("stra") 
       a + reverse_text("str") 
               r + reverse_text("st") 
                       t + reverse_text("s") 
```

When the method reaches "s", the string length is one. A single character reversed is still the same character, so this becomes the base case.

At this point, recursion stops and the return values start moving back up the call stack.

The code will look like this:

```ruby
def reverse_text(text)
  return text if text.length == 1

  last_char = text[-1]
  remainder = text[0, text.length - 1]

  last_char + reverse_text(remainder)
end

puts reverse_text("straw")
```

Explanation:

1. This line gets the last character of the string. For "straw", this is "w".

    ```bash
    last_char = text[-1]
    ```

2. This line gets the remaining characters before the last one. For "straw", this becomes "stra".

    ```bash
    remainder = text[0, text.length - 1]
    ```

3. This line performs the recursive step by combining the last character with the reversed remainder.

    ```bash
    last_char + reverse_text(remainder)
    ```

4. That logic matches this execution flow:

    ```bash
    w + reverse_text("stra") 
          a + reverse_text("str") 
                  r + reverse_text("st") 
                          t + reverse_text("s")  
                          t + s
    ```

5. Once "s" is reached, the base case runs and returns the character immediately.

    ```bash
    return text if text.length == 1
    ```

6. The results then combine as they return upward, producing the final reversed string.

Each recursive call places one character in its final position and relies on the base case to stop cleanly and complete the reversal.

Output:

```text
warts
```


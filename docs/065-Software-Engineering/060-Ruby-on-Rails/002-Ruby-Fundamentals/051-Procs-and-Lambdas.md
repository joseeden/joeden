---
title: "Procs and Lambdas"
description: "Procs and Lambdas"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 51
last_update:
  date: 8/24/2023
---

## Overview 

Blocks, procs, and lambdas are ways to pass chunks of code to methods. They let you reuse logic or customize behavior inside methods without rewriting the method itself.

- Blocks are temporary pieces of code
- Procs are reusable objects that act like blocks
- Lambdas are like procs but stricter with arguments and return behavior

For more information on Blocks, please see [Blocks.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/050-Blocks.md)

## Procs

Unlike blocks, **Procs** are objects that you can assign them to variables and reuse multiple times.

- Blocks disappear after a method runs
- Procs represents a block that can be saved and reused

To create a Proc, use `Proc.new` and provide the block inside `{}` or `do...end`:

```ruby
my_num = Proc.new { |num| "#{num}" }
```

You can also write a proc this way:

```ruby
my_num = proc { |num| "#{num}" }
```

Using `map` lets you apply the same operation to each element of an array. You can pass the Proc to map by prefixing it with an ampersand (`&`):

```ruby
p my_order.map(&my_num)
```

Example: 

1. A proc that gets the cube of a number:

    ```ruby
    cube_a_num = Proc.new { |num| num ** 3 }

    # Arrays
    a = [1, 2, 3, 4, 5]
    b = [6, 7, 8, 9, 10]
    c = [11, 12, 13, 14, 15]

    # Use the proc with map, prefix with &
    p a.map(&cube_a_num)
    p b.map(&cube_a_num)
    p c.map(&cube_a_num)
    ```

    Output:

    ```bash
    [1, 8, 27, 64, 125]
    [216, 343, 512, 729, 1000]
    [1331, 1728, 2197, 2744, 3375]
    ```


2. Using `proc` instead of `Proc.new`:

    ```ruby
    cube_a_num = proc{ |num| num ** 3 }

    # Arrays
    a = [1, 2, 3, 4, 5]
    b = [6, 7, 8, 9, 10]
    c = [11, 12, 13, 14, 15]

    # Use the proc with map, prefix with &
    p a.map(&cube_a_num)
    p b.map(&cube_a_num)
    p c.map(&cube_a_num)
    ```

    Output:

    ```bash
    [1, 8, 27, 64, 125]
    [216, 343, 512, 729, 1000]
    [1331, 1728, 2197, 2744, 3375]
    ```

3. Using `do...end`:

    ```ruby
    cube_a_num = Proc.new do |num|
      num ** 3
    end

    a = [1, 2, 3, 4, 5]
    b = [6, 7, 8, 9, 10]
    c = [11, 12, 13, 14, 15]

    p a.map(&cube_a_num)
    p b.map(&cube_a_num)
    p c.map(&cube_a_num)
    ```

    Output:

    ```bash
    [1, 8, 27, 64, 125]
    [216, 343, 512, 729, 1000]
    [1331, 1728, 2197, 2744, 3375]
    ```

    You can use either `Proc.new` or `proc`, and both will work.



## Procs examples

### Currency Conversion

Procs can be used to apply the same currency conversion logic to many different lists of values without rewriting the code. Basically, apply the conversion rule in one place and apply it everywhere.

```ruby
usd_to_cad = proc { |money| (money * 1.35).round(2) }
usd_to_sgd = proc { |money| (money * 1.34).round(2) }
usd_to_aud = proc { |money| (money * 1.52).round(2) }

usd_amounts = [102, 215, 382, 441, 569]

p usd_amounts.map(&usd_to_cad)
p usd_amounts.map(&usd_to_sgd)
p usd_amounts.map(&usd_to_aud)
```

Output:

```bash
[137.7, 290.25, 515.7, 595.35, 768.15]
[136.68, 288.1, 511.88, 590.94, 762.46]
[155.04, 326.8, 580.64, 670.32, 864.88]
```

Now, if the conversion rate changes, you only update the proc. Any array using it will automatically get the new value. This makes the code reusable and easy to maintain.



### Filtering

Procs can also store logic for filtering, like checking if someone is a senior age. This avoids duplicating the same logic in multiple `select` or `reject` blocks.

Example:

```ruby
is_senior = proc { |age| age > 55 }

ages = [10, 60, 83, 30, 43, 25]

puts "Senior ages:"
senior_ages = ages.select(&is_senior)
puts senior_ages

puts "Non-senior ages:"
non_senior_ages = ages.reject(&is_senior)
puts non_senior_ages
```

Output:

```bash
Senior ages:
60
83
Non-senior ages:
10
30
43
25
```

If the senior age limit changes, you only need to update the proc, and all code using it automatically follows the new rule.

## Using Procs in Methods

Procs can be passed into methods and executed when needed. This helps separate changing logic while keeping the main method structure reusable.

- Define a method that accepts a proc
- Prefix proc parameters with an ampersand `&`
- Call the proc inside the method with `.call`

Example:

```ruby
hero = Proc.new { |character| puts "#{character} explored the ocean bravely" }
sub = Proc.new { |sub| puts "He captured sailors in his submarine, the #{sub}" }

def talk_about(character, &story_proc)
  story_proc.call(character)
end

talk_about("Nemo", &hero)
talk_about("Nautilus", &sub)
```

Output:

```bash
Nemo explored the ocean bravely
He captured sailors in his submarine, the Nautilus
```

### Blocks for One-time Actions

You can rewrite procs using blocks. You just simply pass a block directly to the method and use `yield` to execute it. Blocks are better for one-time use and good for temporary custom behavior.

```ruby
def talk_about(character)
  yield(character)
end

talk_about("Nemo") { |character| puts "#{character} explored the ocean bravely" }
talk_about("Nautilus") { |sub| puts "He captured sailors in his submarine, the #{sub}" }
```

This returns the same output:

```
Nemo explored the ocean bravely
He captured sailors in his submarine, the Nautilus
```

For more information, please see [Blocks.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/050-Blocks.md#yield-with-block-parameters)

### Procs vs Blocks

You can actually mix both approaches. A method expecting a proc can accept a block and vice versa.

- Use a block for one-time behavior
- Use a proc for reusable logic
- Ruby converts automatically when needed

Procs are best when you need to pass the same logic to multiple methods or reuse it multiple times. Blocks are best when the logic is temporary and only used once. 


## Using Lambdas Like Procs

Lambdas are almost the same as procs. Both are objects, can be called with `call`, and can be passed to methods expecting a block.

To create a lambda, use the `lambda` keyword or `->` syntax.

Examples: 

1. A lambda to square numbers:

    ```ruby
    square_lambda = lambda { |n| n * n }

    numbers = [1, 2, 3]
    p numbers.map(&square_lambda)
    ```

    Output:

    ```
    [1, 4, 9]
    ```


2. Using the `->` syntax:

    ```ruby
    square_lambda_2 = ->(n) { n * n }

    numbers = [1, 2, 3]
    p numbers.map(&square_lambda_2)
    ```

    Output:

    ```
    [1, 4, 9]
    ```


### Procs vs Lambdas 

Although similar, procs and lambdas have two main differences:

- **Argument checking**

  - Lambdas check arguments and raise errors if wrong
  - Procs ignore extra arguments and fill missing ones with `nil`

- **Return behavior**

  - Lambdas return control to the calling method
  - Procs using `return` exit the calling method immediately

When to use:

- Use blocks for one-time code
- Use procs for reusable code without strict argument checking
- Use lambdas for reusable code with strict argument rules and safe returns


Examples:

1. Missing arguments with Proc:

    ```ruby
    my_proc = Proc.new { |name, age| puts "Name: #{name}, Age: #{age}" }
    my_lambda = ->(name, age) { puts "Name: #{name}, Age: #{age}" }

    my_proc.call("Nemo")  # Age becomes nil
    # my_lambda.call("Nemo")  # Would raise error
    ```

    Output:

    ```bash
    Name: Nemo, Age:
    ```

    Here, the "Age" is `nil` because Procs fill missing arguments with `nil`.


2. Missing arguments with Lambda:

    ```ruby
    my_proc = Proc.new { |name, age| puts "Name: #{name}, Age: #{age}" }
    my_lambda = ->(name, age) { puts "Name: #{name}, Age: #{age}" }

    my_lambda.call("Nemo") 
    ```

    Output:

    ```bash
    wrong number of arguments (given 1, expected 2) (ArgumentError)
    ```

    Unlike Procs, Lambdas are strict and require the exact number of arguments.


3. Return behavior with Lambda:

    ```ruby
    def execute(proc_or_lambda)
      puts "Start"
      puts proc_or_lambda.call
      puts "End"
    end

    my_proc = Proc.new { return "Proc returned" }
    my_lambda = -> { return "Lambda returned" }

    execute(my_lambda) 
    ```

    
    Output:

    ```bash
    Start
    Lambda returned
    End
    ```
    
    The lambda returns control to the `execute` method, so the method continues executing.


4. Return behavior with Proc:

    ```ruby
    def execute(proc_or_lambda)
      puts "Start"
      puts proc_or_lambda.call
      puts "End"
    end

    my_proc = Proc.new { return "Proc returned" }
    my_lambda = -> { return "Lambda returned" }

    execute(my_proc)    
    ```

    Output:

    ```bash
    Start 
    ```

    Proc returns from the calling method, which stops further execution.



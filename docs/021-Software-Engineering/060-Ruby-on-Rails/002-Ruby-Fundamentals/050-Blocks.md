---
title: "Blocks"
description: "Blocks"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 50
last_update:
  date: 8/24/2023
---

## Overview 

A block is a chunk of code that goes with a method call. It’s not a value like a number or string, but a set of instructions that the method can run. 

- Blocks can run multiple lines of instructions
- Blocks are different from arguments, which are just values

Blocks cannot exist on their own. They are always connected to a method. They are useful when a method needs more than just a value and requires a procedure to follow.

```ruby
5.times { puts "Ruby is awesome" }
```

Output:

```
Ruby is awesome
Ruby is awesome
Ruby is awesome
Ruby is awesome
Ruby is awesome
```

Here, the block inside `{}` runs five times because we called the `times` method on the integer `5`. The block is the code between the braces, and it tells Ruby what to do each time.

For longer blocks, Ruby uses the `do...end` syntax, which makes multiple lines easier to read:

```ruby
3.times do
  puts "Ruby is awesome"
  puts "I'm learning blocks"
end
```

Output:

```
Ruby is awesome
I'm learning blocks
Ruby is awesome
I'm learning blocks
Ruby is awesome
I'm learning blocks
```

The `do...end` block runs three times. Everything between `do` and `end` is executed each time. Blocks let you pass procedures, not just values, to a method.

## Blocks Return Values

A block tells a method what to do, but it does not change the method’s return value. Methods like `times` usually return the original object, not the block result.

```ruby
value = 3.times do
  puts "Hello"
end

puts value
```

Notes:

1. `3.times` is a method that repeats something 3 times.
2. The block inside `do...end` tells Ruby what to do each time: `puts "Hello"`.
3. Ruby executes the block 3 times, so we see:

    ```
    Hello
    Hello
    Hello
    ```

4. However, `times` always returns the number it was called on (`3`), **not the result of the block**.
5. That’s why when we print `value`, we get:

    ```
    3
    ```

## Block Variables

A block variable is a variable that exists only inside a block. It is created and used during each execution of the block, and disappears once the block finishes.

- Belongs to the block’s execution context
- Value can change with each iteration of the block
- The variable does not exist outside the block

Blocks can be passed to methods to repeat a procedure multiple times. Some methods, like `times`, pass values to the block, which we can capture using block variables. 

For example, `times` passes the current iteration number to the block:

```ruby
3.times do |count|
  puts "Current count: #{count}"
  puts "The clock is ticking."
end
```

Output:

```
Current count: 0
The clock is ticking.
Current count: 1
The clock is ticking.
Current count: 2
The clock is ticking.
```

Notes: 

- `count` is the block variable, represents current iteration
- Ruby starts counting from zero, so the first iteration is `0`
- Each iteration gets a new value for `count` while the block runs

We can also use the single-line syntax with curly braces:

```ruby
3.times { |i| puts "Iteration #{i}" }
```

Output:

```
Iteration 0
Iteration 1
Iteration 2
```

Notes:

- The block variable `i` represents the iteration number 
- Curly braces are preferred for single-line blocks


## `yield` 

You can use the `yield` keyword to attach a block to a method. When `yield` is called inside a method, the control is passed to the block, runs its code, then returns to the method.

```ruby
def pass_control
  puts "Start of method"
  yield
  puts "Back in method"
end

pass_control { puts "Inside block" }
```

Output:

```ruby
Start of method
Inside block
Back in method
```

Notes: 

- `yield` transfers control to the block
- The method pauses until the block finishes
- Multiple `yield` calls run the block multiple times

If we invoke the method but doesn't pass the block:

```ruby
def pass_control
  puts "Start of method"
  yield
  puts "Back in method"
end

pass_control 
```

Ruby will raise a `LocalJumpError`:

```bash
'Object#pass_control': no block given (yield) (LocalJumpError)
```

Blocks can be executed multiple times with multiple `yield` statements in a method. 

```ruby
def repeat_twice
  puts "Before first yield"
  yield
  puts "Between yields"
  yield
  puts "After second yield"
end

repeat_twice { puts "Inside block" }
```

Output:

```bash
Before first yield
Inside block      
Between yields    
Inside block
After second yield
```

You can use either `{}` or `do...end` for block syntax. 

```bash
repeat_twice do
  puts "Running from inside the block"
  puts "Exiting block, bye"
end
```

Output:

```bash
Before first yield
Running from inside the block
Exiting block, bye
Between yields
Running from inside the block
Exiting block, bye
After second yield
```

## `yield` with Return Values

Blocks attached to a method with `yield` can return a value back to the method. You can then assign the block's return value to a variable.

```ruby
def who_am_i
  puts "Hello there, new recruit."
  
  # Assign block output to variable
  whoami_var = yield       
  puts "I am from #{whoami_var}"
end

who_am_i { "Silo 17" }
```

Output:

```ruby
Hello there, new recruit.
I am from Silo 17
```

Using a  `do...end` syntax:

```ruby
who_am_i do
  "Silo 50"
end
```

Output:

```ruby
Hello there, new recruit.
I am from Silo 50
```


Do not use `return` inside the block. Using `return` exits the entire method immediately, which skips any remaining code. 

```bash
who_am_i { return "Silo 17" }
```

Output:

```ruby
Hello there, new recruit.
```


## `block_given?` for Optional Blocks

`block_given?` lets a method check if a block was passed. This allows the method to run with or without a block, which avoids errors when no block is provided.

Example:

```ruby
def pass_control_on_condition
  puts "Inside the method"
  yield if block_given?
  puts "Back inside the method"
end

# With a block
pass_control_on_condition { puts "Inside the block" }
```

Output:

```ruby
Inside the method
Inside the block
Back inside the method
```

If no block is provided:

```ruby
pass_control_on_condition
```

Output:

```ruby
Inside the method
Back inside the method
```

## `yield` with Block Parameters

Blocks can receive one or more values from a method using `yield`. This allows methods to send data to blocks, just like Ruby's built-in iteration methods do.

- `yield` can pass values to block variables
- Block variables receive data from the method
- Methods can pass multiple arguments to a block

:::info 

**Block parameters** and **block variables** refer to the same thing. They are the placeholders you define in a block to receive the values passed by the method using `yield` or other iterator methods.

:::

Examples:

1. Using a single argument:

    ```ruby
    def captain_nemo_says
      yield("Nautilus")
    end

    captain_nemo_says { |ship| puts "#{ship} sails through the ocean" }
    captain_nemo_says { |ship| puts "#{ship} explores the deep sea" }
    ```

    Output:

    ```ruby
    Nautilus sails through the ocean
    Nautilus explores the deep sea
    ```


2. Using a dynamic method argument:

    ```ruby
    def captain_nemo_says(ship)
      yield(ship)
    end

    captain_nemo_says("Nautilus") { |s| puts "#{s} is ready for adventure" }
    captain_nemo_says("Diving Bell") { |s| puts "#{s} descends into the depths" }
    ```

    Output:

    ```ruby
    Nautilus is ready for adventure
    Diving Bell descends into the depths
    ```

3. Using multiple arguments:

    ```ruby
    def number_evaluation(a, b, c)
      yield(a, b, c)
    end

    result = number_evaluation(5, 10, 15) { |x, y, z| x + y + z }
    puts result

    result = number_evaluation(2, 3, 4) { |x, y, z| x * y * z }
    puts result
    ```

    Output:

    ```
    30
    24
    ```


## Custom `each` Method 

Using the `yield` concept, we can build own version of the `each` method.

As a recap, we can use `.each` to iterate over a list:

```ruby
my_list = [10, 20, 30]

my_list.each do
  |number| puts "The square of #{number} is #{number * number}"
end
```

Output:

```bash
The square of 10 is 100
The square of 20 is 400
The square of 30 is 900
```

Now, building the `custom_each` which does the same thing as `.each`:

```ruby
my_list = [10, 20, 30]

def custom_each(array)
  i = 0
  while i < array.length
    yield(array[i])
    i += 1
  end
end

custom_each(my_list) do 
  |number| puts "The square of #{number} is #{number * number}"
end
```

Output:

```bash
The square of 10 is 100
The square of 20 is 400
The square of 30 is 900
```


## `upto` and `downto`

Ruby has methods that combine **arguments** and **blocks** to perform an action on a sequence of numbers.

- `upto` counts from a starting number up to a target number
- `downto` counts from a starting number down to a target number

Both methods require an **argument** (the number to stop at) and a **block** (what to do at each step)

- The argument is a fixed value the method uses
- The block is a set of instructions executed on each step

:::


### Using `upto`

We can count from a starting number up to a target number and do something on each step:

```ruby
5.upto(10) { |current| puts "Loop is now on #{current}" }
```

Output:

```
Loop is now on 5
Loop is now on 6
Loop is now on 7
Loop is now on 8
Loop is now on 9
Loop is now on 10
```

Notes: 

- `5` is the starting point
- `10` is the argument, the number to count up to
- The block prints the current number each step

This is the same as writing it in multiple lines using `do ... end`:

```bash
5.upto(10) do |current|
  puts "Loop is now on #{current}"
end
```

The block defines **what happens at each step**, while the argument controls the range of numbers.


### Using `downto`

We can also count backwards from a number down to a target number:

```ruby
6.downto(1) { |current| puts "Countdown: #{current}" }
```

Output:

```
Countdown: 6
Countdown: 5
Countdown: 4
Countdown: 3
Countdown: 2
Countdown: 1
```

Notes: 

- `6` is the starting number
- `1` is the stopping number, provided as an argument
- The block runs on each number from 6 down to 1

The same can be written in multiple lines:

```bash
6.downto(1) do |current|
  puts "Countdown: #{current}"
end
```


### Real-world example: "99 Bottles of Beer"

We can use `down_to` to generate a countdown song like "99 Bottles of Beer." The block defines the steps to run on each number, and the argument sets the stopping point:

```ruby
99.downto(1) do |number|
  puts "#{number} bottles of beer on the wall"
  puts "#{number} bottles of beer"
  puts "Take one down, pass it around #{number - 1} bottles of beer on the wall"
end
```

- `99` is the starting number
- `1` is the stopping number, provided as an argument
- `number` is the block variable representing the current number

Output:

```ruby 
99 bottles of beer on the wall
99 bottles of beer
Take one down, pass it around 98 bottles of beer on the wall
98 bottles of beer on the wall
98 bottles of beer
Take one down, pass it around 97 bottles of beer on the wall
97 bottles of beer on the wall
97 bottles of beer
Take one down, pass it around 96 bottles of beer on the wall
...
1 bottles of beer on the wall
1 bottles of beer
Take one down, pass it around 0 bottles of beer on the wall
```

The block runs once per number, dynamically using the current value of number. This shows how arguments set the range while blocks define the procedure at each step.


## `step` 

The `step` method lets us move from one number to another in intervals or steps, combining arguments and a block.

- Start number is the value we call the method on
- End number is provided as the first argument
- Step size is provided as the second argument
- Block defines what happens at each step, with an optional block variable

The block variable represents the current number in the sequence and can be named anything. Here’s a simple example counting from 1 to 100 in steps of 5:

```ruby
1.step(100, 5) do |number|
  puts "Current number: #{number}"
end
```

Output:

```
Current number: 1
Current number: 6
Current number: 11
Current number: 16
...
Current number: 96
```

Notes: 

- `1` is the starting number
- `100` is the limit we count up to
- `5` is the interval or step size
- The block prints the current number at each step

We stop before exceeding the limit. The block runs for each number in the sequence, and the block variable updates each iteration.

We can also use the curly braces syntax for shorter blocks. For example, counting to 50 in steps of 7:

```ruby
1.step(50, 7) { |num| puts "Now on #{num}" }
```

Output:

```
Now on 1
Now on 8
Now on 15
Now on 22
Now on 29
Now on 36
Now on 43
Now on 50
```

---
title: "Loops"
description: "Loops"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 35
last_update:
  date: 8/24/2023
---


## The `while` Loop

A `while` loop runs a block of code as long as a condition is true. 

Unlike an `if` statement, which runs once, `while` keeps repeating until the condition becomes false.

Example:

```ruby
count = 1
while count < 10
  puts count
  count += 1
end
puts "Final count: #{count}"
```

Output:

```
1
2
3
4
5
6
7
8
9
Final count: 10
```

The loop ends naturally when the condition is no longer true:

- Starts at 1, prints the value, and increases count each time
- Stops when count reaches 10 because the condition `count < 10` becomes false


Another example: Growing a String

```ruby
letters = "A"
while letters.length < 5
  puts letters
  letters += "a"
end
```

Output:

```
A
Aa
Aaa
Aaaa
```

Notes: 

- The loop prints the string and adds one more letter each time
- Stops when the string length reaches 5


## Avoid Infinite Loops

If the condition never changes, the loop will run forever.

- Always update the variable used in the condition inside the loop
- Check that each iteration moves closer to stopping the loop
- Test loops with small values first to avoid program crashes

## The `until` Loop

The `until` loop is the opposite of a `while` loop. It repeats code until a condition becomes true.

- Runs repeatedly while the condition is false
- Stops when the condition becomes true

Example:

```ruby
i = 1
until i > 9
  puts i
  i += 1
end
puts "Final i: #{i}"
```

Output:

```
1
2
3
4
5
6
7
8
9
Final i: 10
```

This shows how `until` runs code repeatedly while the condition is false, then stops when the condition becomes true.

- Starts with `i = 1` and prints it
- Increments `i` each time the loop runs
- Stops when `i` becomes greater than 9


## Using `next` 

The `next` keyword lets you skip the rest of the current loop iteration and move to the next one.

- Skips remaining code in the current iteration
- Moves automatically to the start of the next loop iteration

Example: Finding Dollar Signs in a String

```ruby
sentence = "I love $ in the morning, $ in the afternoon, $ at night"
current_index = 0
final_index = sentence.length - 1

while current_index <= final_index
  if sentence[current_index] != "$"
    current_index += 1
    next
  end
  puts "Found $ at index #{current_index}"
  current_index += 1
end
```

Output:

```
Found $ at index 7
Found $ at index 27
Found $ at index 41
```

When it find a character that is not "$", it increments `current_index` and runs `next`. `next` actually skips everything below it in that loop iteration, which includes:

```ruby
end
puts "Found $ at index #{current_index}"
current_index += 1
```

The program goes back to the `while` loop and checks the next character.

When it finally finds a `$`, the if condition is evaluated to `false`, so Ruby skips the `if` entirely and runs the previously skipped lines:

```ruby
puts "Found $ at index #{current_index}"
current_index += 1
```

## Using `break`

The `break` keyword stops a loop completely. It works like an escape hatch to end iteration immediately when a condition is met.

For example, to find the first `$` in a string:

```ruby
sentence = "I love $ in the morning, $ in the afternoon, $ at night"
current_index = 0
first_money_index = nil
final_index = sentence.length - 1

while current_index <= final_index
  if sentence[current_index] == "$"
    first_money_index = current_index
    break
  end
  current_index += 1
end

puts "First $ found at index #{first_money_index}"
```

Output:

```
First $ found at index 7
```

Where: 

- The loop checks each character
- When it finds `$`, it sets the index and exits immediately
- Characters after the first `$` are never checked

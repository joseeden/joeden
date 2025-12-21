---
title: "Conditionals"
description: "Conditionals"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 7
last_update:
  date: 8/24/2023
---


## Running the Script

All examples in this section are written in a `main.rb` file and executed from the terminal.

To run the file:

```ruby
ruby /path/to/your/main.rb
```


## `If/else` 

The `if/else` statement allows your program to make decisions.

```ruby
age = 18

if age >= 18
  puts "You are an adult."
else
  puts "You are a minor."
end
```

Output:

```bash
You are an adult.
```

You can also use `if` without an `else` when no alternative action is needed:

```ruby
temperature = 30

if temperature > 25
  puts "It's a hot day!"
end
```

Output:

```bash
It's a hot day!
```

## Multiple Conditions 

Ruby allows checking more than one condition in a single statement.

- `elsif` handles additional conditions
- `&&` requires both conditions to be true
- `||` requires only one condition to be true

Example:

```ruby
score = 87

if score > 85 && score < 90
  puts "Grade: A"
elsif score >= 70 && score <= 85
  puts "Grade: B"
else
  puts "Grade: C"
end
```

Output:

```bash
Grade: A
```
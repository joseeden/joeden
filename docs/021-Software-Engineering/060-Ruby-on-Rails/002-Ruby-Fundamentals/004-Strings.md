---
title: "Strings"
description: "Strings"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 4
last_update:
  date: 8/24/2023
---

## Overview 

Strings are used to store and display text in Ruby.

- Strings can be joined together
- Strings can include variables
- Can use single `' '` or double `" "` quotes

Example using string joining:

```ruby
first_name = "James"
last_name = "Smith"
puts first_name + " " + last_name
```

Output:

```ruby
James Smith
```


## Single Quotes vs Double Quotes

Single quotes keep the text exactly as typed, while double quotes allow Ruby to interpret special characters like new lines (`\n`) and tabs (`\t`).

```ruby
# Double quotes interpret escape characters
puts "Hello\nWorld"

# Single quotes treat characters literally
puts 'Hello\nWorld'
```

Output:

```
Hello
World
Hello\nWorld
```


## String Interpolation 

We can use string interpolation to place variables inside a string:

```ruby
first_name = "James"
last_name = "Smith"
puts "My first name is #{first_name} and my last name is #{last_name}"
```

Output:

```ruby
My first name is James and my last name is Smith
```

String interpolation only works with double quotes. Using single quotes prints the text as is:

```ruby
first_name = "James"
last_name = "Smith"
puts 'My first name is #{first_name} and my last name is #{last_name}'
```

Output:

```ruby
My first name is #{first_name} and my last name is #{last_name}
```


## Multi-line Strings 

For large blocks of text, we can use the here document (`heredoc`) syntax. This allows multi-line strings while preserving spaces, tabs, and line breaks.

```ruby
poem = <<POEM
    What a beautiful language Ruby is
    It allows multi-line strings
    Even preserves indentation and spacing
    Shakespeare
POEM

puts poem
```

Output:

```
    What a beautiful language Ruby is
    It allows multi-line strings
    Even preserves indentation and spacing
    Shakespeare
```

Heredoc is ideal for storing paragraphs, poems, or formatted text in a string. Everything between the start and end identifiers is included exactly as typed.

## Comparing Strings 

You can test whether strings are equal or different, and you can also compare them based on their alphabetical order.

- `==` checks if two strings are exactly the same
- `!=` checks if two strings are not the same
- Alphabetical comparison uses `<` and `>`
- Comparison is case-sensitive

Example:

```ruby
a = "Hello"
b = "hello"
c = "Hello"

puts a == b
puts a == c
puts a != b
```

Output:

```
false
true
true
```


### Alphabetical Comparison

For alphabetical comparisons, Ruby compares strings character by character.

- `<` checks if a string comes before another alphabetically
- `>` checks if a string comes after another alphabetically
- Comparisons are case-sensitive; uppercase letters come before lowercase

Example:

```ruby
puts "A" < "B"
puts "a" < "z"
puts "M" > "F"
```

Output:

```
true
true
true
```


### Sorting Words

Each letter is treated individually, so for example, "Hello" comes before "Help" because L comes before P.

Example:

```ruby
puts "Hello" < "Help"
```

Output:

```
true
```

## String Concatenation 

String concatenation in means joining one string with another to form a single piece of text. There are various ways to concatenate strings.

1. **Using the plus operator**

    The `+` operator combines strings into a new one, while keeping the original strings unchanged, which helps preserve original data.

    Example: 

    ```ruby
    first_name = "James"
    last_name = "Smith"

    full_name = first_name + " " + last_name
    puts full_name
    puts first_name
    ```

    Output:

    ```
    James Smith
    James
    ```

2. **Reassigning with plus equals**

    The `+=` operator joins strings and updates the original variable, which is a quick way to overwrite values.

    ```ruby
    first_name = "James"
    last_name = "Smith"

    first_name += " " + last_name
    puts first_name
    ```

    Output:

    ```
    James Smith
    ```

3. **Using the concat method**

    The concat method changes the original string in place, so the variable now holds the new combined value.

    Example: 

    ```ruby
    first_name = "James"
    last_name = "Smith"

    first_name.concat(" ").concat(last_name)
    puts first_name
    ```

    Output:

    ```
    James Smith
    ```


4. **Using the prepend method**

    The prepend method modifies the original string by adding new content before it, which permanently changes its value.

    ```ruby
    name = "Smith"
    name.prepend("James ")
    puts name
    ```

    Output:

    ```
    James Smith
    ```


5. **Using the shovel operator**

    The shovel operator (`<<`) is a symbolic alternative to concat. It appends text directly to the original string and is useful when building strings step by step.

    ```ruby
    title = "Engineer "
    title << "Senior "
    title << "Level"
    puts title
    ```

    Output:

    ```
    Engineer Senior Level
    ```

---
title: "Strings"
description: "Strings"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 3
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
first_name = "Adam"
last_name = "Taylor"
puts first_name + " " + last_name
```

Output:

```ruby
Adam Taylor
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
first_name = "Adam"
last_name = "Taylor"
puts "My first name is #{first_name} and my last name is #{last_name}"
```

Output:

```ruby
My first name is Adam and my last name is Taylor
```

String interpolation only works with double quotes. Using single quotes prints the text as is:

```ruby
first_name = "Adam"
last_name = "Taylor"
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

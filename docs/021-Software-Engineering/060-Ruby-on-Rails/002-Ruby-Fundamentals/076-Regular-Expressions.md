---
title: "Regular Expressions"
description: "Regular Expressions"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 76
last_update:
  date: 8/24/2023
---


## Regex

A regular expression (regex) is a an object used to search text using patterns. It is more flexible than simple string methods and can match complex sequences of characters.

To start with can use simple string methods like `include?`, `start_with?`, and `end_with?` for basic checks without needing regex. For example:

```ruby
phrase = "Violence is the last refuge of the incompetent"

puts phrase.include?("ref")
# Output: true

puts phrase.start_with?("Violen")
# Output: true

puts phrase.end_with?("mpetent")
# Output: true
```

These methods work for simple checks, but regex can handle more complex searches.

To create a regex object, use two forward slashes (`//`) with the pattern inside. For example, to look for the letter "V":

```ruby
pattern = /V/
```

You can search a string using the `=~` operator:

```ruby
puts phrase =~ /V/
# Output: 0, because the letter "V" is in index 0.

puts phrase =~ /e/
# Output: 4
```

You can also put the regex on the left side:

```ruby
puts /s/ =~ phrase
# Output: 10
```

Because `phrase` holds the string, Ruby scans each character and returns the index of the first match. For example, the first "s" appears in "is," so it returns that position.

If the pattern is not found, Ruby returns `nil`. Regex matches sequences exactly as written, including letters, symbols, or multiple characters:

```ruby
puts phrase =~ /Be/
# Output: nil
```

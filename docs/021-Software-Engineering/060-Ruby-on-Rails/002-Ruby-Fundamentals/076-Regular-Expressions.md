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
quote = "Violence is the last refuge of the incompetent"

puts quote.include?("ref")
# Output: true

puts quote.start_with?("Violen")
# Output: true

puts quote.end_with?("mpetent")
# Output: true
```

These methods work for simple checks, but regex can handle more complex searches.

To create a regex object, use two forward slashes (`//`) with the pattern inside. For example, to look for the letter "V":

```ruby
pattern = /V/
```

You can search a string using the `=~` operator:

```ruby
puts quote =~ /V/
# Output: 0, because the letter "V" is in index 0.

puts quote =~ /e/
# Output: 4
```

You can also put the regex on the left side:

```ruby
puts /s/ =~ quote
# Output: 10
```

Because `quote` holds the string, Ruby scans each character and returns the index of the first match. For example, the first "s" appears in "is," so it returns that position.

If the pattern is not found, Ruby returns `nil`. Regex matches sequences exactly as written, including letters, symbols, or multiple characters:

```ruby
puts quote =~ /Be?/
# Output: nil

puts quote =~ /alive!/
# Output: nil
```

## Using `scan` 

The `scan` method finds all matches of a regex pattern in a string and returns them in an array. This is useful when you want every match, not just the first one.

For example, create a string representing a quote:

```ruby
quote = "Logic is the beginning of wisdom, not the end."
```

You can find all "e" letters like this:

```ruby
quote.scan(/e/)
# Output: ["e", "e", "e", "e"]
```

You can also search for consecutive characters:

```ruby
quote.scan(/is/)
# Output: ["is", "is"]
```

To match any character from a set, use square brackets:

```ruby
quote.scan(/[th]/)
# Output: ["t", "h", "t", "t", "h"]
```

The method scans the string from start to end, collects matches, and returns them in order. 
---
title: "String Methods"
description: "String Methods"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 6
last_update:
  date: 8/24/2023
---

## `insert`

The `insert` method lets you add new characters into a string at a specific position without removing existing characters.

- Targets a specific index position
- Adds characters without overwriting existing ones
- Mutates the original string

Unlike direct index assignment, `insert` shifts existing characters to the right instead of replacing them. This makes it useful for fixing typos or adding missing characters while keeping the original content intact.

### Inserting at a Specific Index

You can insert one or more characters at a chosen index position.

```ruby
text = "GorgeWashington"
text.insert(5, "e ")
puts text
```

Output:

```
George Washington
```

Here, index `5` is where the capital `W` was originally located. The inserted characters are added at that position, and all existing characters are shifted to the right. This keeps the original characters while correcting the string.

### Inserting Multiple Characters

The `insert` method is not limited to a single character.

- Multiple characters can be added at once
- Characters are inserted exactly at the given index
- Existing characters remain unchanged

Example: 

```ruby
text = "GorgeWashington"
text.insert(5, "e ")
puts text
```

Output:

```
George Washington
```


### Using Negative Indexes 

Negative indexes allow insertion relative to the end of the string.

- `-1` targets the last character
- Useful for appending missing characters
- Follows the same mutation behavior


Example: 

```ruby
text = "George Washigto"
text.insert(-1, "n")
puts text
```

Output:

```
George Washington
```

In this case, `-1` refers to the last character in the string, and the new character is added at that position without affecting the rest of the string.



## `empty?`

The `empty?` method checks whether a string has zero characters.

- Returns true for strings with no characters
- Returns false for strings with any content
- Treats spaces as characters

An empty string is still a valid string object, but it contains no characters. Any character, including spaces or symbols, means the string is not empty.

```ruby
text1 = ""
text2 = "A"
text3 = " "

puts text1.empty?
puts text2.empty?
puts text3.empty?
```

Output:

```
true
false
false
```

This shows that only strings with no characters return true, reinforcing that `empty?` checks for content inside a string.

## `nil?`

The `nil?` method checks whether an object is the `nil` object.

- Available on all Ruby objects
- Returns true only for `nil`
- Useful when object type is unknown

Most objects, including strings, numbers, and arrays, will always return false. Only the `nil` object itself returns true.

```ruby
value1 = "Hello"
value2 = nil

puts value1.nil?
puts value2.nil?
```

Output:

```
false
true
```


## `upcase` and `downcase`

The `upcase` and `downcase` methods return new strings with changed letter casing.

- `upcase` converts letters to uppercase
- `downcase` converts letters to lowercase
- Only affects alphabetic characters

Example: 

```ruby
place = "city square"

puts place.upcase
puts place.downcase
```

Output:

```
CITY SQUARE
city square
```


## `swapcase`

The `swapcase` method flips the casing of each letter.

- Uppercase becomes lowercase
- Lowercase becomes uppercase
- Numbers and symbols stay the same

Example: 

```ruby
place = "City Square"

puts place.swapcase
```

Output:

```
cITY sQUARE
```


## `capitalize`

The `capitalize` method changes only the first character to uppercase and makes the rest lowercase.

- Capitalizes the first letter
- Lowercases all remaining letters

Example: 

```ruby
name = "john doe"

puts name.capitalize
```

Output:

```
John doe
```


## Original String is not Modified

Case methods always return a new string and leave the original unchanged.

- Original string stays the same
- New string is created in memory
- Assignment is required to keep the result

Example: 

```ruby
label = "main street"
upper_label = label.upcase

puts label
puts upper_label
```

Output:

```
main street
MAIN STREET
```

## `reverse`

Calling `reverse` returns a new string where all characters appear in the opposite order, while the original string remains unchanged.

```ruby
word = "Ruby"
value = "A1#b"

puts word.reverse
puts value.reverse
```

The output shows that `reverse` simply changes character order without altering character types or casing.

```
ybuR
b#1A
```


## Bang Methods 

Bang methods are special string methods that make permanent changes to a string.

- End with an exclamation mark (`!`)
- Modifies the original string
- Do not return a new string

Consider the example below:

```ruby
word = "noodles"
word.capitalize

puts word
```

Output:

```
noodles
```

Now, adding the bang (`!`):

```ruby
word = "noodles"
word.capitalize!

puts word
```

Output:

```
Noodles
```


Some common bang methods:

- `upcase!` converts all letters to uppercase
- `downcase!` converts all letters to lowercase
- `reverse!` reverses character order
- `swapcase!` swaps letter casing

Example: 

```ruby
word = "NoOdLeS"

word.upcase!
puts word

word.downcase!
puts word

word.reverse!
puts word

word.swapcase!
puts word
```

Output:

```
NOODLES
noodles
seldoon
SELDOON
```

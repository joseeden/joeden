---
title: "String Manipulation"
description: "String Manipulation"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 5
last_update:
  date: 8/24/2023
---


## Extracting Characters

### Zero-based Indexing 

Every string in Ruby is made of ordered characters, with each character being assigned a number based on its order, called **index position.**

Additionally, index positions in Ruby always start at zero.

- First character is index 0
- Second character is index 1
- Index increases by one each time

Example: 

```ruby
text = "once"

puts text[0]
puts text[1]
puts text[3]
```


Output:

```
o
n
e
```

Because indexing starts at zero, the position numbers are always one less than what people usually expect, and this rule stays consistent throughout Ruby.


### Index vs. String Length

The last index is always one less than the string length.

- Length counts from one
- Index counts from zero
- Last index is length minus one

Example:

```ruby
text = "once upon a time"

puts text.length
puts text[15]
```

Output:

```
16
e
```


### Using Square Brackets

Square brackets are the most common way to read a character by index.

- Uses [index]
- Returns a single character
- Does not modify the string

Example: 

```ruby
text = "once upon a time"

puts text[4]
```

Output:

```
```

The output looks empty because index 4 is a space, showing that Ruby treats spaces like any other character using index positions.

### Out-of-range indexes

When an index does not exist, Ruby returns nil, which keeps string access predictable and safe.

- No error is raised
- Works for positive and negative indexes

Example: 

```ruby
text = "once upon a time"

puts text[100].nil?
```

Output:

```
true
```


### Using Negative Indexes

Negative indexes read characters from the end of the string.

- `-1` is the last character
- `-2` is the second to last
- Works backward through the string

```ruby
text = "once upon a time"

puts text[-1]
puts text[-2]
puts text[-5]
```

Output:

```
e
m
a
```


### Using the Slice Method

The slice method follows the same index position logic and returns characters without changing the original string.

- Uses `slice(index)`
- Behaves the same as brackets
- Returns nil if index is invalid

Example: 

```ruby
text = "once upon a time"

puts text.slice(0)
puts text.slice(3)
puts text.slice(-11)
```

Output:

```
o
e
u
```

It can also be used to extract multiple characters by using `slice(start, length)`


```ruby
story = "once upon a time"

puts story.slice(5, 4)
puts story.slice(0, story.length)
```

Output:

```
upon
once upon a time
```

## Extracting Multiple Characters

### Index and Length with Brackets

This syntax lets you pull out a sequence of characters.

- First value is the starting index
- Second value is how many characters to extract
- Characters are read in order

Example: 

```ruby
story = "once upon a time in a land far away."

puts story[5, 4]
```

Output:

```
upon
```

Ruby starts reading at index 5 and returns the next 4 characters, which shows how index positions control where extraction begins.

### Starting from the Beginning

You can extract characters starting from index zero.

- Index `0` means the first character
- Spaces are counted as characters
- Length controls how many are returned

Example: 

```ruby
story = "once upon a time"

puts story[0, 5]
```

Output:

```
once 
```

The space after the word is included because spaces have index positions.

### Extracting the Entire String

You can use the string length to copy the full string.

- Start at index `0`
- Use string length as the count
- Returns a full copy

Example: 

```ruby
story = "once upon a time"

puts story[0, story.length]
```

Output:

```
once upon a time
```



### Using Negative Starting Indexes

You can start counting from the end of the string.

- Negative index starts from the end
- Extraction still moves forward
- Length still applies

Example: 

```ruby
story = "far far away."

puts story[-7, 5]
```

Output:

```
away.
```




## Modifying Strings

Strings can be changed after they are created. You can replace single characters or sections of a string using index positions.

### Changing Single Characters

You can update one character at a specific index.

- Strings are mutable
- Index positions start at zero
- Assign a new character to replace the original

Example: 

```ruby
item = "rocketship"

item[0] = "p"
item[1] = "a"
item[9] = "o"
puts item
```

Output:

```
packetshop
```

Every character has an index, and assigning a new value at that index updates the string in place.

### Replacing Multiple Characters

You can replace a section of a string by specifying a start index and length.

- First value is the start index
- Second value is how many characters to replace
- Replacement text can be any length

Example: 

```ruby
fact = "I love blueberry pie"

fact[7, 4] = "rasp"
puts fact

fact[7, 4] = "cherry"
puts fact

fact[7, 4] = "red"
puts fact
```

Output:

```
I love raspberry pie
I love cherryberry pie
I love redberry pie
```

This allows you to inject, expand, or shrink parts of a string while keeping index positions consistent.

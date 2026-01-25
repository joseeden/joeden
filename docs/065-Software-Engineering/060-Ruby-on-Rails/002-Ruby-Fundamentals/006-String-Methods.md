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

## `count`

The `count` method lets you find how many times a character or set of characters appears in a string.

```ruby
text = "Hello World"

puts text.count("l")        # Output: 3
puts text.count("w")        # Output: 0
puts text.count("lo")       # Output: 5
puts text.count("Wl")       # Output: 4
```

Notes: 

- Searching for `"l"` counts only lowercase `L`
- `"lo"` counts all lowercase `L`'s and `O`'s combined, not sequences
- `"Wl"` counts uppercase `W` and lowercase `L` together


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

## `insert`

The `insert` method adds characters into a string at a specific position without removing or replacing existing characters.

- Adds characters at a chosen index
- Works with one or multiple characters
- Can use positive or negative indexes

Examples: 

1. Inserting at a specific index:

    ```ruby
    text = "GorgeWashington"
    text.insert(5, "e ")
    puts text
    ```

    Output:

    ```
    George Washington
    ```

2. Inserting multiple characters: 


    ```ruby
    text = "RubyIsFun"
    text.insert(4, " Really ")
    puts text
    ```

    Output:

    ```
    Ruby Really IsFun
    ```
    
3. Using negative indexes:

    ```ruby
    text = "George Washigto"
    text.insert(-1, "n")
    puts text
    ```

    Output:

    ```
    George Washington
    ```


## `delete`

The `delete` method removes characters from a string. You can target one or more characters, and it will remove all occurrences.

For example, if you have `"cottage cheese"` and want to remove all lowercase `"c"`:

```ruby
text = "cottage cheese"
text.delete("c")
```

Output:

```bash
"ottage heese"
```

You can also remove multiple characters at once. For `"c"` and `"e"`:

```ruby
text = "cottage cheese"
text.delete("ce")
# => "ottag hs"
```

Output:

```bash
"ottag hs"
```

The order of characters in the argument does not matter. `"ce"` or `"ec"` gives the same result. This is like combining multiple delete calls into one.


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

Note that case methods always return a new string and leave the original unchanged.

- Original string stays the same
- New string is created in memory
- Assignment is required to keep the result

Example: 

```ruby
label = "maiN Street"
puts label.upcase         # Output: MAIN STREET
puts label.downcase       # Output: main street
puts label.swapcase       # Output: MAIn sTREET
puts label.capitalize     # Output: Main street

# Variable is not changed
puts label                # Output: maiN Street
```

To keep the result, store it in a variable:

```ruby
label = "main street"
upper_label = label.upcase
lower_label = label.downcase
swapped = label.swapcase
capitalized = label.capitalize
```



## `index` and `rindex`

The `index` method helps find the position of a character or substring in a string. It returns the first match as an integer or `nil` if not found.

- Search is case sensitive
- Index always counts from the start of the string
- Multiple characters are matched in order

`index` vs. `rindex`:

- `index` searches left to right from the start or given position
- `rindex` searches from the end of the string backward
- Both return positions relative to the start of the string

Examples:

1. Using `index`:

    ```ruby
    fact = "I am Very Handsome"
    puts fact.index("I")
    puts fact.index("E")
    puts fact.index("am")
    puts fact.index("Z")
    ```

    Output:

    ```
    0
    6
    2
    nil
    ```


2. Searching from a specific index:

    ```ruby
    puts fact.index("E", 3)
    puts fact.index("e", 7)
    ```

    Output:

    ```
    6
    17
    ```


3. Using `rindex` to search from the end of the string backward:

    ```ruby
    puts fact.rindex("E")     # last "E" from end
    puts fact.rindex("e")     # last "e" from end
    ```

    Output:

    ```
    17
    17

    ```



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



## `chars` and `each_char`

There are multiple ways to loop through each character in a string.

- `split('')` - Convert a string into an array of characters
- `chars` - Get an array of characters directly
- `each_char` - Iterate over characters without converting to an array

You can either convert a string to an array first or use `each_char` to loop directly. 

Examples:

1. Using `split` and `each`:

    ```ruby
    vehicle = "spaceship"
    characters = vehicle.split('')

    characters.each do |char|
      puts "#{char} is awesome"
    end
    ```

    Output:

    ```
    s is awesome
    p is awesome
    a is awesome
    c is awesome
    e is awesome
    s is awesome
    h is awesome
    i is awesome
    p is awesome
    ```

2. Using `chars`:

    ```ruby
    vehicle = "spaceship"
    vehicle.chars.each do |char|
      puts "#{char} is awesome"
    end
    ```

    Output is the same as no. 1.

    ```
    s is awesome
    p is awesome
    a is awesome
    c is awesome
    e is awesome
    s is awesome
    h is awesome
    i is awesome
    p is awesome
    ```

3. Using `each_char`:

    ```ruby
    vehicle = "spaceship"
    vehicle.each_char do |char|
      puts "#{char} is awesome"
    end
    ```


    Output is the same as no. 1.

    ```
    s is awesome
    p is awesome
    a is awesome
    c is awesome
    e is awesome
    s is awesome
    h is awesome
    i is awesome
    p is awesome
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

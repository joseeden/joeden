---
title: "Arrays"
description: "Arrays"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 18
last_update:
  date: 8/24/2023
---


## Running the Script

All examples in this section are written in a `main.rb` file and executed from the terminal.

To run the file:

```ruby
ruby /path/to/your/main.rb
```


## Creating an Array

Arrays store multiple values in one variable.

```ruby
my_list = [11, 8, 5, 14, 10, 23, 28, 12]
puts my_list
```

`puts` prints each element on a new line, which makes arrays easier to read.

```ruby
11
8
5
14
10
23
28
12
```


Using `print` does not add a new line.

```ruby
print my_list
print my_list
```

Output:

```ruby
[11, 8, 5, 14, 10, 23, 28, 12][11, 8, 5, 14, 10, 23, 28, 12]
```

We can manually add a new line with `puts`.

```ruby
print my_list
puts
print my_list
```

Output:

```ruby
[11, 8, 5, 14, 10, 23, 28, 12]
[11, 8, 5, 14, 10, 23, 28, 12]
```

Using `p` shows the array exactly as it is stored.

```ruby
p my_list
p my_list
```

Output:

```ruby
[11, 8, 5, 14, 10, 23, 28, 12]
[11, 8, 5, 14, 10, 23, 28, 12]
```


## Accessing an Element

We can get specific items from an array. For example, we can get the last item in the array:

```ruby
my_list = [11, 8, 5, 14, 10, 23, 28, 12]
p my_list.last
```

Output:

```ruby
12
```

To get the first element:

```ruby
p my_list.first
```

Output:

```ruby
11
```

To get a specific item, we can use its index:

```ruby
my_list = [11, 8, 5, 14, 10, 23, 28, 12]
p my_list[3]
```

Output:

```ruby
14
```

Index counting always begins at `0`, so index `3` refers to the fourth item in the array.


## Check if Element exists

We can check whether an array contains a value by using `include?`.

```ruby
my_list = [11, 8, 5, 14, 10, 23, 28, 12]
p my_list.include?(23)
```

Output:

```ruby
true
```

Arrays can also contain mixed types. When searching for a string, make sure to use double quotes for the string:

```ruby
mixed = ["apples", 23, 18, "oranges"]
p mixed.include?("bananas")
```

Output:

```ruby
false
```

## Numbers Range  

If we want to create an array of numbers without typing each one, we can use a **range** and then convert it to an array with `to_a`. A range can be specified with a starting and ending number, like this:

```ruby
hundred = 1..100
p hundred.to_a
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ..., 100]
```

**Note:** `to_a` works to convert ranges into arrays, but it cannot be used to convert a string or sentence into an array.

To shuffle the array, we can use `shuffle`:

```ruby
hundred = 1..100
p hundred.to_a.shuffle
```

Output:

```ruby
[93, 83, 24, 40, 51, 37, 6, 39, 16, 86, 68, 45, ...]
```

We can also store the converted array in a variable:

```ruby
tens = (1..10).to_a
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```


## Letters Range 

We can also create a range of letters in Ruby:

```ruby
my_letters = "a".."z"
p my_letters.to_a
```

Output:

```ruby
["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
"u", "v", "w", "x", "y", "z"]
```

Just like with numbers, we can shuffle the letters using `shuffle`:

```ruby
my_letters = "a".."z"
p my_letters.to_a.shuffle
```

Output:

```ruby
["h", "p", "m", "r", "v", "f", "s", "w", "l", 
"d", "q", "a", "n", "x", "z", "t", "i", "e", 
"c", "g", "k", "j", "o", "y", "b", "u"]
```

## Length or Size 

We can check how many items an array has using `length` or `size`:

```ruby
my_letters = "a".."z"
new_letters = my_letters.to_a

p new_letters.length
p new_letters.size
```

Output:

```ruby
26 
26 
```

## Mutate using a Bang


Some methods return a modified version of an array without changing the original.

- Methods with `!` change the array permanently
- The bang affects the variable itself

Without a bang, the array stays the same:

```ruby
tens = (1..10).to_a
p tens
p tens.reverse
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

With a bang, the change is permanent:

```ruby
tens = (1..10).to_a
p tens
p tens.reverse!
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```


## Append 

We can add items to the end of an array in multiple ways.

- `<<` adds one item to the end
- `push` adds one or more items
- `append` works the same as `push`

**NOTE**: All append methods permanently add items to the array.

Examples:

- Using `<<`:

    ```ruby
    tens = (1..10).to_a
    p tens

    tens << 24
    p tens
    ```

    Output:

    ```ruby
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 24]
    ```

- Using `push`:

    ```ruby
    tens = (1..10).to_a
    p tens

    tens.push(16)
    p tens
    ```

    Output:

    ```ruby
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16]
    ```

- Using `append`:

    ```ruby
    tens = (1..10).to_a
    p tens

    tens.append(13)
    p tens
    ```

    Output:

    ```ruby
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
    ```


## Prepend 

We can add items to the beginning of an array using `unshift`, 

**NOTE:** The array is mutated immediately.

Example:

```ruby
tens = (1..10).to_a
p tens

tens.unshift("Hello")
p tens
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
["Hello", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Prepending shifts all existing elements to the right and changes the array.


## Pop 

We can remove items from the end of an array using `pop`.

**NOTE:** The array is always mutated

Example:

```ruby
items = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p items.pop
```

Output:

```ruby
"kiwis"
```

Multiple pops show the changes are actually being saved on the variable:

```ruby
items = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p items

p items.pop
p items.pop
p items.pop

p items
```

Output:

```ruby
["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

"kiwis"
38
"pears"

["apples", 23, 18, "oranges"]
```

Unlike some methods, `pop` always mutates the array without needing a bang.


## Duplicates 

To remove duplicates from an array, use `uniq` method...

in example below, the number `13` exists at the start and end...

```ruby
tens = (1..10).to_a 
tens.append(13)
tens.unshift(13)
p tens
```

output

```ruby
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
```

can use `uniq` ..

```ruby
tens = (1..10).to_a 
tens.append(13)
tens.unshift(13)

p tens.uniq
```

output

```ruby
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```


note that simply adding it doesnt make changes permanent, as seen when printed again...

```ruby
tens = (1..10).to_a 
tens.append(13)
tens.unshift(13)

p tens
p tens.uniq
p tens 
```

output

```ruby
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
```

to make permanent, use the bang (`!`)..

```ruby
tens = (1..10).to_a 
tens.append(13)
tens.unshift(13)
p tens
p tens.uniq!
p tens 
```

output

```ruby
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Join and Split

short intro..

```ruby
my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p my_list.join
```

outptu 

```ruby
"apples2318orangespears38kiwis" 
```

We can also add a separator..

```ruby
my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p my_list.join("-")
```

outptu 

```ruby
"apples-23-18-oranges-pears-38-kiwis"
```

The other way is to split...in this example, result is stored to variable `foo`..

```ruby
my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
foo = my_list.join("-")
p foo 
```

Lets say we want to get all items joined by "-",..we can..

```ruby
bar = foo.split("-")
p bar
```

output 

```ruby
["apples", "23", "18", "oranges", "pears", "38", "kiwis"]
```

## Convert to Array

There are different ways to turn data into arrays in Ruby.

- `to_a` works with ranges
- Strings cannot use `to_a`
- `%w` creates arrays from words

Converting a range into an array:

```ruby
nums = 1..10
p nums.to_a
```

Output:

```ruby
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Trying to convert a string with `to_a` does not work:

```ruby
quote = "Dinosaurs eat Man. Woman inherits the earth."
p quote.to_a
```

This returns an error:

```ruby
p quote.to_a
       ^^^^^
Did you mean?  to_f
               to_i
               to_s
               to_c
               to_r 
```

Instead, use `%w` to turn words into an array:

```ruby
p %w(Dinosaurs eat Man. Woman inherits the earth)
```

Output:

```ruby
["Dinosaurs", "eat", "Man.", "Woman", "inherits", "the", "earth"]
```

## Iterators 

Arrays can be looped through using different approaches.

- `for` loops are supported
- `each` is the Ruby-preferred way
- Blocks can be multi-line or one-line

All methods iterate through the array, but `each` follows Ruby conventions.

- Using a `for` loop:

    ```ruby
    items = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

    for item in items
      p item
    end
    ```

    Output:

    ```ruby
    "apples"
    23
    18
    "oranges"
    "pears"
    38
    "kiwis"
    ```

- Using `each` with a block:

    ```ruby
    items.each do |item|
      p item
    end
    ```

    Output:

    ```ruby
    "apples"
    23
    18
    "oranges"
    "pears"
    38
    "kiwis"
    ```

- Using `each` in a single line:

    ```ruby
    items.each { |item| p item }
    ```

    Output:

    ```ruby
    "apples"
    23
    18
    "oranges"
    "pears"
    38
    "kiwis"
    ```


## Select Operator 

We can filter values from an array based on a condition.

- `select` checks each item
- Only matching items are returned
- The original array is not changed

Examples: 

- Selecting odd numbers:

    ```ruby
    nums = (1..10).to_a
    p nums
    p nums.select { |n| n.odd? }
    ```

    Output:

    ```ruby
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    [1, 3, 5, 7, 9]
    ```

- Selecting even numbers:

    ```ruby
    p nums.select { |n| n.even? }
    ```

    Output:

    ```ruby
    [2, 4, 6, 8, 10]
    ```

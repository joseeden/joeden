---
title: "Array Indexing"
description: "Array Indexing"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 26
last_update:
  date: 8/24/2023
---


## Accessing an Element

Arrays keep items in a fixed order, just like characters in a string. Ruby tracks this order using index positions that start at zero (`0`)

## Zero-based Indexing 

Consider the example below:

```ruby
fruits = ["apple", "orange", "grape", "banana"]
```

Where: 

- Index `0` refers to the first element
- Index `1` refers to the second element
- The last index is always length minus one

To access elements by index: 

```ruby
p fruits[0]  # Output: "apple"
p fruits[1]  # Output: "orange"
p fruits[3]  # Output: "banana"
```

We can also use the `first` and `last` methods:

```ruby
p fruits.first  # Output: "apple"
p fruits.last   # Output: "banana"
```

If you try to access an index that does not exist, Ruby returns `nil`, which means no value is there.

```ruby
p fruits[100]  # nil
```


## Negative indexing

You can also count from the end of the array using negative numbers.

- `-1` means the last element
- `-2` means the second to last element

Example: 

```ruby
fruits = ["apple", "orange", "grape", "banana"]

p fruits[-1]  # "banana"
p fruits[-2]  # "grape"
p fruits[-4]  # "apple"
p fruits[-10] # nil
```

Negative indexing is useful when you want values relative to the end without knowing the array length, which again depends on the array’s ordered structure.

## Using `slice`

Ruby provides a method alternative to square brackets called `slice`.

```ruby
p fruits.slice(0)   # "apple"
p fruits.slice(-3)  # "orange"
p fruits.slice(10)  # nil
```

`slice` behaves the same way as bracket indexing and exists as another way to work with ordered elements.

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

## Using `fetch` 

The `fetch` method is another way to read values from an array by index:

- Accepts an index position
- Supports negative indexes
- Can return a default value instead of `nil`

Consider the example below:

```ruby
airports = ["JFK", "LAX", "ORD", "ATL", "DFW", "DEN"]
```

We can use `fetch` with a normal index:

```ruby
airports.fetch(2)
```

Output:

```text
"ORD"
```

We can also use negative indexes to count from the end:

```ruby
airports.fetch(-2)
```

Output:

```text
"DFW"
```

If you request an index that is outside the array range, `fetch` raises an error instead of returning `nil`.

```ruby
airports.fetch(100)
```

Output:

```text
'Array#fetch': index 100 outside of array bounds: -6...6 (IndexError)
```

This is different from `airports[100]`, which would quietly return `nil`. Using `fetch` makes missing indexes more obvious.

## Using `fetch` with Default Value

`fetch` allows a second argument that acts as a fallback value.

```ruby
airports = ["JFK", "LAX", "ORD", "ATL", "DFW", "DEN"]

airports.fetch(100, "Unknown airport")
```

Output:

```text
"Unknown airport"
```

If the index exists, the real value is returned:

```ruby
airports.fetch(1, "Unknown airport")
```

Output:

```text
"LAX"
```

The default value is only used when the index does not exist.


## Overwriting Elements

You can replace a value at a specific index by assigning a new value.

```ruby
fruits = ["apple", "orange", "grape", "banana"]

fruits[1] = "watermelon"
p fruits
```

Output:

```text
["apple", "watermelon", "grape", "banana"]
```

## Adding beyond the Current Length

If you assign a value just past the end of the array, Ruby appends it.

```ruby
fruits = ["apple", "orange", "grape", "banana"]

fruits[4] = "raspberry"
p fruits
```

Output:

```text
["apple", "watermelon", "grape", "banana", "raspberry"]
```

If you assign a value far beyond the end, Ruby fills the gaps with `nil`.

```ruby
fruits[10] = "kiwi"
p fruits
```

Output:

```text
["apple", "watermelon", "grape", "banana", "raspberry", nil, nil, nil, nil, nil, "kiwi"]
```

Ruby does this to preserve index order, even when values are added far ahead.

## Extract and Overwrite Multiple Elements

You can extract or replace several elements in one operation, similar to how you handle characters in a string.

Consider the example below:

```ruby
sesame_street = [
  "Elmo",
  "Big Bird",
  "Cookie Monster",
  "Bert",
  "Ernie",
  "Oscar"
]

# Extract the first three elements
p sesame_street[0,3]

# Extract four elements starting at index 2
p sesame_street[2,4]

# Using slice method (same results)
p sesame_street.slice(0,3)
p sesame_street.slice(2,4)
```

Output:

```bash
["Elmo", "Big Bird", "Cookie Monster"]

["Cookie Monster", "Bert", "Ernie", "Oscar"]

["Elmo", "Big Bird", "Cookie Monster"]
["Cookie Monster", "Bert", "Ernie", "Oscar"]
```

You can also overwrite multiple elements:

```ruby
# Replace Bert and Ernie with Stinky and Kermit
sesame_street[3,2] = ["Stinky", "Kermit"]
p sesame_street

# Replace same indices with three elements
sesame_street[3,2] = ["Bert", "Ernie", "Julia"]
p sesame_street
```

Output:

```bash
["Elmo", "Big Bird", "Cookie Monster", "Stinky", "Kermit", "Oscar"]

["Elmo", "Big Bird", "Cookie Monster", "Bert", "Ernie", "Julia", "Oscar"]
```

## Extract Specific Elements with `values_at`

You can pick any elements from an array by specifying their index positions. This is useful when elements are not next to each other.

For example, here is an array of TV channels:

```ruby
channels = ["CBS", "UPN", "CW", "Fox", "NBC", "ESPN"]

# Extract first and fifth elements
p channels.values_at(0,4)

# Extract second, fourth, and last elements
p channels.values_at(1,3,5)

# Mix positive and negative indices
p channels.values_at(1,-1)

# Duplicate indices
p channels.values_at(3,3,-1)

# Access non-existent indices
p channels.values_at(0,1,10,-100)
```

Output:

```bash
["CBS", "NBC"]

["UPN", "Fox", "ESPN"]

["UPN", "ESPN"]

["Fox", "Fox", "ESPN"]

["CBS", "UPN", nil, nil]
```

`values_at` allows you to extract elements in any order, include duplicates, and mix positive and negative indices. If an index does not exist, Ruby returns `nil`. 

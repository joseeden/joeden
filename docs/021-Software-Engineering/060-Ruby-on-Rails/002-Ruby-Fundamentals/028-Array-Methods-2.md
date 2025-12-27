---
title: "Array Methods 2"
description: "Array Methods 2"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 28
last_update:
  date: 8/24/2023
---


## `reverse`

The `reverse` method flips the order of elements in an array and returns a new array.

Example:

```ruby
numbers = [4, 8, 15, 16, 23, 42]
reversed = numbers.reverse
p reversed
p numbers
```

Output:

```
[42, 23, 16, 15, 8, 4]
[4, 8, 15, 16, 23, 42]
```

Using `reverse!` modifies the original array:

```ruby
numbers.reverse!
p numbers
```

Output:

```
[42, 23, 16, 15, 8, 4]
```

`reverse` is useful when you need a flipped version of an array without changing the original.

## `sort`

The `sort` method arranges elements in ascending order for numbers or alphabetical order for strings. It can be combined with `reverse` for descending or reverse alphabetical order

Example with numbers:

```ruby
nums = [2, 3, 1]
p nums.sort
p nums.sort.reverse
```

Output:

```
[1, 2, 3]
[3, 2, 1]
```

Example with strings:

```ruby
words = ["Hello", "Blah", "Zebra"]
p words.sort
p words.sort.reverse
```

Output:

```
["Blah", "Hello", "Zebra"]
["Zebra", "Hello", "Blah"]
```

Ruby sorts capital letters before lowercase letters, so lowercase words appear after all uppercase words.

## `compact`

The `compact` method removes all `nil` values from an array and returns a new array. It is helpful when you want to remove invalid or empty elements after processing an array.

Example:

```ruby
items = ["football", "soccer", nil, "baseball", nil]
clean_items = items.compact
p clean_items
p items
```

Output:

```
["football", "soccer", "baseball"]
["football", "soccer", nil, "baseball", nil]
```

Using `compact!` modifies the original array:

```ruby
items.compact!
p items
```

Output:

```
["football", "soccer", "baseball"]
```


## `flatten`

The `flatten` method turns a nested array into a single, one dimensional array.

This method is useful when your array contains other arrays and you want one simple list with no nesting.

```ruby
attendees = [
  "Alex",
  ["Ben", "Chris", "Dana"],
  "Ella",
  ["Frank", ["Grace"]]
]

flat_list = attendees.flatten
puts flat_list
```

Output:

```ruby
["Alex", "Ben", "Chris", "Dana", "Ella", "Frank", "Grace"]
```

No matter how deeply elements are nested, `flatten` pulls everything into one level.


## `sample`

The `sample` method lets you randomly pick elements from an array.

This method is useful when you need randomness, such as choosing items or making random selections.

```ruby
flavors = ["Chocolate", "Vanilla", "Strawberry", "Cookies and Cream"]

puts flavors.sample
```

Output:

```ruby
"Vanilla"
```

Each run may return a different flavor, since the selection is random.

```ruby
puts flavors.sample(2)
```

Output:

```ruby
["Strawberry", "Chocolate"]
```

When given a number, `sample` returns a new array containing that many random elements. If the number is larger than the array size, Ruby simply returns all elements in a random order.

```ruby
numbers = [1, 2, 3, 4]

puts numbers.sample(2)
puts numbers.sample(10)
```

Output:

```ruby
[3, 1]
[4, 2, 1, 3]
```

In both cases, the original array remains unchanged, and `sample` safely returns random elements based on the requested count.

## `reduce` and `inject`

`reduce` and `inject` are used to turn an array into a single value. They are the same method with two different names, so you can use either one.

The method starts with an initial value called the **accumulator** and updates it on each iteration. The block receives two values: 

- Accumulator
- Current element

Whatever the block returns becomes the accumulator for the next loop, which is how the value is built over time.

Example: 

```ruby
numbers = [10, 20, 30]

total = numbers.reduce(0) do |sum, number|
  sum + number
end
```

Output:

```ruby
60
```

Here, the accumulator starts at `0`. On each iteration, the current number is added to it, and the updated value is passed to the next step until the array is fully processed.

The starting value controls where the calculation begins. Changing it changes the final result but not the process.

```ruby
numbers.reduce(100) { |sum, number| sum + number }
```

Output:

```ruby
160
```

This still reduces the array to one value, but it starts from a different base.

The accumulator does not have to be a number. You can also build more complex objects, such as a hash, while iterating through the array.

```ruby
colors = ["red", "blue", "red"]

color_counts = colors.reduce({}) do |counts, color|
  if counts[color].nil?
    counts[color] = 1
  else
    counts[color] += 1
  end
  counts
end
```

Output:

```ruby
{"red"=>2, "blue"=>1}
```

In this case, the accumulator starts as an empty hash and is updated on each iteration. The final hash is the single value produced by reducing the array.

:::info 

You can replace `reduce` with `inject` in any of these examples and get the same result, because both names perform the same reduction process of turning many elements into one meaningful value.

:::

## Multiplying Arrays

You can multiple arrays using the asterisk operator (`*`), which repeats the array elements to form a new array.

- The operator repeats array contents
- The original array is not changed
- A new array is returned with repeated elements

When an array is multiplied by a number, Ruby takes all elements in the array and repeats them that many times in order. 

```ruby
letters = ["A", "B", "C"]
result = letters * 3
```

Output:

```ruby
["A", "B", "C", "A", "B", "C", "A", "B", "C"]
```

In this example, the original array has three elements, and multiplying it by three repeats the entire array three times, which create a new array with nine elements. 

## Union of Arrays 

A union combines multiple arrays into one new array while removing all duplicate values.

- Combines elements from two or more arrays
- Removes duplicates within and across arrays
- Returns a new array without modifying the originals

The union is done using the vertical pipe operator (`|`). This operator takes the values from the left array and the right array, merges them, and removes any duplicates it finds.

```ruby
arr1 = [1, 2, 3, 3, 4]
arr2 = [3, 4, 5, 6]

result = arr1 | arr2
```

Output:

```ruby
[1, 2, 3, 4, 5, 6]
```

Even though both arrays contain repeated values, Ruby keeps only one occurrence of each element, which matches the idea of a union.

#### Duplicates 

Duplicates are removed everywhere. This includes duplicates inside a single array and duplicates shared between arrays.

```ruby
[1, 1, 2, 2, 3] | [2, 3, 3, 4]
```

Output:

```ruby
[1, 2, 3, 4]
```

Behind the scenes, the pipe operator is just a method on the array object. It can be called like any other method and produces the same result.

```ruby
[1, 2, 3].|( [3, 4, 5] )
```

Output:

```ruby
[1, 2, 3, 4, 5]
```


#### Multiple Arrays 

You can also combine more than two arrays by chaining the pipe operator. Ruby will still return a single array with all unique values.

```ruby
[1, 2, 3] | [3, 4, 5] | [4, 5, 6]
```

Output:

```ruby
[1, 2, 3, 4, 5, 6]
```

In all cases, creating a union means merging arrays together while keeping only unique elements, which keeps the final result consistent and easy to work with.

## Removing Elements using Subtraction 

You can remove multiple values from an array in a single, simple operation.

- Use a starting array
- Subtract another array
- Remove all matching values

When you subtract one array from another, Ruby removes every element from the first array that appears in the second array. This works for all occurrences, no matter how many times or where they appear, and returns a brand new array.

```ruby
numbers = [1, 1, 2, 2, 3, 3, 3, 4, 5]
result = numbers - [2, 3]

puts result
```

Output:

```text
[1, 1, 4, 5]
```

In this example, all occurrences of `2` and `3` are removed from the original array, while values that are not listed in the second array remain unchanged.

The subtraction operator is actually a method in Ruby, and it behaves the same way when called directly.

```ruby
numbers = [1, 1, 2, 2, 3, 3, 3, 4, 5]
result = numbers.-([2, 3])

puts result
```

Output:

```text
[1, 1, 4, 5]
```

Both approaches do the same thing and return the same output. This makes array subtraction an easy way to remove a batch of unwanted elements in one step.

## Array Intersection 

Array intersection finds values that are common in all arrays. It does not merge everything, only keeps shared values.

- Combines multiple arrays
- Keeps only shared elements
- Removes anything not common

This focuses on values that exist together across arrays, so the final result contains only the elements everyone shares.

#### Basic Intersection 

You can create an intersection using the `&` operator.

This works by checking each value and keeping it only if it exists in both arrays:

```ruby
array_one = [1, 2, 3, 4, 5]
array_two = [1, 4, 5, 8, 9]

result = array_one & array_two
puts result.inspect
```

Output:

```text
[1, 4, 5]
```

Only `1`, `4`, and `5` appear in both arrays, so they are the only values kept.


#### Across Multiple Arrays

You can also intersect more than two arrays by chaining the `&` operator.

Each added array makes the rule stricter, because values must appear everywhere to remain included.

```ruby
array_one = [1, 2, 3, 4, 5]
array_two = [1, 4, 5, 8, 9]
array_three = [4, 5, 10, 11]

result = array_one & array_two & array_three
puts result.inspect
```

Output:

```text
[4, 5]
```

Even though `1` appears in the first two arrays, it is removed because it is missing from the third.

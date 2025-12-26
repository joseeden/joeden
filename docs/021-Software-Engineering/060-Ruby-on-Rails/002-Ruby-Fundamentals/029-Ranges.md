---
title: "Ranges"
description: "Ranges"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 29
last_update:
  date: 8/24/2023
---


## Numeric Ranges

A range is a sequence of numbers or letters in order. It represents a span of values from a starting point to an ending point.

- Two dots (`..`) create an *inclusive* range, includes the last value
- Three dots (`...`) create an *exclusive* range, excludes last value
- Ranges can be used like arrays to get first, last, or slices of elements

Example:

```ruby
inclusive_nums = 1..5
exclusive_nums = 1...5
```

Where: 

- `inclusive_nums` includes 1, 2, 3, 4, 5
- `exclusive_nums` includes 1, 2, 3, 4

To get first or last elements:

```ruby
p inclusive_nums.first      
p inclusive_nums.last       

p exclusive_nums.first      
p exclusive_nums.last       
```

Output:

```bash
1
5

1
5
```

Note that the exclusive dots (`...`) only affect enumeration, not the stored upper bound.

- `1..5` means **go up to and include** 5
- `1...5` means **go up to but do not include** 5
- In both cases, the upper bound is still 5

The `.last` returns the **end boundary for both**, but they differ with the last iterated values.

To get multiple elements as an array:

```ruby
p inclusive_nums.first(3)  # Output: [1, 2, 3]
p exclusive_nums.first(3)  # Output: [1, 2, 3]

p inclusive_nums.last(3)   # Output: [3, 4, 5]
p exclusive_nums.last(3)   # Output: [2, 3, 4]
```

Where:

- First and last return a single value without an argument
- Providing a number returns an array of that many elements

When calling methods on a range in one line, use parentheses to avoid confusion:

```ruby
p (2...10).last(2)         # Output: [8, 9]
p (5..13).last(2)          # Output: [12, 13]
```

## Alphabetic Ranges

An alphabetic range is a sequence of letters from a starting character to an ending character. 

- Two dots (`..`) include the final letter
- Three dots (`...`) exclude the final letter
- Uppercase and lowercase letters are treated as different characters

Example of a lowercase alphabet range:

```ruby
alphabet = "a".."z"
```

To get values from the range:

```ruby
p alphabet.first
p alphabet.last
```

Output:

```ruby
"a"
"z"
```

To retrieve multiple values from a range, pass a number to `first` or `last`:

```ruby
p alphabet.first(3)
p alphabet.last(5)
```

When an argument is provided, the result is always returned as an array:

```ruby
["a", "b", "c"]
["v", "w", "x", "y", "z"]
```

Example with uppercase and lowercase:

```ruby
alphabet = "A".."z"
p alphabet.first(5)
```

Output:

```ruby
["A", "B", "C", "D", "E"]
```

Ruby orders uppercase letters before lowercase letters and includes other characters in between based on internal sorting rules. This means mixing cases in a single range can produce unexpected results.

Example of a partial alphabet range:

```ruby
letters = "g".."w"
p letters.to_a
```

Output:

```ruby
["g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w"]
```

:::info

The `to_a` method converts the range to an array.

:::

## Checking Values in a Range

You can check whether a value exists inside a range using the following methods:

- `include?` checks if a value exists in the range
- `member?` does the same check with a different name
- `===` checks if a value belongs to the range

Example:

- Using `include?`:

    ```ruby
    alphabet = "a".."z"

    p alphabet.include?("j")
    p alphabet.include?("z")
    p alphabet.include?("J")
    ```

    Output:

    ```ruby
    true
    true
    false
    ```

    This works because the range includes lowercase letters from `a` to `z`, but not uppercase letters.


- Using `member?`:

    ```ruby
    p alphabet.member?("j")
    p alphabet.member?("z")
    p alphabet.member?("J")
    ```

    Output:

    ```ruby
    true
    true
    false
    ```

    `member?` is simply another name for `include?` and behaves the same way.


- Using the triple equals operator `===`:

    ```ruby
    p alphabet === "j"
    p alphabet === "z"
    p alphabet === "J"
    ```

    Output:

    ```ruby
    true
    true
    false
    ```

All three approaches check for membership in a range and return the same result, so you can choose the one that best fits your reading style or code clarity.



## Extracting Characters

### Using Ranges with Strings

You can extract parts of a string by passing a range inside square brackets or to the `slice` method.

```ruby
story = "Once upon a time in a land far, far away"
```

Where: 

- Square brackets accept a range
- The range represents start and end index positions
- The result is a new string

To get a range: 

```ruby
p story[27..39]
```

Output:

```ruby
"far, far away"
```

Same result is produced when you use `slice`:

```ruby
p story.slice(27..39)
```

Output:

```ruby
"far, far away"
```


You can also control whether the ending index is included or excluded. An *inclusive range* includes the last index, while an *exclusive range* stops just before it.

```ruby
p story[27...39]
```

Output:

```ruby
"far, far awa"
```

If a range goes past the end of a string, Ruby does not raise an error and instead extracts up to the end.

```ruby
p story[27..200]
```

Output:

```ruby
"far, far away"
```


### Using Negative Indexes

Ranges can include negative values to count from the end of the string.

```ruby
story = "Once upon a time in a land far, far away"
p story[32..-9]
```

Output:

```ruby
"far"
```

Using an exclusive range shortens the result:

```ruby
p story[32...-9]
```

Output:

```ruby
"fa"
```


### Replacing Parts of a String 

Ranges can also target sections of a string for replacement.

```ruby
story = "Once upon a time in a land far, far away"
story[12..15] = "season"
p story
```

Output:

```ruby
"Once upon a season in a land far, far away"
```

### Using Ranges with Arrays

The same range rules apply to arrays. Consider the sample array below:

```ruby
numbers = [1, 3, 5, 7, 9, 15, 21, 18, 6]
```

Where: 

- Ranges select multiple elements
- The result is a new array
- Index rules are identical to strings

Using an inclusive range: 

```ruby
p numbers[4..6]
```

An inclusive range returns all elements from index 4 through 6, as seen in the output:

```ruby
[9, 15, 21]
```

Using an exclusive range:

```ruby
p numbers[4...6]
```

Output:

```ruby
[9, 15]
```

## Using `case` with Ranges

A `case` statement is useful when you need to check one value against multiple related conditions. 

- Case replaces long if and else if chains
- Ranges define valid intervals clearly
- The first matching condition is returned

Below is a sample method that converts a numeric test score into a letter grade.

```ruby
def calculate_test_grade(score)
  case score
  when 90..100
    "A"
  when 80..89
    "B"
  when 70..79
    "C"
  when 60..69
    "D"
  else
    "F"
  end
end
```

Each `when` checks if the score falls inside a specific range. Ruby evaluates the ranges from top to bottom and stops at the first match, which keeps the logic simple and predictable.

:::info 

For more information, please see [Methods.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/045-Methods.md)

::: 

To test the method, provide different grades as argument:

```ruby
p calculate_test_grade(95)
p calculate_test_grade(83)
p calculate_test_grade(78)
p calculate_test_grade(62)
p calculate_test_grade(13)
```

Output:

```ruby
"A"
"B"
"C"
"D"
"F"
```

When each condition only returns a single value, the logic can be written more compactly using `then`. Below is the updated method:

```ruby
def calculate_test_grade(score)
  case score
  when 90..100 then "A"
  when 80..89  then "B"
  when 70..79  then "C"
  when 60..69  then "D"
  else "F"
  end
end
```

The version above behaves exactly the same but reduces is much easier to read.

```ruby
p calculate_test_grade(95)
p calculate_test_grade(83)
p calculate_test_grade(78)
p calculate_test_grade(62)
p calculate_test_grade(13)
```

Output:

```ruby
"A"
"B"
"C"
"D"
"F"
```

## Converting a Range to an Array

You can turn a range into an array to make it easier to work with its elements using indexing or array methods.

- Use the `to_a` method to convert a range to an array
- The array allows access by index, unlike a range
- Works for both letters and numbers

Examples:

- With alphabetic range:

    ```ruby
    letters_range = 'A'..'T'
    letters_array = letters_range.to_a

    p letters_array
    p letters_array.class
    p letters_array[0]
    p letters_array[10]
    ```

    Output:

    ```ruby
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"]
    Array
    "A"
    "K"
    ```

    Converting to an array allows you to index or slice elements, which you cannot do directly with a range.


- With numeric range:

    ```ruby
    numbers_range = 415...450
    numbers_array = numbers_range.to_a

    p numbers_array.first
    p numbers_array.last
    ```

    Output:

    ```ruby
    415
    449
    ```


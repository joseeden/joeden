---
title: "Array Iteration"
description: "Array Iteration"
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

## Using Blocks

Array iteration means going through each element of an array one by one. In Ruby, most iteration methods use a **block**, which is a chunk of code attached to a method.

- A block is a procedure that tells Ruby what to do for each element.
- Use **curly braces** `{}` for single-line blocks.
- Use `do…end` for multi-line blocks.

:::info

For more information, please see [Blocks.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/041-Blocks.md)

:::

Blocks can also accept a **block variable**, which represents the current element during iteration.

```ruby
3.times { |n| puts "Currently iterating loop number #{n}" }
```

Output:

```
Currently iterating loop number 0
Currently iterating loop number 1
Currently iterating loop number 2
```

For multi-line blocks:

```ruby
4.times do |n|
  square = n * n
  puts "The current number is #{n} and its square is #{square}"
end
```

Output:

```
The current number is 0 and its square is 0
The current number is 1 and its square is 1
The current number is 2 and its square is 4
The current number is 3 and its square is 9
```

## `each`

The `each` method lets you go through each element of an array. You provide a block that specifies what should happen to each element.

```ruby
names = ["bo", "mo", "jo"]

names.each { |name| puts name.upcase }
```

Output:

```
BO
MO
JO
```

For multi-line logic:

```ruby
numbers = [1, 2, 3, 4, 5]

numbers.each do |current_number|
  calculation = current_number * current_number
  puts "The square of #{current_number} is #{calculation}"
end
```

Output:

```
The square of 1 is 1
The square of 2 is 4
The square of 3 is 9
The square of 4 is 16
The square of 5 is 25
```

## `each_with_index`

You can use the `each_with_index` method to know both the value of an element and its position in an array. It works like `each` but its also adds the position info.

Example:

```ruby
colors = ["red", "blue", "green", "yellow"]

colors.each_with_index do |color, index|
  puts "Value for index position #{index} is #{color}"
end
```

Output:

```
Value for index position 0 is red
Value for index position 1 is blue
Value for index position 2 is green
Value for index position 3 is yellow
```

Each color is printed with its index. 

- The first block variable is the element
- The second is the index
- Order matters, and the names are up to you.


Example with numbers and extra logic:

```ruby
numbers = [5, 10, 15]

numbers.each_with_index do |number, index|
  puts "Number is #{number} at index #{index}, product is #{number * index}"
end
```

Output:

```
Number is 5 at index 0, product is 0
Number is 10 at index 1, product is 10
Number is 15 at index 2, product is 30
```

## Filtering Arrays 

Filtering an array means selecting or ignoring elements based on a condition. You can either process them directly or collect them into a new array.

Example: Print only even numbers from an array of multiples of five

```ruby
fives = [5, 10, 15, 20, 25, 30, 35, 40]

fives.each do |num|
  puts num if num.even?
end
```

Output:

```
10
20
30
40
```

Here, each number is checked, and only even numbers are printed using the `even?` method.

You can also collect filtered items into a new array without changing the original:

```ruby
evens = []

fives.each do |num|
  evens.push(num) if num.even?
end

puts evens.inspect
```

Output:

```
[10, 20, 30, 40]
```

This loops through each number, adds it to `evens` if it meets the condition, and keeps the original array unchanged.

For simpler tasks, you can use a one-line block:

```ruby
evens = []
fives.each { |num| evens.push(num) if num.even? }
puts evens.inspect
```

Output:

```
[10, 20, 30, 40]
```

The one-liner does the same filtering more concisely while still checking every element.


## Nested `each` Loops 

We can put an `each` loop inside another `each` loop to handle multiple layers of data.

This is useful when we want all possible pairings of items, like shirts and ties.

```ruby
shirts = ["striped", "white", "plaid", "band"]
ties = ["polka dot", "solid", "boring"]

shirts.each do |shirt|
  ties.each do |tie|
    option = "#{shirt} shirt with #{tie} tie"
    puts option
  end
end
```

Output:

```
striped shirt with polka dot tie
striped shirt with solid tie
striped shirt with boring tie
white shirt with polka dot tie
white shirt with solid tie
white shirt with boring tie
plaid shirt with polka dot tie
plaid shirt with solid tie
plaid shirt with boring tie
band shirt with polka dot tie
band shirt with solid tie
band shirt with boring tie
```

Where: 

- The outer loop goes through each shirt
- The inner loop goes through each tie for the current shirt
- We can access both `shirt` and `tie` inside the inner loop, but only `shirt` in the outer loop

Nested loops run one after another in order. Each shirt waits until all its tie combinations are processed before moving to the next shirt. 

## `for` Loop 

The `for` loop lets you go through elements of a data structure one by one, similar to `each`.

Example with an array:

```ruby
for number in [1, 2, 3]
  puts number
end
```

Output:

```
1
2
3
```

Note that the `for` loop variable persists after the loop:

```ruby
puts number
```

Output:

```
3
```

This can sometimes cause confusion if the variable is reused later.


## `for` and `each` with Ranges

The `for` loop works with ranges too.

:::info 

For more information, please see [Ranges.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/029-Ranges.md)

:::

Example:

```ruby
for value in 1..5
  puts "Current value is #{value}"
end
```

The variable `value` still exists after the loop and holds the last number, which is not always ideal.

Output:

```
Current value is 1
Current value is 2
Current value is 3
Current value is 4
Current value is 5
```

Using `each` is the Ruby-preferred way to iterate because it has cleaner syntax and the block variables exists only inside the block.

```ruby
(1..5).each do |num|
  puts "Current number is #{num}"
end
```

Output:

```
Current number is 1
Current number is 2
Current number is 3
Current number is 4
Current number is 5
```

The variable `num` does not exist after the block ends, which keeps the code self-contained.

The `for` loop is still valid Ruby and exists for historical and readability reasons, but `each` is usually preferred for modern, clean, and safe code.


## `while` and `until`

You can go through each element of an array using loops. This lets you access and use each item in order. Consider the example below:

```ruby
animals = ["lion", "zebra", "baboon", "cheetah"]
i = 0

while i < animals.length
  puts "Index is #{i} and animal is #{animals[i]}"
  i += 1
end
```

Output:

```
Index is 0 and animal is lion
Index is 1 and animal is zebra
Index is 2 and animal is baboon
Index is 3 and animal is cheetah
```

Where:
 
- The `while` loop runs as long as the index is less than the array length
- Increment the index inside the loop to avoid infinite loops
- Access the current element with `animals[i]`

You can also use `until` to loop until a condition becomes true.

```ruby
i = 0
until i == animals.length
  puts "Index is #{i} and animal is #{animals[i]}"
  i += 1
end
```

This gives the same output as the `while` loop.

- `until` runs until the condition is true, opposite of `while`
- Logic inside the loop is the same as `while`
- Works for arrays of any length because we use `animals.length`

## `map` and `collect`

`map` and `collect` are used to create a new array by applying a consistent operation to each element of an existing array. They are **aliases**, which means they do the same thing.

- Generate a new array from an original array
- Apply the same operation to each element
- Return the new array automatically

Examples: 

1. Get the length of each bird name:

    ```ruby
    birds = ["eagle", "sparrow", "pigeon", "hawk", "penguin"]

    lengths = birds.map { |name| name.length }

    puts lengths.inspect
    ```

    Output:

    ```
    [5, 7, 6, 4, 7]
    ```

    Here, each string in the `birds` array is mapped to its length. Map automatically builds a new array without manually initializing it or pushing elements.

    You can also use `collect` the same way:

    ```ruby
    lengths = birds.collect { |name| name.length }
    puts lengths.inspect
    ```

    Output:

    ```
    [5, 7, 6, 4, 7]
    ```

2. Convert all bird names to uppercase:

    ```ruby
    uppercase_birds = birds.map { |bird| bird.upcase }
    puts uppercase_birds.inspect
    ```

    Output:

    ```
    ["EAGLE", "SPARROW", "PIGEON", "HAWK", "PENGUIN"]
    ```

## `select` and `reject`

Sometimes you want to create a smaller array from an original array based on a condition.

- `select` keeps elements that meet a condition
- `reject` skips elements that meet a condition
- Both return a new array

Examples:

1. Using `select`:

    ```ruby
    words = ["racecar", "selfless", "sentences", "level"]

    palindromes = words.select { |foo| foo == foo.reverse }

    puts palindromes.inspect
    ```

    Output:

    ```
    ["racecar", "level"]
    ```

    `select` checks each element and keeps it if the condition is true. Here we compare each word to its reverse to find palindromes. The new array is a subset of the original array.
      
2. Using `reject`:

    ```ruby
    animals = ["cheetah", "cat", "lion", "elephant", "dog", "cow"]

    no_c_animals = animals.reject { |animal| animal.include?("c") }

    puts no_c_animals.inspect
    ```

    Output:

    ```
    ["lion", "elephant", "dog"]
    ```

    `reject` works opposite to `select`. It removes elements when the condition is true and keeps the rest. Here we exclude animals with the letter "c".

## `partition`

The `partition` method lets you split an array into two groups based on a condition.

- First array holds elements matching the condition
- Second array holds elements not matching the condition

You can assign the two resulting arrays to separate variables using comma separation. 

Consider the example below:

```ruby
foods = ["steak", "vegetables", "steak burger", "kale", "tofu", "tuna steak"]

good_foods, bad_foods = foods.partition { |food| food.include?("steak") }

puts "Good foods: #{good_foods}"
puts "Bad foods: #{bad_foods}"
```

Output:

```ruby
Good foods: ["steak", "steak burger", "tuna steak"]
Bad foods: ["vegetables", "kale", "tofu"]
```

Notes:

- Elements for which the block returns `true` go to the first array `good_foods`
- Elements for which the block returns `false` go to the second array `bad_foods`


## `any?` and `all?`

Both are predicate methods used to check conditions on array elements. They return `true` or `false`.

- `any?` checks if at least one element meets a condition
- `all?` checks if every element meets a condition
- Both accept a block to define the condition

Examples: 

1. Check if any sport name has 8 characters:

    ```ruby
    sports = ["soccer", "basketball", "baseball", "tennis", "golf"]

    puts sports.any? { |sport| sport.length == 8 }
    ```

    Output:

    ```
    true
    ```

    Here, `any?` returns true because "baseball" has 8 characters.


2. Check if any sport name has 12 characters:

    ```ruby
    puts sports.any? { |sport| sport.length == 12 }
    ```

    Output:

    ```
    false
    ```

    No sport has 12 characters, so `any?` returns false.


3. Check if all sport names are shorter than 100 characters:

    ```ruby
    puts sports.all? { |sport| sport.length < 100 }
    ```

    Output:

    ```
    true
    ```

    All elements satisfy the condition, so `all?` returns true.


4. Check if all sport names are shorter than 10 characters

    ```ruby
    puts sports.all? { |sport| sport.length < 10 }
    ```

    Output:

    ```
    false
    ```

    Not all elements satisfy this condition because "basketball" has 10 characters.


## `find` and `detect`

You can use `find` and `detect` to find the first element in an array that meets a condition.

- `find` returns the first element that meets a condition
- `detect` is another name for `find`
- `select` returns all elements that meet the condition

Example:

1. Using `find`:

    ```ruby
    words = ["dictionary", "refrigerator", "platypus", "microwave"]

    first_e = words.find { |word| word.include?("e") }
    puts first_e
    ```

    Output:

    ```
    refrigerator
    ```

    `find` goes through the array and returns the first element where the condition is true. Unlike `select`, it does not return all matches.


2. Using `detect` (works the same):

    ```ruby
    first_e = words.detect { |word| word.include?("e") }
    puts first_e
    ```

    Output:

    ```
    refrigerator
    ```


3. If no element matches, `find` and `detect` return `nil`:

    ```ruby
    no_z = words.find { |word| word.include?("z") }
    puts no_z.inspect
    ```

    Output:

    ```
    nil
    ```

    This is different from `select`, which would return an empty array if no matches are found. 


## `index` and `find_index` 

Both `index` and `find_index` helps you find the position of an element in an array.

- Returns the index of the first occurrence of an element
- If the element is not found, they return `nil`

These methods are useful when you need to know where a specific element is located in an array.

```ruby
colors = ["red", "blue", "green", "red"]

puts colors.index("green")      # Output: 2
puts colors.index("red")        # Output: 0
puts colors.index("orange")     # Output: nil

puts colors.find_index("green") # Output: 2
puts colors.find_index("red")   # Output: 0
puts colors.find_index("orange")# Output: nil
```

You can use either `index` or `find_index` depending on your preference, but both give the same result.

## `include?`

`include?` checks if a value exists and returns `true` or `false`.

- Strings use `include?` to check for substrings
- Arrays use `include?` to check for elements
- Method names are consistent across objects

For strings:

```ruby
text = "action"
puts text.include?("act")
```

Output:

```
true
```

For arrays:

```ruby
movie_genres = ["comedy", "action", "drama", "horror"]
puts movie_genres.include?("drama")
puts movie_genres.include?("romance")
```

Output:

```
true
false
```

## `max` and `min`

You can find the largest or smallest element in an array using `max` and `min`.

Examples:

1. Using numbers:

    ```ruby
    stock_prices = [434.12, 723.99, 84.12, 649.92]

    puts stock_prices.max
    puts stock_prices.min
    ```

    Output:

    ```
    723.99
    84.12
    ```


2. Using strings:

    ```ruby
    companies = ["Nike", "Microsoft", "Apple"]

    puts companies.max
    puts companies.min
    ```

    Output:

    ```
    Nike
    Apple
    ```

3. Empty arrays return `nil`:

    ```ruby
    empty_array = []

    puts empty_array.max
    puts empty_array.min
    ```

    Output:

    ```
    nil
    nil
    ```

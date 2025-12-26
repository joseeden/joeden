---
title: "Array Methods"
description: "Array Methods"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 27
last_update:
  date: 8/24/2023
---


## Accessing Elements 

You can get values from an array by using index positions. Ruby arrays start at index `0`, so the first element is at `0`, the second at `1`, and so on.

Some common ways to access array elements:

- `first` and `last`
- `slice`
- `fetch`
- `include?`
- `values_at`

For more information, please see [Array Manipulation.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/026-Array-Manipulation.md)

## Array Comparison

Arrays are considered equal only when all three conditions are met.

1. Same number of elements
2. Same values in the same order
3. Same casing for strings

Example:

```ruby
tools = ["Git", "Docker", "Kubernetes"]
platforms = ["Git", "Docker", "Kubernetes"]
services = ["AWS", "Azure"]
utilities = ["Git", "Docker", "kubernetes"]

p tools == platforms
p tools == services
p tools == utilities
```

Output:

```ruby
true
false
false
```

Notes: 

- The first is `true`; Same elements, same order, same casing. 
- The others are `false`; Elements differ, either in content or casing. 

Inequality is simply the reverse of equality. If arrays fail any equality rule, they are considered not equal.

```ruby
p candy != desserts
p candy != vegetables
p candy != sweets
```

Output:

```ruby
false
true
true
```

Notes:

- The first result is `false` because the arrays are equal. 
- The other results are `true` because the arrays differ.

## Spaceship Operator (`<=>`)

The spaceship operator is used to compare two values and returns a small set of predictable results that Ruby uses for sorting and comparisons.

- Returns `0` when values are equal
- Returns `-1` when the left value is smaller
- Returns `1` when the left value is larger
- Returns `nil` when values cannot be compared

When comparing numbers, Ruby checks the left value against the right value.

Examples: 

1. Both values are equal:

    ```ruby
    8 <=> 8
    ```

    Output:

    ```ruby
    0
    ```

2. The left value is smaller, so the result is `-1`.

    ```ruby
    8 <=> 20
    ```

    Output:

    ```ruby
    -1
    ```

3. If the left value is larger:

    ```ruby
    8 <=> 6
    ```

    Output:

    ```ruby
    1
    ```

This operator can also be used with arrays. Arrays are compared element by element, from left to right.

Example: 

1. All elements match in the same order, so the arrays are equal.

    ```ruby
    [7, 8, 9] <=> [7, 8, 9]
    ```

    Output:

    ```ruby
    0
    ```

2. The first two elements are equal, but `7` is smaller than `10`, so the left array is considered smaller.

    ```ruby
    [4, 5, 7] <=> [4, 5, 10]
    ```

    Output:

    ```ruby
    -1
    ```   

3. Here, `8` is larger than `6`, so the left array is considered larger.

    ```ruby
    [4, 5, 8] <=> [4, 5, 6]
    ```

    Output:

    ```ruby
    1
    ```

### Order Matters 

Note that order matters in arrays. Ruby stops comparing as soon as it finds a difference. Even though `8` is larger than `5`, Ruby compares `10` and `5` first. Since `10` is larger, the result is `1`.

```ruby
[10, 5] <=> [5, 8]
```

Output:

```ruby
1
```

If Ruby cannot logically compare two values, it returns `nil`.

```ruby
7 <=> [1, 2, 3]
```

Output:

```ruby
nil
```

### Incomparable Values 

A number and an array are different types, so they cannot be compared.

```ruby
[nil, 1, 2] <=> [0, 1, 2]
```

Output:

```ruby
nil
```

`nil` cannot be compared to a number, so the entire comparison fails.

This makes it clear when comparisons are invalid instead of guessing a result.


## Adding Elements at the End

You can add new elements to the end of an array using built-in tools. 

**NOTE:** All these options update the original array directly.

1. **Using `push`**

    The `push` method appends elements to the end of an array and updates it in place.

    ```ruby
    servers = ["web", "db", "cache"]
    servers.push("auth")
    p servers
    ```

    Output:

    ```ruby
    ["web", "db", "cache", "auth"]
    ```

    You can also add multiple elements at once.

    ```ruby
    servers.push("queue", "search")
    p servers
    ```

    Output:

    ```ruby
    ["web", "db", "cache", "auth", "queue", "search"]
    ```

2. **Using `append`** 

    The `append` method functions the same way as `push`:

    ```ruby
    databases = ["mysql", "postgres", "sqlite"]
    databases.append("mongodb")
    p databases
    ```

    Output:

    ```ruby
    ["mysql", "postgres", "sqlite", "mongodb"]
    ```

    You can also append multiple elements:

    ```ruby
    databases.append("redis", "cassandra")
    p databases
    ```

    Output:

    ```ruby
    ["mysql", "postgres", "sqlite", "mongodb", "redis", "cassandra"]
    ```


3. **Using the Shovel Operator `<<`**

    The shovel operator adds elements to the end of an array using a shorter syntax.

    ```ruby
    locations = ["office", "warehouse", "store"]
    locations << "factory"
    p locations
    ```

    Output:

    ```ruby
    ["office", "warehouse", "store", "factory"]
    ```

    You can chain the operator to add multiple elements in one line.

    ```ruby
    locations << "lab" << "data_center"
    p locations
    ```

    Output:

    ```ruby
    ["office", "warehouse", "store", "factory", "lab", "data_center"]
    ```

    This works the same way as `push`, just with a more compact style.



## `insert`

The `insert` method adds one or more elements at a specific index in an array, pushing existing elements forward.

- Specify the "index" as the first argument
- The "value(s)" to insert as the following argument(s)

The `insert` method modifies the original array and can add single or multiple values at any position. It also creates `nil` gaps if needed.

Example:

1. Single insert: 

    ```ruby
    transactions = [19.99, 29.43, 3.87]
    transactions.insert(1, 49.99)
    p transactions
    ```

    Output:

    ```ruby
    [19.99, 49.99, 29.43, 3.87]
    ```

2. Multiple inserts:

    ```ruby
    transactions.insert(0, 1.2, 3, 4.5)
    p transactions
    ```

    Output:

    ```ruby
    [1.2, 3, 4.5, 19.99, 49.99, 29.43, 3.87]
    ```

3. If index beyond array length:

    ```ruby
    numbers = [1, 2, 3]
    numbers.insert(6, 1000)
    p numbers
    ```

    Output:

    ```ruby
    [1, 2, 3, nil, nil, nil, 1000]
    ```


## `pop`

The `pop` method removes elements from the end of an array and returns them.

- Without an argument, it removes and returns the last element
- With an argument, it removes the elements and returns as a new array
- The original array is always updated

Example:

1. Without an argument: 

    ```ruby
    flavours = ["Chocolate", "Kiwi", "Peach", "Plum", "Strawberry", "Taro"]
    p flavours.pop
    p flavours
    ```

    Output:

    ```ruby
    "Taro"
    ["Chocolate", "Kiwi", "Peach", "Plum", "Strawberry"]
    ```

2. With an argument:

    ```ruby
    p flavours.pop(2)
    p flavours
    ```

    Output:

    ```ruby
    ["Peach", "Plum"]
    ["Chocolate", "Kiwi"]
    ```


## `length` and `size`

`length` returns how many elements exist in an array, regardless of type. `size` does the same thing.

```ruby
a = ["a", "b", "c", "d"]
b = ["x", nil, "y"]
c = []

p a.length
p b.length
p c.length

p a.size
p b.size
p c.size
```

Output:

```ruby
4
3
0

4
3
0
```


## `count`

`count` can work in two ways depending on how it is used.

- Without arguments, it counts all elements.
- With an argument, it counts matching values only.

Example: 

```ruby
nums = [1, 2, 3, 4, 5, 2]

p nums.count
p nums.count(5)
p nums.count(2)
```

Output:

```ruby
6
1
2
```

This makes `count` useful when you need to know how often a specific value appears in an array.

## `empty?`

`empty?` checks whether an array has no elements.

- Returns `true` if the array has no items.
- Returns `false` if at least one element exists.

Example: 

```ruby
a = ["one", "two"]
b = []

p a.empty?
p b.empty?
```

Output:

```ruby
false
true
```


## `nil?`

`nil?` checks whether an object is actually `nil`.

- Always `false` for arrays.
- Only `true` when called on `nil`.

Example: 

```ruby
a = []
b = nil

p a.nil?
p b.nil?
```

Output:

```ruby
false
true
```

## `uniq` 

You can remove repeated elements in an array using the `uniq` method.

- `uniq` returns a new array without duplicates.
- `uniq!` modifies the array in place, removing duplicates permanently.

Example:

```ruby
tens = [13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
```

Using `uniq` does not change the original array:

```ruby
p tens.uniq
p tens 
```

Output:

```ruby
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
```

To make the changes permanent, add the bang (`!`):

```ruby
p tens
p tens.uniq!
p tens 
```

Output:

```ruby
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## `join`

We can combine array elements into a string using `join`:

```ruby
my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p my_list.join
```

Output:

```ruby
"apples2318orangespears38kiwis" 
```

We can also add a separator between elements when joining them into a single string:

```ruby
my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
p my_list.join("-")
```

Output:

```ruby
"apples-23-18-oranges-pears-38-kiwis"
```


## `split` 

We can also split a joined string back into an array. Here, the variable `foo` contains the following string:

```ruby
foo = "apples-23-18-oranges-pears-38-kiwis"
```

If we want to break the items to an array separated by "-", we can use `split`:

```ruby
bar = foo.split("-")
p bar
```

Output:

```ruby
["apples", "23", "18", "oranges", "pears", "38", "kiwis"]
```


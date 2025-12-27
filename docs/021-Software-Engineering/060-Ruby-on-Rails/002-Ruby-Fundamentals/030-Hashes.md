---
title: "Hashes"
description: "Hashes"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 30

last_update:
  date: 8/24/2023
---


## Overview 

Hashes are like dictionaries that store data in key-value pairs and  connect related pieces of data.

- Each key points to exactly one value
- Keys act as identifiers
- Values store the associated data
- Focuses on association, not order

Hashes follow a few simple rules.

- Keys must be unique
- Values can be duplicated
- Access is done by key, not order

:::info 

You cannot have the same key twice, but multiple keys can point to the same value. This keeps associations clear and reliable.

:::

When working with a hash, you look up data using the key, and the hash returns the matching value.

Example:

```ruby
person = {
  "name" => "James",
  "age" => 30,
  "city" => "London"
}

# Get the value for "name"
p person["name"]
```


You can get keys or values all at once:

```ruby
p person.keys
p person.values
```

Output:

```ruby
["name", "age", "city"]
["James", 30, "London"]
```


## Arrays vs. Hashes

Arrays and hashes use different syntax and solve different problems.

```ruby
my_list = []
my_list.class

my_hash = {}
my_hash.class
```

Output:

```ruby
Array

Hash
```

When order matters, arrays are used. When relationships matter, hashes are used. This is why hashes focus on association rather than position.

- Arrays keep items in order
- Hashes connect related values
- Each structure models a real need


## Creating a Hash

A hash can be created using curly braces. To assign the key-value pairs, use the **hash rocket** (`=>`)

Empty hash: 

```ruby
my_person = {}
```

The hash rocket looks like `=>` and visually shows that a key points to a value. 

```ruby
my_person = {
  "name" => "James"
}
```

You add more pairs by separating them with commas.

```ruby
my_person = {
  "name" => "James",
  "age" => 30,
  "city" => "London",
  "salary" => 50_000_000
}
```

Notice that big numbers can be written can be written as is or with underscore. Both works the same way. 



## Different Value Types

Values are also not limited to just strings and numbers.

- Values can be arrays
- Values can be other hashes
- Keys still act as identifiers

Here, each team name points to a list of players. The association concept stays consistent.

```ruby
team_rosters = {
  "City Hawks" => ["Alex King", "Dana Reed"],
  "River Lions" => ["Ben Carter", "Evan Moore", "Chris Nolan"]
}
```

## Unique Keys and Overwriting

As mentioned previously, keys in a hash should be unique.

- Duplicate keys overwrite older values
- Ruby keeps the last value

If the same key appears twice, only one association can exist.

```ruby
player_salaries = {
  "Alex King" => 50_000_000,
  "Alex King" => 100_000_000
}
```

You will get an error when you try to run it:

```bash
warning: key "Alex King" is duplicated and overwritten on line 3
```

## Missing Keys and `nil`

If a key does not exist, Ruby returns `nil`.

- `nil` means no value found
- Keys are case sensitive
- Exact matches are required

Try running the code below in [IRB:](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/001-Starter-Notes.md#interactive-ruby)

```ruby
player_salaries = {
  "Alex King" => 50_000_000,
  "James Smith" => 100_000_000
}

puts player_salaries["Unknown Player"]
```

Output:

```ruby
nil
```



## Using fetch with a Default Value

The `fetch` method also retrieves values by key.

- Raises an error if key is missing
- Can accept a fallback value
- Useful for safe lookups

Example:

1. `fetch` returns the value when the key exists:

    ```ruby
    player_salaries = {
      "Alex King" => 50_000_000,
      "Ben Carter" => 85_000_000,
      "James Smith" => 100_000_000
    }

    player_salaries.fetch("James Smith", 0)
    ```

    Output:

    ```ruby
    25000000
    ```

2. If key does not exist and no fallback is provided:

    ```ruby
    player_salaries.fetch("Joe Penn")
    ```

    Output:

    ```ruby
    0
    ```

3. If key does not exist and a fallback is provided:

    ```ruby
    player_salaries.fetch("Joe Penn", 0)
    ```

    Output:

    ```ruby
    0
    ```


## Common Hash Methods

Hashes come with useful built in methods.

- `length` shows number of key value pairs
- `empty?` checks if the hash has no data

Example: 

```ruby
data.length
data.empty?
```

Expected results:

```ruby
0
true
```




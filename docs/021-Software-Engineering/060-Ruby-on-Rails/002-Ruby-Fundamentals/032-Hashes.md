---
title: "Hashes"
description: "Hashes"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 32

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

## Symbols 

A symbol is a simple, immutable Ruby object mainly used as a name or identifier.

- Immutable and cannot change
- Commonly used as identifiers
- Defined with `:`

Strings include many methods for modification, while symbols skip that extra functionality. This makes symbols faster to create and lighter in memory.

```ruby
"hello".methods.length  # string 
:hello.methods.length   # Symbol
```

Output:

```text
181
81
```

Since symbols are immutable and cannot change, Ruby reuses them in memory. Consider the example below:

```ruby
a = "hello"
b = "hello"

c = :hello
d = :hello

puts a.object_id
puts b.object_id
puts c.object_id
puts d.object_id
```

Output:

```text
16
24
18211084
18211084
```

This shows that Ruby creates separate string objects for `a` and `b`, but reuses a single symbol object for both `c` and `d`.



## Symbols as Hash Keys

To use symbols as keys in hashes, you need to prefix the key with a colon. For example, the key `name` becomes `:name`.

```ruby
person = {
  :name => "Alex",
  :age => 30,
  :active => true
}

person[:name]
person[:age]
person[:active]
```

Output:

```text
Alex
30
true
```

Symbol hash keys can also be written in a simplified form, similar to dictionaries in other programming languages.

```ruby
person = {
  name: "Alex",
  age: 30,
  active: true
}
```

This syntax is just a shortcut. Ruby still uses symbols as keys behind the scenes. 

## Shorthand Syntax in Ruby 3.1 

Before Ruby 3.1, you had to repeat the key name and the variable name even when they matched.

Here is an example using three variables:

```ruby
red = 230
green = 0
blue = 50

color = {
  red: red,
  green: green,
  blue: blue
}

puts color
```

This works, but the key and value names are repeated, which is common and slightly redundant.

Output:

```ruby
{:red=>230, :green=>0, :blue=>50}
```

Ruby 3.1 now allows omitting the value when the key name matches an existing variable.

The same example can be written like this:

```ruby
red = 230
green = 0
blue = 50

color = {
  red:,
  green:,
  blue:
}

puts color
```

Output:

```ruby
{:red=>230, :green=>0, :blue=>50}
```

Ruby looks for variables named `red`, `green`, and `blue` and assigns their values to the matching keys.

Note that the shortcut only works if the name exists in your program. If Ruby fails to find the specified variables, it raise a `NameError` exception.

```ruby
color = {
  orange:
}
```

Output:

```ruby
NameError: undefined local variable or method `orange`
```


## Accessing Values 

You can get values from a hash by using the hash name with brackets and the key symbol (`:`). This Works in Ruby 3.1 and older versions.

Using the same hash from previous section:

```ruby
red = 230
green = 0
blue = 50

color = {
  red: red,
  green: green,
  blue: blue
}
```

To get the value for the key `red`:

```ruby 
puts color[:red]
```

Output:

```ruby
230
```


## Hash Default Values

You can create a hash in that returns a custom value when a key does not exist. This avoids getting `nil` for missing keys.

Example: Create a hash with a default value of zero and add some key value pairs.

```ruby
numbers = Hash.new(0)

numbers[:pi] = 3.14
numbers[:pokemon] = 150

numbers[:pi]      # existing key
numbers[:planets] # missing key
```

Existing keys return their values normally. Missing keys return the default value passed to `Hash.new`.

Output:

```ruby
3.14
0
```

You can set any default value you want, not just numbers. It can be a string, array, or any object.

```ruby
defaults = Hash.new("unknown")

defaults[:color]    # missing key
defaults[:pokemon] = 150
defaults[:pokemon]  # existing key
```

Output:

```ruby
"unknown"
150
```

The hash automatically provides the default value for keys that do not exist. This keeps key lookups safe and predictable.


## Hash Default Values: Mutable Objects

When creating a hash with Hash.new, you can provide a default value for keys that don’t exist. However, using mutable objects like arrays or hashes as default values can cause unexpected behavior.

- Passing an array returns the same object for every missing key
- Modifying that object affects all keys that reference it
- The hash itself does not store the key unless explicitly assigned

This means if you push values into the default array, all missing keys see the same array, which can be confusing.

Example:

```ruby
team_members = Hash.new([])

team_members[:buccaneers] << "Tom Brady"
team_members[:patriots] << "Mac Jones"

puts team_members
```

Expected result:

```ruby
{}
```

Even though we pushed values, the hash remains empty because the default array is returned but not stored. All modifications happen to the same single array in memory.

#### Solution: Use a Block

You can provide a block to `Hash.new` to create a fresh object for each missing key.

- The block runs each time a key is missing
- You can assign the new object to the hash inside the block
- Each key gets its own separate object

Example:

```ruby
team_members = Hash.new { |hash, key| hash[key] = [] }

team_members[:buccaneers] << "Tom Brady"
team_members[:buccaneers] << "Mike Evans"
team_members[:patriots] << "Mac Jones"

puts team_members
```

Output:

```ruby
{:buccaneers=>["Tom Brady", "Mike Evans"], :patriots=>["Mac Jones"]}
```

Here, each missing key gets a new array, so pushing values only affects the correct key.

:::info 

When using `Hash.new` with mutable objects, always use a block to generate a new object for each missing key. This ensures each key stores its own independent value and avoids sharing the same object across multiple keys.

:::

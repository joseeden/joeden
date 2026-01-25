---
title: "Hash Manipulation"
description: "Hash Manipulation"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 33

last_update:
  date: 8/24/2023
---


## Adding Key-Value Pairs

A hash lets you store related data as key value pairs. You can change it even after it is created, which makes it flexible and easy to maintain.

You can add a new key to a hash by using square brackets and assigning a value.

Example:

```ruby
menu = {
  burger: 3.99,
  taco: 1.99,
  chips: 1.99
}
```

To add a new key called "filet_mignon":

```ruby
menu[:filet_mignon] = 29.99
``` 

Checking the hash:

```ruby
puts menu
``` 

Output:

```ruby
{:burger=>3.99, :taco=>1.99, :chips=>1.99, :filet_mignon=>29.99}
```

## Update an Existing Key Value 

The same syntax also updates an existing key. You just need to assign a new value to the existing key:

```ruby
menu[:taco] = 2.99
```

Checking the hash:

```ruby
puts menu
``` 

Output:

```ruby
{:burger=>3.99, :taco=>2.99, :chips=>1.99, :filet_mignon=>29.99}
```

You can also use the `store` method to update an existing key.

```ruby
menu.store(:salmon, 49.99)

puts menu
```

Output:

```ruby
{:burger=>3.99, :taco=>2.99, :chips=>1.99, :filet_mignon=>29.99, :salmon=>49.99}
```

## Iterators: `each`

Iteration means going through the elements of a data structure one by one. With a hash, this means going through each key value pair.

Sample hash:

```ruby
salaries = {
  director: 100000,
  producer: 200000,
  ceo: 300000
}
```

You can use `each` method to loop over all key value pairs.

```ruby
salaries.each do |position, salary|
  puts "#{position.capitalize}: #{salary}"
end
```

Output:

```
Director: 100000
Producer: 200000
Ceo: 300000
```

`each` gives access to both key and value. This is the standard way to process all associations in a hash.

## Iterators: `each_key` and `each_value`

Ruby provides methods to loop over just keys or just values.

1. `each_key` loops over keys

    ```ruby
    salaries.each_key do |position|
      puts "Next position is #{position}"
    end
    ```

    Output:

    ```
    Next position is director
    Next position is producer
    Next position is ceo
    ```

2. `each_value` loops over values

    ```ruby
    salaries.each_value do |salary|
      puts "Next employee earns #{salary}"
    end
    ```

    Output:

    ```
    Next employee earns 100000
    Next employee earns 200000
    Next employee earns 300000
    ```


## Iterators: `keys` and `values`

You can convert keys or values into arrays without manual iteration.

```ruby
positions = salaries.keys
salaries_list = salaries.values
```

`positions` will be `[:director, :producer, :ceo]` and `salaries_list` will be `[100000, 200000, 300000]`. You can then use array methods on these results.


Example using `each_with_index` on the array of keys:

```ruby
positions.each_with_index do |position, index|
  puts "#{index + 1}. #{position.capitalize}"
end
```

Output:

```ruby
1. Director
2. Producer
3. Ceo
```


## Checking for Keys

Ruby provides built-in methods which you can use to check if a key exists in a hash

- `include?` checks if the hash has the key
- `key?` is a shorter, preferred style
- `has_key?` is an alias, does the same thing

Example:

```ruby
cars = {
  Toyota: "Camry",
  Chevrolet: "Aveo",
  Ford: "F150",
  Kia: "Soul"
}

cars.include?(:Toyota)
cars.key?(:Ford)
cars.has_key?(:Kia)
```

Output:

```ruby
true
true
true
```

Note that the type and case must match exactly. For example, `"Toyota"` (string) is different from `:Toyota` (symbol).

## Checking for Values

You can use the following methods to check if a value exists.

- `value?` checks if a specific value is present
- `has_value?` is an alias for the same purpose
- Only searches values, not keys

Example: 

```ruby
cars.value?("Camry")
cars.has_value?("Mustang")
```

Output:

```ruby
true
false
```

These methods focus solely on the values side of the hash. A key cannot be found here, only the value it maps to.

## `select` and `reject`

You can filter hashes using `select` and `reject`, similar to arrays. Both these methods return a new hash with the filtered key value pairs.

1. `select` keeps key value pairs that meet a condition.

    ```ruby
    recipe = {
      sugar: 3,
      flour: 10,
      salt: 1,
      pepper: 8
    }

    large_portions = recipe.select { |ingredient, teaspoons| teaspoons >= 5 }
    puts large_portions
    ```

    Here, only ingredients with 5 or more teaspoons are kept.

    Output:

    ```ruby
    {:flour=>10, :pepper=>8}
    ```


2. Using `select` to filter with only keys:

    ```ruby
    long_name = recipe.select { |ingredient, _| ingredient.to_s.length == 5 }
    puts long_name
    ```

    Output"

    ```ruby
    {:sugar=>3, :flour=>10}
    ```

    `select` always returns a new hash with the matching key value pairs.

3. `reject` removes key value pairs that meet a condition.

    ```ruby
    odd_portions = recipe.reject { |_, teaspoons| teaspoons.even? }
    puts odd_portions
    ```

    Output"

    ```ruby
    {:sugar=>3, :salt=>1}
    ```

4. Using `reject` to filter only keys:

    ```ruby
    no_s = recipe.reject { |ingredient, _| ingredient.to_s.include?("s") }
    puts no_s
    ```

    Output:

    ```ruby
    {:flour=>10, :pepper=>8}
    ```

    `reject` returns a new hash with only the key value pairs where the block returned false.

## Convert: Hashes and Arrays

### Hash to an Array

When you convert a hash to an array, each key-value pair becomes a nested array.

- Each nested array has two elements: key and value
- The outer array holds all nested arrays
- Useful when you need array operations on hash data

Example:

```ruby
spice_girls = {
  scary: "Melanie Brown",
  sporty: "Melanie Chisholm",
  baby: "Emma Bunton",
  ginger: "Geri Halliwell",
  posh: "Victoria Beckham"
}

array_version = spice_girls.to_a
puts array_version.inspect
```

Output:

```ruby
[[:scary, "Melanie Brown"], [:sporty, "Melanie Chisholm"], [:baby, "Emma Bunton"], [:ginger, "Geri Halliwell"], [:posh, "Victoria Beckham"]]
```

Each key-value pair is now a nested array, making it easier to manipulate as an array.

### Array to a Hash

To convert an array back to a hash, each nested array must have exactly two elements: key and value.

- First element becomes the key
- Second element becomes the value
- Array structure must match the key-value pattern

Example:

```ruby
power_rangers = [
  [:red, "Jason"],
  [:black, "Zach"],
  [:pink, "Kimberly"]
]

hash_version = power_rangers.to_h
puts hash_version
```

Output:

```ruby
{:red=>"Jason", :black=>"Zach", :pink=>"Kimberly"}
```

## `delete` 

The `delete` method lets you remove items cleanly while optionally keeping the removed value for later use. Note that you can only remove one key at a time.

Example:

```ruby
superheroes = {
  spider_man: "Peter Parker",
  superman: "Clark Kent",
  batman: "Bruce Wayne"
}
```

To delete `spider_man` from the hash:

```ruby
superheroes.delete(:spider_man)
```

Checking the hash:

```ruby
puts superheroes
```

Output: 

```ruby
{:superman=>"Clark Kent", :batman=>"Bruce Wayne"}
```

You can save the removed key’s value to a variable for later use, but keep in mind the key is no longer in the original hash.

```ruby
real_name = superheroes.delete(:superman)
puts real_name
```

Output:

```ruby
Clark Kent
```

This way, you remove an item from the hash but still preserve its value if needed for further use.

## `merge`

The `merge` method lets you combine two hashes into a new hash. 

- Combines two hashes into one
- Duplicate keys take the value from the argument hash
- Original hashes are unchanged unless you use `merge!`

When merging, Ruby creates a new hash with all keys from both hashes. If a key exists in both, the value from the hash passed as an argument will be used. 

:::info 

The order in which you call `merge` matters because it determines which value wins for duplicates.

:::


Example:

```ruby
market = {
  garlic: 3,
  milk: 10
}

kitchen = {
  bread: 2,
  milk: 100
}

combined = market.merge(kitchen)
p combined
```

Output:

```
{:garlic=>3, :milk=>100, :bread=>2}
```

**Explanation:** Milk comes from `kitchen` because it was the argument. `market` and `kitchen` remain unchanged.

Flipping the order changes the result:

```ruby
combined2 = kitchen.merge(market)
p combined2
```

Output:

```
{:bread=>2, :milk=>10, :garlic=>3}
```

**Explanation:** The milk value comes from `market` because it was the argument hash.


If you want to update the original hash permanently, use `merge!`:

```ruby
market.merge!(kitchen)
p market
```

Output:

```
{:garlic=>3, :milk=>100, :bread=>2}
```

`market` is now permanently updated. Existing keys are overwritten, and new keys are added.


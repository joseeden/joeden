---
title: "Hashes"
description: "Hashes"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 20

last_update:
  date: 8/24/2023
---


## Hashes 


Hashes are like dictionaries that store data in key-value pairs.

- Keys point to values
- Values can be any type
- Access values using their key

Example:

```ruby
person = {
  "name" => "Alex",
  "age" => 30,
  "city" => "London"
}
p person["name"]
```

Output:

```ruby
"Alex"
```

You can get all keys or values:

```ruby
p person.keys
p person.values
```

Output:

```ruby
["name", "age", "city"]
["Alex", 30, "London"]
```


## Symbols 


Symbols are a lighter, faster alternative to strings for keys.

- Defined with `:`
- Access values with symbol keys
- Keys remain unique

Example:

```ruby
person = {
  name: "Alex",
  age: 30,
  city: "London"
}

p person[:name]
```

Output:

```ruby
"Alex"
```

Getting just the keys:

```ruby
p person.keys
```

Output:

```ruby
[:name, :age, :city]
```


## Iterators 

can loop through a hash to process keys and values.

- `each` is the preferred method
- Works with key and value
- Can be single-line or multi-line

Example:

```ruby
person = { "name" => "Alex", "age" => 30, "city" => "London" }

person.each do |key, value|
  puts "Key: #{key}, Value: #{value}"
end
```

Output:

```ruby
Key: name, Value: Alex
Key: age, Value: 30
Key: city, Value: London
```

Single-line iteration:

```ruby
another_hash = {a: 28, b: 19, c: 23, d: 45}
another_hash.each { |key, value| puts key }
```

Output:

```ruby
a
b
c
d
```


## Adding an Element 

To add an element to a hash, simply assign a value to a new key.

```ruby
another_hash = {a: 28, b: 19, c: 23}
p another_hash

## add a  new element
another_hash[:d] = 45
p another_hash
```

Output:

```ruby
{a: 28, b: 19, c: 23}
{a: 28, b: 19, c: 23, d: 45}
```

## Updating an Element

To update an existing element in a hash, assign a new value to the existing key.

```ruby
another_hash = {a: 28, b: 19, c: 23, d: 45}
p another_hash

## update element with key :c
another_hash[:c] = 30
p another_hash
```

Output:

```ruby
{a: 28, b: 19, c: 23, d: 45}
{a: 28, b: 19, c: 30, d: 45}
```


## Removing an Element

To remove an element from a hash, use the `delete` method with the key you want to remove.

```ruby

another_hash = {a: 28, b: 19, c: 23, d: 45}
p another_hash

## remove element with key :b
another_hash.delete(:b)
p another_hash
```

Output:

```ruby
{a: 28, b: 19, c: 23, d: 45}
{a: 28, c: 23, d: 45}
```


## Select Operator 

Filter a hash based on a condition using `select`.

- Returns a new hash with matching items
- Original hash stays unchanged
- Use `is_a?` to filter by type

Example:

```ruby
person = {
  name: "Alex",
  age: 30,
  city: "London",
  profession: "Developer",
  id: 4006
}
p person.select { |k, v| v.is_a?(String) }
```

Output:

```ruby
{name: "Alex", city: "London", profession: "Developer"}
```

The block checks each key-value pair and keeps only those that match the condition.


**Explanation:** The block takes two parameters, `k` for key and `v` for value. It returns true if the value meets the condition, and false otherwise.

This is equivalent using a multi-line block:

```ruby
person.select do |k, v|
  v.is_a?(String)
end
```

Note that we cannot combine `puts` with a `do...end` block like this:

```ruby
puts person.select do |k,v|
  print k,v if v.is_a?(String)
end
```

This returns:

```ruby
#<Enumerator:0x000079016d492db0>
```

This happens because the `do...end` block has higher precedence than `puts`. Use `select` alone to return the filtered hash and print it separately.


## Example: Delete an Element based on a Condition 

We can remove items from a hash that meet a certain condition.

In this example, the block checks each key-value pair and deletes the key if the value matches the condition. This keeps only the items you want in the hash.

```ruby
my_hash = {
  name: "James",
  age: 30,
  city: "New York",
  profession: "Developer",
  id: 4006
}

my_hash.each {
  |k,v| my_hash.delete(k) if v.is_a?(String)
}

p my_hash
```

Output:

```bash
{age: 30, id: 4006} 
```
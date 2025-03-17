---
title: "Iterators"
description: "Iterators"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 10
last_update:
  date: 11/7/2019
---


## Overview  

An iterator lets you go through items one by one.  

- A `for` loop is an easy way to iterate  
- Works with lists, strings, and more  

A `for` loop is an example of iteration:  

```python
numbers = [1, 2, 3]  
for num in numbers:  
    print(num)
```  

Output:  

```bash
1  
2  
3  
```

## Iterators vs. Iterables  

Objects like lists and strings are **iterables**. They can be turned into **iterators**.  

- An **iterable** has an `iter()` method  
- A **for** loop turns iterables into iterators automatically  
- An **iterator** has a `next()` method that gives the next value  

Example: 

```python
nums = [10, 20, 30]  
iter_nums = iter(nums)  

print(next(iter_nums))  
print(next(iter_nums))  
```

Output:

```
10  
20  
```

:::info 

Not all iterables are *actual* list.

:::

## Using `next()` to Iterate  

Instead of a `for` loop, you can manually step through an iterator using `next()`.  

- `iter()` turns an iterable into an iterator  
- `next()` gets the next value  
- Stops with `StopIteration` error  

Example: 

```python
letters = iter("abc")  
print(next(letters))  
print(next(letters))  
print(next(letters))  
```

Output:

```
a  
b  
c  
```

## Example: `range()`  

The `range()` function can be used in a `for` loop as if it's a list:  

```python
for i in range(5):
    print(i)
```

However, `range()` doesn't create an actual list. Instead, it generates values on demand using an iterator. If it created a full list, using a very large number (like `10¹⁰⁰`) would likely exceed memory limits.  

In the example below, we'll see how `range()` works with iterators:  

- Iterator `word_range` for `range(3)` is created using `iter()`.  
- Use a `for` loop to iterate over `range(3)`, print each value.  
- Iterator `foobar` for `range(10 ** 100)` is also created.

Solution:

```python
# Iterator for range(3)
word_range = iter(range(3))
print(next(word_range))
print(next(word_range))
print(next(word_range))

# Loop over range(3)
for x in range(3):
    print(x)

# Iterator for range(10 ** 100)
foobar = iter(range(10 ** 100))

print(next(foobar))
print(next(foobar))
print(next(foobar))
print(next(foobar))
print(next(foobar))
```

The output shows how iterators fetch values dynamically rather than storing them all at once. 

```bash
1
2
0
1
2
0
1
2
3
4
```  


## Unpack Iterators with `*`

The `*` operator prints all values at once.  

- Works on iterators and iterables  
- After use, the iterator is empty  

Example:

```python
nums = iter([1, 2, 3])  
print(*nums)  
```

Output:

```
1 2 3  
```

## Iterate Over Dictionaries  

Dictionaries are also iterables, and you can loop through key-value pairs.  

Use `.items()` to access both keys and values  

```python
info = {"name": "Alex", "age": 30}  
for key, value in info.items():  
    print(key, value)  
```

Output:

```
name Alex  
age 30  
```

## Iterate Over Files  

Files can be iterated line by line using `iter()` and `next()`.  

Each `next()` call reads the next line  

```python
with open("file.txt") as file:  
    lines = iter(file)  
    print(next(lines))  
    print(next(lines))  
```

## Iterators as Function Arguments

Some functions work with iterators and iterables.  

- `range()` creates a sequence of numbers  
- `list()` converts it into a list  
- `sum()` adds up the numbers  

Example:

```python
values = range(10, 21)      # Create a range from 10 to 20  
print(list(values))  

values_list = list(values)  # Convert range to a list  
print(values_list)  

values_sum = sum(values)    # Sum the numbers  
print(values_sum)  
```  

Output:

```bash
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]  
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]  
165  
```  

## Using `enumerate()`  

`enumerate()` adds an index to items in an iterable, creating pairs of index and value.  

- Converts an iterable into an enumerate object  
- Returns index-value pairs as tuples  
- Default index starts at 0 but can be changed  

Example:  

```python
mutants = ['charles xavier', 
            'bobby drake', 
            'kurt wagner', 
            'max eisenhardt', 
            'kitty pryde']

mutant_list = list(enumerate(mutants))
print(mutant_list)
```

Output:

```
[(0, 'charles xavier'), (1, 'bobby drake'), (2, 'kurt wagner'), (3, 'max eisenhardt'), (4, 'kitty pryde')]
```


#### Looping with `enumerate()`  

You can loop through an `enumerate` object and unpack values.  

- `for index, value in enumerate(iterable)` unpacks pairs  
- Default index is 0, but can be changed with `start`  

Example:  

```python
mutants = ['charles xavier', 
            'bobby drake', 
            'kurt wagner', 
            'max eisenhardt', 
            'kitty pryde']

for index1, value1 in enumerate(mutants):
    print(index1, value1)
```

Output:

```python
0 charles xavier
1 bobby drake
2 kurt wagner
3 max eisenhardt
4 kitty pryde
```

Defining the start value of the index:

```python
for index2, value2 in enumerate(mutants, start=1):
    print(index2, value2)
```

Output:

```python
1 charles xavier
2 bobby drake
3 kurt wagner
4 max eisenhardt
5 kitty pryde 
```

## Using `zip()`  

`zip()` takes any number of iterables and returns a zip object that is an iterator of tuples.

- Combines multiple iterables into pairs or groups.  
- Each tuple contains elements from corresponding positions in iterables  

If you wanted to print the values of a `zip` object, you can convert it into a list and then print it. Printing just a `zip` object will not return the values unless you unpack it first. 

Example:  

```python
mutants = ['charles xavier', 
            'bobby drake', 
            'kurt wagner', 
            'max eisenhardt', 
            'kitty pryde']

aliases = ['prof x',
            'iceman',
            'nightcrawler',
            'magneto',
            'shadowcat']

powers = [
          'telepathy',
          'thermokinesis',
          'teleportation',
          'magnetokinesis',
          'intangibility']

# Create a list of tuples: mutant_data
mutant_data = list(zip(mutants, aliases, powers))
print(mutant_data)
```

Output:

```
[('charles xavier', 'prof x', 'telepathy'), ('bobby drake', 'iceman', 'thermokinesis'), ('kurt wagner', 'nightcrawler', 'teleportation'), ('max eisenhardt', 'magneto', 'magnetokinesis'), ('kitty pryde', 'shadowcat', 'intangibility')]
```

To create a zip object:

```bash
mutant_zip = zip(mutants, aliases, powers)
print(mutant_zip)
```

Output:

```bash
<zip object at 0x7f21f603ff40>
```

#### Looping with `zip()`  

You can iterate over a `zip` object directly.  

Example:  

```python
for value1, value2, value3 in mutant_zip:
    print(value1, value2, value3)
```

Output:

```
charles xavier prof x telepathy
bobby drake iceman thermokinesis
kurt wagner nightcrawler teleportation
max eisenhardt magneto magnetokinesis
kitty pryde shadowcat intangibility
```


#### Printing with `*`  

Use `*` (splat operator) to unpack `zip` results.  

Example:  

```python
avengers = ["Iron Man", "Thor", "Hulk"]
real_names = ["Tony", "Thor", "Bruce"]

print(*zip(avengers, real_names))
```

Output:

```
('Iron Man', 'Tony') ('Thor', 'Thor') ('Hulk', 'Bruce')
```
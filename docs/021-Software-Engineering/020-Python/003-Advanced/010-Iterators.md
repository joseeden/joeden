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

## Example: `range()`  

The `range()` function can be used in a `for` loop as if it's a list:  

```python
for i in range(5):
    print(i)
```

However, `range()` doesn't create an actual list. Instead, it generates values on demand using an iterator. If it created a full list, using a very large number (like \(10^{100}\)) would likely exceed memory limits.  

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

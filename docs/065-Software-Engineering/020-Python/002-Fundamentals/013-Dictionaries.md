---
title: "Dictionaries"
description: "Dictionaries"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 13
last_update:
  date: 10/28/2019
---


## Overview

Dictionaries are used to store related data as key and value pairs. They map a key to a value. The key is usually a string or number, and the value can be any data type.

You can create dictionaries using braces or the `dict()` function:

```python
animals = {"bears": 10, "lions": 1, "tigers": 2}  
```

You can use keys to access values:

```python
animals["bears"]        ## This will return 10  
```

To check for a key's existence, use `in`:

```python
if "bears" in animals  
```

To add or modify elements:

```python
animals["zebras"] = 2     ## This adds a new pair
```

To remove a key-value pair: 

```python
del animals["lions"]     ## Deletes the entry for "lions"
```

## From a List of Tuples

Sometimes data comes as pairs in a list. You can turn it into a dictionary to access items faster. One item becomes the key, the other becomes the value.

- Use a loop to assign each pair to a dictionary
- Keys must be unique; values can repeat

For example, a list `books` that contains sci-fi books with their publication years can be converted into a dictionary:

```python
books = [
    ("Dune", 1965),
    ("Neuromancer", 1984),
    ("Foundation", 1951)
]

book_dict = {}

for title, year in books:
    book_dict[title] = year

print(book_dict)
```

Output: 

```text
{
  'Dune': 1965, 
  'Neuromancer': 1984, 
  'Foundation': 1951
}
```

## Iterate and Sort

When looping over a dictionary, Python works with keys by default. We can use a `for` loop and apply `sorted()` to iterate through the keys in order.

```python
for title in sorted(book_dict):
    print(title)
```

Output: 

```text
Dune
Foundation
Neuromancer
```

## Safely Access Values with `get()`

We can use the `get()` method to safely access keys. If a key is missing, it returns a `None` and prevents the program from crashing.

Example:

```python
print(book_dict.get("Hyperion", "Not Found"))
print(book_dict.get("Dune", "Not Found"))
```

Output: 

```text
Not Found
1965
```



## Add Data with `update()`

You can add single or multiple items to a dictionary using `update()`. It is useful for adding several entries at once or grouping related items.

Example with `book_locations` storing sci-fi books by shelf:

```python
book_locations = {
    "Shelf A": {
        "Dune": "Top Row"
    }
}

book_locations["Shelf B"] = {
    "Neuromancer": "Middle Row"
}

print(book_locations)
```

Output:

```text
{
  'Shelf A': {'Dune': 'Top Row'}, 
  'Shelf B': {'Neuromancer': 'Middle Row'}
}
```

You can also use `update()` to add several values at once or to group related data under one key.

Here, multiple books under one shelf:

```python
new_books = [
    ("Foundation", "Bottom Row"),
    ("Hyperion", "Top Row")
]

book_locations["Shelf A"].update(new_books)

print(book_locations["Shelf A"])
```

Output:

```text
{
  'Dune': 'Top Row', 
  'Foundation': 'Bottom Row', 
  'Hyperion': 'Top Row'
}
```

## Remove Items with `del` and `pop`

You can remove items safely using the following options:

- `del` is for keys you know exist
- `pop()` is safer if the key may not exist

Example removing books from `book_locations`:

```python
del book_locations["Shelf B"]

removed = book_locations["Shelf A"].pop("Nonexistent Book", None)

print(removed)
```

Output:

```text
None
```


## Common Dictionary Methods 

| Method                                | Description                                                     |
| ------------------------------------- | --------------------------------------------------------------- |
| `len(dictionary)`                     | Returns the number of items in the dictionary                   |
| `dictionary[key]`                     | Accesses the item with key `key`                                |
| `dictionary[key] = value`             | Sets the value associated with `key`                            |
| `del dictionary[key]`                 | Removes the item with key `key`                                 |
| `dictionary.get(key, default)`        | Returns the element for `key`, or `default` if it's not present |
| `dictionary.keys()`                   | Returns a sequence of the keys in the dictionary                |
| `dictionary.values()`                 | Returns a sequence of the values in the dictionary              |
| `dictionary.update(other_dictionary)` | Updates with items from another dictionary                      |
| `dictionary.clear()`                  | Removes all items from the dictionary                           |

## More Pythonic Ways

Python has simpler and cleaner ways to work with dictionaries. These methods let you loop, check, and access data efficiently.

- Use `items()` to get key/value pairs directly
- Use tuple unpacking to separate keys and values in a loop
- Use `in` to check if a key exists

In the example below, `book_dict` stores sci-fi books with their authors. We loop through `book_dict` using `items()` and unpack the title and author.

```python
book_dict = {
    "Dune": "Frank Herbert",
    "Neuromancer": "William Gibson",
    "Foundation": "Isaac Asimov"
}

for title, author in book_dict.items():
    print(f"{title} by {author}")
```

Output:

```text
Dune by Frank Herbert
Neuromancer by William Gibson
Foundation by Isaac Asimov
```

You can ALSO check if a key is in a dictionary using `in`. This returns `True` or `False` and works well with `if/else` conditions.

Example checking `book_dict` for certain books:

```python
if "Hyperion" in book_dict:
    print("Hyperion is in the collection")
else:
    print("Hyperion not found")

if "Dune" in book_dict:
    print(f"Dune found, author is {book_dict['Dune']}")
```

Output:

```text
Hyperion not found
Dune found, author is Frank Herbert
```

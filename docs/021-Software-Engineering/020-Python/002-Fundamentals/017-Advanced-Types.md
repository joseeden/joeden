---
title: "Advanced Data Types"
description: "Advanced Data Types"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 17
last_update:
  date: 10/28/2019
---



## `Counter`

`Counter` is a special object from the `collections` module. It counts occurrences of items in a list and stores them like a dictionary.

In the example below, `books_read` lists sci-fi books, and `book_count` counts how many times each book appears:

```python
from collections import Counter

books_read = ["Dune", "Foundation", "Dune", "Neuromancer", "Dune", "Foundation"]
book_count = Counter(books_read)

print(book_count)
print(book_count["Dune"])
```

Output:

```text
Counter({'Dune': 3, 'Foundation': 2, 'Neuromancer': 1})
3
```


## `most_common()`

`most_common()` returns the items with the highest counts in descending order. You can pass a number to get the top `N` items.

```python
book_count = Counter({'Dune': 3, 'Foundation': 2, 'Neuromancer': 1})

top_books = book_count.most_common(2)
print(top_books)
```

Output:

```text
[('Dune', 3), ('Foundation', 2)]
```

`most_common()` is useful for frequency analysis and finding popular items in data.

## `defaultdict`

Python’s `defaultdict` is useful for storing data under keys which we don't know in advance. 

- Automatically initializes values for new keys
- Works well for lists, counters, or other types

With `defaultdict`, we don't have to manually check and create empty entries before adding data.


### Create Lists under Unknown Keys

If we want each key to hold a list of values, we normally have to initialize each key first. `defaultdict` handles this automatically.

In the example below, `library_books` is a list of tuples with a genre and a book title. `books_by_genre` groups all books by genre:

```python
from collections import defaultdict

library_books = [
    ("sci-fi", "Dune"), 
    ("fantasy", "Harry Potter"), 
    ("sci-fi", "Neuromancer")]

books_by_genre = defaultdict(list)

for genre, title in library_books:
    books_by_genre[genre].append(title)

print(books_by_genre["sci-fi"])
```

Output:

```text
['Dune', 'Neuromancer']
```

Here, the `defaultdict(list)` automatically creates an empty list for any new genre so we can append books immediately.


### Using `defaultdict` as a Counter

`defaultdict` can also count occurrences of items without initializing keys manually.

In the example below, `book_info` is a list of dictionaries, and `counts` tracks how many books have a hardcover or an ebook version:

```python
from collections import defaultdict

book_info = [
    {"title": "Dune", "hardcover": True, "ebook": False},
    {"title": "Harry Potter", "hardcover": True, "ebook": True},
    {"title": "Neuromancer", "hardcover": False, "ebook": True}
]

counts = defaultdict(int)

for book in book_info:
    if book["hardcover"]:
        counts["hardcover"] += 1
    if book["ebook"]:
        counts["ebook"] += 1

print(counts)
```

Output:

```text
defaultdict(<class 'int'>, {'hardcover': 2, 'ebook': 2})
```

The `defaultdict(int)` starts all counts at zero and updates them automatically.

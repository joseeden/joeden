---
title: "Advanced Data Types"
description: "Advanced Data Types"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 7
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


## Namedtuple

Namedtuples are a simple way to store structured data with named fields. They work like tuples but let you access each item by name instead of by index.

### Creating a Namedtuple

To create a namedtuple, import it from `collections`, give it a type name, and list the field names.

In the example below, we create a `Book` namedtuple with fields for `title`, `author`, and `year`. Then we convert a list of books into namedtuple instances:

```python
from collections import namedtuple

Book = namedtuple("Book", ["title", "author", "year"])

library_books = [
    ("Dune", "Frank Herbert", 1965),
    ("Neuromancer", "William Gibson", 1984),
    ("Harry Potter", "J.K. Rowling", 1997)
]

books_list = [Book(*book) for book in library_books]

print(books_list[0])
```

Output:

```text
Book(title='Dune', author='Frank Herbert', year=1965)
```

Each book is now stored as a namedtuple, so its values can be accessed using readable field names instead of index positions.

### Accessing Attributes 

Because namedtuples expose their fields as attributes, you can safely read each value without checking for missing keys. This makes working with structured data more predictable.

In the example below, we use these attributes to print the title, author, and year for the first three books in the list:

```python
from collections import namedtuple
from pprint import pprint

Book = namedtuple("Book", ["title", "author", "year"])

library_books = [
    ("Dune", "Frank Herbert", 1965),
    ("Neuromancer", "William Gibson", 1984),
    ("Harry Potter", "J.K. Rowling", 1997)
]

books_list = [Book(*book) for book in library_books]

for book in books_list[:3]:
    pprint((book.title, book.author, book.year))
```

Output:

```text
('Dune', 'Frank Herbert', 1965)
('Neuromancer', 'William Gibson', 1984)
('Harry Potter', 'J.K. Rowling', 1997)
```

#### What `*book` means

`*book` is argument unpacking. Each `book` in `library_books` is a tuple:

```text
("Dune", "Frank Herbert", 1965)
```

When you write:

```text
Book(*book)
```

Python expands the tuple in this way, so each element of the tuple is passed as a **separate argument** to the `Book` namedtuple.

```bash
Book("Dune", "Frank Herbert", 1965)
```

This also aligns with the namedtyple, which expects **three arguments:**

```python
Book = namedtuple("Book", ["title", "author", "year"])
```

Since `book` is already a tuple with exactly those three values, `*book` is the cleanest way to pass them in.


### Example: Animal Data

In the example below, we create a `namedtuple` called `Animal`. It represents simple animal data with a name, species, and number of legs.

```python
from collections import namedtuple
from pprint import pprint

# Empty list
animals = []

# Source data as tuples
animal_data = [
    ("Buddy", "Dog", 4),
    ("Mittens", "Cat", 4),
    ("Goldie", "Fish", 0),
    ("Polly", "Parrot", 2),
    ("Slither", "Snake", 0),
    ("Speedy", "Turtle", 4),
]

# Create the namedtuple
Animal = namedtuple("Animal", ["name", "species", "legs"])

for name, species, legs in animal_data:
    animals.append(Animal(name, species, legs))

pprint(animals[:5])
```

Output:

```text
[Animal(name='Buddy', species='Dog', legs=4),
 Animal(name='Mittens', species='Cat', legs=4),
 Animal(name='Goldie', species='Fish', legs=0),
 Animal(name='Polly', species='Parrot', legs=2),
 Animal(name='Slither', species='Snake', legs=0)]
```

Here, namedtuples are used to turn raw tuple data into structured objects that are easier to read, access, and work with consistently.

## Dataclasses

Dataclasses are similar to namedtuples but is more flexible in storing structured data.

- Default values can be defined for fields
- Output is readable when printed or logged
- Data can be converted to dictionaries or tuples

These features reduce boilerplate code and help keeps the data handling predictable.

### Creating a Dataclass

In the example below, `Product` is a dataclass that stores a name and a quantity. The quantity has a default value of `0`.

```python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    quantity: int = 0
```

Here, the `@dataclass` decorator adds useful behavior to the class automatically, which keeps the code short and clear.

We can create an instance of the `Product` dataclass and call it `item`:

```python
item = Product(name="Notebook")
print(item)
```

Output:

```text
Product(name='Notebook', quantity=0)
```

This clean output makes dataclasses easy to inspect and debug, which is one of their main advantages.

### From Dataclass to Dictionary or Tuple

Dataclasses can be converted into other common data formats.

In the example below, `asdict` and `astuple` are used to convert the same `Product` instance.

```python
from dataclasses import dataclass, asdict, astuple

@dataclass
class Product:
    name: str
    quantity: int = 0

item = Product(name="Notebook", quantity=5)

print(asdict(item))
print(astuple(item))
```

Output:

```text
{'name': 'Notebook', 'quantity': 5}
('Notebook', 5)
```


### Adding Custom Properties

Dataclasses can include computed properties that return values based on existing fields.

In the example below, `total_items` is a computed property based on quantity. To create a cusotm propery, specify `@poperty` before it.

```python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    quantity: int
    unit_size: int

    @property
    def total_items(self):
        return self.quantity * self.unit_size
```

Next, we create a `Product` instance and access `total_items` just like a normal attribute:

```python
box_1 = Product(name="Pen box", quantity=3, unit_size=10)
print(box_1.total_items)
```

Output:

```text
30
```

This keeps calculations readable and avoids repeated logic elsewhere in the code.

### Frozen Dataclass Instances

A frozen dataclass prevents changes after creation. They are useful for safety and consistency.

In the example below, the dataclass is marked as frozen.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Product:
    name: str
    quantity: int

box_2 = Product("Juice", 15)
```

Once created, this object cannot be changed, which helps protect important data from accidental updates. For example, if we try to update the quantity from `15` to `23`, we will get an error:

```bash
box_2.quantity = 23
```

Output: 

```bash
dataclasses.FrozenInstanceError: cannot assign to field 'quantity'
```
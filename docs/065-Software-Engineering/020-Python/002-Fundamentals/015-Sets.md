---
title: "Sets"
description: "Sets"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 15
last_update:
  date: 10/28/2019
---


## Overview

A set stores **unique** elements (no duplicates).

- Sets are **unordered**, so elements don't have a specific index.
- We can **add** or **remove** values, but cannot change them once added.

Sets don’t have an index, so we can't access elements like a list using square brackets.

## Creating Sets

There are two ways to create a set:

1. Using braces to create a set from scratch:

    ```python
    attendees = {"Alice", "Bob", "Alice"}
    print(attendees)
    ```

    Output:

    ```
    {'Bob', 'Alice'}
    ```

    Even though "Alice" was added twice, the set only keeps one instance.

2. Using `set` to create a set from a list. 

    In the example below, `cookies_list` contains repeated cookies which will be removed when list is converted to a set:

    ```python
    cookies_list = ["chocolate chip", "oatmeal", "chocolate chip"]

    cookie_set = set(cookies_list)
    print(cookie_set)
    ```

    Output:

    ```text
    {'oatmeal', 'chocolate chip'}
    ```


## Modifying Sets

You can add new elements to a set using `add()`. It only adds the item if it isn’t already in the set.

```python
cookie_set = {'oatmeal', 'chocolate chip'}

cookie_set.add("biscotti")
print(cookie_set)
```

Output:

```text
{'oatmeal', 'chocolate chip', 'biscotti'}
```


## Adding Multiple Items

`update()` lets you add several elements at once from a list or another set.

```python
cookie_set = {'oatmeal', 'chocolate chip', 'biscotti'}
more_cookies = ["snickerdoodle", "oatmeal"]

cookie_set.update(more_cookies)
print(cookie_set)
```

Output:

```text
{'snickerdoodle', 'chocolate chip', 'oatmeal', 'biscotti'}
```


## Removing Elements

You can remove items using the following:

- `discard()` removes a specific item safely
- `pop()` removes and returns an arbitrary element.

Example: 

```python
cookie_set = {'snickerdoodle', 'chocolate chip', 'oatmeal', 'biscotti'}

cookie_set.discard("biscotti")
removed = cookie_set.pop()
print(cookie_set)
print(removed)
```

Output (may vary due to unordered nature):

```text
{'chocolate chip', 'oatmeal'}
snickerdoodle
```


## Set Operations: `union` and `intersection`

Sets can be combined or compared with other sets:

- `union()` returns all unique elements from both sets
- `intersection()` returns only the elements present in both sets

Examples: 

```python
my_cookies = {"chocolate chip", "oatmeal"}
hugo_cookies = {"oatmeal", "snickerdoodle"}

all_cookies = my_cookies.union(hugo_cookies)
common_cookies = my_cookies.intersection(hugo_cookies)

print(all_cookies)
print(common_cookies)
```

Output:

```text
{'snickerdoodle', 'chocolate chip', 'oatmeal'}
{'oatmeal'}
```

## Set Operations: `difference`

`difference()` finds items in one set that aren’t in another. The set you call it on is the reference.

```python
my_cookies = {"chocolate chip", "oatmeal"}
hugo_cookies = {"oatmeal", "snickerdoodle"}

my_unique = my_cookies.difference(hugo_cookies)
hugo_unique = hugo_cookies.difference(my_cookies)

print(my_unique)
print(hugo_unique)
```

Output:

```text
{'chocolate chip'}
{'snickerdoodle'}
```


## Set Operations: `sorted`

Although sets are unordered, we can sort them using `sorted`:

```python
attendees = {"Alice", "Joe", "Bob", "Charlie", "Zoey", "Ted"}

sorted_attendees = sorted(attendees)
print(sorted_attendees)
```

Output:

```
['Alice', 'Bob', 'Charlie', 'Joe', 'Ted', 'Zoey']
```
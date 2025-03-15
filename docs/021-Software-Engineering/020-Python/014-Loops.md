---
title: "Loops"
description: "Loops"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 14
last_update:
  date: 10/28/2019
---



## While Loop

A **While Loop** executes as long as the specified condition is True.

```python
while x < 5:
    print(x)
    x += 1
```

## For Loop

A **For Loop** iterates over a sequence (like a list or a string).

```python
for i in range(5):
    print(i)
```

## Break & Continue

Ways to stop or control loops:

- **break**: Exits the loop entirely.
- **continue**: Skips to the next iteration of the loop.

Example:

```python
for i in range(5):
    if i == 3:
        break  # Loop stops when i equals 3
    print(i)
```
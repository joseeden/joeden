---
title: "Conditionals"
description: "Conditionals"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 20
last_update:
  date: 10/28/2019
---



## `if` and `else`

An **If Statement** begins with `if`, followed by a condition and a colon. The indented code runs if the condition is True.

```python
if x > 5:
    print("x is greater than 5")
```

## `else` Statement

An **Else Statement** executes code when the preceding `if` condition evaluates to False.

```python
if x > 5:
    print("x is greater than 5")
else:
    print("x is less than or equal to 5")
```

## Branching Syntax

In the example below, multiple conditions are checked using `if`, `elif`, and `else`:

```python
if condition1:
    # if-block
elif condition2:
    # elif-block
else:
    # else-block
```

If `condition1` is not met, `condition2` is checked. If both are not met, then it goes through the `else` block.

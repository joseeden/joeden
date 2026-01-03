---
title: "Loops"
description: "Loops"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 25
last_update:
  date: 10/28/2019
---

## `for` Loop

A **For Loop** iterates over a sequence (like a list or a string).

### Looping Through a List

This loop prints each price in the list.

```python
prices = [12, 4, 8, 15]
for price in prices:
    print(price)
```

Output:

```
12
4
8
15
```

### Conditional Statements

You can combine **if**, **elif**, and **else** with loops to make decisions.

```python
prices = [12, 4, 8, 15]
for price in prices:
    if price > 10:
        print("More than 10 dollars")
    elif price < 5:
        print("Less than 5 dollars")
    else:
        print("Between 5 and 10 dollars")
```

Output:

```
More than 10 dollars
Less than 5 dollars
Between 5 and 10 dollars
More than 10 dollars
```

The loop checks each price and prints the range.


### Looping Through Strings

You can loop through each character in a string just like you do with lists.

```python
username = "Alice"
for char in username:
    print(char)
```

Output:

```
A
l
i
c
e
```

### Looping Through Dictionaries

Use `.items()` to loop through both keys and values in a dictionary.

You can also loop through just keys with `.keys()` or just values with `.values()`.

```python
user_info = {"name": "Alice", "age": 30}
for key, value in user_info.items():
    print(key, ":", value)
```

Output:

```
name : Alice
age : 30
```

### Using Range

The `range()` function generates a sequence of numbers, useful for loops that involve counting.

```python
for i in range(1, 6):
    print(i)
```

Output:

```
1
2
3
4
5
```

### Building a Counter

You can update variables within a loop, such as counting occurrences.

```python
visits = 0
for i in range(1, 11):
    visits += 1
print(visits)
```

Output:

```
10
```

The loop counts from 1 to 10, updating the `visits` counter.

## `while` Loop

While loops are useful for repeating actions while a condition remains true.

- **If statement** runs code once if a condition is true.
- **While loop** repeats the code as long as the condition is true.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-16-010006.png)

</div>

Example: While Loop

```python
stock = 10
num_purchases = 0

while num_purchases < stock:
    num_purchases += 1
    print(f"Remaining stock: {stock - num_purchases}")
```

Output:

```
Remaining stock: 9
Remaining stock: 8
Remaining stock: 7
...
Remaining stock: 0
```

The loop continues until stock reaches zero.


### Infinite Loops

Caution: 

- If we don't update the condition inside the loop, the loop will never stop.
- Always ensure the condition changes to avoid infinite loops.

Example of an Infinite Loop

```python
stock = 10
num_purchases = 0

while num_purchases < stock:
    print("Still in stock")
    # Forgetting to increment num_purchases leads to an infinite loop
```

### Conditional Statements

We can add conditionals to print different messages based on remaining stock.

```python
stock = 10
num_purchases = 0

while num_purchases < stock:
    num_purchases += 1
    if stock - num_purchases > 7:
        print("Plenty of stock remaining")
    elif stock - num_purchases > 3:
        print("Some stock remaining")
    elif stock - num_purchases > 0:
        print("Low stock!")
    else:
        print("No stock!")
```

Output:

```
Plenty of stock remaining
Plenty of stock remaining
Some stock remaining
Some stock remaining
Low stock!
Low stock!
No stock!
```

The message changes based on how much stock is left.


## Break & Continue

Ways to stop or control loops:

- **break**: Exits the loop entirely.
- **continue**: Skips to the next iteration of the loop.

Examples: 

- `for`:

    ```python
    for i in range(5):
        if i == 3:
            break  # Loop stops when i equals 3
        print(i)
    ```

    Output:

    ```plaintext
    0
    1
    2
    ```

- `While`:

    ```python
    stock = 10
    num_purchases = 0

    while num_purchases < stock:
        num_purchases += 1
        print(f"Remaining stock: {stock - num_purchases}")
        if num_purchases == 5:
            break
    ```

    Output:

    ```
    Remaining stock: 9
    Remaining stock: 8
    Remaining stock: 7
    Remaining stock: 6
    Remaining stock: 5
    ```

    The loop stops after 5 purchases due to the `break`.
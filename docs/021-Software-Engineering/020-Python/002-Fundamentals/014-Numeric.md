---
title: "Numerics"
description: "Numerics"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 14
last_update:
  date: 10/28/2019
---

## Python Numeric Types

Python has several built-in ways to handle numbers. 

- Integers are for whole numbers
- Floats are for approximate or fractional numbers
- Decimals are for precise values, like money

Integers and floats are enough for most calculations, but decimals are useful when exact precision is needed.


## Using Decimals

Decimals let you avoid rounding errors and keep exact values. You need to import them from the `decimal` module.

In the example below, `Decimal` is used to store precise values:

```python
from decimal import Decimal

price = Decimal("19.99")
tax = Decimal("0.07")
total = price + (price * tax)
print(total)
```

Output:

```text
21.3893
```

Decimals help keep calculations accurate, especially for currency or precise measurements.


## Printing Floats

Floats can sometimes display in scientific notation. You can control how many decimal places appear using `f-strings`.

- Small numbers may show as `1e-05`
- `f-strings` format the number neatly
- specify precision with `.Xf` where `X` is number of decimals

Example formatting a float:

```python
value = 0.00001
print(f"{value:f}")
print(f"{value:.7f}")
```

Output:

```text
0.000010
0.0000100
```


## Python Division

Python supports two division types: 

- **Normal float division:** `/` returns a float result
- **Floored division:** `//` returns the whole number part only


Example with numbers:

```python
print(4 / 2)
print(7 // 3)
```

Output:

```text
2.0
2
```

Floored division is useful when you need integer results without rounding.



## Booleans 

Booleans are used for `true`/`false` values and for checking conditions in code. They act like an "on/off" switch.

For example, setting a flag and checking it with an if statement:

```python
is_hungry = True

if is_hungry:
    print("Time to eat!")
```

Output:

```text
Time to eat!
```

### Truthy and Falsey Values 

Beyond `True` and `False`, other values can also behave like booleans. Python treats values as truthy or falsey in conditions.

| Value type                   | Boolean behavior                     | Example                       |
| ---------------------------- | ------------------------------------ | ----------------------------- |
| Numbers                      | 0 is falsey, non-zero is truthy      | `0`, `2`, `-5`                |
| Strings, lists, dictionaries | Empty is falsey, non-empty is truthy | `""`, "hi", `[]`, `[1]`, `{}` |
| None                         | Always falsey                        | `None`                        |


For example, using numbers in a condition:

```python
apples = 2

if apples:
    print("You have apples!")

apples = 0

if not apples:
    print("No apples left.")
```

Output:

```text
You have apples!
No apples left.
```


You can also check if a value is "truthy" or "falsey" using the `bool()` function, which converts any value to its boolean equivalent.

In the example below, `values` contains different types, and `bool()` is used to evaluate them:

```python
values = [0, 1, "", "hello", [], [5], None]

for v in values:
    print(f"{v}: {bool(v)}")
```

Output:

```text
0: False
1: True
: False
hello: True
[]: False
[5]: True
None: False
```


### Boolean Operators

Operators can be used to compare values and return booleans. 

- `==` checks equality
- `!=`, `<`, `<=`, `>`, `>=` check other comparisons

Example comparing cookie quantities:

```python
cookie_qty = 3

print(cookie_qty == 3)  
print(cookie_qty > 5)  
```

Output:

```text
True
False
```


### Floats and Boolean Checks

Float numbers may not be exact due to how Python stores them, so comparing float with `==` can give unexpected results. To keep the comparisons precise, you can use rounding or tolerances.

Example:

```python
value = 0.1 + 1.1

print(value == 1.2)  # "might be" False
print(value)         # shows small difference
```

Output:

```text
False
1.2000000000000002
```

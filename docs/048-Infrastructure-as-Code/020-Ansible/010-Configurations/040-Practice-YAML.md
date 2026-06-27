---
title: "Practice Yaml"
description: "Practice Yaml"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 40
last_update:
  date: 12/12/2020
---

## Overview

Note that these are not the exact same questions. You can try to answer them and create a YAML file in your own machines based on the questions.

Use the expandable answers to compare your solution after you finish each exercise.

**1. Create a dictionary with the following key-value pairs**

| Key | Value |
| :- | :- |
| name | apple |
| color | red |
| weight | 90 g |

<details>
  <summary>Answer</summary>

```yaml
name: apple
color: red
weight: 90 g
```

</details>


**2. Create the dictionary for "employee" using the data below.**

| Key | Value |
| :- | :- |
| name | jane doe |
| gender | female |
| age | 24 |

<details>
  <summary>Answer</summary>

```yaml
employee:
    name: jane doe
    gender: female
    age: 24
```

</details>


**3. Using the same dictionary above, add the "address" to the "employee" dictionary:**

```yaml
employee:
    name: jane doe
    gender: female
    age: 24
```

The details for the address are:

| Key | Value |
| :- | :- |
| city | orlando |
| state | florida |
| country | united states |

<details>
  <summary>Answer</summary>

```yaml
employee:
    name: jane doe
    gender: female
    age: 24
    address:
        city: orlando
        state: florida
        country: united states
```

</details>


**4. Create an array of 4 apples and 2 mangoes.**

<details>
  <summary>Answer</summary>

```yaml
- apple
- apple
- apple
- apple
- mango
- mango
```

</details>


**5. Create a list of fruits with their attributes based on the table below.**

| Fruit | Color | Weight |
| :- | :- | :- |
| apple | red | 90 g |
| banana | yellow | 100 g |
| melons | green | 150 g |
| apricots | orange | 75 g |

The first one is already created.

```yaml
- fruit: apple
  color: red
  weight: 90 g
```

<details>
  <summary>Answer</summary>

```yaml
- fruit: apple
  color: red
  weight: 90 g

- fruit: banana
  color: yellow
  weight: 100 g

- fruit: melons
  color: green
  weight: 150 g

- fruit: apricots
  color: orange
  weight: 75 g
```

</details>


**6. Using the same dictionary from Question 3, add another employee named 'John Smith' and convert dictionary to a list.**

```yaml
employee:
    name: jane doe
    gender: female
    age: 24
```

The details for john:

| Key | Value |
| :- | :- |
| name | john smith |
| gender | male |
| age | 30 |

<details>
  <summary>Answer</summary>

```yaml
employee:
  - name: jane doe
    gender: female
    age: 24

  - name: john smith
    gender: male
    age: 30

```

</details>


**7. Add the "payslip" details for Jane Doe.**

```yaml
employee:
    name: jane doe
    gender: female
    age: 24
    address:
        city: 'orlando'
        state: 'florida'
        country: 'united states'
```
Her payslip details:

| Number | Month  | Amount |
| :- | :- | -: |
| 1 | april | 105,0000 |
| 2 | may | 120,000 |
| 3 | june | 98,000 |
| 4 | july | 110,000 |

<details>
  <summary>Answer</summary>

```yaml
employee:
    name: jane doe
    gender: female
    age: 24
    address:
        city: 'orlando'
        state: 'florida'
        country: 'united states'
    payslips:
        - number: 1
          amount: 105,000  
          month: 'april'

        - number: 2
          amount: 120,000  
          month: 'may'

        - number: 3
          amount: 98,000  
          month: 'june'

        - number: 4
          amount: 110,000  
          month: 'july'
```

</details>

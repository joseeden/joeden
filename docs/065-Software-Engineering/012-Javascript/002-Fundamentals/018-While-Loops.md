---
title: "While Loop"
description: "While Loop in Javascript"
tags: 
- Web Development
- Javascript
sidebar_position: 18
last_update:
  date: 12/23/2020
---


## Overview 

A **while loop** runs **as long as a condition is true**, unlike the **for loop**, which has a set number of iterations.

Example: Printing numbers from 1 to 10.

- **Using a For Loop:**

    ```javascript
    for (let i = 1; i <= 10; i++) {
      console.log(`Iteration ${i}`);
    }
    ```

- **Using a While Loop:**

    ```javascript
    let i = 1;                        // Initialize counter outside of the loop

    while (i <= 10) {                 // Condition to check
      console.log(`Iteration ${i}`);
      i++;                            // Increment counter
    }
    ```

Output:

```
Iteration 1
Iteration 2
Iteration 3
Iteration 4
Iteration 5
Iteration 6
Iteration 7
Iteration 8
Iteration 9
Iteration 10
```

The **while loop** does the same as the **for loop**, but the **counter and incrementing are handled separately**.


## Example: Rolling a Dice Until We Get 6  

The code below generates a random decimal number between 0 and 6 every time it runs:  

```js
let dice = Math.random() * 6;
console.log(dice);
```  

Sample output:

```js
0.8258020006410827 
```

Since `Math.random()` returns a decimal between 0 and 1, multiplying by 6 expands the range. However, this does not ensure whole numbers like a real dice roll. To fix this, we can use `Math.trunc()` to remove decimals.

```js
let dice = Math.trunc(Math.random() * 6);
console.log(dice);
```  

However, this produces numbers from 0 to 5:

```js
// Outputs
0, 1, 2, 3, 4, 5 
```

For a normal six-sided die, you want 1 to 6, so add 1:

```js
let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
```  

**Useful to know:** JavaScript supports chained dot notation, where you can access another property or call another method on the value returned by the previous operation.

```js
const name = " alice ";
console.log(name.trim().toUpperCase());
```

However, for the dice example, the code below will return an error because `trunc()` is not a method of a number. It belongs to the `Math` object.

```js
// This will return an ERROR
let dice = (Math.random() * 6).trunc();
```

Instead, use `Math.trunc()`:

```js
let dice = Math.trunc(Math.random() * 6);
```


Now that we know what logic to use, we can now create the loop. We don’t know yet **how many times** we’ll need to roll, so a **while loop** is perfect. 

```javascript
let dice;

while (dice !== 6) {
  dice = Math.trunc(Math.random() * 6) + 1;
  console.log(`You rolled a ${dice}`)
}
```

Output (varies each time):

```
You rolled a 2
You rolled a 5
You rolled a 4
You rolled a 1
You rolled a 6
```

When you re-run the code, you'll get a different output:

```
You rolled a 1
You rolled a 3
You rolled a 4
You rolled a 6  
```

## Key Differences: `for` vs `while`

| Feature         | For Loop                 | While Loop                |
|---------------|----------------------|----------------------|
| Counter Required? | Yes                     | No (optional)         |
| Use Case        | Known iterations      | Unknown iterations  |
| Condition Placement | In loop definition  | Only condition needed |

## `do while` Loop

A `do...while` loop is similar to a `while` loop, but the condition is checked **after** the code runs.

- A `while` loop checks the condition first, then runs the code.
- A `do...while` loop runs the code first, then checks the condition.

**Note:** A `do...while` loop always runs **at least once**.

```javascript
let counter = 10;

do {
  console.log(counter);
  counter--;
} while (counter > 0);
```

Output:

```text
10
9
8
7
6
5
4
3
2
1
```

Even if the condition is false from the beginning, the code still runs once.

```javascript
let counter = 0;

do {
  console.log(counter);
  counter--;
} while (counter > 0);
```

Output:

```text
0
```

This is useful when something needs to run at least once before checking whether it should run again.


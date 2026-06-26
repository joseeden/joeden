---
title: "Control Structures"
description: "Control Structures"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 28
last_update:
  date: 7/19/2023
---

## Overview

Control structures decide which code runs and how often it runs.

In Go, the most common control structures are:

- `if`, `else if`, and `else` for conditional logic
- `for` for loops
- `switch` for checking one value against multiple cases
- `break` and `continue` for controlling loop flow

This page uses a small bank command-line program as the example.

## Basic If Statement

Use `if` when code should only run if a condition is true.

```go
package main

import "fmt"

func main() {
	accountBalance := 1000.0

	fmt.Println("Welcome to Go Bank")
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check balance")
	fmt.Println("2. Deposit money")
	fmt.Println("3. Withdraw money")
	fmt.Println("4. Exit")

	var choice int

	fmt.Print("Your choice: ")
	fmt.Scan(&choice)

	if choice == 1 {
		fmt.Println("Your balance is", accountBalance)
	}
}
```

The condition `choice == 1` checks whether the value stored in `choice` is equal to `1`.

**Note**: Use `==` for comparison. Use `=` only when assigning a value to a variable.

## Boolean Conditions

A condition produces a Boolean value. A Boolean can only be `true` or `false`.

```go
wantsCheckBalance := choice == 1

if wantsCheckBalance {
	fmt.Println("Your balance is", accountBalance)
}
```

For short checks, the condition is usually written directly in the `if` statement.

```go
if choice == 1 {
	fmt.Println("Your balance is", accountBalance)
}
```

Common comparison operators:

| Operator | Meaning                   |
| -------- | ------------------------- |
| `==`     | Equal to.                 |
| `!=`     | Not equal to.             |
| `<`      | Less than.                |
| `>`      | Greater than.             |
| `<=`     | Less than or equal to.    |
| `>=`     | Greater than or equal to. |

You can combine conditions with logical operators.

| Operator | Meaning                              |
| -------- | ------------------------------------ |
| `&&`     | Both conditions must be true.        |
| `||`     | At least one condition must be true. |
| `!`      | Reverses a Boolean value.            |

## Else If And Else

Use `else if` when there are multiple related conditions.

Use `else` as the final fallback when none of the earlier conditions matched.

```go
if choice == 1 {
	fmt.Println("Your balance is", accountBalance)
} else if choice == 2 {
	var depositAmount float64

	fmt.Print("Your deposit: ")
	fmt.Scan(&depositAmount)

	accountBalance += depositAmount
	fmt.Println("Balance updated! New amount:", accountBalance)
} else if choice == 3 {
	var withdrawalAmount float64

	fmt.Print("Your withdrawal: ")
	fmt.Scan(&withdrawalAmount)

	accountBalance -= withdrawalAmount
	fmt.Println("Balance updated! New amount:", accountBalance)
} else {
	fmt.Println("Goodbye")
}
```

The `+=` and `-=` operators update an existing value.

| Operator | Example                              | Same as                                              |
| -------- | ------------------------------------ | ---------------------------------------------------- |
| `+=`     | `accountBalance += depositAmount`    | `accountBalance = accountBalance + depositAmount`    |
| `-=`     | `accountBalance -= withdrawalAmount` | `accountBalance = accountBalance - withdrawalAmount` |

## Validate Input

You can nest `if` statements inside another branch.

This is useful when a choice needs extra validation.

```go
if choice == 2 {
	var depositAmount float64

	fmt.Print("Your deposit: ")
	fmt.Scan(&depositAmount)

	if depositAmount <= 0 {
		fmt.Println("Invalid amount. Must be greater than zero.")
		return
	}

	accountBalance += depositAmount
	fmt.Println("Balance updated! New amount:", accountBalance)
}
```

The `return` keyword stops the current function.

In `main()`, that means the program exits.

:::warning

Use validation before changing important values. For example, check that a deposit is positive before adding it to the balance.

:::

## For Loops

Go uses `for` for loops. It does not have a separate `while` keyword.

A counted loop has three parts:

```go
for i := 0; i < 2; i++ {
	fmt.Println("Iteration:", i)
}
```

| Part     | Purpose                                      |
| -------- | -------------------------------------------- |
| `i := 0` | Creates the loop counter.                    |
| `i < 2`  | Keeps the loop running while this is true.   |
| `i++`    | Increases the counter after each iteration.  |

For a command-line app that should keep asking for input, an infinite loop is often useful.

```go
for {
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check balance")
	fmt.Println("2. Deposit money")
	fmt.Println("3. Withdraw money")
	fmt.Println("4. Exit")

	var choice int

	fmt.Print("Your choice: ")
	fmt.Scan(&choice)

	if choice == 4 {
		fmt.Println("Goodbye")
		break
	}
}
```

The `break` keyword exits the nearest loop.

Code after the loop can then run.

```go
for {
	if choice == 4 {
		break
	}
}

fmt.Println("Thanks for choosing our bank.")
```

## Continue

Use `continue` to skip the rest of the current loop iteration and start the next one.

This is useful when invalid input should show an error but keep the program running.

```go
if depositAmount <= 0 {
	fmt.Println("Invalid amount. Must be greater than zero.")
	continue
}
```

With `continue`, the balance update is skipped, and the menu is shown again.

## Conditional For Loops

A `for` loop can also run while a condition is true.

```go
for isRunning {
	// do something
}
```

The loop continues until `isRunning` becomes `false`.

This form is similar to a `while` loop in other languages.

## Complete Example

```go
package main

import "fmt"

func main() {
	accountBalance := 1000.0

	fmt.Println("Welcome to Go Bank")

	for {
		fmt.Println("What do you want to do?")
		fmt.Println("1. Check balance")
		fmt.Println("2. Deposit money")
		fmt.Println("3. Withdraw money")
		fmt.Println("4. Exit")

		var choice int

		fmt.Print("Your choice: ")
		fmt.Scan(&choice)

		if choice == 1 {
			fmt.Println("Your balance is", accountBalance)
		} else if choice == 2 {
			var depositAmount float64

			fmt.Print("Your deposit: ")
			fmt.Scan(&depositAmount)

			if depositAmount <= 0 {
				fmt.Println("Invalid amount. Must be greater than zero.")
				continue
			}

			accountBalance += depositAmount
			fmt.Println("Balance updated! New amount:", accountBalance)
		} else if choice == 3 {
			var withdrawalAmount float64

			fmt.Print("Your withdrawal: ")
			fmt.Scan(&withdrawalAmount)

			if withdrawalAmount <= 0 {
				fmt.Println("Invalid amount. Must be greater than zero.")
				continue
			}

			if withdrawalAmount > accountBalance {
				fmt.Println("Invalid amount. You cannot withdraw more than you have.")
				continue
			}

			accountBalance -= withdrawalAmount
			fmt.Println("Balance updated! New amount:", accountBalance)
		} else {
			fmt.Println("Goodbye")
			break
		}
	}

	fmt.Println("Thanks for choosing our bank.")
}
```

Run the program:

```bash
go run .
```

## Switch Statements

When one value is compared against several possible values, a `switch` statement can be easier to read than a long `if`, `else if`, and `else` chain.

```go
switch choice {
case 1:
	fmt.Println("Your balance is", accountBalance)
case 2:
	fmt.Println("Deposit money")
case 3:
	fmt.Println("Withdraw money")
default:
	fmt.Println("Goodbye")
}
```

The `default` case runs when none of the other cases match.

:::info

Go does not require `break` at the end of every `case`. Only the matching case runs by default.

:::

If a `switch` is inside a loop, `break` exits the `switch`, not the loop.

Use `return` when the switch branch should exit the whole `main()` function.

```go
switch choice {
case 1:
	fmt.Println("Your balance is", accountBalance)
default:
	fmt.Println("Goodbye")
	return
}
```

## When To Use Each Structure

| Structure  | Use when                                      |
| ---------- | --------------------------------------------- |
| `if`       | One condition decides whether code runs.      |
| `else if`  | Several related conditions should be checked. |
| `else`     | A fallback should run when nothing matched.   |
| `for`      | Code should run multiple times.               |
| `break`    | A loop should stop early.                     |
| `continue` | The current loop iteration should be skipped. |
| `switch`   | One value is checked against several cases.   |

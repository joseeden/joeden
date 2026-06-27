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
sidebar_position: 32
last_update:
  date: 7/19/2023
---

## Overview

Control structures decide which code runs and how often it runs.

In Go, the most common control structures are:

| Controls                | Description                                      													  |
| ----------------------- | --------------------------------------------------------------------------- |
| `if`, `else if`, `else` | Execute code based on one or more conditions.                               |
| `for`                   | Repeat a block of code in a loop.                                           |
| `switch`                | Compare a value against multiple cases.                                     |
| `break`                 | Exit the current loop or `switch` statement.                                |
| `continue`              | Skip the rest of the current loop iteration and continue with the next one. |

:::info 

This page uses a simple banking application to demonstrate control structures. The program allows the user to check their balance, deposit money, withdraw money, or exit the program.

> See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)

:::

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

- Use `==` for comparison. 
- Use `=` only when assigning a value to a variable.

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

## Comparison Operators

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

> See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)
 
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

**Note:** When you're adding a value to the a variable and then assigning it back to the same variable, you can use the `+=` operator.

The same is true for subtraction with the `-=` operator.

| Operator | Example                              | Same as                                              |
| -------- | ------------------------------------ | ---------------------------------------------------- |
| `+=`     | `accountBalance += depositAmount`    | `accountBalance = accountBalance + depositAmount`    |
| `-=`     | `accountBalance -= withdrawalAmount` | `accountBalance = accountBalance - withdrawalAmount` |

## Nested If Statements

You can nest `if` statements inside another branch. This is useful when a choice needs extra validation.

In this example, if the user chooses to deposit money, the program checks that the deposit is a positive number before adding it to the balance. 

> See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)

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

The `return` keyword stops the current function. In `main()`, that means the program exits.

:::warning

Use validation before changing important values. 

For example, check that a deposit is positive before adding it to the balance.

:::

## For Loops

Go uses `for` for loops. It does not have a separate `while` keyword.

A counted loop has three parts:

```go
for i := 0; i < 2; i++ {
	fmt.Println("Iteration:", i)
}
```

| Part     | Purpose                                      		|
| -------- | ------------------------------------------------ |
| `i := 0` | Creates the loop counter.                    		|
| `i < 2`  | Keeps the loop running while this is true.   		|
| `i++`    | Code that's executed after every loop iteration  |

Note that the loop counter `i` is only available inside the loop. It cannot be used outside of the loop. The `i < 2` condition keeps the loop running while it is true. When the condition becomes false (which means after two iterations), the loop stops.

The `i++` statement is shorthand for `i = i + 1`. It increases the value of `i` by one. This is called the **increment operator**. You can also use `i--` to decrease the value of `i` by one. 

## Infinite Loops 

If we want to run the loop ten times (or more), we would change the middle condition to `i < 10`.

> See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)

```go
for i := 0; i < 10; i++ {
	fmt.Println("Iteration:", i)
}
```

However, if we want to keep asking the user for input until they choose to exit, we can use an infinite loop. To make it an infinite loop, we can leave the condition empty. The loop will keep running until we use `break` to exit it.

In this example, the program keeps asking the user for input until they choose the nearest `break` keyword, which is `4` to exit.

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

fmt.Print("Thank you for banking with us! Have a great day!\n")
```

Note that you can also use `return` here, which will completely stop the program. For example, if the user chooses `4`, the program will print "Goodbye" and then exit. It will not print "Thank you for banking with us! Have a great day!" because the program has already exited.

```go
for {
	f.....

	if choice == 4 {
		fmt.Println("Goodbye")
		return
	}
}

fmt.Print("Thank you for banking with us! Have a great day!\n")
```

Output (if the user chooses `4`):

```bash
Goodbye
```

If we use `break` instead of `return`, the program will print "Goodbye" and then continue to the next line after the loop, which is "Thank you for banking with us! Have a great day!"

```go
for {
	f.....

	if choice == 4 {
		fmt.Println("Goodbye")
		break
	}
}

fmt.Print("Thank you for banking with us! Have a great day!\n")
```

Output (if the user chooses `4`):

```bash
Goodbye
Thank you for banking with us! Have a great day!
```

## Continue

Another way to control loops is with the `continue` keyword. We can use `continue` to skip the rest of the current loop iteration and start the next one.

This is useful when invalid input should show an error but keep the program running.

In the example below, if the user enters a deposit amount that is less than or equal to zero, the program prints an error message and then continues the loop without updating the balance or exiting the program.

> See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)

```go
if depositAmount <= 0 {
	fmt.Println("Invalid amount. Must be greater than zero.")
	continue
}
```

We can also use it to validate if the user chooses an invalid option. If the user enters a number that is not `1`, `2`, `3`, or `4`, the program prints an error message and continues the loop without exiting.

```go
	for {
		...

		if choice == 1 {
			...

		} else if choice == 2 {
			...

		} else if choice == 3 {
			...

		} else if choice == 4 {
			...

		} else {
			fmt.Println("Invalid choice. Please enter a number between 1 and 4.")
			continue
		}

	}
```

This will restart the loop and ask the user for input again.

This form is similar to a `while` loop in other languages.


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

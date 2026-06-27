---
title: "Error Handling"
description: "Error Handling"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 40
last_update:
  date: 7/19/2023
---

## Overview

Go handles many failures by returning an error value.

Instead of using `try` and `catch`, Go functions often return a normal result and an `error`. The caller checks the error and decides what should happen next.

:::info

This page uses a simple banking app that stores the account balance in `balance.txt` so the value can be reused across multiple runs.

See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)

:::


## Reading a Missing File

Let's say we have a function that reads the account balance from a file (`balance.txt`) and returns the balance as a `float64`.

```go
const accountBalanceFile = "balance.txt"

func readFromFile() float64 {

	data, err := os.ReadFile(accountBalanceFile) // Reads the file
	balanceStr := string(data)

	balance, err := strconv.ParseFloat(balanceStr, 64) // Checks contents of the file
  return balance, nil
}
```

If the file was read successfully, the data is stored in `data` and `err` is set to `nil`. If something went wrong, like for example, if the file does not exist, `err` contains an error value.

For the `err` variable, `nil` actually means the operation succeeded.

| Check        | Meaning            |
| ------------ | ------------------ |
| `err == nil` | No error happened. |
| `err != nil` | An error happened. |

To check whether an error happened, we can add an `err != nil` condition in two places: after reading the file and after parsing the balance.

```go
const accountBalanceFile = "balance.txt"

func readFromFile() (float64, error) {
	data, err := os.ReadFile(accountBalanceFile) // Reads the file

	if err != nil {
		return 0, err
	}

	balanceStr := string(data)
	balance, err := strconv.ParseFloat(balanceStr, 64) // Checks contents of the file

	if err != nil {
		return 0, err
	}
	return balance, nil
}
```

Note that the function definition now indicates that the function will return two values: a `float64` and an `error`.

```go
func readFromFile() (float64, error) 
```

If the file does not exist, the `os.ReadFile()` function will return an error. 

```bash
readFromFile ➜ No file exists ➜ return 0, err
```

If the file exists but the contents are not a valid number, the `strconv.ParseFloat()` function will return an error.

```bash
readFromFile ➜ File exists ➜ But contents are not valid ➜ return 0, err
```

Since `readFromFile()` now returns an error (not just a value), the caller function should also check whether an error was returned and then decide what to do next.

For example, the `main()` function is calling `readFromFile()`. If it gets a `nil` error, it can continue. If it gets a non-`nil` error, it can print the error and exit.

```go
func main() {
	acctBalance, err := readFromFile()

	if err != nil {
		fmt.Println("Failed to read balance:", err)
		return
	}

	...
}
```

In this example, the `readFromFile()` function returns an error if the file cannot be read but the `main()` function is the one that decides what to do next. 



## Returning a Default Value

If we want the specific function to handle the error, we can return a default value instead of returning an error.

In this example, the banking app uses `1000` if the balance file cannot be read.

```go
func getBalanceFromFile() float64 {
	data, err := os.ReadFile(accountBalanceFile)

	if err != nil {
		return 1000
	}

	balanceText := string(data)
	balance, err := strconv.ParseFloat(balanceText, 64)

	if err != nil {
		return 1000
	}

	return balance
}
```

Here, the `getBalanceFromFile()` function returns a `float64` value and does not return an error. If the file cannot be read or the contents are invalid, it still returns `1000`.

| Problem                    | Fallback behavior       |
| -------------------------- | ----------------------- |
| Balance file is missing.   | Return `1000`.          |
| Balance file is not valid. | Return `1000`.          |

## Return Custom Errors

If we want to return a custom error message, we can import the `errors` package and use the `errors.New()` function.

Here, the `getBalanceFromFile()` function returns a `float64` value and an `error`. If the file cannot be read or the contents are invalid, it returns a custom error message.

```go
import (
	"errors"
	...
)

func getBalanceFromFile() (float64, error) {
	data, err := os.ReadFile(accountBalanceFile)

	if err != nil {
		return 1000, errors.New("failed to find balance file")
	}

	balanceText := string(data)
	balance, err := strconv.ParseFloat(balanceText, 64)

	if err != nil {
		return 1000, errors.New("failed to parse stored balance value")
	}

	return balance, nil
}
```

The `errors.New()` function is used to create a custom error message.

```go
errors.New("failed to find balance file")
```

When there is no error, `nil` is returned as the error value.

```go
return balance, nil
```

## Handle The Custom Error

When a function returns multiple values, store each value in its own variable.

```go
accountBalance, err := getBalanceFromFile()

if err != nil {
	fmt.Println("ERROR")
	fmt.Println(err)
	fmt.Println("----------")
}
```

This prints the custom error message but still lets the program continue with the fallback balance.

:::tip

Return an error when the caller should decide how to react. This keeps the lower-level function focused on its own job.

:::

## Stop The Program With Return

If the program should not continue after an error, use `return`.

```go
accountBalance, err := getBalanceFromFile()

if err != nil {
	fmt.Println("ERROR")
	fmt.Println(err)
	return
}

fmt.Println("Your balance is", accountBalance)
```

In the `main()` function, `return` exits the program.

## Stop The Program With Panic

Another way to stop the program is to use `panic()`. This is a more drastic measure than returning an error or using `return`. It should be used only when the program cannot reasonably continue.

```go
accountBalance, err := getBalanceFromFile()

if err != nil {
	...
	panic("can't continue")
}

fmt.Println("Your balance is", accountBalance)
```

`panic()` stops the program and prints debugging information.

Sample output:

```bash
Welcome to the Pennywise Bank!
----------------------------------
ERROR
Failed to find balance file
----------------------------------
panic: Unable to continue. Please check the balance file and try again.

goroutine 1 [running]:
main.main()
        /mnt/c/Git/joeden/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning/018-Handling-Errors-Panic/app.go:44 +0x9a5
exit status 2  
```

:::warning

Do not use `panic()` for normal user input problems or expected file problems. Prefer returning an error and handling it clearly.

:::

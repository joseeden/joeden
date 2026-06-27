---
title: "File Persistence"
description: "File Persistence"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 35
last_update:
  date: 7/19/2023
---

## Overview

File persistence lets a program keep data after it stops running.

Without persistence, a value stored in a variable only exists while the program is running. In a banking app, that means the account balance would reset every time the app starts.

Go can store simple data in a file with the `os` package.

:::info

This page uses a simple banking app that stores the account balance in `balance.txt` so the value can be reused across multiple runs.

See sample code here: [GitHub](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning)

:::

## Write Data To A File

Use `os.WriteFile()` to write data to a file.

```go
package main

import (
	"fmt"
	"os"
)

func writeBalanceToFile(balance float64) {
	balanceText := fmt.Sprint(balance)
	data := []byte(balanceText)
	os.WriteFile("balance.txt", data, 0644)
}
```

`os.WriteFile()` needs three values.

| Value        | Example                 | Purpose                                      |
| ------------ | ----------------------- | -------------------------------------------- |
| File name    | `"balance.txt"`         | Sets the file that should be written.        |
| File content | `[]byte(balanceText)`   | Sets the data that should go into the file.  |
| Permissions  | `0644`                  | Sets who can read and write the file.        |

The value written to the file must be a byte slice. This means the data must be converted to bytes before writing it. In this example, the balance is converted to a string first (using `fmt.Sprint`), and then the string is converted to bytes.

```go
balanceText := fmt.Sprint(balance)
data := []byte(balanceText)
```

**Note**: The `0644` permission value means the file owner can read and write the file, and other users can only read it. See [Linux file permissions.](https://www.redhat.com/en/blog/linux-file-permissions-explained)

After creating the `writeBalanceToFile()` function, you can now call it inside the functions where you want changes to be saved in a file. 

Using the [simple banking app example](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning), we can call the `writeBalanceToFile()` function after a deposit or withdrawal.

```go
accountBalance += depositAmount
writeBalanceToFile(accountBalance)

accountBalance -= withdrawalAmount
writeBalanceToFile(accountBalance)
```

After the app runs and changes the balance, the project folder should contain a `balance.txt` file.


## Use A File Name Constant

If the same file name is used in multiple places, store it in a package-level constant.

This makes the file name easier to change later.

```go
const accountBalanceFile = "balance.txt"

func writeBalanceToFile(balance float64) {
	balanceText := fmt.Sprint(balance)
	data := []byte(balanceText)
	os.WriteFile(accountBalanceFile, data, 0644)
}
```

## Read Data From A File

We can use `os.ReadFile()` to read from a file.

From the [simple banking app example](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning), we can read the account balance from `balance.txt` when the app starts.

```go
const accountBalanceFile = "balance.txt"

func getBalanceFromFile() float64 {
	data, _ := os.ReadFile(accountBalanceFile)
	balanceText := string(data)
	balance, _ := strconv.ParseFloat(balanceText, 64)

	return balance
}
```

This function does three things.When the file is read, the content is returned as a byte slice, which is why it has to be converted to a string before parsing it as a number.

| Step                    | Code                                  | Purpose                                  |
| ----------------------- | ------------------------------------- | ---------------------------------------- |
| Read the file           | `os.ReadFile(accountBalanceFile)`     | Loads the file content as bytes.         |
| Convert bytes to string | `string(data)`                        | Turns the file content into text.        |
| Parse the number        | `strconv.ParseFloat(balanceText, 64)` | Turns the text into a `float64` value.   |

To use `strconv.ParseFloat()`, you need to import the `strconv` package.

The `strconv.ParseFloat()` needs the string to parse and a bit size. You can choose `32` or `64` for the bit size, and the result type will then be `float32` or `float64`, respectively.

**Note:** Use `64` when the rest of the program works with `float64`.

| Bit size | Result type |
| -------- | ----------- |
| `32`     | `float32`   |
| `64`     | `float64`   |

## Ignoring Errors 

The simple version below ignores errors with `_`. This means that if the file is missing or the file content cannot be parsed as a number, the program may use an unexpected zero value.

```go
const accountBalanceFile = "balance.txt"

func getBalanceFromFile() float64 {
	data, _ := os.ReadFile(accountBalanceFile)
	balanceText := string(data)
	balance, _ := strconv.ParseFloat(balanceText, 64)

	return balance
}
```

If you want to specifically handle errors, you can use `err` instead of `_` to check for errors. For example, you can check if the file exists and if the content is valid before using the value.

```go
const accountBalanceFile = "balance.txt"

func getBalanceFromFile() float64 {
	data, err := os.ReadFile(accountBalanceFile)

	if err != nil {
		return 0, err
	}

	balanceText := string(data)
	balance, err := strconv.ParseFloat(balanceText, 64)

	if err != nil {
		return 0, err
	}

	return balance, nil
}
```

Note that this doesn't tell what the error is, just that there was an error. It tells the caller function (another function that's calling `getBalanceFromFile()`) that something went wrong, and the caller can decide what to do about it.

For more information, please see [Error Handling](/docs/065-Software-Engineering/030-Golang/002-Fundamentals/040-Error-Handling.md])

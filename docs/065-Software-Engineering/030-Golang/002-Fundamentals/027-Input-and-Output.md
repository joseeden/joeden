---
title: "Input and Output"
description: "User Input and Output"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 27
last_update:
  date: 7/19/2023
---

## Overview

Go can read values entered in the terminal with functions from the `fmt` package.

For simple command-line programs, `fmt.Scan()` is an easy way to ask the user for a value and store it in a variable.

## Scan A Value

Use `fmt.Scan()` to read input from the terminal.

Example investment calculator program that prompts the user for the investment amount, expected return rate, and number of years:

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	const inflationRate = 0.02
	var investmentAmount float64

	years := 10
	returnRate := 0.05

	fmt.Scan(&investmentAmount)
	fmt.Scan(&years)

	futureValue := investmentAmount * math.Pow(1+returnRate, float64(years))
	adjustedFutureValue := futureValue / math.Pow(1+inflationRate, float64(years))

	fmt.Println("Future Value: ", futureValue)
	fmt.Println("Adjusted Future Value: ", adjustedFutureValue)
}

```

The `&` symbol gives `fmt.Scan()` a pointer to the variable. This lets `fmt.Scan()` update the variable with the value entered by the user.

```go
fmt.Scan(&investmentAmount)
fmt.Scan(&years)
```

When the program reaches `fmt.Scan()`, it waits until the user enters a value and presses Enter.

```bash
go run .

```

Note that the program will not print anything until the user enters a value. The program is waiting for input. 

Enter the value for amount and year, for example:

```bash
go run .

2000
15
```

Output:

```bash
Future Value:  4157.856358822736
Adjusted Future Value:  3089.348519781723
```


## Variables can change, Constants cannot

User input is one reason variables are useful.

A variable can start with a value and then be reassigned later.

In the example below, the variables are initialized with default values, but the user can enter new values to update them. 

```go
func main() {
    ...
    var investmentAmount float64 = 1000.0
    years := 10

    fmt.Print("Investment Amount: ")
    fmt.Scan(&investmentAmount)

    ...
}
```

User can enter a new value for `investmentAmount`, and the variable will be updated with that value.

```bash
go run .

1000     ## investmentAmount now becomes 1000
18       ## years now becomes 18
```

Constants cannot be used this way because constants cannot change after they are set.

```go
func main() {
    const inflationRate = 0.02
    var investmentAmount float64 = 1000.0

    years := 10

    fmt.Print("Investment Amount: ")
    fmt.Scan(&investmentAmount)
    fmt.Scan(&inflationRate)    // This will not work

    ...
}

```

:::warning

Use variables for values that come from user input. Use constants only for values that should never change while the program runs.

:::

If a value will always come from user input, you can declare the variable without setting an initial value, but make sure to include the type,like this:

```go
var investmentAmount float64
var years int
var returnRate float64
```

Go needs the type because there is no value it can use to infer the type.

| Declaration              | Meaning                                              |
| ------------------------ | ---------------------------------------------------- |
| `var years int`          | Creates an integer variable with the zero value `0`. |
| `var returnRate float64` | Creates a decimal number variable with `0.0`.        |
| `years := 10`            | Creates a variable and infers the type from `10`.    |

**Note**: Short variable declaration cannot be used here, because there is no initial value to infer the type from.


## Scan Limitations

`fmt.Scan()` is useful for simple input, such as numbers and single words. It is less convenient for multi-word text because it reads input separated by spaces.

| Input type        | `fmt.Scan()` fit                             |
| ----------------- | -------------------------------------------- |
| Number            | Good fit.                                    |
| Single word       | Good fit.                                    |
| Multiple numbers  | Good fit when scanning into multiple values. |
| Multi-word string | Not a good fit for beginner examples.        |

For simple calculator input, `fmt.Scan()` is enough.



## Formatting Floats 

In Go, you can format floating-point numbers using the `fmt.Printf` function with format verbs. For example, `%.2f` formats a float with two decimal places.

```go
fmt.Printf("Future Value: %.2f\n", futureValue)
fmt.Printf("Adjusted Future Value: %.2f\n", adjustedFutureValue)
```

Sample input with expected output would look like this:

```bash
## Input
Enter the investment amount: 1000
Enter the number of years to invest: 10

## Output 
Future Value: 1628.89
Adjusted Future Value: 1335.64
```

**Note:** The `%.2f` format doesn't work with `fmt.Println()`, so you need to use `fmt.Printf()` for formatted output and add a newline character (`\n`) at the end of the string to move to the next line.

If you use `fmt.Println()`, it will print the full precision of the float, which may not be desirable for user-facing output.

```bash
## Input
Enter the investment amount: 1000
Enter the number of years to invest: 10

## Output 
Future Value: %.2f 1628.8946267774415
Adjusted Future Value: %.2f 1336.2609377526499
```

## Formatting Strings 

We can use the `fmt.Sprintf()` function to format the string and return it, which can then be printed with `fmt.Print()`. This allows for more control over the output format.

```go
formattedFutureValue := fmt.Sprintf("Future Value: %.2f\n", futureValue)
formattedAdjustedFutureValue := fmt.Sprintf("Adjusted Future Value: %.2f\n", adjustedFutureValue)

fmt.Print(formattedFutureValue, formattedAdjustedFutureValue)
```

Same input with expected output would look like this:

```bash
## Input
Enter the investment amount: 1000
Enter the number of years to invest: 10

## Output 
Future Value: 1628.89
Adjusted Future Value: 1335.64
```

As we can see, the output didn't change, but we now have more control over how we format the output and can easily reuse the formatted strings if needed.


## Multiline Strings 

We can also use backticks (`` ` ``) to create multiline strings in Go. This is useful for formatting output that spans multiple lines.

```go
multilineString := `This is a
multiline string
in Go.`
fmt.Println(multilineString)
```

Output:

```bash
This is a
multiline string
in Go.
```

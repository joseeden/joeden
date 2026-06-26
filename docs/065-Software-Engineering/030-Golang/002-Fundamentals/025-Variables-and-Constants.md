---
title: "Variables and Constants"
description: "Variables and Constants"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 25
last_update:
  date: 7/19/2023
---

## Overview

Variables let a Go program store values and reuse them in calculations.

:::info 

The example used in this page is a small investment calculator with hardcoded values.

::: 

## Create Variables

Use `var` to create a variable.

```go
var investmentAmount = 1000 
var returnRate = 0.05
var years = 10
var inflationRate = 0.02
```

Each variable stores a value.

- `investmentAmount` stores the starting investment amount
- `returnRate` stores the expected yearly return rate
- `years` stores the investment duration
- `inflationRate` stores the expected yearly inflation rate

Go variables should use clear names. For multi-word names, Go commonly uses camel case.

**Note**: A variable should be used after it is declared. If you declare a variable and never use it, Go reports an error.

## Variable Scope 

Variables can be declared inside a function or outside a function. 

1. **Inside a function (most common)**

    Declare variables inside a function if they are only used there.

    ```go
    package main

    import "fmt"

    func main() {
        var name = "Alice"
        fmt.Println(name)
    }
    ```

2. **Outside a function (package-level variable)**

    Declare variables outside functions if they need to be shared across multiple functions.

    ```go
    package main

    import "fmt"

    var greeting = "Hello"

    func main() {
        printGreeting()
    }

    func printGreeting() {
        fmt.Println(greeting)
    }
    ```

    Note that when you declare a variable outside a function, you have to use the `var` keyword. You cannot use the `:=` syntax for package-level variables.

    This will NOT work:

    ```go
    greeting := "Hello"
    ```

## Basic Types

| Type      | Meaning                                 | Example                 |
| --------- | --------------------------------------- | ----------------------- |
| `int`     | Whole number without decimal places.    | `10`                    |
| `float64` | Number with decimal places.             | `5.5`                   |
| `string`  | Text value.                             | `"Hello"`               |
| `bool`    | Boolean value.                          | `true` or `false`       |
| `uint`    | Unsigned whole number.                  | `255`                   |
| `int32`   | 32-bit signed whole number.             | `1234567890`            |
| `int64`   | 64-bit signed whole number.             | `9223372036854775807`   |
| `rune`    | Unicode code point, stored as `int32`.  | `'a'`                   |
| `uint32`  | 32-bit unsigned whole number.           | `4294967295`            |

Go can infer the type from the value, which means you don't always need to specify it explicitly. For example: 

```go
var investmentAmount = 1000      // int
var returnRate = 0.05            // float64
var message = "Hello, World!"    // string
var isActive = true              // bool
```

## Zero Values

If you create a variable with a type but no explicit value, Go gives it a zero value.

```go
var age int
```

The value of `age` is `0`.

| Type      | Zero value    |
| --------- | ------------- |
| `int`     | `0`           |
| `float64` | `0.0`         |
| `string`  | `""`          |
| `bool`    | `false`       |

Zero values make variables predictable even before you assign a custom value.

## Example: Calculate A Future Value     

The future value formula is:

```text
future value = investment amount * (1 + return rate / 100) ^ years
```

In Go, multiplication uses `*`, and division uses `/`.

Go does not use a built-in `^` operator for powers in this kind of calculation. Use `math.Pow()` from the standard library instead.

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    var investmentAmount = 1000
    var returnRate = 0.05
    var years = 10

	var futureValue = float64(investmentAmount) * math.Pow(1 + returnRate/100, float64(years))
	fmt.Println("Future Value: ", futureValue)
}
```

Run the program:

```bash
go run .
```

Output:

```bash
Future Value:  1005.0112650131326 
```

This prints the calculated future value.

## Convert Types

Go is statically typed, which means the type of each value matters.

In the calculator example, `investmentAmount` and `years` are inferred as `int`, while `returnRate` is inf erred as `float64`.

The calculation uses `math.Pow()`, and `math.Pow()` expects `float64` values.

Use `float64()` to convert an integer for the calculation:

```go
float64(investmentAmount)
float64(years)
```

This does not permanently change the original variable. It only converts the value where it is used.

:::info

Go does not automatically mix `int` and `float64` in calculations. 

Convert values explicitly when a function or calculation expects a specific type.

:::

## Explicit Type Declaration

You can explicitly declare the type of a variable when you create it. This is useful when you want to ensure a variable has a specific type, regardless of the value assigned.

Example:

```go
var investmentAmount int = 1000
var returnRate float64 = 0.05
var years int = 10
``` 

Since those values are now explicitly declared, you don't need to convert them for calculations that expect those types.

```go
var futureValue = investmentAmount * math.Pow(1+returnRate/100, years)
```

## Alternative Variable Declaration 

You can also declare and initialize a variable in one line using the `:=` syntax. This is called **short variable declaration**. 

A few notes:

- This can only be used inside functions, not at the package level. 
- This cannot be used with an explicit type declaration. 
- The type is inferred from the value assigned.

Example:

```go
import (
	"fmt"
	"math"
)

func main() {
    var investmentAmount float64 = 1000
    returnRate := 0.05
    var years float64 = 10

    futureValue := investmentAmount * math.Pow(1+returnRate/100, years)
    fmt.Println("Future Value: ", futureValue)
}
```

Additionally, you can declare multiple variables in one line. For example,`investmentAmount` and `years`:

```go
import (
	"fmt"
	"math"
)

func main() {
    var investmentAmount, years float64 = 1000, 10
    returnRate := 0.05

    futureValue := investmentAmount * math.Pow(1+returnRate/100, years)
    fmt.Println("Future Value: ", futureValue)
}
```

Note that if you assign a type to one variable, all variables in that declaration must have the same type.

If you try to declare variables of different types in one line, Go will throw an error: 

```bash
var investmentAmount, years float64 = 1000, "10" 
```

If you want to declare variables of different types but still in the same line, simply remove the explicit type declaration and let Go infer the types:

```go
var investmentAmount, years = 1000, "10"
```

Lastly, you can also declare multiple variables using the `:=` syntax:

```go
investmentAmount, years := 1000, 10
```

Note that in this case, Go will infer the types of both variables based on the values assigned.

## Constants 

Constants are like variables, but their values cannot change after they are set.

Using the same example, you can declare a constant for the inflation rate:

```go
import (
	"fmt"
	"math"
)

func main() {   

    // Constant
	const inflationRate = 0.02  

	investmentAmount, years := 1000, 10 
	var returnRate = 0.05

	futureValue := float64(investmentAmount) * math.Pow(1+returnRate/100, float64(years))
	fmt.Println("Future Value: ", futureValue)

    // Compute the future value adjusted for inflation
    adjustedFutureValue := futureValue / math.Pow(1 + inflationRate, float64(years))
    fmt.Println("Adjusted Future Value: ", adjustedFutureValue)

}
```

Running the program will give you the future value and the adjusted future value considering inflation.

```bash
go run .
```

Output:

```bash
Future Value:  1005.0112650131326
Adjusted Future Value:  824.4592826089025
```

Since the inflation rate rate is lower than the return rate, the adjusted future value is lower than the future value.

:::info 

The main difference with constannts is that they cannot be changed after they are set. If you try to change the value of a constant, Go will throw an error.

On the other hand, variables can be changes or re-assigned to a new value at any time.

:::
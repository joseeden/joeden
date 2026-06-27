---
title: "Functions"
description: "Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 30
last_update:
  date: 7/19/2023
---

## Overview

Functions are reusable blocks of code that run when they are called.

In Go, the `main()` function is special because Go calls it automatically when the program starts. Other functions run only when your code calls them.

```go
func main() {
	fmt.Println("Hello")
}
```

The `fmt.Println()` call is also a function call. It uses a function from the `fmt` package.

## Define and Call a Function

Use the `func` keyword to define a function.

```go
func outputText() {
	fmt.Print("Hello")
}
```

A function definition has these parts:

| Part             | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `func`           | Starts a function definition.                |
| `outputText`     | Names the function.                          |
| `()`             | Holds any parameters the function accepts.   |
| `{ ... }`        | Holds the function body that should run.     |
| `fmt.Print(...)` | Runs code when the function is called.       |

**Note**: Function names should clearly describe what the function does.

To run a function, call it by writing its name followed by parentheses.

```go
func main() {
	outputText()
}

func outputText() {
	fmt.Print("Hello")
}
```

In this example, `main()` calls `outputText()`. The code inside `outputText()` runs at that point.

## Passing Parameters

Parameters let a function receive input values.

To pass a parameter, pass them inside the parentheses in the function definition, followed by the parameter type. 

For example, `text` with type *string*:

```go
func outputText(text string) {
	fmt.Print(text)
}
```

The `text` parameter then becomes available inside the function body.

Call the function `outputText` and pass an argument:

```go
func main() {
	outputText("Investment Amount: ")
}

func outputText(text string) {
	fmt.Print(text)
}
```

The argument `"Investment Amount: "` is stored in the `text` parameter while the function runs.

:::info

The parameter is the name in the function definition. The argument is the value passed when the function is called.

:::

## Using Multiple Parameters

A function can accept more than one parameter.

```go
func printUser(name string, age int) {
	fmt.Println(name, age)
}
```

If multiple parameters use the same type, you can write the type once at the end.

```go
func outputTwoTexts(firstText, secondText string) {
	fmt.Print(firstText, secondText)
}
```

Both `firstText` and `secondText` are `string` values.

## Returning a Value

A function can return a value to the place where it was called.

> See sample code here: [Investment Calculator using Functions ](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning/007-Investment-Calculator-using-Functions)

Here, the `investmentAmount`, `returnRate`, and `years` parameters are passed info the function. The function calculates the future value and returns it to the caller.

```go
func calculateFutureValue(investmentAmount, returnRate, years float64) float64 {
	futureValue := investmentAmount * math.Pow(1+returnRate, years)
	return futureValue
}
```

When the value is returned, it is formatted as a `float64` because that is the return type specified in the function definition.

The `return` keyword sends the value back to the caller.

```go
func calculateFutureValue(...) float64 {
	...
	return futureValue
}
```

The returned value can be stored in a variable when the function is called. 

```go
futureValue := calculateFutureValue(investmentAmount, returnRate, years)
```

## Returning Multiple Values

Go functions can return more than one value.

In this example, the `calculateFutureValues` function contains two calculations. It then returns both the `futureValue` and the `adjustedFutureValue`.

```go
func calculateFutureValues(investmentAmount, returnRate, years float64) (float64, float64) {
	const inflationRate = 0.02

	futureValue := investmentAmount * math.Pow(1+returnRate, years)
	adjustedFutureValue := futureValue / math.Pow(1+inflationRate, years)

	return futureValue, adjustedFutureValue
}
```

To store the returned values, use multiple variables.

```go
futureValue, adjustedFutureValue := calculateFutureValues(investmentAmount, returnRate, years)
```

The first returned value goes into the first variable (`futureValue`)

The second returned value goes into the second variable (`adjustedFutureValue`)

## Named Return Values

Go also allows named return values. This means that the variable names are specified in the function definition, not inside the function body. This creates the variables automatically when the function runs.

```go
func calculateFutureValues(investmentAmount, returnRate, years float64) (futureValue, adjustedFutureValue float64) {
	const inflationRate = 0.02

	futureValue = investmentAmount * math.Pow(1+returnRate, years)
	adjustedFutureValue = futureValue / math.Pow(1+inflationRate, years)

	return futureValue, adjustedFutureValue
}
```

Since variables are created automacally, we don't need to use the `:=` operator. Instead, we can use the `=` operator to assign values to the variables.

```go
futureValue = investmentAmount * math.Pow(1 + returnRate, years)
adjustedFutureValue = futureValue / math.Pow(1 + inflationRate, years)
```

You can also use a plain `return` when return values are named.

```go
func calculateFutureValues(...) (futureValue, adjustedFutureValue float64) {
	...
	return
}
```

**Note**: Explicitly returning the values is often easier to read, especially when a function becomes longer.

## Function Scope

Variables and constants created inside a function only exist inside that function.

```go
func main() {
	investmentAmount := 1000.0
}

func calculateFutureValue() {
	fmt.Println(investmentAmount) // This will not work
}
```

The `investmentAmount` variable is scoped to `main()`, so `calculateFutureValue()` cannot use it directly.

In the example below, the `calculateFutureValue` is called inside the `main()` function so it can use the `investmentAmount`, `returnRate`, and `years` variables.

```go
func main() {
	investmentAmount := 1000.0
	returnRate := 0.05
	years := 10.0

	futureValue := calculateFutureValue(investmentAmount, returnRate, years)
	fmt.Println(futureValue)
}

func calculateFutureValue(investmentAmount, returnRate, years float64) float64 {
	return investmentAmount * math.Pow(1 + returnRate, years)
}
```

Note that constants and variables can also be declared outside functions.

```go
const inflationRate = 0.02

func main() {
	fmt.Println(inflationRate)
}
```

A package-level value can be used by all functions in the same package.

:::warning

Keep values inside functions when they only belong to that function. 

Use package-level values only when multiple functions need the same value.

:::

<!-- For the investment calculator, `inflationRate` can be a package-level constant because it does not change.

```go
const inflationRate = 0.02
```

Values from user input should stay inside `main()` and then be passed into other functions as arguments. -->

## Example: Investment Calculator With Functions

In this example, the `main()` function collects user input and then calls the `calculateFutureValues()` function to calculate the future value and adjusted future value of an investment.

> See sample code here: [Investment Calculator using Functions](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/030-Golang/000-Projects/001-Learning/007-Investment-Calculator-using-Functions)

Run the program:

```bash
go run .
```

Sample input with expected output:

```bash
## Input 
Enter the investment amount: 1000
Enter the number of years to invest: 100

## Output
Future Value: 131501.26
Adjusted Future Value: 18151.51
```


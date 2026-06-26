package main

/*
CLI Sample - Finance

This simple script that calculates the future value of an investment. It asks the user for the following:

- Investment amount
- The annual interest rate
- The number of years to invest

It then calculates the future value of the investment using the formula:

Future Value = Investment Amount * (1 + Interest Rate) ^ Number of Years

Future Value (adjusted for inflation) = Future Value / (1 + Inflation Rate) ^ Number of Years

To run the code:

	go run app.go

*/

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
	adjustedFutureValue := futureValue / math.Pow(1+inflationRate, float64(years))
	fmt.Println("Adjusted Future Value: ", adjustedFutureValue)

}

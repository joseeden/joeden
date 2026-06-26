package main

/*

This is a simple investment calculator that calculates the future value of an investment based on user input.

This program prompts the user for the following inputs:

- Investment Amount (investmentAmount)
- Number of years (years)
- Expected return rate (returnRate)

It also calculates the adjusted future value of the investment based on a constant inflation rate (inflationRate)

*/

import (
	"fmt"
	"math"
)

func main() {
	const inflationRate = 0.02
	var investmentAmount, years float64
	returnRate := 0.05

	fmt.Print("Enter the investment amount: ")
	fmt.Scan(&investmentAmount)

	fmt.Print("Enter the number of years to invest: ")
	fmt.Scan(&years)

	futureValue := investmentAmount * math.Pow(1+returnRate, float64(years))
	adjustedFutureValue := futureValue / math.Pow(1+inflationRate, float64(years))

	fmt.Println("Future Value: ", futureValue)
	fmt.Println("Adjusted Future Value: ", adjustedFutureValue)
}

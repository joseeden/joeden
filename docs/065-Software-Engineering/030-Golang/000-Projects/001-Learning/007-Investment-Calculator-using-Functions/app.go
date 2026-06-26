package main

/*

This is a simple investment calculator that calculates the future value of an investment based on user input.

This program prompts the user for the following inputs:

- Investment Amount (investmentAmount)
- Number of years (years)
- Expected return rate (returnRate)

It also calculates the adjusted future value of the investment based on a constant inflation rate (inflationRate)

To run the code:

	go run app.go

*/

import (
	"fmt"
	"math"
)

const inflationRate = 0.02

func main() {

	var investmentAmount, years float64
	var returnRate = 0.05

	fmt.Print("Enter the investment amount: ")
	fmt.Scan(&investmentAmount)

	fmt.Print("Enter the number of years to invest: ")
	fmt.Scan(&years)

	// futureValue := calculatefutureValue(investmentAmount, returnRate, years)
	// adjustedFutureValue := calculateAdjustedFutureValue(futureValue, inflationRate, years)

	futureValue, adjustedFutureValue := calculateValues(investmentAmount, returnRate, years)

	formattedFutureValue := fmt.Sprintf("Future Value: %.2f\n", futureValue)
	formattedAdjustedFutureValue := fmt.Sprintf("Adjusted Future Value: %.2f\n", adjustedFutureValue)

	fmt.Print(formattedFutureValue, formattedAdjustedFutureValue)
}

// func calculatefutureValue(investmentAmount, returnRate, years float64) float64 {
// 	return investmentAmount * math.Pow(1+returnRate, float64(years))
// }

// func calculateAdjustedFutureValue(futureValues, inflationRate, years float64) float64 {
// 	return futureValues / math.Pow(1+inflationRate, float64(years))
// }

func calculateValues(investmentAmount, returnRate, years float64) (futureValue, adjustedFutureValue float64) {

	futureValue = investmentAmount * math.Pow(1+returnRate, float64(years))
	adjustedFutureValue = futureValue / math.Pow(1+inflationRate, float64(years))

	return
}

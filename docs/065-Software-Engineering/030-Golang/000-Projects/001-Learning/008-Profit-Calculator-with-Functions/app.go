package main

/*

Profit Calculator

This program calculates the profit.
This ask the user for the following inputs:

- Revenue (revenue)
- Expenses (expenses)
- Tax rate (taxRate)

It then calculates the following:

- Earnings before tax (earningsBeforeTax)
- Earnings after tax (earningsAfterTax)
- Ratio between earnings and revenue (profitRatio)

To run the code:

	go run app.go

*/

import "fmt"

func main() {

	fmt.Println("Welcome to the Profit Calculator!")

	revenue := getUserInput("Enter the revenue: ")
	expenses := getUserInput("Enter the expenses: ")
	taxRate := getUserInput("Enter the tax rate (as a percentage): ")

	earningsBeforeTax, earningsAfterTax, profitRatio := calculateValues(revenue, expenses, taxRate)

	fmt.Printf("Earnings before tax: %.2f\n", earningsBeforeTax)
	fmt.Printf("Earnings after tax: %.2f\n", earningsAfterTax)
	fmt.Printf("Profit Ratio: %.2f\n", profitRatio)
}

func getUserInput(infoText string) float64 {

	var userInput float64
	fmt.Print(infoText)
	fmt.Scan(&userInput)
	return userInput
}

func calculateValues(revenue, expenses, taxRate float64) (float64, float64, float64) {

	earningsBeforeTax := revenue - expenses
	earningsAfterTax := earningsBeforeTax * (1 - (taxRate / 100))
	profitRatio := earningsAfterTax / revenue

	return earningsBeforeTax, earningsAfterTax, profitRatio
}

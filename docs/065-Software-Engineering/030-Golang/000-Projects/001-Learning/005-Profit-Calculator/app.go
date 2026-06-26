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

import (
	"fmt"
)

func main() {

	var revenue, expenses, taxRate float64
	var earningsBeforeTax, earningsAfterTax, profitRatio float64

	fmt.Print("Welcome to the Profit Calculator!\n")

	fmt.Print("Enter the revenue: ")
	fmt.Scan(&revenue)

	fmt.Print("Enter the expenses: ")
	fmt.Scan(&expenses)

	fmt.Print("Enter the tax rate (as a percentage): ")
	fmt.Scan(&taxRate)

	earningsBeforeTax = revenue - expenses
	earningsAfterTax = earningsBeforeTax * (1 - (taxRate / 100))
	profitRatio = earningsAfterTax / revenue

	fmt.Printf("Earnings before tax: %.2f\n", earningsBeforeTax)
	fmt.Printf("Earnings after tax: %.2f\n", earningsAfterTax)
	fmt.Printf("Profit ratio: %.2f\n", profitRatio)

}

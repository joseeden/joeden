package main

import (
	"fmt"
)

func main() {
	var acctBalance float64 = 1000

	fmt.Println("Welcome to the Pennywise Bank!")

	for {

		fmt.Println("----------------------------------")
		fmt.Println("What would you like to do today?")
		fmt.Println("1. Check balance")
		fmt.Println("2. Deposit money")
		fmt.Println("3. Withdraw money")
		fmt.Println("4. Exit")

		var choice int

		fmt.Print("Enter your choice (1-4): ")
		fmt.Scan(&choice)

		if choice == 1 {
			fmt.Printf("Your current balance is: %.2f\n", acctBalance)

		} else if choice == 2 {

			var depositAmount float64

			fmt.Print("Deposit amount: ")
			fmt.Scan(&depositAmount)

			if depositAmount <= 0 {
				fmt.Println("Invalid deposit amount. Must be greater than zero.")
				return
			}

			acctBalance += depositAmount
			fmt.Printf("Balance updated! New amount: %.2f\n", acctBalance)

		} else if choice == 3 {

			var withdrawalAmount float64

			fmt.Print("Withdrawal amount: ")
			fmt.Scan(&withdrawalAmount)

			if withdrawalAmount <= 0 {
				fmt.Println("Invalid withdrawal amount. Must be greater than zero.")
				return
			} else if withdrawalAmount > acctBalance {
				fmt.Println("Insufficient funds. Cannot withdraw more than the current balance.")
				return
			} else {
				acctBalance -= withdrawalAmount
				fmt.Printf("Balance updated! New amount: %.2f\n", acctBalance)
			}

		} else {
			fmt.Print("Goobye!\n")
			return
		}

	}

	fmt.Print("Thank you for banking with us! Have a great day!\n")
}

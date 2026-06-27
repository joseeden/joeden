package main

import (
	"fmt"
	"os"
	"strconv"
)

const accountBalanceFile = "balance.txt"

func writeToFile(balance float64) {
	balanceStr := fmt.Sprint(balance)
	os.WriteFile(accountBalanceFile, []byte(balanceStr), 0644)
}

func readFromFile() float64 {
	data, _ := os.ReadFile(accountBalanceFile)
	balanceStr := string(data)
	balance, _ := strconv.ParseFloat(balanceStr, 64)
	return balance
}

func main() {
	var acctBalance float64 = readFromFile()
	
	fmt.Println("Welcome to the Pennywise Bank!")

	for {

		fmt.Println("----------------------------------")
		fmt.Println("What would you like to do today?")
		fmt.Println("1. Check balance")
		fmt.Println("2. Deposit money")
		fmt.Println("3. Withdraw money")
		fmt.Println("4. Exit")

		fmt.Print("Enter your choice (1-4): ")

		var choice int
		fmt.Scan(&choice)

		switch choice {
		case 1:
			fmt.Printf("Your current balance is: %.2f\n", acctBalance)

		case 2:
			var depositAmount float64

			fmt.Print("Deposit amount: ")
			fmt.Scan(&depositAmount)

			if depositAmount <= 0 {
				fmt.Println("Invalid deposit amount. Must be greater than zero.")
				continue
			}

			acctBalance += depositAmount
			writeToFile(acctBalance)

			fmt.Printf("Balance updated! New amount: %.2f\n", acctBalance)

		case 3:
			var withdrawalAmount float64

			fmt.Print("Withdrawal amount: ")
			fmt.Scan(&withdrawalAmount)

			if withdrawalAmount <= 0 {
				fmt.Println("Invalid withdrawal amount. Must be greater than zero.")
				continue

			} else if withdrawalAmount > acctBalance {
				fmt.Println("Insufficient funds. Cannot withdraw more than the current balance.")
				continue

			} else {
				acctBalance -= withdrawalAmount
				writeToFile(acctBalance)

				fmt.Printf("Balance updated! New amount: %.2f\n", acctBalance)
			}

		case 4:
			fmt.Print("Goobye!\n")
			fmt.Print("Thank you for banking with us! Have a great day!\n")
			return

		default:
			fmt.Println("Invalid choice. Please enter a number between 1 and 4.")
			continue
		}

	}
}
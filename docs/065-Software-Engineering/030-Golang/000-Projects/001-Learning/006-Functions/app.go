package main

import "fmt"

func main() {
	fmt.Print("Hello, World!\n")
	outputTest("This is a test function!\n", 42)
}

func outputTest(testword string, anotherParam int) {
	fmt.Print(testword)
	fmt.Println(anotherParam)
}

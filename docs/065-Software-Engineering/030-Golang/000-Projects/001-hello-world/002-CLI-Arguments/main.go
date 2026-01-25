package main

import (
	"fmt"
	"os"
)

func main() {
	args := os.Args
	fmt.Printf("Hello, World!\n")
	fmt.Printf("Arguments: %v\n", args[1:len(args)])
}

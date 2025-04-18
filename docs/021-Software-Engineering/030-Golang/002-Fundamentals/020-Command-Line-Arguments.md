---
title: "Command Line Arguments"
description: "Passing an Argument"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 20
last_update:
  date: 7/19/2023
---


## Overview

This is a simple way to accept and use command-line arguments in a Go program.

- Use `os.Args` to get arguments
- `os.Args` includes the program name
- Slice the arguments to exclude the program name

This helps you write programs that react to inputs like `go run main.go hello world`.

## Getting the Arguments

To read command-line inputs in Go, use the `os` package.

- `os.Args` returns a slice of strings
- First item is the program name
- The rest are your arguments

Here’s a sample:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    args := os.Args
    fmt.Printf("Full arguments: %v\n", args)
}
```

**Expected result:**
```sh
go run main.go first second
Full arguments: [/tmp/go-build.... main.go first second]
```

Even if it shows the full path, the real arguments start from index 1.

## Accessing Specific Arguments

You can select a specific argument using an index.

- Use `args[1]` for the first real argument
- Use a slice like `args[1:3]` to get a range

Here’s how:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    args := os.Args
    if len(args) > 1 {
        fmt.Printf("First argument: %s\n", args[1])
    }
}
```

Only ask for what exists. Otherwise, you’ll get an error if there aren’t enough arguments.

## Slicing Arguments Safely

You can grab all arguments after the program name.

- `args[1:]` gives everything after the program
- No need to hardcode end index

Try this:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    args := os.Args[1:]
    fmt.Printf("Arguments: %v\n", args)
}
```

This is a cleaner way to handle multiple inputs at once.

## Avoiding Out-of-Bounds Errors

Accessing beyond what's available causes an error.

- Use `len(args)` to check how many items you have
- Don’t go past the end of the slice

Example that avoids crash:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    args := os.Args
    if len(args) > 2 {
        fmt.Println("First two arguments:", args[1:3])
    } else {
        fmt.Println("Not enough arguments.")
    }
}
```

Always check length before slicing or indexing to stay safe.

## Passing Arguments in VS Code

To test arguments in VS Code, add them in the launch config.

- Open `.vscode/launch.json`
- Add `args` to your configuration

Example setup:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Go Program",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}",
            "args": ["one", "two"]
        }
    ]
}
```

Then run using **Run Without Debugging**, and you'll see the arguments used.

## Wrap-up

Using `os.Args` lets Go programs respond to user input from the command line.

- Use `os.Args[1:]` to ignore the program name
- Always check the length to prevent errors
- Try slicing the args to get the pieces you need

This makes your program flexible to different inputs and easier to test.
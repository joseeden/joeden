---
title: "CLI Arguments"
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

## Create the Program

To read command-line inputs in Go, use the `os` package.

- `os.Args` returns a slice of strings
- First item is the program name
- The rest are your arguments

Here’s a sample program:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	args := os.Args
	fmt.Printf("Hello, World!\n")
	fmt.Printf("Arguments: %v\n", args)
}
```

Run on the terminal:

```bash
go run main.go 
```

Expected result:

```sh
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main] 
```

## Passing the Argument 

Now run the program with the argument `first`:

```bash
go run main.go first 
```

Output: 

```sh
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main first] 
```

We can pass multiple arguments, `first` and `second`, and it will output both:

```sh
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main first second] 
```

In the output, we can see that it returned three arguments: 

- `/tmp/go-build1001234567/b001/exe/main`
- `first`
- `second`

The first argument is always index 0, so the real arguments actually starts from index 1.

#### Explanation 

When you use:

```bash
go run main.go first
```

Go doesn't compile and run `main.go` directly in your current directory. Instead, it:
- Compiles it into a temporary binary in a path like `/tmp/go-build.../exe/main`
- Then runs **that** temporary binary with your arguments (in this case, `first`)

Then `os.Args` will show:

- The full path to the binary being executed (the first element)
- Followed by any arguments you passed (like `first`)

So the full output is just Go showing:

```go
[<path to temp binary> first]
```

#### Build Manually 

If you run `go build` first:

```bash
go build -o myapp
./myapp first
```

Then `os.Args` will look like:
```go
[./myapp first]
```

Same behavior—just a different binary path.


## Accessing Specific Arguments

You can select a specific argument using an index.

- Use `args[1]` for the first real argument
- Use a slice like `args[1:3]` to get a range

Modify the previous code so that it only returns the first actual argument which is at index 1.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	args := os.Args
	fmt.Printf("Hello, World!\n")
	fmt.Printf("Arguments: %v\n", args[1])
}
```

Now run the program and pass three arguments: `first`, `second`, and `third`.

```bash
go run main.go first second third
```

Since we only ask for the first item, it will output just the `first`:

```bash
Hello, World!
Arguments: first 
```

Notice that the output doesn't have square brackets anymore. That's because we're accessing a **single element** (`args[1]`) of the slice, not printing the whole slice. 

When we print the entire `os.Args` slice, Go shows it with brackets (e.g., `[./main first]`). But when we access an individual item, like `args[1]`, it prints only the string value of that element with no brackets.

:::info 

When accessing individual items, make sure that the items exists. Otherwise, you’ll get an error if there aren’t enough arguments.

:::

## Slicing Arguments Safely

You can also grab all the arguments passed.

- `args[1:]` gives all arguments that are passed
- No need to hardcode end index

Modify the code again:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	args := os.Args
	fmt.Printf("Hello, World!\n")
	fmt.Printf("Arguments: %v\n", args[1:3])  // excluding element at index 3
}
```

Now run the program and pass the following arguments: 

- `walter`
- `white`
- `jesse`
- `pinkman`
- `saul`
- `goodman`


```bash
go run main.go walter white jesse pinkman saul goodman
```

Since we only asked for the first two arguments, it will return:

```bash
Hello, World!
Arguments: [walter white]
```


## Out-of-Bounds Errors 

If we try to access a slice beyond its available range:

```go 
package main

import (
	"fmt"
	"os"
)

func main() {
	args := os.Args
	fmt.Printf("Hello, World!\n")
	fmt.Printf("Arguments: %v\n", args[1:100])
}

```

But only provide a few arguments:

```bash
go run main.go first second third fourth 
```

We'll get a runtime error like this:

```bash
Hello, World!
panic: runtime error: slice bounds out of range [:100] with capacity 5

goroutine 1 [running]:
main.main()
        /project/path/main.go:11 +0xc8
exit status 2
```

The error occurs because `os.Args` only contains 5 elements in this case (including the program name), but we're trying to access up to index 99 (`args[1:100]`), which exceeds the slice's bounds and causes a panic at runtime.

      
## Preventing Index Errors 

Accessing beyond the available number of arguments can cause runtime errors. To avoid them:

- Use `len(args)` to determine how many arguments are available  
- Avoid accessing indexes outside the valid range of the slice

Example using `len()` to safely access arguments:

```go
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
```

Run the program with these arguments: `ted`, `robin`, `marshall`, `lily`:

```bash
go run main.go ted robin marshall lily
```

The output will display all the provided inputs:

```bash
Hello, World!
Arguments: [ted robin marshall lily]
```


## Passing Arguments in VS Code

To test arguments in VS Code, add them in the launch config.

1. Initialize the module first.

		```bash
		go mod init cli  ## any name works
		```

2. Click Run --> Add configuration 
3. Select `Go: Launch Package`
4. This will create a `.vscode/launch.json`
5. Add `args` to your configuration

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
                "args": ["first", "second", "third", "fourth"]
            }
        ]
    }
    ```

6. Save the file.
7. Click Run --> Run Without Debugging
8. In the Debug Console, you should see:

		```
		Starting: C:\Users\user1\go\bin\dlv.exe dap --listen=127.0.0.1:55953 from C:\project\path
		DAP server listening at: 127.0.0.1:55953
		Hello, World!
		Arguments: [first second third fourth]
		Process 28268 has exited with status 0
		```


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
sidebar_position: 23
last_update:
  date: 7/19/2023
---


## Overview

You can pass arguments to a Go program from the command line. These arguments are available through the `os.Args` slice in the `os` package.

Sample program: 

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

The os.Args slice contains everything passed to the program:

- The path to the executable (`os.Args[0]`)
- Any command-line arguments (`os.Args[1]`, `os.Args[2]`, and so on)

An argument is any value that is passed to the program when it is executed. It can be a string, number, or any other data type. The syntax is like this:

```bash
go run main.go <argument1> <argument2> <argument3> ...
```

Before we run the program, initialize the Go module first:

```bash
go mod init cli  ## any name works
```

This will create a `go.mod` which contains:

```bash
module cli

go 1.22.0 
```

## Running without Arguments

Run the program with no arguments:

```bash
go run main.go 
```

Output: 

```sh
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main] 
```

Since there were no arguments passed, the output only shows the path to the temporary binary that Go created to run the program. 

```bash
/tmp/go-build1001234567/b001/exe/main 
```

This is the first element of `os.Args`, which is always the path to the executable, and any additional arguments will follow in the slice.

## Passing an Argument 

Now run the program with the argument `oxford`:

```bash
go run main.go oxford
```

Output: 

```sh
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main oxford] 
```

We can also pass multiple arguments, `oxford` and `standford`:

```bash
go run main.go oxford standford
```

Output: 

```sh
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main oxford standford] 
```

The values in `os.Args` are stored as follows:

| Index | Value                                   |
| ----: | --------------------------------------- |
|   `0` | `/tmp/go-build1001234567/b001/exe/main` |
|   `1` | `oxford`                                |
|   `2` | `standford`                             |

**Note:** The first argument (the path to the executable) is always index 0 (`os.Args[0]`), so the real arguments actually start from index 1 (`os.Args[1]`).

This is because go run does not execute `main.go` directly. Instead, it:

1. Compiles it into a temporary binary in a path like `/tmp/go-build.../exe/main`
2. Then runs that temporary binary with your arguments

As a result, `os.Args[0]` contains the temporary executable's path, followed by your command-line arguments.

If you build the program yourself instead:

```bash
go build -o cli   ## "cli" is the name of binary I chose, but you can name it anything
```

This should usually complete in less than a second (or a few seconds the first time). If its taking too long, you can run this to see what is happening:

```bash
go build -x -o cli
```

Alternatively, you can also time it:

```bash
time go build -o cli
```

**Note**: When you run `go build`, Go checks the repository's VCS (Git) information and embeds build metadata into the binary by default. If you're using WSL and your project is located under `/mnt/c`, this step can be slow because Git has to scan the Windows filesystem.

If you don't need the VCS metadata, you can disable it:

```bash
go build -buildvcs=false -o cli
```

Once the build is complete, you can run the binary with arguments:

```bash
./cli oxford standford harvard 
```

Output:

```bash
Hello, World!
Arguments: [/tmp/go-build1001234567/b001/exe/main oxford standford harvard] 
```

## Accessing Specific Arguments

To access specific arguments, you can use indexing. For example, to access the first argument:
```go
fmt.Printf("Arguments: %v\n", args[1])
```

The full program now looks like this: 

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

Now run the program and pass three arguments: `ted`, `robin`, and `barney`.

```bash
go run main.go ted robin barney
```

It would return just the first argument:

```bash
Hello, World!
Arguments: ted
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

Here, the index `0` is skipped, which means the temporary binary path is not included in the output. The slice `args[1:3]` will include only the first two arguments passed to the program.

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
go run main.go john paul george ringo
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

Accessing beyond the available number of arguments can cause runtime errors. 

To avoid them:

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

2. Click Run ➜ Add configuration 
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
7. Click Run ➜ Run Without Debugging
8. In the Debug Console, you should see:

		```
		Starting: C:\Users\user1\go\bin\dlv.exe dap --listen=127.0.0.1:55953 from C:\project\path
		DAP server listening at: 127.0.0.1:55953
		Hello, World!
		Arguments: [first second third fourth]
		Process 28268 has exited with status 0
		```

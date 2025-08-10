---
title: "Quick Setup"
description: "Setup Go in Minutes"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 10
last_update:
  date: 7/19/2023
---

## Set up Go and VS Code

Here's how to get started with Go and Visual Studio Code quickly.

- Install Visual Studio Code
- Install Go language
- Install required Go tools

### Install Visual Studio Code

To write Go code, you need a code editor.

- Search "vscode" in a browser
- Download from code.visualstudio.com

Run the installer, click through the default options, and launch it after installation. It will show a "Get Started" screen.

### Install Go

You need the Go language installed before writing Go code.

- Go to [go.dev](https://go.dev/)
- Download Go for your OS (Windows, Mac, or Linux)

After installing, close and reopen VS Code to reload the environment correctly.

### Install Go Extension in VS Code

VS Code needs the Go extension to work properly with Go code.

- Search “Go” in the Extensions sidebar
- Click "Install"

This helps with auto-completion, linting, and debugging.

### Install Go Tools

After installing the Go extension, VS Code will ask you to install extra tools.

- `gotests` 
- `gomodifytags` 
- `goplay`
- `dlv`
- `gopls`
- `staticcheck`
- `go-outline`
- `goimports`

These tools help with testing, debugging, and formatting your code. Install all of them when prompted.


### Check If Go Is Installed

After installing Go on Windows using the `.msi` installer, you can verify that it's working correctly. Open a terminal in VS Code:

1. Press `` Ctrl + ` `` (backtick) or go to **Terminal > New Terminal**
2. Type this command and press Enter:

    ```bash
    go version
    ```

    Expected result (your version may be different):

    ```
    go version go1.22.0 windows/amd64
    ```

3. Then run:

    ```bash
    go env
    ```

    This shows environment settings like the Go root path (`GOROOT`) and Go workspace (`GOPATH`).

    Example result:

    ```
    GO111MODULE=""
    GOARCH="amd64"
    GOOS="windows"
    GOPATH="C:\Users\YourName\go"
    GOROOT="C:\Program Files\Go"
    ```

    If you see outputs like above, Go is installed correctly and VS Code can access it.


### Go Not Detected in WSL

If Go isn’t detected in WSL, it means Go is installed on Windows but not inside the WSL environment.

- `go version` returns "command not found"
- WSL doesn’t use the Windows Go installation
- You need to install Go separately inside WSL

WSL is like a separate Linux machine, so it needs its own Go setup. Below is a quick way to install Go manually in WSL (Ubuntu example):

1. Open WSL terminal
2. Download the latest Go archive:

    ```bash
    wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
    ```

3. Extract it to `/usr/local`:

    ```bash
    sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
    rm -f go1.22.0.linux-amd64.tar.gz 
    ```

4. Add Go to your PATH by editing your shell config:

    ```bash
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
    source ~/.bashrc
    ```

    *(Use `.zshrc` if you're using Zsh.)*

5. Check version again:

    ```bash
    go version
    ```

    Expected output:

    ```
    go version go1.22.0 linux/amd64
    ```

### Do You Still Need to Install Go in WSL?

You **still need to install Go inside WSL**. The `.msi` installer installed Go **on Windows**, not inside your WSL environment.

- WSL is like a separate Linux system
- It doesn’t share installed programs with Windows
- Your Go installation in Windows is not visible from WSL

**What Are Your Options?**

1. **Install Go Separately in WSL**

    - Use Linux version of Go inside WSL
    - Fully native Go experience
    - Recommended if you write/run Go code from WSL

2. **Use Go Installed on Windows (Not Recommended)**

    - Possible by adding `/mnt/c/Program Files/Go/bin` to WSL's PATH
    - May cause permission, path, or compatibility issues
    - Not ideal for builds and tools in WSL

If you still want the second option (Go Installed on Windows), try this:

```bash
echo 'export PATH=$PATH:"/mnt/c/Program Files/Go/bin"' >> ~/.bashrc
source ~/.bashrc
```

Then test it:

```bash
go version
```

If that works, Go will run from WSL, but this setup is not the cleanest.

## Create a Go Project Folder

Start with a simple folder for your Go code.

- Create a folder named `go-helloworld`
- Open it using "Open Folder" in VS Code

This folder will hold your Go files.

## Write Your First Go Program

Create a file named `main.go` inside `go-helloworld` folder:

```go
package main

import "fmt"

func main() {
    fmt.Printf("hello world\n")
}
```

Save the file. The Go extension might prompt you to install `goimports` to manage imports. Install it as well.


## Run Your Go Program

You can run the program in two ways:

- From the terminal:

    ```bash
    go run .
    ```

- Or with debug:

    Click `Run > Run Without Debugging` or `Start Debugging` in VS Code.

    Both methods should print:

    ```
    hello world
    ```

    If you see this, everything works fine.



## Build The Go Program

Compile your Go code into an executable.

```go
go build main.go
```

This creates a binary named `main` (or `main.exe` on Windows).

You can confirm the output file is created:

```bash
$ ls -l

-rwxrwxrwx 1 user user 30 Jul 18 15:06 go.mod
-rwxrwxrwx 1 user user 73 Jul 18 14:45 main.go  
-rwxrwxrwx 1 user user 87 Jul 18 15:10 main
```

Run the compiled program like this:

```bash
./main
```

This will execute the binary file generated from your Go code.


## Run The Go Program Directly

This compiles the code and runs it right away without creating a binary file. It's useful for testing small programs during development.

```go
go run main.go
```

## Initialize Go Module

To set up your Go module to manage dependencies:

```bash
go mod init hello-world
```

This creates a `go.mod` file, which will contain:

```go
module hello-world

go 1.22.0 
```

This file tells Go the module name and version, and it helps track packages your app uses.
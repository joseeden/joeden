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
sidebar_position: 1
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

If you're using WSL and Go isn't detected, it means Go is only installed on Windows—not inside WSL.

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

If that works, Go will run from WSL — but again, this is not the cleanest setup.


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

Save the file. The Go extension may suggest installing `goimports` to fix imports—install it too.

## Initialize Go Module

Open the terminal in VS Code and run:

```bash
go mod init hello-world
```

This sets up your Go module and removes error red lines in VS Code.

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






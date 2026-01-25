---
title: "HTTP Get Client"
description: "HTTP Get Client Application"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 30
last_update:
  date: 7/19/2023
---


## Overview

This guide how to create a simple Go app that makes API calls and handles JSON.

- Make GET and POST requests to an API  
- Handle JSON, flags, and errors  
- Add JWT auth and test the app  

## Read Input From Command Line

Start by reading input passed to the program when it's run.

- Use `os.Args` to get input values  
- Skip the first item (it’s the program name)  

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    if len(os.Args) > 1 {
        fmt.Println("Hello,", os.Args[1])
    } else {
        fmt.Println("No name provided")
    }
}
```

This helps us accept user input directly from the terminal when starting the program.

## Call An API With GET

Use Go to fetch data from an API.

- Use `net/http` to send a GET request  
- Read and print the response body  

```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.Get("https://jsonplaceholder.typicode.com/posts/1")
    if err != nil {
        fmt.Println("Request failed:", err)
        return
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

This lets us get data from an API and display it to the user.

## Parse JSON Data

Convert JSON into a Go structure.

- Create a struct to match the JSON  
- Use `json.Unmarshal()` to decode it  

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "io"
)

type Post struct {
    UserID int    `json:"userId"`
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Body   string `json:"body"`
}

func main() {
    resp, _ := http.Get("https://jsonplaceholder.typicode.com/posts/1")
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)

    var post Post
    json.Unmarshal(body, &post)

    fmt.Println("Post title:", post.Title)
}
```

This helps us work with API data more easily by turning it into usable variables.

## Use Flags For Input

Let users pass values using flags.

- Use the `flag` package to define inputs  
- Call `flag.Parse()` to use them  

```go
package main

import (
    "flag"
    "fmt"
)

func main() {
    name := flag.String("name", "Guest", "Your name")
    flag.Parse()

    fmt.Println("Hello,", *name)
}
```

This adds a clean way to customize the program using named options.

## Send A POST Request

Send data to an API using POST.

- Use `json.Marshal()` to prepare the data  
- Send it using `http.Post()`  

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    data := map[string]string{"username": "user1", "password": "pass123"}
    jsonData, _ := json.Marshal(data)

    resp, _ := http.Post("https://example.com/login", "application/json", bytes.NewBuffer(jsonData))
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}
```

This is useful when sending login or form data to a server.

## Add JWT To Requests

Access protected APIs with a token.

- Save the token you get from login  
- Add it to request headers as `Authorization`  

```go
req, _ := http.NewRequest("GET", "https://example.com/protected", nil)
req.Header.Add("Authorization", "Bearer YOUR_TOKEN_HERE")
```

This allows your program to access APIs that require login.

## Keep Code Clean And Testable

Make the code easier to manage and test.

- Use functions to group logic  
- Use packages to split related tasks  

```go
func GetPost(id int) (Post, error) {
    // Do request, parse JSON, return result
}
```

Organizing your code this way helps you reuse and test it better.

## Final Recap: API Client In Go

You now have a small app that talks to web services.

- Handled command-line input and flags  
- Made GET and POST API calls  
- Parsed JSON and used JWT tokens  

This is a solid first step toward writing Go programs that connect to real-world cloud services.
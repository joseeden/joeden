---
title: "Go Cheatsheet"
description: "Go Cheatsheet"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Golang
sidebar_position: 5
last_update:
  date: 7/19/2023
---


## Variables

Use `var` to declare a variable `a` and set type to string.

```go
var a string
```

Declare a variable with initialization.

```go
var a string = "foobar"
```

Use type inference for variable declaration.

```go
var a = "foobar"
```

Shortcut variable declaration.

```go
a := "foobar"
```

Multiple variable assignment.

```go
a, b := "one", "two"
```


## Maps

Declare a map.

```go
var a map[string]string
```

Initialize a map using `make()`.

```go
a := make(map[string]string)
```

Initialize a map with values.

```go
a := map[string]string{"k": "v"}
```


## Arrays

Declare an array.

```go
var d [2]int = [2]int{1, 2}
```


## Slices

Declare a slice.

```go
var a []string
```

Initialize a slice with a fixed size.

```go
a := make([]string, 5)
```

Initialize a slice with a capacity greater than size.

```go
a := make([]string, 5, 10)
```

Declare and initialize a slice with values.

```go
a := []int{1, 2, 3, 4, 5, 6, 7}
```


## Multiple Variables

Declare multiple variables together.

```go
var (
    a string
    b int
)
```


## Structs

Declare a struct type.

```go
type myStruct struct {
    c string
}
```

Create an instance of a struct.

```go
var a myStruct
```

Initialize a struct.

```go
a := myStruct{c: "a string"}
```

Initialize a struct with unnamed fields.

```go
a := myStruct{"a string"}
```

Access and modify struct fields.

```go
a.c = "a string"
```


## Basic Operations

Perform basic arithmetic.

```go
a := 5 + 5
```

Increment and decrement.

```go
a += 5          // same as a = a + 5
b++             // increase b by one
b--             // decrease b by one
```


## Types

Basic types in Go.

```go
bool
string
byte       // alias for uint8
rune       // alias for int32
float32
float64
int
int8
int16
int32
int64
uint
uint8
uint16
uint32
uint64
uintptr
complex64
complex128
```


## Conditions

Basic `if` condition.

```go
if a >= 10 && b >= 10 {
} else if !(a < 5) {
} else {
}
```

`switch` statement.

```go
switch a {
case 5:
    // do foobar
default: // optional
    // do foobar else
}
```


## Operators

Comparison operators.

```go
< > <= >= == !=
```

Logical operators.

```go
|| && !
```


## Functions

Function with multiple return types.

```go
func returnTwo() (bool, bool) {
    // function implementation
}
```

Function with typed parameters.

```go
func myFunc(b int, c int64) bool {
    return true
}
```

Function with unnamed parameters.

```go
func myFunc(b, c int) {
    // function implementation
}
```

Assigning a function to a variable.

```go
a := func(a int) int { return a + 1 }
fmt.Printf("%v", a(1))
```


## Loops

Traditional `for` loop.

```go
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
```

Infinite loop: This loop continues indefinitely unless explicitly broken.

```go
for {
    fmt.Println("Running")
    if a == 5 {
        break
    }
}
```

Use `continue` to skip to the next iteration of the loop.

```go
for {
    a++
    if a == 5 {
        continue
    }
    fmt.Println(a)
    if a > 7 {
        break
    }
}
```

Use `range` to iterate over slices, arrays, maps, etc.

```go
for k, v := range myMap {
    fmt.Printf("Key: %v, Value: %v\n", k, v)
}
```


## Methods

Declare a method with a value receiver.

```go
func (m myStruct) method() {
    m.c = "newstr" // will not update original
}
```

Declare a method with a pointer receiver.

```go
func (m *myStruct) method() {
    m.c = "newstr" // will update original
}
```


## Interfaces

Declare an interface.

```go
type myIface interface {
    method()
    method2(a int) (bool, error)
}
```


## Pointers

Declare a pointer.

```go
a := "123"
b := &a          // pointer to a
fmt.Println(b)   // e.g., 0xc00001c030
fmt.Println(*b)  // "123"
```

Modify the value through the pointer.

```go
*b = "456"       // change a through pointer b
```


## Constants

Declare a constant.

```go
const a int = 5
```


## Goroutines

Run a function concurrently.

```go
go hello()
```


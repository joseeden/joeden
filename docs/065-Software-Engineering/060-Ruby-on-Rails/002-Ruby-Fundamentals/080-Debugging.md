---
title: "Debugging"
description: "Debugging"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 80
last_update:
  date: 8/24/2023
---

## Overview

Debugging lets you pause a Ruby program and step through it to understand how it runs and where things go wrong. To use debugging, you need to use a library called `debug`.


## Using `debugger` 

Ruby 3.1 and above already includes `debug`, while older versions require installing the `debug` Gem

Check your version:

```bash
ruby -v
```

If needed, install the library:

```bash
gem install debug
```

Once available, you must explicitly load it in your file.

```ruby
require "debug"
```

Below is a simple example using `debugger` to pause on that line when code is ran:

```ruby
## sample.rb 
require "debug"

food = "Sour food"
puts "I love eating #{food}"

debugger

drink = "Iced Tea"
puts "I love drinking #{drink}"

debugger

puts "End of program"
```

Run the file:

```bash
ruby sample.rb  
```

When the program runs, the output switches into debugging mode and shows `(rdbg)`.

```bash
I love eating salad
[1, 10] in docs/debugging.rb
     1| require "debug"
     2|
     3| food = "salad"
     4| puts "I love eating #{food}"
     5|
=>   6| binding.break
     7|
     8| drink = "iced tea"
     9| puts "I love drinking #{drink}"
    10|
=>#0   <main> at docs/debugging.rb:6
```

When Ruby reaches `debugger`, execution pauses.

- Code after the pause has not run yet
- Variables defined earlier are available
- Variables defined later do not exist yet

At the first pause, `food` has a value but `drink` does not.

You can verify this by entering both:

```bash
(rdbg) food
"salad"
(rdbg) drink
nil 
```

It returned the value for `food` but it returned `nil` for `drink` because it hasn't reached the line where a value is assigned to `drink`.

To continue execution, type:

```text
continue
```

Or use the shortcut:

```text
c
```

Execution resumes until the next pause point. Each pause is called a **breakpoint**.

Ruby also provides an alternative pause method.

```ruby
binding.break
```

This works the same as `debugger`. Both pause the program at that line, and you can use either one. 

Ruby supports both because debugging tools originally came from different libraries, and Ruby keeps compatibility with those earlier approaches.


## Without `require` 

If the `debug` library is not "required", debugging methods will not work.

For example, commenting out the require line:

```bash
# require "debug"  
```

You'll notice that the program will raise an error.

```text
undefined local variable or method `debugger`
```

This error simply means the debugging library was not loaded. Requiring `debug` makes these tools available only when you need them.


## Exiting the Debugger

If you want to stop debugging at any time:

```text
q
```

This quits debugging and returns you to the terminal.


## Using `step` 

When a Ruby program is paused by `debugger` or `binding.break`, you can move through the code one line at a time using `step`.

- Runs the current line
- Moves to the next line
- Works line by line

While `continue` jumps to the next breakpoint, `step` slows everything down so you can follow the flow.

```ruby
## debugging.rb 
require "debug"

debugger

puts "Hello".downcase
puts "Goodbye".upcase
```

Run the file:

```bash
ruby debugging.rb
```

Execution pauses at `debugger`. At this point, nothing below it has run yet.

```bash
[11, 19] in docs/debugging.rb
    15|
=>  16| debugger
    17|
    18| puts "Hello".downcase
    19| puts "Goodbye".upcase
=>#0   <main> at docs/debugging.rb:16
(rdbg) 
```

Type `step` or `s` in the debugger:

```text
step
```

This moves the hash rocket (`=>`) to the next line:

```bash
(rdbg) step    # command
[13, 19] in docs/debugging.rb
    15|
    16| debugger
    17|
=>  18| puts "Hello".downcase
    19| puts "Goodbye".upcase
=>#0   <main> at docs/debugging.rb:18
```

Running the step again executes that line and prints "hello".
It then moves the hash rocket (`=>`) to the next line.

```bash
(rdbg) s    # step command
hello
[14, 19] in docs/debugging.rb
    15|
    16| debugger
    17|
    18| puts "Hello".downcase
=>  19| puts "Goodbye".upcase
=>#0   <main> at docs/debugging.rb:19
```

Running `step` one more time executes that line and prints "GOODBYE".

```bash
(rdbg) step    # command
GOODBYE
```

## Mixing `step` and `continue`

Both these commands are often used together.

- Use `continue` to jump to the next breakpoint
- Use `step` to slow down and inspect logic
- Switch between them as needed


## Stepping Through a Loop

Stepping is especially useful inside loops. 

Consider the example below:

```ruby
## debugging.rb 
require "debug"

3.times do |count|
  puts "Loop number: #{count}"
  debugger
end
```

Run the file:

```bash
ruby debugging.rb
```

This returns:

```bash
Loop number: 0
[18, 24] in docs/debugging.rb
    20|
    21| 3.times do |count|
    22|   puts "Loop number: #{count}"
=>  23|   debugger
    24| end
=>#0   block {|count=0|} in <main> at docs/debugging.rb:23
  #1   Integer#times at <internal:numeric>:257
  # and 1 frames (use `bt' command for all frames)
```

Press `c` to continue, then `count` at next pause to see how it changes.

```bash
(rdbg) c    # continue command
Loop number: 1
[18, 24] in docs/debugging.rb
    20|
    21| 3.times do |count|
    22|   puts "Loop number: #{count}"
=>  23|   debugger
    24| end
=>#0   block {|count=1|} in <main> at docs/debugging.rb:23
  #1   Integer#times at <internal:numeric>:257
  # and 1 frames (use `bt' command for all frames)
(rdbg) count
1 
```

Each time the loop runs, execution pauses.

- First pause is loop 0, prints "Loop number: 0"
- Next pause is loop 1, prints "Loop number: 1"
- Final pause is loop 2, prints "Loop number: 2"


## Stepping Without a Debugger 

You can also place a single `debugger` before the loop and use `step`.

```ruby
## debugging.rb 
require "debug"

debugger 

3.times do |count|
  puts "Loop number: #{count}"
end 
```

How this works: 

- Step into the loop body
- Step through each iteration
- Observe values changing over time

This gives full visibility into how loops execute line by line.


## Using `info` 

When execution stops at a breakpoint, Ruby exposes all variables and parameters that are alive at that exact line. You can use `info` or `i` to show all current variables and their values.

Consider the example below: 

```ruby
## debugging.rb 
require "debug"

one = 1
two = 2
three = 3

debugger
```

When you run the file, execution pauses at `debugger`. At this point, all three variables exist and have values.

```bash
[28, 33] in docs/debugging.rb
    28|
    29| one = 1
    30| two = 2
    31| three = 3
    32|
=>  33| debugger
=>#0   <main> at docs/debugging.rb:33 
```

Inside the debugger prompt (`rdbg`), you can inspect variables one by one:

```bash
(rdbg) one
1
(rdbg) two
2
(rdbg) three
3
```

As we can see, this can be slow in larger programs. The `info` command shows everything at once.

```bash
(rdbg) info    # command
%self = main
one = 1
two = 2
three = 3
```

You can also use the shortcut:

```bash
(rdbg) i    # info command
%self = main
one = 1
two = 2
three = 3
```

Once you are done inspecting values, you can leave the paused state by using `q`. Ruby will ask for confirmation before exiting:

```bash
(rdbg) q    # quit command
Really quit? [Y/n] Y
```


## Using `info` with Recursive Code

Recursion can be hard to follow because the same method runs multiple times with different values. The debugger and `info` help slow things down.

:::info 

For more information, please see [Methods: Recursion](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/055-Methods.md)

:::

Here is a simple recursive string reversal method.

```ruby
## debugging.rb 
require "debug"

def reverse(text)
  return text if text.length <= 1

  last_char = text[-1]
  remainder = text[0..-2]

  debugger
  last_char + reverse(remainder)
end

puts reverse("straw")
```

Run the file: 

```bash
ruby debugging.rb
```

When the program runs, execution pauses inside the method during the first call. 

```bash
[39, 48] in docs/debugging.rb
    39|   return text if text.length <= 1
    40| 
    41|   last_char = text[-1]
    42|   remainder = text[0..-2]
    43|
=>  44|   debugger
    45|   last_char + reverse(remainder)
    46| end
    47|
    48| puts reverse("straw")
=>#0   Object#reverse(text="straw") at docs/debugging.rb:44
  #1   <main> at docs/debugging.rb:48 
```

Using `info` shows the current parameter and local variables.

```bash
(rdbg) info    # command
%self = main
text = "straw"
last_char = "w"
remainder = "stra"
```

When you continue execution:

```bash
(rdbg) c
```

The debugger pauses again during the next recursive call. Running `info` now shows a different value for `text`, which proves you are inside a deeper level of recursion.

```bash
(rdbg) i    # info command
%self = main
text = "stra"
last_char = "a"
remainder = "str"
```

Each time you type `c` or `continue`, you move one level deeper until the base condition is reached. At that point, execution finishes and the debugger is no longer hit.

```bash
(rdbg) i    # info command
%self = main
text = "st"
last_char = "t"
remainder = "s"
(rdbg) c    # continue command
warts 
```

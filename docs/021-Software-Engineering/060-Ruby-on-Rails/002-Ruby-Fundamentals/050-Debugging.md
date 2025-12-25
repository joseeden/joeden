---
title: "Debugging"
description: "Debugging"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 50
last_update:
  date: 8/24/2023
---

## Overview

Debugging lets you pause a Ruby program and step through it to understand how it runs and where things go wrong.

- You can inspect variables while the program is running
- You control when the program continues

To use debugging, Ruby relies on a library called `debug`.

- Ruby groups features into libraries
- Some libraries are built in
- Others are added as Gems

**NOTE:** A library is just reusable Ruby code. Debugging tools live in the `debug` library.

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
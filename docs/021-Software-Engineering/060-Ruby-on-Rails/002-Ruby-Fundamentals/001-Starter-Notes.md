---
title: "Starter Notes"
description: "Starter Notes on Ruby"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 1
last_update:
  date: 8/24/2023
---


## Install Ruby on Rails

1. **Install Ruby:**

    - For Windows, see the official [Install Ruby on Rails Guide](https://guides.rubyonrails.org/install_ruby_on_rails.html#install-ruby-on-windows).

        ```ruby
      ## Run on WSL 
      sudo apt update
      sudo apt install -y build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev
      curl https://mise.run | sh
      echo 'eval "$(~/.local/bin/mise activate ruby)"' >> ~/.rubyrc
      source ~/.rubyrc
      mise use -g ruby@3
      ```

    - For macOS, use Homebrew:

      ```ruby
      brew install ruby
      ```

    - For Linux, use your package manager, e.g., for Ubuntu:

      ```ruby
      sudo apt-get install ruby-full
      ```

2. **Verify Ruby install:**

    - Verify it works by running:

      ```ruby
      ruby --version
      ```

      Sample output:

      ```ruby
      ruby 2.5.0
      ```

3. **Install Rails:**

    - Use Ruby's gem command to install Rails and its dependencies from [RubyGems.org](https://rubygems.org/).

      ```ruby
      gem install rails
      ```

    - To verify that Rails is installed correctly

      ```ruby
      rails --version
      ```

      Sample output:

      ```ruby
      Rails 6.1.7.4
      ```


## Interactive Ruby

Interactive Ruby (IRB) lets you try Ruby commands directly in a live session.

- Enter Ruby commands one by one
- See results immediately after each command

Example session:

```ruby
$ irb
irb(main):001> puts "Hello Ruby"
Hello Ruby
irb(main):002> 5 + 3
=> 8
irb(main):003> greeting = "Hi there"
=> "Hi there"
```


## Running in VS Code 

VS Code can be used to run and test Ruby scripts easily.

- Open the terminal in VS Code
- Navigate to the folder containing your Ruby file
- Use the `ruby` command to run the script

To run a Ruby file:

```ruby
ruby /path/to/filename.rb
```

This will execute the script and show the output in the terminal.

## Hello World

The simplest Ruby program prints text to the screen.

- Use `puts` to print text with a new line
- Use `print` to print text without a new line

Example using `puts`:

```ruby
## main.rb
puts "Hello World"
```

Run the script:

```ruby
ruby main.rb
```

Expected output:

```ruby
Hello World
```

Example using `print`:

```ruby
print "Hello World"
```

Output will stay on the same line without adding a new line automatically. Always remember:

- `puts` adds a line
- `print` does not


## Strings 

Strings are used to store and display text in Ruby.

- Strings are written inside quotes
- Strings can be joined together
- Strings can include variables

Example using string joining:

```ruby
first_name = "Adam"
last_name = "Taylor"
puts first_name + " " + last_name
```

Output:

```ruby
Adam Taylor
```

You can also use string interpolation to place variables inside a string:

```ruby
first_name = "Adam"
last_name = "Taylor"
puts "My first name is #{first_name} and my last name is #{last_name}"
```

Output:

```ruby
My first name is Adam and my last name is Taylor
```

String interpolation only works with double quotes. Using single quotes prints the text as is:

```ruby
first_name = "Adam"
last_name = "Taylor"
puts 'My first name is #{first_name} and my last name is #{last_name}'
```

Output:

```ruby
My first name is #{first_name} and my last name is #{last_name}
```

Strings let you work with text clearly, whether you are combining words or inserting values.

## Type 

Every value in Ruby has a type that describes what it is.

- Types describe the kind of data
- You can check types using `.class`
- Different values have different types

Example with a string variable:

```ruby
first_name = "Adam"
puts first_name.class
```

Output:

```ruby
String
```

More examples:

- Using a value

    ```ruby
    puts "Taylor".class
    ```

    Output:

    ```ruby
    String
    ```

- Using an integer

    ```ruby
    puts 10.class
    ```

    Output:

    ```ruby
    Integer
    ```

- Using a float 

    ```ruby
    puts 10.0.class
    ```

    Output:

    ```ruby
    Float
    ```


## Variables

Variables store values that you can reuse in your program.

- Assign a value using `=`
- Use `puts` to display the variable

Example:

```ruby
greeting = "Hey there!"
puts greeting
```

Output:

```ruby
Hey there!
```

Variables can be given new values at any time.

- Variables hold references to values
- Assigning a new value does not affect other variables
- Each variable updates independently

Example:

```ruby
first_name = "Adam"
new_first_name = "James"
puts new_first_name
```

Output:

```ruby
James
```

Reassigning the original variable does not change the other one:

```ruby
first_name = "Adam"
new_first_name = "James"
puts new_first_name

first_name = "Chris"
puts new_first_name
```

Output:

```ruby
James
James
```

This shows that variables store values, not links to other variables.

## Escape Characters

Escape characters let you include special characters inside strings.

- Quotes can break strings
- Ruby throws an error when quotes are not handled
- Escaping fixes this issue

This code causes an error because the quotes end the string early:

```ruby
puts 'Adam said 'Hello James, how was your day?''
```

Ruby reports an error because it cannot read the string correctly.

```ruby
unexpected constant, expecting end-of-input
unexpected local variable or method, expecting end-of-input

> 77 | puts 'John asked 'Hello Adam, how was your day?''
     |                   ^~~~~ unexpected constant, expecting end-of-input
     |                                   ^~~ unexpected local variable or method, expecting end-of-input
```

You can fix this by escaping the inner quotes:

```ruby
puts 'Adam said \'Hello James, how was your day?\''
```

Output:

```bash
Adam said 'Hello James, how was your day?'
```

## Inputs 

User input allows programs to interact with people.

- Input is read using `gets`
- `chomp` removes the new line
- Input should be stored in a variable

Basic input example:

```ruby
puts "What is your first name?"
first_name = gets.chomp
```

When run, it prompts for input:

```bash
What is your first name?
```

If you want to work with numbers, you must convert the input. This example shows what happens without conversion:

```ruby
puts "Enter a radius for a circle:"
radius = gets.chomp
area = radius - 3.14

puts "The area of the circle is #{area}"
```

Example output when entering `7`:

```bash
Enter a radius for a circle:
7
The area of the circle is 777
```

This happens because the input is treated as a string. Converting it to a number fixes the issue:

```ruby
puts "Enter a radius for a circle:"
radius = gets.chomp
area = 3.14 - radius.to_f - radius.to_f

puts "The area of the circle is #{area}"
```

Output:

```bash
Enter a radius for a circle:
7
The area of the circle is 153.86
```

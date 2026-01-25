---
title: "Input and Output"
description: "Input and Output"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 10
last_update:
  date: 8/24/2023
---


## Reading a File

In Ruby, you can read content from a text file and use it in your program by creating a file object. To do this, use the `File.open` method to access a file.

In this example, we have two files:

- `shopping-list.txt` 
- `read_file.rb`

The `shopping-list.txt` contains: 

```bash
1. Milk
2. Bread
3. Eggs
4. Butter
5. Cheese
6. Apples
7. Bananas
8. Chicken
9. Rice
10. Pasta
11. Tomatoes
```

To read the text file, we can use:

```ruby 
# read_file.rb 

file = File.open("./shopping-list.txt")
puts file.class 

file.each do |line|
  puts line
end
```

Run the script:

```bash
ruby read_file.rb  
```

Output:

```
File
1. Milk
2. Bread
3. Eggs
4. Butter
5. Cheese
6. Apples
7. Bananas
8. Chicken
9. Rice
10. Pasta
11. Tomatoes
```

Here, `File.open` returns a file object, and using `each` lets you read and process the file line by line.



## Write to a Text File 

You cna use Ruby to create and write to text files. You can either replace the file’s content or add to it.

- Use `File.open` with the file name and "w" to create or overwrite a file
- Use "a" to append to an existing file without removing its current content

Using the same `shopping-list.txt` from the previous section:

```bash
1. Milk
2. Bread
3. Eggs
4. Butter
5. Cheese
6. Apples
7. Bananas
8. Chicken
9. Rice
10. Pasta
11. Tomatoes
```

We can add more items using Ruby:

```ruby
# append.rb
File.open("./shopping-list.txt", "a") do |file|
  file.puts "12. Ham"
  file.puts "13. Bacon"
  file.puts "14. Potato"
  file.puts "15. Garlic"
end
```

Run the script:

```bash
ruby append.rb
```

If we check `shopping-list.txt`, it now includes the new items:

```bash
1. Milk
2. Bread
3. Eggs
4. Butter
5. Cheese
6. Apples
7. Bananas
8. Chicken
9. Rice
10. Pasta
11. Tomatoes12. Ham
13. Bacon
14. Potato
15. Garlic
```

We can also create a completely new file. For example, we can create `new-years-plan.txt` using this script:

```bash
# createfile.rb
File.open("new-years.plan.txt", "w") do |file|
  file.puts "Go for a morning run"
  file.puts "Have a healthy breakfast"
  file.puts "Call family and friends"
  file.puts "Set goals for the year"
  file.puts "Clean and organize workspace"
  file.puts "Read a new book"
  file.puts "Cook a special dinner"
  file.puts "Reflect on last year"
end
```

Run the script:

```bash
ruby create-file.rb
```

This will create `new-years-plan.txt` in the same directory. Checking the file shows:

```bash
Go for a morning run
Have a healthy breakfast
Call family and friends
Set goals for the year
Clean and organize workspace
Read a new book
Cook a special dinner
Reflect on last year
```


## Rename and Delete a File

You can rename and delete files, as well as check if a file exists before deleting it to avoid errors.

- Use `File.rename` with current name and new name to rename a file
- Use `File.delete` with the file name to remove a file 
- Use `File.exist?` to check if a file exists before deleting

Example of renaming a file:

```ruby
# rename_delete.rb
File.rename("shopping-list.txt", "updated-shopping-list.txt")
```

Run the script:

```bash
ruby rename_delete.rb
```

The file `shopping-list.txt` is now renamed to `updated-shopping-list.txt`.

Example of deleting a file safely:

```ruby
# delete.rb
if File.exist?("updated-shopping-list.txt")
  File.delete("updated-shopping-list.txt")
end
```

Run the script:

```bash
ruby delete.rb
```

This deletes `updated-shopping-list.txt` only if it exists. If the file doesn’t exist, Ruby won’t raise an error.

You can also recreate the file and then delete it again safely:

```ruby
# recreate_and_delete.rb
File.open("updated-shopping-list.txt", "w") do |file|
  file.puts "Milk"
  file.puts "Bread"
end

File.delete("updated-shopping-list.txt") if File.exist?("updated-shopping-list.txt")
```

This ensures the file is created, and then deleted without causing exceptions. 


## Command Line Arguments 

Command line arguments let you pass values into your program from the terminal. These values arrive as strings in the `ARGV` array and can be used directly to change how the program runs.

Example of printing arguments:

```ruby
# cli-example-1.rb
ARGV.each do |arg|
  puts arg
end
```

Run the script:

```bash
ruby cli-example-1.rb 1 2 3
```

Output:

```
1
2
3
```

Using the `class` method, we can confirm that all values in `ARGV` are strings:

```ruby
# cli-example-2
ARGV.each do |arg|
  puts "#{arg} is a #{arg.class}"
end
```

Output:

```
1 is a String
2 is a String
3 is a String
```

Example of calculating squares of numbers from command line arguments:

```ruby
# cli-example-3
ARGV.each do |arg|
  number = arg.to_i
  square = number ** 2
  puts "Square of #{number} is #{square}"
end
```

Run the script:

```bash
ruby cli-example-3.rb 3 4 5
```

Output:

```
Square of 3 is 9
Square of 4 is 16
Square of 5 is 25
```

## Import Ruby Files

You can split code across multiple Ruby files and import one file into another using the `load` method. You can load the same file multiple times, but top-level code will run each time.

Example with two files:

- `file_2.rb`

    ```ruby
    puts "Hello from the other side"

    def file_2_method
      puts "I'm a method from the other side"
    end

    class Table
    end
    ```

- `main.rb`

    ```ruby
    puts "Welcome to the Upside Down"

    load "file_2.rb"

    file_2_method
    table = Table.new

    puts table.class

    puts "We've reached the end of our session."
    ```

Running `main.rb`:

```bash
ruby main.rb  
```

Output:

```
Welcome to the Upside Down
Hello from the other side
I'm a method from the other side
Table
We've reached the end of our session.
```

You can also use conditions or other logic when calling `load`, and you can include `./` before the filename to indicate the current directory. 

## `require` and `require_relative`

You can bring one Ruby file into another to reuse code without repeating it. Unlike `load`, these methods only run a file once.

- `require` loads a file once and looks in Ruby’s library by default
- `require_relative` loads a file from the current folder

Using the same files from the previous section, but updated:

- `main.rb`

    ```ruby
    puts "Welcome to the Upside Down"

    require_relative "file_2.rb"

    file_2_method
    table = Table.new

    puts table.class

    puts "We've reached the end of our session."
    ```

- `file_2.rb`

    ```ruby
    puts "Hello from the other side"

    def file_2_method
      puts "I'm a method from the other side"
    end

    class Table
    end
    ```

Output when running `main.rb`:

```
Welcome to the program
Hello from the other side
I'm a method from the other side
Table
We've reached the end of our session.
```

This shows the other file’s methods and classes are available, but its top-level code runs only once, even if required multiple times.
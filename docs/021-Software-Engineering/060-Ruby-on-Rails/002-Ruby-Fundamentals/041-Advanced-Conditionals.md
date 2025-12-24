---
title: "Advanced Conditionals"
description: "Advanced Conditionals"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 41
last_update:
  date: 8/24/2023
---


## Ternary Operator 

The ternary operator is a shortcut for simple if else statements. It is called “ternary” because it has three parts: 

- a condition
- a value if true
- a value if false

The ternary operator follows this pattern:

- Condition first
- Question mark `?` separates the true value
- Colon `:` separates the false value

Example: 

```ruby
puts 1 < 2 ? "Yes, it is" : "No, it's not"
```

Output:

```text
Yes, it is
```

Here, Ruby checks if `1 < 2`:

- If true, it returns `"Yes, it is"`. 
- If false, it returns `"No, it's not"`.

### Assigning Result to a Variable

Ternary expressions can be stored in variables just like any other expression.

```ruby
value = 1 < 2 ? "Yes, it is" : "No, it's not"
puts value
```

This works the same as an if else, but keeps the code concise and readable.

Output:

```text
Yes, it is
```

### Using Ternary with Strings 

Ternary operators can work with strings, numbers, or any Ruby object.

```ruby
word = "Yes".downcase
puts word == "yes" ? "The words match" : "The words do not match"
```

Output:

```text
The words match
```

If you change `word` to `"No"`, Ruby will output `"The words do not match"`.

## Calling Methods from Other Methods

You can call one method from another. This helps break complex logic into smaller, manageable pieces and makes your code easier to read.

**Example: A Simple Calculator**

We can create separate methods for addition, subtraction, and multiplication, and then call them from a main `calculator` method.

```ruby
def add(a, b)
  a + b
end

def subtract(a, b)
  a - b
end

def multiply(a, b)
  a * b
end

def calculator(a, b, operation)
  if operation == "add"
    add(a, b)
  elsif operation == "subtract"
    subtract(a, b)
  elsif operation == "multiply"
    multiply(a, b)
  else
    "That's not an available math operation, genius"
  end
end
```

Testing the calculator:

```ruby
puts calculator(3, 5, "add")        
puts calculator(10, 20, "subtract") 
puts calculator(8, 7, "multiply")   
puts calculator(2, 3, "divide")     
```

Each method handles its own logic, and the `calculator` method just calls the right one. 

Output:

```bash
8
-10
56
That's not an available math operation, genius
```

## Using `case` 

`case` statements reduce repetitive code when checking one variable against many options.

Using the example below, we can use a `case` statement to rate different food items with strings like "delicious" or "disgusting".

- Each food item gets its own when clause
- Multiple items can share the same response
- Optional else handles unmatched values

Code: 

```ruby
def rate_my_food(food)
  case food
  when "steak"
    "Delicious, pass the steak sauce"
  when "sushi"
    "Awesome, my favorite food"
  when "tacos", "burritos", "quesadillas"
    "Cheesy and filling, perfect combination"
  when "tofu", "Brussels sprouts"
    "Disgusting, yuck"
  else
    "I don't know about that food item"
  end
end
```

Testing the method: 

```ruby
puts rate_my_food("steak")        
puts rate_my_food("sushi")        
puts rate_my_food("burritos")     
puts rate_my_food("yogurt")       
```

Ruby stops checking once it finds a match, which makes the code shorter and easier to read. 

Output:

```bash
Delicious, pass the steak sauce
Awesome, my favorite food
Cheesy and filling, perfect combination
I don't know about that food item
```

## Using `unless`

The `unless` keyword is like an opposite of `if`. It runs code only when a condition is false.

`unless` focuses on the false scenario, instead of flipping conditions in an `if` statement.

#### Example: Password Check

We can use `unless` to handle cases when a password is incorrect.

- Condition is false → code runs
- Condition is true → code is skipped
- Optional `else` runs when the condition is true

Code: 

```ruby
user_password = "StarWars"
actual_password = "whiskers"

unless user_password == actual_password
  puts "Incorrect password"
else
  puts "Welcome to the system"
end
```

`unless` executes the block only if the condition is false. In this example, because "StarWars" is not equal to "whiskers", the "Incorrect password" message is printed.

Output:

```
Incorrect password
```



#### Example: Checking String Content

`unless` can also check if a string does not include a certain character.

```ruby
password = "securepass"

unless password.include?("A")
  puts "Password does not include the letter A"
end
```

This block runs only if the password does **not** contain "A", which shows the inverse logic in a simple way.

Output:

```
Password does not include the letter A
```


## Statement Modifiers 

Statement modifiers are a shortcut in Ruby to write `if` or `unless` statements in a single line when the code block only has one line of logic.

### Using `if` as a Statement Modifier

You can check a condition and print a message in one line.

```ruby
number = 10000

puts "That's a huge number" if number > 5000
```

Output:

```
That's a huge number
```

The same logic as a normal multi-line `if` statement is applied, but in a more concise way.

### Multiple Conditions

Statement modifiers can also handle multiple conditions using logical operators.

```ruby
number = 10000
verified = true

puts "That's a huge verified number" if number > 5000 and verified
```

Output:

```
That's a huge verified number
```

The `and` operator allows combining conditions while still keeping the one-line format.

### Using `unless` as a Statement Modifier

You can use `unless` in a similar one-line format to run code only if a condition is false.

```ruby
another_number = 8

puts "Number is not greater than ten" unless another_number > 10
```

Output:

```
Number is not greater than ten
```

This reads naturally like English: "execute this unless the condition is true," or simply "execute if false."


## Conditional Assignment Operator

The conditional assignment operator allows you to assign a value to a variable only if it does not already have a value. It helps avoid overwriting existing data and can make your code more efficient.


- Initialize a variable to `nil`
- Use `||=` to assign a new value
- Assigns a value only if the variable is `nil`
- Does nothing if the variable already has a value

This operator works like a regular assignment but is conditional on the variable being `nil`.

Example:

```ruby
my_value = nil
my_value ||= 5

puts my_value
```

Expected output:

```
5
```

If you try to assign a new value again:

```ruby
my_value ||= 10
puts my_value
```

Output remains:

```
5
```

Ruby does not overwrite the existing value.

Example with an expensive computation:

```ruby
result = nil
result ||= (1..1000000).reduce(:+)
puts result
```

The sum is calculated only once. Future uses of `result` skip the computation.

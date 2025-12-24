---
title: "Basic Conditionals"
description: "Basic Conditionals"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 20
last_update:
  date: 8/24/2023
---


## Conditional Logic 

Conditionals let a program choose which code to run based on a condition.

- The `if` keyword starts a conditional check
- The `elsif` keyword checks another condition if the first is false
- The `else` keyword runs code if all previous conditions are false
- Only one block of code runs in an `if`-`elsif`-`else` chain

### `if`

The `if` statement runs code only when a condition is true.

```ruby
if 5 < 7
  puts "5 is less than 7"
end
```

Output:

```
5 is less than 7
```

If the condition is false, Ruby skips the block:

```ruby
if 5 > 7
  puts "This won't print"
end
```

Nothing is printed. This allows your program to take different paths depending on a condition.

### `elsif`

`elsif` lets you check additional conditions if the first `if` is false.

```ruby
color = "green"

if color == "red"
  puts "Red is rad"
elsif color == "yellow"
  puts "Yellow is bright"
elsif color == "green"
  puts "Green is great"
end
```

Output:

```
Green is great
```

Notes: 

- Ruby checks conditions in order
- Only the first true condition runs
- You can have multiple `elsif` checks

### `else`

`else` runs code when all previous conditions are false. It is guaranteed to execute if nothing else matched.

```ruby
grade = "B"

if grade == "A"
  puts "Mom is happy"
elsif grade == "B"
  puts "Mom is disappointed"
else
  puts "Mom is upset"
end
```

Output:

```
Mom is disappointed
```

Notes:

- `else` runs when all `if` and `elsif` are false
- Only one block runs in a chain
- `else` is optional, but useful for a default case


## Multiple Conditions with AND

Ruby allows you to require more than one condition to be true before code runs. 

- Multiple conditions can be placed in a single `if` statement
- All conditions must evaluate to true


The AND operator (`&&`) tells Ruby to continue only when every condition passes, otherwise the logic is skipped.

In the example below, a simple login check is performed using two conditions. Both the username and password must match the expected values for access to be granted.

```ruby
puts "Enter username:"
username = gets.chomp

puts "Enter password:"
password = gets.chomp

if username == "user_one" && password == "secret123"
  puts "Login successful"
else
  puts "Access denied"
end
```

Each comparison produces a true or false result. Ruby combines these results using `&&`. Only when both comparisons return true does the `if` block execute.

If credentials entered are incorrect:

```
Enter username:
wrong_name
Enter password:
wrong_pass
Access denied
```

If credentials entered are correct:

```
Enter username:
user_one
Enter password:
secret123
Login successful
```

You can add more conditions by chaining additional `&&` operators, and the same rule always applies. Every condition must be true for the code to run. 

## Multiple Conditions with OR 

The OR operator allows an if statement to run when at least one condition is true, making it useful when multiple independent checks can trigger the same action.

- Written using two vertical pipes `||`
- Used inside if statements
- Requires only one condition to be true

Note that OR behaves differently from AND: 

- AND requires **all conditions** to be true
- OR requires **at least one condition** to be true

Example: Making a decision based on food type or price.

- One condition checks the food name
- Another condition checks the price
- Either condition can trigger the decision

Code: 

```ruby
food = "steak"
price = 19.99

if food == "steak" || price < 29.99
  puts "Buying the meal"
end
```

This works because both conditions are true, but only one is required for the decision.

Output:

```text
Buying the meal
```


### When only one condition is true

OR still works even if just one condition passes.

- Food matches but price is high
- Food does not match but price is low

Code: 

```ruby
food = "steak"
price = 59.99

if food == "steak" || price < 29.99
  puts "Buying the meal"
end
```

In this case, the first condition is true, so the logic still runs.

Output:

```text
Buying the meal
```


### When OR does not run

The if statement fails only when all conditions are false.

- Food does not match
- Price is too high

Code:

```ruby
food = "fish"
price = 49.99

if food == "steak" || price < 29.99
  puts "Buying the meal"
end
```

Since neither condition is true, the logic does not run.

Output:

```text
(no output)
```

### Making OR conditions easier to read

To make OR conditions easier to read, each check can be assigned to a boolean variable.

```ruby
food = "steak"
price = 59.99

is_favorite_food = food == "steak"
is_affordable = price < 29.99

if is_favorite_food || is_affordable
  puts "Buying the meal"
end
```

Output:

```text
Buying the meal
```

### More OR Conditions 

More conditions can be added using additional OR operators.

- Each condition is checked separately
- One true value is enough

Example:

```ruby
if is_favorite_food || is_affordable || has_discount
  puts "Buying the meal"
end
```

The idea remains the same: OR allows the logic to run as long as at least one condition evaluates to true.

## Parentheses and Precedence

Parentheses are used to control which conditions Ruby evaluates first when writing if statements.

When AND and OR are used together, the logic can become unclear.

- AND combines conditions that must both be true
- OR allows either condition to be true
- Mixing them without clarity can change the result

Without parentheses, Ruby and the reader may interpret the condition differently, so precedence must be made explicit.

### Parentheses in a Conditional 

Consider an access check for a secure system.

- One rule checks two values together
- Another rule stands alone
- Either rule can grant access

Example: 

```ruby
def authenticate_user(code, name, role)
  if (code == "A1" && name == "Sam") || role == "Operator"
    puts "Access granted"
  else
    puts "Access denied"
  end
end
```

Here, the parentheses ensure the code and name must both match before being combined with the OR condition.

Trying different inputs shows how precedence affects results.

- All values match
- Only the first grouped condition matches
- Only the OR condition matches

```ruby
authenticate_user("A1", "Sam", "Operator")
authenticate_user("A1", "Sam", "Guest")
authenticate_user("B2", "Alex", "Operator")
```

Output:

```text
Access granted
Access granted
Access granted
```

In all cases, at least one side of the OR evaluates to true because the grouped condition is evaluated first.

The else path is reached only when all conditions fail.

```ruby
authenticate_user("B2", "Alex", "Guest")
```

Output:

```text
Access denied
```


### Move Logic to Variables

An alternative way to reduce complexity is to move logic into variables.

- Each condition is evaluated separately
- Variable names explain intent
- The if statement stays simple

Example: 

```ruby
valid_identity = code == "A1" && name == "Sam"
valid_role = role == "Operator"

if valid_identity || valid_role
  puts "Access granted"
else
  puts "Access denied"
end
```

This approach avoids mixing operators on one line while still following the same precedence rules.

## Nested `if` Statements 

A nested `if` statement is an `if` statement placed inside another `if` statement, where the inner logic only runs when the outer condition is true.

- One `if` is placed inside another `if`
- Outer condition is checked first
- Inner condition runs only `if` the outer one passes

Nested `if` statements are useful when decisions depend on related conditions.

- First check narrows the scenario
- Second check refines the outcome
- Repeated checks are avoided

By grouping logic this way, the code becomes easier to follow and keeps related conditions together.

Here is a simple example that recommends a meal based on the type of day and the time of day.

| Day type | Time of day | Recommended meal |
| -------- | ----------- | ---------------- |
| Weekday  | Morning     | Cereal           |
| Weekday  | Night       | Noodles          |
| Weekend  | Morning     | Pancakes         |
| Weekend  | Night       | Grill            |


Notes: 

- Day type is checked first
- Time of day is checked second
- Result depends on both values

Code: 

```ruby
def meal_plan(day_type, time_of_day)
  if day_type == "weekday"
    if time_of_day == "morning"
      "cereal"
    elsif time_of_day == "night"
      "noodles"
    end
  elsif day_type == "weekend"
    if time_of_day == "morning"
      "pancakes"
    elsif time_of_day == "night"
      "grill"
    end
  end
end
```

Each inner `if` runs only after the outer condition is true, which keeps the logic clear and intentional.

- Weekday morning follows the first nested path
- Weekday night follows the second nested path
- Weekend night follows a different branch

Code: 

```ruby
puts meal_plan("weekday", "morning")
puts meal_plan("weekday", "night")
puts meal_plan("weekend", "night")
```

Output:

```text
cereal
noodles
grill
```


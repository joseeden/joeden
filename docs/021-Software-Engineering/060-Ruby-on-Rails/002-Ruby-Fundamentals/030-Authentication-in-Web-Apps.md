---
title: "Authentication in Web Apps"
description: "Authentication in Web Applications"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 30
last_update:
  date: 8/24/2023
---



## Overview

Web applications need to know who is using the system, so users must sign up and log in.

- Users enter a username and password
- Applications verify credentials
- Access is granted or denied

In the past, passwords were stored directly in databases, which caused serious security risks.

- Databases can be compromised
- Plain text passwords are exposed
- User accounts become vulnerable

To keep users safe, modern applications always store passwords in a protected form, not as the original text.

## Password Hashing 

Instead of storing passwords directly, applications store a transformed version of them.

**Bcrypt** is commonly used in Ruby applications to handle password hashing securely.

- Adds randomness using salt
- Produces different hashes for the same password
- Supports secure comparisons

This makes it much harder for attackers to guess or reuse stolen password data.

Reference: [bcrypt](https://rubygems.org/gems/bcrypt)


## Installing Bcrypt

Before using Bcrypt, it needs to be installed and required in your project.

```ruby
## main.rb
require 'bundler/inline' 

gemfile true do 
  source 'http://rubygems.org' 
  gem 'bcrypt' 
end
```

To run the script:

```ruby
ruby /path/to/main.rb 
```

Output:

```ruby
Fetching gem metadata from http://rubygems.org/.
Resolving dependencies...
Fetching bcrypt 3.1.20
Installing bcrypt 3.1.20 with native extensions 
```

Once installed, you can hash passwords and verify them safely.

Reference: [How to use bcrypt-ruby in general](https://www.rubydoc.info/gems/bcrypt-ruby)

```ruby
require 'bcrypt'

my_password = BCrypt::Password.create("my password")
  #=> "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa"

puts
puts my_password
puts my_password.version              #=> "2a"
puts my_password.cost                 #=> 10
puts my_password == "my password"     #=> true
puts my_password == "not my password" #=> false
```

Expected output:

```ruby
Fetching gem metadata from http://rubygems.org/.
Resolving dependencies...

$2a$12$S73P725rXI6iWknccFgzuuafqzr9LlS7fIvimVBA1vY3dNeQD6eFK
2a
12
true
false
```

This ensures passwords are never stored in plain text and can be safely verified.

## Using Bcrypt

Bcrypt allows you to create hashed passwords and verify them against user input.

- Hash a password using `BCrypt::Password.create`
- Compare a stored hash with the original password
- Each hash is unique due to salting, but comparison still works

Example:

```ruby
require 'bundler/inline' 

gemfile true do 
  source 'http://rubygems.org' 
  gem 'bcrypt' 
end

require 'bcrypt'

my_password = BCrypt::Password.create("@Thr3@tL3v3Lm!dN!8hT")
puts my_password
puts
```

This returns the hashed of the password "@Thr3@tL3v3Lm!dN!8hT":

```ruby
$2a$12$WQw1LIO3alJ/6ZF8/BbgB.j99kxLLuDF6nPjKoMlaNDIyUbpVArtm 
```

You can then verify the password using the stored hash by plugging it to the `new()` method for Bcrypt:

```ruby
my_password = BCrypt::Password.new("$2a$12$WQw1LIO3alJ/6ZF8/BbgB.j99kxLLuDF6nPjKoMlaNDIyUbpVArtm")
puts my_password == "@Thr3@tL3v3Lm!dN!8hT"
```

Output:

```ruby
true 
```

As we can see, it returned `true`, which confirms that the input password matches the hashed password.


## Creating Secure Passwords

You can create methods to handle hashing and verifying passwords for multiple users.

- Create a method to hash a password
- Create a method to verify a hashed password
- Create a method to convert all user passwords to hashed versions

Note: If you already installed the gem using `bundler/inline` or through the `gem` utility, you don’t need to repeat it anymore.

```bash
require 'bundler/inline' 

gemfile true do 
  source 'http://rubygems.org' 
  gem 'bcrypt' 
end
```

You can directly require Bcrypt in your Ruby files

```ruby
## crud.rb

require 'bcrypt'

## USERS---------------------------------------------------------

users = [
  { username: "adam", password: "adam123" },  
  { username: "alex", password: "alex123" },  
  { username: "bob", password: "bob123" },  
  { username: "james", password: "james123" },  
  { username: "john", password: "john123" },  
  { username: "robin", password: "robin123" },  
  { username: "ted", password: "ted123" }
]

## FUNCTIONS-----------------------------------------------------

def create_hash_digest(password)
  BCrypt::Password.create(password)
end

def verify_hash_digest(password)
  BCrypt::Password.new(password)
end

# Convert passwords to hashes
def create_secure_users(list_of_users)
  list_of_users.each do |user_record|
    user_record[:password] = create_hash_digest(user_record[:password])
  end

  list_of_users
end

puts create_secure_users(users) 
```

Run the script:

```ruby
ruby crud.rb 
```

Expected output:

```ruby
{username: "adam", password: "$2a$12$AvFiVn.lH7gLHtVkVAEazuLI0RA9r2/PnA2SJAXzbwe39UGUiy0TK"}
{username: "alex", password: "$2a$12$gbBQv43.DBs6cJ45Z1yne.DIsVaFFy4L7bfNS5O7H/KMIi8O5apfW"}
{username: "bob", password: "$2a$12$N7tPW3XelbZ9A22oTNDbHuX5R3ZiEgtdSWjWpMXuZNsdHI11Jl86a"}
{username: "james", password: "$2a$12$NWLHyg6j84bikz2VyoM5i.W7Vhw9Oyg/IMOrkI4XMdFVokVLuyGn6"}
{username: "john", password: "$2a$12$lcqreJnA1xWv3PMwmUSUGewyHnFXISVuJF7JIwgPpoc5.FtQfYIqq"}
{username: "robin", password: "$2a$12$S/uo2gMbcO5sPkODsuR6led24ntmtrp5h8gKpXjjDyczo1paegsHq"}
{username: "ted", password: "$2a$12$f5Sf5Zn2Fkvea5wHhEdNB.1epoZSdUks8MjiG4v5RhBcWveXnZQl."}
```

This approach ensures all user passwords are securely hashed and can be verified safely without ever storing plain text.


## Using Modules

You can group these methods into a **module** to reuse across different classes.

- Modules act as toolkits for classes
- Include a module in a class to give it new methods

In the example below, the `Crud` module is created to hold multiple methods for handling passwords, including hashing, verification, and user authentication.

:::info 

Notice that the method names are all prefixed with `Crud`. This makes them accessible directly through the module without needing to include it in a class. 

:::

```ruby
## crud.rb 

module Crud
  require 'bcrypt'
  puts "Crud module used"

  def Crud.create_hash_digest(password)
    BCrypt::Password.create(password)
  end

  def Crud.verify_hash_digest(password)
    BCrypt::Password.new(password)
  end

  def Crud.create_secure_users(list_of_users)
    list_of_users.each do |user_record|
      user_record[:password] = create_hash_digest(user_record[:password])
    end

    list_of_users
  end

  def Crud.authenticate_user(username, password, list_of_users)
    list_of_users.each do |user_record|
      if user_record[:username] == username && verify_hash_digest(user_record[:password]) == password
        return user_record
      end 
    end 

    puts "Incorrect credentials."
  end 
end
```

You can load the module in another file using:

- `require_relative 'crud'` - If both files are in the same directory
- `require 'crud'` - If it’s installed as a gem or in the load path
- `$LOAD_PATH << "."` - To add the current directory to Ruby’s load path


In this example, both `main.rb` and `crud.rb` are in the same directory:

```bash
003-Practice-03/
├── main.rb
└── crud.rb 
```

The `main.rb` can use the `Crud` module to hash user passwords:

```bash
## main.rb 

require_relative 'crud'

users = [
  { username: "adam", password: "adam123" },  
  { username: "alex", password: "alex123" },  
  { username: "bob", password: "bob123" },  
  { username: "james", password: "james123" },  
  { username: "john", password: "john123" },  
  { username: "robin", password: "robin123" },  
  { username: "ted", password: "ted123" }
]

hashed_users = Crud.create_secure_users(users)
puts hashed_users
```

Running the script:

```ruby
ruby main.rb
```

Output:

```ruby
Crud module used
{username: "adam", password: "$2a$12$UbQ6bVjFF5AtphY08eMKpOk2d79r6FjLxNxJfBDWy4jjN.PaQsWMK"}
{username: "alex", password: "$2a$12$PQA5pHlI9fGH5jiwJ5XrguiN2gvJb2XGw7/kBTVNS2qXmRze3ntY."}
{username: "bob", password: "$2a$12$.3CjelhDXP9QiGwv.0Qh.ON3cpaQR5XlvVH8cKA1/fRPr/40dSwyG"}
{username: "james", password: "$2a$12$lvTQPD1hn7HQLfaJW4mFmO1nB4Xqgop79q7JpZK6XkRBQFDdc1pJC"}
{username: "john", password: "$2a$12$wb0bAjc8BGhWHmMQEJEZxeFDvZ7bLLaNmyubNsD0X7qExMm7Pe6QG"}
{username: "robin", password: "$2a$12$o5XpNQjCZy/Zy.tFkeaSseqwab9Jh8MNlqUATiH9E2qHrV9Qj0aom"}
{username: "ted", password: "$2a$12$g7Lxzf2v2LJ5DiQwS7N31OA3cGaKAJjtWAYQMbW3sIIIzm/34EFTq"}
```
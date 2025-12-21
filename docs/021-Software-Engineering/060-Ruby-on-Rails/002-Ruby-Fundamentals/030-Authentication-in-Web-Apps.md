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

```bash
## main.rb
require 'bundler/inline' 

gemfile true do 
  source 'http://rubygems.org' 
  gem 'bcrypt' 
end
```

To run the script:

```bash
ruby /path/to/main.rb 
```

Output:

```bash
Fetching gem metadata from http://rubygems.org/.
Resolving dependencies...
Fetching bcrypt 3.1.20
Installing bcrypt 3.1.20 with native extensions 
```
---
title: "Locked Door"
description: "Locked Door"
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

## Problem 

Implement a Door object that raises a custom error when opened while locked.
Handle the error by unlocking the door and retrying the operation.

## Thought Process 

We want to model a real-world door in code.

1. Create a door object
2. The door starts in a locked state
3. If you open the locked door, it should fail.
4. The program should recover and try again

The goal: Enforce a rule and then show how a program can respond when that rule is broken.

## Step 1: Start from usage 

Start with how we *expect* the code will work:

```ruby
## door.rb

door = Door.new 
door.open  
```

The `door` is an object created from the `Door` class, so we must also define the class.

```ruby
## door.rb

class Door 
end 

door = Door.new 
door.open
```

Running the script:snip

```bash
ruby door.rb 
```

It returns an error because the `open` method doesn't exist yet:

```ruby
undefined method 'open'.
```

## Step 2: Add `open`, still no rules

Add the `open` method:

```bash
## door.rb

class Door
  def open 
    puts "Door opened"
  end 
end 

door = Door.new 
door.open 
```

Output:

```bash
Door opened
```

## Step 3: Locked state as Starting Point 

Now think about the *default* state, which is that the door starts as locked. To do this, the state should be stored in memory, specifically in an instance variable.

```bash
## door.rb

class Door
  def initialize
    @locked = true
  end 

  def open 
    puts "Door opened"
  end 
end 

door = Door.new 
door.open 
```

By specifying the line below, we ensure the door is locked by default.

```bash
@locked = true 
```

Right now, if we run the code, the door still opens even when locked.

```bash
Door opened
```

Time to add the rules.

## Step 4: Add the "locked" rule 

As seen in previous step, the door still opens even when locked, which is wrong. We have the following options:

1. Return `false`
2. Print a warning 
3. Raise an error 

Because this is a hard rule violation, raising an error would be best. Since the violation occurs when `open` is called, we need to add the exception there.

```bash
## door.rb

class Door
  def initialize
    @locked = true
  end

  def open 
    raise "Door is locked!" if @locked
    puts "Door opened"
  end 
end 

door = Door.new 
door.open 
```

Running the code now returns:

```bash
'Door#open': Door is locked! (RuntimeError)
```

The next requirement: If the door is locked, unlock it and try again.

## Step 5: Add "recovery logic"

Now, to support recovery, the door needs a clear way to change its state. In simplest terms, there should be state where the door is unlocked, and this state should be stored in an instance variable. 

We already have the `@locked` as the starting point, so now we just need to "unlock" it by adding an `unlock` method:

```bash
def unlock
  @locked = false 
end 
```

The code should now look like this:

```bash
## door.rb

class Door
  def initialize
    @locked = true
  end

  def unlock
    @locked = false
  end
  
  def open 
    raise "Door is locked!" if @locked
    puts "Door opened"
  end 
end 

door = Door.new 
door.open 
```

Re-running the code still returns the error, which is expected.

```bash
'Door#open': Door is locked! (RuntimeError)
```

At this point, the code is correct but incomplete. The next question now is:

> What should happen when this error occurs?

## Step 6: Handle the failure where door is used
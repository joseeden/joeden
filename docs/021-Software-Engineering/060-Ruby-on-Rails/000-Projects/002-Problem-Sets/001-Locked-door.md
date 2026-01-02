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

Running the script:

```bash
ruby door.rb 
```

It returns an error because the `open` method doesn't exist yet:

```ruby
undefined method 'open'.
```

## Step 2: Add `open` with no rules

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

## Step 3: Locked state as starting point 

Now think about the *default* state, where the door starts as locked. To do this, the state should be stored in memory, specifically in an instance variable.

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

Because this is a hard rule violation, raising an error would be best. Since the violation occurs when `open` is called, we need to add the exception in the `open` method.

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

Now, to support recovery, the door needs a clear way to change its state. In simple terms, there should be a state representing when the door is unlocked, and this state should be stored in an instance variable.

We already have the `@locked` representing the door's initial state, so now we just need to "unlock" or "reverse" it by adding an `unlock` method:

```bash
def unlock
  @locked = false 
end 
```

**Update:** To allow other parts of the code to change the locked state, we also need to `attr_accessor`inside the `Door` class, which will create the getter and setter methods.

```bash
attr_accessor :locked  
```

The code should now look like this:

```bash
## door.rb

class Door
  attr_accessor :locked 

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



## Step 6: Handle failure where door is used

The `Door` class should only know how a door works (whether it’s locked or unlocked), and how to open or unlock it. It should not decide what to do when someone tries to open a locked door. 

In this case, we can use `begin` and `rescue` after the class definition (not inside the class) to catch the error and fix it.

```ruby
## door.rb

class Door
  ....
end 


door = Door.new

begin
  door.open
rescue
  puts "Door was locked"
end
```

Output:

```bash
Door was locked
```

When we run the code, it's now returning an error message instead of crashing:

However, the requirement is to “unlock and try again”. To do that, we can call the `unlock` method and then `retry`

```ruby
door = Door.new

begin
  door.open
rescue
  door.unlock
  retry
end
```

Output:

```bash
Door opened
```

Great, we've managed to unlock the door.



## Step 7: Improvement: Use a custom error

Currently, we raise a generic `RuntimeError`. This is fine but it's too broad and does not clearly describe the problem.

We can create a class for the custom error. Add this to the top:

```ruby
## door.rb
class DoorLockedError < StandardError
end

class Door
  ....
```

**Note:** `StandardError` is the default type of error Ruby expects, which is why `DoorLockedError` inherits from `StandardError`. 

Since we’ve created the custom error class, we need to update `open` and `rescue` so the code clearly shows the specific problem. 

1. `open` should raise `DoorLockedError` instead of a generic error

    ```ruby
    def open 
      raise DoorLockedError, "Door is locked!" if @locked
      puts "Door opened"
    end  
    ```

2. `rescue` handles only that error. 

    ```ruby
    rescue DoorLockedError
      door.unlock 
      retry  
    ```

3. We can also store the error in the `e` variable. This will allow us to access the message or details

    ```ruby
    rescue DoorLockedError => e 
      puts e.message
      puts "Unlocking door and trying again"
      door.unlock 
      retry  
    ```

Updated code: 

```ruby
## door.rb
class DoorLockedError < StandardError
end

class Door
  attr_accessor :locked

  def initialize
    @locked = true
  end

  def unlock
    @locked = false
  end
  
  def open 
    raise DoorLockedError, "Door is locked!" if locked
    puts "Door opened"
  end 
end 

door = Door.new 

begin
  door.open
rescue DoorLockedError => e
  puts e.message
  puts "Unlocking door and trying again"
  door.unlock
  retry
end
```

Output:

```bash
Door is locked!
Unlocking door and trying again
Door opened
```

The improvements are:

- The code now raises a **specific error**
- Handles the problem at the caller
- Keeps the class focused on **door behavior**, not recovery

## Step 8: Reviewing

Rechecking thought process:

1. Start from expected usage
2. Create class and basic object
3. Add default locked state
4. Add rules for locked door (raise error if locked)
5. Add recovery logic (unlock method)
6. Handle errors outside the class
7. Improve with a custom error class 
8. Update code to use the custom error


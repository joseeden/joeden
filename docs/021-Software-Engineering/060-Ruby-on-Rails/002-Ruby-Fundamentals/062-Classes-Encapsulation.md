---
title: "Classes: Encapsulation"
description: "Classes: Encapsulation"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 62
last_update:
  date: 8/24/2023
---

## Accessing Data 

By default, instance variables are **private**. You cannot access `@title` from outside the class unless you define methods to do so.

```ruby
class Book
  def initialize(title)
    @title = title
  end
end

my_book = Book.new("The Hobbit")
puts my_book.title
```

Output:

```bash
undefined method 'title' for an instance of Book (NoMethodError) 
```

To read or modify instance variables from outside the class, you need to create **getter** and **setter** methods.


### The Manual Way 

There are two types of methods to access instance variables:

- **Getter**: A method to read the variable.
- **Setter**: A method to change the variable (uses the `=` syntax).

By convention, both getter and setter methods are named after the instance variable they expose. For example, a getter for `@title` is called `title`, while a setter is called `title=`.

```ruby
class Book
  def initialize(title)
    @title = title
  end

  # Getter
  def title
    @title
  end

  # Setter
  def title=(new_title)
    @title = new_title
  end
end
```

Examples: 

1. **Reading data with a Getter:**

    By defining a `title` method, we can safely read the internal `@title` variable from outside the class.

    ```ruby
    class Book
      def initialize(title)
        @title = title
      end

      # Getter
      def title
        @title
      end
    end

    book = Book.new("Old Title")
    puts book.title          
    ```

    Output:

    ```ruby
    Old Title
    ```

2. **Overriding the title by calling the setter method:**

    The `title=` method allows us to reassign the internal variable.

    ```ruby
    class Book
      def initialize(title)
        @title = title
      end

      # Getter
      def title
        @title
      end

      # Setter
      def title=(new_title)
        @title = new_title
      end
    end

    book = Book.new("Old Title")
    
    # Overriding
    book.title = "New Title" 
    puts book.title    
    ```

    Output:

    ```ruby
    New Title
    ```

3. **Handling multiple attributes:** 

    As a class grows, you must define a separate getter and setter for every instance variable you wish to access.

    ```ruby
    class Book
      def initialize(title, author)
        @title = title
        @author = author
      end

      # Getter 1
      def title
        @title
      end
      
      # Getter 2
      def author
        @author
      end

      # Setter 1
      def title=(value)
        @title = value
      end
      
      # Setter 2
      def author=(value)
        @author = value
      end
    end

    book1 = Book.new("The Great Gatsby", "F. Scott Fitzgerald")
    puts "#{book1.title} by #{book1.author}"  
    ```

    Output:

    ```ruby
    The Great Gatsby by F. Scott Fitzgerald
    ```


4. **Shorthand syntax:**

    Same code as number 3, but more compact and written on a single line using semicolons.

    ```ruby
    class Book
      def initialize(title, author)
        @title = title
        @author = author
      end

      # Getters
      def title; @title; end
      def author; @author; end

      # Setters
      def title=(value); @title = value; end
      def author=(value); @author = value; end
    end

    book1 = Book.new("The Great Gatsby", "F. Scott Fitzgerald")
    puts "#{book1.title} by #{book1.author}"
    ```

### The Ruby Way (Attribute Accessors)

Writing out getters and setters for every attribute can quickly become tedious. To keep things clean, Ruby provides built-in shortcuts called **attribute accessors** to generate these methods automatically.

| Shortcut        | Effect                            |
| --------------- | --------------------------------- |
| `attr_reader`   | Creates a **Getter** (Read-only)  |
| `attr_writer`   | Creates a **Setter** (Write-only) |
| `attr_accessor` | Creates **Both** (Read & Write)   |

Examples: 

1. **Using attr_accessor for full access:**

    This shortcut creates both the getter and setter methods for the specified attributes in a single line.

    ```ruby
    class Student
      attr_accessor :first_name, :last_name, :email

      def initialize(first, last, email)
        @first_name = first
        @last_name = last
        @email = email
      end

      def to_s
        "Full name: #{@first_name} #{@last_name}"
      end
    end

    student1 = Student.new("John", "Smith", "john.smith@abc.com")

    # Retrieve values using the generated getters
    puts student1
    puts student1.email
    ```

    Output:

    ```ruby
    Full name: James Dean
    james.dean@abc.com
    ```

2. **Using attr_reader for Read-Only data:** 

    If an attribute should be set only at creation and never changed from the outside (like an `student_id`), use `attr_reader`.

    ```ruby
    class Student
      attr_accessor :first_name, :last_name, :email
      attr_reader :student_id 

      def initialize(id, first, last, email)
        @student_id = id
        @first_name = first
        @last_name = last
        @email = email
      end
    end

    student1 = Student.new(103, "John", "Smith", "john.smith@abc.com")

    # Attempt to overwrite the ID
    student1.student_id = "213"
    ```

    Output:

    ```ruby
    undefined method 'student_id=' for an instance of Student (NoMethodError)
    ```


    This returns an exception because `attr_reader` only creates a getter method. When you attempt to use `student1.student_id = "213"`, Ruby looks for a setter method named `student_id=`. Since that method was never defined, the program crashes with a `NoMethodError`.



## Encapsulation and Instance Methods

**Encapsulation** means keeping an object’s data hidden and only allowing access through methods. This makes objects easier to use and helps avoid mistakes.

- Object data (instance variables) is private by default
- Methods control how data is read or changed

**Instance methods** are the way we interact with these objects. They belong to the specific instance and can access the object's internal data using instance variables.

Examples:

1. **A Animal class with an `information` method:**

    This example shows how an instance method can combine multiple private variables into a single descriptive string.

    ```ruby
    class Animal
      def initialize(species, sound, diet)
        @species = species
        @sound = sound
        @diet = diet
      end

      def information
        "The #{@species} makes a '#{@sound}' sound and is a #{@diet}."
      end
    end

    lion = Animal.new("Lion", "Roar", "Carnivore")
    puts lion.information
    ```

    Output:

    ```text
    The Lion makes a 'Roar' sound and is a Carnivore.
    ```

    Here, the variables `@species`, `@sound`, and `@diet` are private. The outside world cannot access them directly, but the `information` method safely exposes them in a controlled format.


2. **A Student class with multiple instance methods**:

    An object can have various instance methods, like formattting strings and performing logical checks.

    ```ruby
    class Student
      def initialize(first_name, last_name, grade)
        @first_name = first_name
        @last_name = last_name
        @grade = grade
      end

      # Instance method 1: Combines names
      def full_name
        "Full name: #{@first_name} #{@last_name}"
      end

      # Instance method 2: Evaluates the grade
      def passing?
        print "Passed: "
        @grade >= 60
      end
    end

    student = Student.new("Alex", "Smith", 85)

    puts student.full_name
    puts student.passing?
    ```

    Output:

    ```ruby
    Full name: Alex Smith
    Evaluation: true
    ```










## The `self` Keyword

`self` refers to the "current object." Its meaning changes depending on where it is used.

### `self` in a Class

When used inside a class but outside any method, `self` refers to the class itself.

```ruby
class Animal
  puts "Inside Animal class, self is #{self}"
end
```

Output:

```bash
Inside Animal class, self is Animal
```

Here, `self` refers to the *Animal* class itself because it is used directly within the class body. When printed, it displays the class name. This proves that the current execution context is the class object rather than a specific instance.


### `self` in an Instance Method

When used inside a method, `self` refers to the specific instance calling that method.


```ruby
class Animal
  def details
    puts "Inside details, self is #{self}"
    puts "Is it nil? #{self.nil?}"
    puts "Its class is #{self.class}"
  end
end

animal1 = Animal.new
animal1.details
```

Output:

```
Inside details, self is #<Animal:0x00007ebe7cf07c60>
Is it nil? false
Its class is Animal
```

In this case, `self` refers to *animal1*. Because we have access to self, we can easily inspect or interact with the instance from the inside.


:::info 

`self` is essentially a reference to the current entity, whether it is a class or an instance. It allows Ruby to manage method calls and data access correctly within different contexts.

:::

### Omitting `self` in Instance Methods

In most cases, you don't need to write `self` explicitly when calling one instance method from another within the same object. Ruby automatically substitutes `self` behind the scenes and assumes you mean "this object."

In the example below, Ruby assumes the `nil_details` and `class_details` methods belong to the current *Animal* instance. This is why no explicit `self` is needed for normal instance method calls.

```ruby
class Animal
  def nil_details
    puts "Object is not nil"
  end

  def class_details
    puts "This object is a Animal class"
  end

  def details
    nil_details       # Ruby assumes self.nil_details
    class_details     # Ruby assumes self.class_details
  end
end

Animal = Animal.new
Animal.details
```

Output:

```text
Object is not nil
This object is a Animal class
```

### Method Lookup & Implicit `self`

When Ruby encounters a method call inside an instance method, it follows a specific lookup process:

1. It first looks for that method on the **current object** (`self`).
2. If found, it runs the method as if `self.method_name` was written explicitly.
3. If it cannot find a matching method name, it raises a `NoMethodError`.

Example of a failed lookup:

```ruby
class Animal
  def details
    non_existing_method   # Will raise an error
  end
end

```

Output:

```text
undefined method `non_existing_method` for #<Animal:0x00007f...>
```

In most cases, you can leave out `self` when calling instance methods. Ruby automatically assumes the current object is the receiver, which keeps your code clean.

However, `self` is still required in specific situations. A common example is when calling **setter methods**. Without `self`, Ruby might mistake the method call for a simple local variable assignment.
# class Student
#   @first_name = "James"
#   @last_name = "Dean"
#   @email = "james.dean@abc.com"

#   def to_s
#     "Full name: #{@first_name} #{@last_name}"
#   end
# end


# ## Creates an object
# student1 = Student.new
# puts student1

# ----------------------------------------------

# class Guitar
#   puts "Inside Guitar class, self is #{self}"
# end

# ----------------------------------------------

# class Animal
#   def details
#     puts "Inside details, self is #{self}"
#     puts "Is it nil? #{self.nil?}"
#     puts "Its class is #{self.class}"
#   end
# end

# animal1 = Animal.new
# animal1.details


# ----------------------------------------------


# class Guitar
#   def nil_details
#     puts "Object is not nil"
#   end

#   def class_details
#     puts "This object is a Guitar class"
#   end

#   def details
#     nil_details
#     class_details
#   end
# end

# guitar = Guitar.new
# guitar.details

# ----------------------------------------------

# class Student
#   @first_name 
#   @last_name 
#   @email 

#   # Setter method
#   def first_name=(name)
#     @first_name = name
#   end

#   # Setter method
#   def last_name=(name)
#     @last_name = name
#   end

#   # Getter method
#   def first_name
#     @first_name
#   end

#   # Getter method
#   def last_name
#     @last_name
#   end

#   def to_s
#     "Full name: #{@first_name} #{@last_name}"
#   end
# end

# # Create object
# student1 = Student.new

# # Set value for first_name and last_name
# student1.first_name = "James"
# student1.last_name = "Dean"

# puts student1
# puts student1.first_name
# puts student1.last_name

# ----------------------------------------------

# class Student
#   @first_name 
#   @last_name 
  
#   def to_s
#     "Full name: #{@first_name} #{@last_name}"
#   end
# end

# student1 = Student.new
# puts student1

# ----------------------------------------------

# class Book
#   def initialize(title)
#     @title = title
#   end
# end

# my_book = Book.new("The Hobbit")
# puts my_book.title

# ----------------------------------------------

# class Book
#   def initialize(title)
#     @title = title
#   end

#   # Getter
#   def title
#     @title
#   end

#   # Setter
#   def title=(new_title)
#     @title = new_title
#   end
# end

# book = Book.new("Old Title")
# puts book.title       

# ----------------------------------------------

# class Book
#   def initialize(title, author)
#     @title = title
#     @author = author
#   end

#   # Getter 1
#   def title
#     @title
#   end
  
#   # Getter 2
#   def author
#     @author
#   end

#   # Setter 1
#   def title=(value)
#     @title = value
#   end
  
#   # Setter 2
#   def author=(value)
#     @author = value
#   end
# end

# book1 = Book.new("The Great Gatsby", "F. Scott Fitzgerald")
# puts "#{book1.title} by #{book1.author}"  

# ----------------------------------------------

# class Book
#   def initialize(title, author)
#     @title = title
#     @author = author
#   end

#   # Getters
#   def title; @title; end
#   def author; @author; end

#   # Setters
#   def title=(value); @title = value; end
#   def author=(value); @author = value; end
# end

# book1 = Book.new("The Great Gatsby", "F. Scott Fitzgerald")
# puts "#{book1.title} by #{book1.author}"

# ----------------------------------------------

# class Student
#   attr_accessor :first_name, :last_name, :email
#   attr_reader :student_id 

#   def initialize(id, first, last, email)
#     @student_id = id
#     @first_name = first
#     @last_name = last
#     @email = email
#   end

#   def to_s
#     "Full name: #{@first_name} #{@last_name}"
#   end
# end

# # Create object
# student1 = Student.new(103, "John", "Smith", "john.smith@abc.com")

# # Attempt to overwrite
# student1.student_id = "213"
# puts student1.id

# ----------------------------------------------

# class Student
#   attr_accessor :first_name, :last_name, :email

#   def initialize(first, last, email)
#     @first_name = first
#     @last_name = last
#     @email = email
#   end

#   def to_s
#     "Full name: #{@first_name} #{@last_name}"
#   end
# end

# student1 = Student.new("John", "Smith", "john.smith@abc.com")

# # Retrieve values using the generated getters
# puts student1
# puts student1.email

# ----------------------------------------------

# class Student
#   attr_accessor :first_name, :last_name, :email
#   attr_reader :student_id 

#   def initialize(id, first, last, email)
#     @student_id = id
#     @first_name = first
#     @last_name = last
#     @email = email
#   end
# end

# student1 = Student.new(103, "John", "Smith", "john.smith@abc.com")

# # Attempt to overwrite the ID
# student1.student_id = "213"

# ----------------------------------------------

# class Animal
#   def initialize(species, sound, diet)
#     @species = species
#     @sound = sound
#     @diet = diet
#   end

#   def information
#     "The #{@species} makes a '#{@sound}' sound and is a #{@diet}."
#   end
# end

# lion = Animal.new("Lion", "Roar", "Carnivore")
# puts lion.information

# ----------------------------------------------

# class Student
#   def initialize(first_name, last_name, grade)
#     @first_name = first_name
#     @last_name = last_name
#     @grade = grade
#   end

#   # Instance method 1: Combines names
#   def full_name
#     "Full name: #{@first_name} #{@last_name}"
#   end

#   # Instance method 2: Evaluates the grade
#   def passing?
#     print "Passed: "
#     @grade >= 60
#   end
# end

# student = Student.new("Alex", "Smith", 85)

# puts student.full_name
# puts student.passing?

# ----------------------------------------------

# class Animal
# end

# animal1 = Animal.new
# animal2 = Animal.new
# animal3 = Animal.new

# puts animal1
# puts animal2
# puts animal3

# ----------------------------------------------

class Animal
  def initialize(species, family, diet)
    @species = species # State 1
    @family = family   # State 2
    @diet = diet       # State 3
  end

  def speak
    puts "The #{@species} is a #{@family} (#{@diet}) and makes a sound!"
  end
end

# Each instance is created with its own unique data
animal1 = Animal.new("Lion", "Felidae", "Carnivore")
animal2 = Animal.new("Elephant", "Elephantidae", "Herbivore")

animal1.speak 
animal2.speak
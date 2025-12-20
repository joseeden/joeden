## Strings
# puts "Hello World"
# p "Hello World"
# print "Hello World"
# print "Hello World\n"

###-----------------------------------------

## Strings 

# first_name = "John"
# last_name = "Smith"
# puts first_name + " " + last_name 

# first_name = "John"
# last_name = "Smith"
# puts 'My first name is #{first_name} and my last name is #{last_name}'

# first_name = "John"
# last_name = "Smith"
# puts "Jane".class
# puts 10.class
# puts 10.0.class

###-----------------------------------------

## Variable
# greeting = "Hey there!" 
# puts greeting

# first_name = "John"
# new_first_name = "Jane"
# puts new_first_name 

# first_name = "Adam"
# puts new_first_name 

###-----------------------------------------

## Method
# def say_hello
#   puts "Nice to see you!"
# end


# def say_hello(thing_to_say)
#   puts thing_to_say
# end

# say_hello("How is your day?")

# first_name = "John"
# puts first_name.methods

# puts 10.class 
# puts 10.to_s
# puts 10.to_s.class 

# first_name = "maximilian"
# last_name = "jefferson"
# full_name = first_name + " " + last_name 
# puts full_name
# puts full_name.length
# puts full_name.reverse
# puts full_name.capitalize 
# puts full_name.empty?
# puts "".empty?
# puts "".nil?

# banner = "Welcome to Jurassic Park"
# puts banner.sub("Jurassic Park", "Zootopia")

###-----------------------------------------

## Escape 

# puts 'John asked \'Hello Adam, how was your day?\''

###-----------------------------------------

## Prompts 

# puts "What is your first name?"
# first_name = gets.chomp

# puts "Enter a radius for a circle:"
# radius = gets.chomp 
# area = radius * 3.14
# puts "The area of the circle is #{area}"


# puts "Enter a radius for a circle:"
# radius = gets.chomp 
# area = 3.14 * radius.to_i * radius.to_i

# puts "The area of the circle is #{area}"


###-----------------------------------------

## Operations 

# puts 10/2
# puts 10/4

# puts 10.0/4
# puts 10/4.0

# puts 10/4.to_f

# puts (10/4).to_f

###-----------------------------------------

## Times 

# 20.times { print "-" }
# 10.times { puts "hello" }
14.times { puts rand(10) }
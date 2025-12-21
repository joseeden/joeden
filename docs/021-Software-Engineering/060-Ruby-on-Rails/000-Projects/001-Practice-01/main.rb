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


# first_num = 4
# second_num = 3

# def multiply(first_num, second_num)
#   return first_num.to_f * second_num.to_f
# end

# puts "The product of #{first_num} and #{second_num} is #{multiply(first_num, second_num)}"


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
# 14.times { puts rand(10) }

###-----------------------------------------

## Operators

# puts 10 == 10
# puts 10 == 5
# puts 10 != 5

# puts "hello" == "hello"
# puts "hello" == "helo"
# puts "hello" == "bye"
# puts "hello" != "bye"

# puts 10 > 9

# puts 23 < 23
# puts 23 < 40

# puts 101 >= 99
# puts 101 >= 101

# puts 98 <= 100
# puts 98 <= 98

# puts "" == " "


# puts 10.eql?(10.0)

###-----------------------------------------

## Conditionals 

# age = 18

# if age >= 18
#   puts "You are an adult."
# else 
#   puts "You are a minor."
# end 

# temperature = 30

# if temperature > 25
#   puts "It's a hot day!"
# end

# score = 87

# if (score > 85 && score < 90) 
#   puts "Grade: A"
# elsif (score >= 70 && score <= 85)
#   puts "Grade: B"
# end

###-----------------------------------------

## Arrays 

# my_list = [11, 8, 5, 14, 10, 23, 28, 12]
# puts my_list
# print my_list
# puts
# print my_list
# p my_list

# my_list = [11, 8, 5, 14, 10, 23, 28, 12]
# p my_list.last

# my_list = [11, 8, 5, 14, 10, 23, 28, 12]
# p my_list.first

# my_list = [11, 8, 5, 14, 10, 23, 28, 12]
# p my_list.include?(23)

# my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
# p my_list.include?("bananas")

# hundred = 1..100 
# p hundred.to_a

# hundred = 1..100 
# p hundred.to_a.shuffle

# my_letters = "a".."z"
# new_letters = my_letters.to_a
# p new_letters.length

# my_letters = "a".."z"
# new_letters = my_letters.to_a
# p new_letters.size

# tens = (1..10).to_a 
# p tens
# p tens.reverse!
# p tens

# tens = (1..10).to_a 
# p tens 

# tens <<  24
# p tens 

# tens.push(16)
# p tens 

# tens.append(13)
# p tens 

# tens.unshift(34)
# p tens

# tens.unshift("Hello")
# p tens

# tens = (1..10).to_a 
# tens.append(13)
# tens.unshift(13)
# p tens
# p tens.uniq!
# p tens


# my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
# p my_list

# p my_list.pop
# p my_list.pop
# p my_list.pop

# p my_list


# my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]
# foo = my_list.join("-")
# # p foo

# bar = foo.split("-")
# p bar

# tens = 1..10
# p tens.to_a


# p %w(Dinosaurs eat Man. Woman inherits the earth)

# my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

# for items in my_list 
#   p items 
# end


# my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

# my_list.each do |item|
#    p item 
# end

# my_list = ["apples", 23, 18, "oranges", "pears", 38, "kiwis"]

# my_list.each { |item| p item }


# tens = 1..10
# tens = tens.to_a
# p tens

# ### print just the odd numbers
# p tens.select { |item| item.even? }


my_list = [11, 8, 5, 14, 10, 23, 28, 12]
p my_list[3]
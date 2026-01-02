
puts "Simple Calculator"
50.times { print "-" }
puts 

print "Enter first number: "
first_num = gets.chomp.to_f 

print "Enter second number: "
second_num = gets.chomp.to_f 

50.times { print "-" }
puts 

puts "Select desired operation:"
puts "1 - Addition"
puts "2 - Subtraction"
puts "3 - Multiplication"
puts "4 - Division"

puts 
print "Enter operation number: "
user_entry = gets.chomp.to_i

50.times { print "-" }
puts 

def operation(first_num, second_num, user_entry)
  if user_entry == 1
    puts "The sum is #{ first_num + second_num }"
  elsif user_entry == 2
    puts "The difference is #{ first_num - second_num }"
  elsif user_entry == 3
    puts "The product is #{ first_num * second_num }"
  elsif user_entry == 4
    puts "The quotient is #{ first_num / second_num }"
  else
    "Invalid operation selected"
  end
end 

operation(first_num, second_num, user_entry)


# Define a Fizzbuzz method that accepts a single number.
# The method should output every number from one to that argument.
#
# There are some caveats:
# - If the number is divisible by 3, output "Fizz" instead of the number.
# - If the number is divisible by 5, output "Buzz" instead of the number
# - If the number is divisible by both 3 and 5, output "FizzBuzz" instead of the number.
# - If the number is NOT divisible by either 3 or 5, just output the number

# Example: fizzbuzz(30) should print:
# 
# 1
# 2
# Fizz
# 4
# Buzz
# Fizz
# 7
# 8
# Fizz
# Buzz
# 11
# Fizz
# 13
# 14
# FizzBuzz
# 16
# 17
# 19
# Fizz
# 22
# Buzz

# ...

def fizzbuzz(number) 
  i = 1
  
  while i <= number 

    if (i % 3 == 0) && (i % 5 == 0)
      puts "FizzBuzz"
    elsif i % 3 == 0
      puts "Fizz"
    elsif i % 5 == 0
      puts "Buzz"
    else 
      puts i
    end 

    i += 1 
  end 
end 

puts fizzbuzz(15)
# require "debug"

# food = "salad"
# puts "I love eating #{food}"

# binding.break

# drink = "iced tea"
# puts "I love drinking #{drink}"

# binding.break

# puts "End of program"

# ----------------------------------------------

# debugger
# puts "Hello".downcase
# puts "Goodbye".upcase

# ----------------------------------------------

# debugger 

# 3.times do |count|
#   puts "Loop number: #{count}"
# end 

# ----------------------------------------------

## debugging.rb 
# require "debug"

# one = 1
# two = 2
# three = 3

# debugger

# ----------------------------------------------

require "debug"

def reverse(text)
  return text if text.length <= 1

  last_char = text[-1]
  remainder = text[0..-2]

  debugger
  last_char + reverse(remainder)
end

puts reverse("straw")
# [1, 2, 3].each { |v| puts v }

# def pass_control
#   puts "Start of method"
#   yield
#   puts "Back in method"
# end

# pass_control { puts "Inside block" }

# def repeat_twice
#   puts "Before first yield"
#   yield
#   puts "Between yields"
#   yield
#   puts "After second yield"
# end

# repeat_twice do
#   puts "Running from inside the block"
#   puts "Exiting block, bye"
# end

# def who_am_i
#   puts "Hello there, new recruit."
  
#   # Assign block output to variable
#   whoami_var = yield       
#   puts "I am from #{whoami_var}"
# end

# who_am_i { return "Silo 17" }

# def pass_control_on_condition
#   puts "Inside the method"
#   yield if block_given?
#   puts "Back inside the method"
# end

# With a block
# pass_control_on_condition { puts "Inside the block" }

# Without a block
# pass_control_on_condition

# ----------------------------------------------

# def captain_nemo_says
#   yield("Nautilus")
# end

# captain_nemo_says { |ship| puts "#{ship} sails through the ocean" }
# captain_nemo_says { |ship| puts "#{ship} explores the deep sea" }

# def captain_nemo_says(ship)
#   yield(ship)
# end

# captain_nemo_says("Nautilus") { |s| puts "#{s} is ready for adventure" }
# captain_nemo_says("Diving Bell") { |s| puts "#{s} descends into the depths" }

def number_evaluation(a, b, c)
  yield(a, b, c)
end

result = number_evaluation(5, 10, 15) { |x, y, z| x + y + z }
puts result

result = number_evaluation(2, 3, 4) { |x, y, z| x * y * z }
puts result
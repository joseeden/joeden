def divide(a, b)
  result = a / b
  puts "Result is #{result}"
rescue ZeroDivisionError
  puts "Cannot divide by zero"
ensure
  puts "Method complete"
end

divide(15, 3)
divide(11, 0)
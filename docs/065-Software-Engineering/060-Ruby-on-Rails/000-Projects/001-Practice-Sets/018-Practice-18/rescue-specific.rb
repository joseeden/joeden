def sum(a, b)
  begin
    a + b
  rescue TypeError => error
    puts "Type error: #{error.class} - #{error.message}"
  rescue NoMethodError => error
    puts "No method error: #{error.class} - #{error.message}"
  end
end

puts sum(2, 7)      
puts sum(3, "5")    
puts sum(nil, nil)  
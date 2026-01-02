def sum(a, b)
  begin
    a + b
  rescue TypeError
    a = a.to_i
    b = b.to_i
    retry
  rescue NoMethodError
    a = 0
    b = 0
    retry
  end
end

puts sum(7, 9)      
puts sum(6, "11")    
puts sum(nil, nil)  
# def sum(a: 1, b: )
#   a + b
# end

# # "a" defaults to 1
# puts sum(b: 3)  

# # Both values provided
# puts sum(a: 2, b: 8)  
# puts sum(b: 8, a: 2)  

# ----------------------------------------------

def sum(a, b: 1)
  a + b
end

# puts sum(3, b: 5)    # Output: 8
# puts sum(4)          # Output: 5, b defaults to 1

puts sum(b: 5, 8)    

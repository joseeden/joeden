# class String
#   def count_vowels
#     self.downcase.count("aeiou")
#   end
# end

# puts "Hello".count_vowels  
# puts "Refrigerator".count_vowels  

# ----------------------------------------------

class Array
  def sorted?
    self == self.sort
  end
end

puts [1,2,3].sorted?    
puts [1,3,2].sorted?    
# c = [1, 2, 3]
# d = [1, 2, 3]

# d.push(5)

# puts c.inspect  # Output: => [1, 2, 3]
# puts d.inspect  # Output: => [1, 2, 3, 5]


# a = [1, 2, 3]
# b = a.dup
# c = a.clone

# puts a.object_id  # Output: => 123
# puts b.object_id  # Output: => 567
# puts c.object_id  # Output: => 953

# a.push(4)
# puts a.inspect    # Output: => [1, 2, 3, 4]
# puts b.inspect    # Output: => [1, 2, 3]
# puts c.inspect    # Output: => [1, 2, 3]



# a = "Kurt Vonnegut"
# b = a.dup
# c = a.clone

# a.upcase!

# puts a
# puts b 
# puts c 

# name = "James".freeze
# hobbies = ["coding", "sushi"].freeze

# name << " the genius"   
# hobbies << "winning"    
# name.upcase! 


# name = "James".freeze

# name_dup = name.dup
# name_clone = name.clone

# puts name_dup << " the Genius"   # Works
# puts name_clone << " the Genius" 

hobbies = ["coding", "sushi"].freeze

hobbies_dup = hobbies.dup
hobbies_clone = hobbies.clone

puts hobbies_dup << "winning"    # Works
puts hobbies_clone << "winning"   
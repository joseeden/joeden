file = File.open("./shopping-list.txt")
puts file.class 

file.each do |line|
  puts line
end
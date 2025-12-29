class Animal
end

class Mammal < Animal
end

class Dog < Mammal
end

puts Dog.superclass      
puts Mammal.superclass   
puts Animal.superclass   
puts Object.superclass   
puts BasicObject.superclass 

puts Dog.ancestors.inspect  
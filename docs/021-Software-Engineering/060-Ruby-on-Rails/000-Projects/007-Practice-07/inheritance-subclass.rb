class Animal
  attr_reader :type, :action

  def initialize(type, action)
    @type = type 
    @action = action 
  end

  def perform
    "The #{@type} can #{@action}"
  end
end

# Subclasses inheriting from Animal
class Dog < Animal
end

class Bird < Animal
end

# Creating objects
fido = Dog.new("dog", "bark and fetch")
tweety = Bird.new("bird", "fly and sing")

puts fido.perform   
puts tweety.perform
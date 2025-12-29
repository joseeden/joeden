class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end

  # Parent's `action`
  def action(activity)
    "#{@name} is #{activity}"
  end

  # Parent's `greet`
  def greet
    "Hi, I'm #{@name}"
  end
end

class Dog < Animal
  attr_reader :breed

  # 1. Using `super(arg)`
  def initialize(name, breed)
    super(name)    
    @breed = breed
  end

  # 2. Using `super` (passes same argument automatically)
  def action(activity)
    super + " happily in the park" 
  end

  # 3. Using `super()` (calls parent method with no arguments)
  def greet
    super() + " and I'm a dog"
  end
end

dog = Dog.new("Buddy", "Beagle")

puts dog.name
puts dog.action("running")
puts dog.greet

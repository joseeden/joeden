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

class Dog < Animal
  def bark
    "Woof"
  end
end

class Bird < Animal
  def fly
    "Tweet tweet"
  end
end

buddy  = Dog.new("Dog", "run and fetch")
tweety = Bird.new("Bird", "fly and sing")

p buddy.bark
p tweety.fly

p buddy.perform
p tweety.perform


class Dog < Animal
  def action
    "Run until I get tired"
  end
end

class Bird < Animal
  def action
    "Fly until it rains"
  end
end

p buddy.action
p tweety.action


class Bike 
  @@count = 0 

  attr_reader :color 

  def initialize(color)
    @color = color 
    @@count += 1
  end

  def self.count 
    @@count 
  end
end

bike1 = Bike.new("red")
bike2 = Bike.new("blue")
bike3 = Bike.new("green")

puts Bike.count
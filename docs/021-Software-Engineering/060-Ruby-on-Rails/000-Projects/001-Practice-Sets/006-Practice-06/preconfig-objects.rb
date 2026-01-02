class Appliance
  attr_reader :voltage, :power

  def initialize(voltage, power)
    @voltage = voltage
    @power = power 
  end

  def self.fridge 
    self.new(220, 150)
  end 

  def self.washer
    self.new(220, 500)
  end
end

# Creates instances with preconfig values
fridge1 = Appliance.fridge
washer1 = Appliance.washer

puts fridge1.voltage
puts fridge1.power

puts washer1.voltage
puts washer1.power
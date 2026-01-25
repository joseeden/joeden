class Appliance 
  attr_reader :voltage, :power 

  def initialize(voltage, power)
    @voltage = voltage
    @power = power
  end

  class << self 
    def fridge
      new(220, 150)
    end
    def washer
      new(220, 150)
    end
  end
end

fridge = Appliance.fridge
washer = Appliance.washer

puts fridge.voltage
puts fridge.power
puts washer.voltage
puts washer.power
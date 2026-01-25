class LockBox
  attr_reader :pin 

  def initialize(pin)
    @pin = pin
  end

  # Custom setter 
  def pin=(new_pin)
    if valid_pin?(new_pin)
      @pin = new_pin
    end
  end

  private 

  def valid_pin?(input)
    input.is_a?(String) && input.length >= 6
  end
end

safe = LockBox.new("869487")

# Trying to set a new pin
safe.pin = "12345"
puts safe.pin
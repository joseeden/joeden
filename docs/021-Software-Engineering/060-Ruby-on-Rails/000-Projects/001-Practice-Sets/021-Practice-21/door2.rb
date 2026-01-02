## door.rb

class Door
  def initialize
    @locked = true
  end

  def unlock
    @locked = false
  end
  
  def open 
    raise "Door is locked!" if @locked
    puts "Door opened"
  end 
end 

door = Door.new 
door.open 
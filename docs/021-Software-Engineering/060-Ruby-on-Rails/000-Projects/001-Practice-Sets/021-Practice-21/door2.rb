## door.rb
class DoorLockedError < StandardError
end

class Door
  attr_accessor :locked

  def initialize
    @locked = true
  end

  def unlock
    @locked = false
  end
  
  def open 
    raise DoorLockedError, "Door is locked!" if locked
    puts "Door opened"
  end 
end 

door = Door.new 

begin
  door.open
rescue DoorLockedError => e
  puts e.message
  puts "Unlocking door and trying again"
  door.unlock
  retry
end

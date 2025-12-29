# class Box 
#   attr_accessor :height, :width 
#   attr_reader :area

#   def initialize(height, width)
#     @height = height
#     @width = width 
#     @area = height * width 
#   end
# end

# box1 = Box.new(3, 5)
# puts box1.area 

# box1.height = 10
# puts box1.area

# ----------------------------------------------

class Box 
  attr_accessor :height, :width 

  def initialize(height, width)
    @height = height
    @width = width 
  end

  def area
    height * width 
  end
end

box1 = Box.new(3, 5)
puts box1.area 

box1.height = 10
puts box1.area

box1.width = 7
puts box1.area

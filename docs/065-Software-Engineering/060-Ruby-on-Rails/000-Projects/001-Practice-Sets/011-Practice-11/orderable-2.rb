module Orderable
  def order(item)
    "You ordered #{item}"
  end
end

class Cafe
  include Orderable

  def order(item)
    "You got a #{item} at the cafe"
  end
end

class FoodTruck
  include Orderable
end

class JuiceStand < FoodTruck
end

cafe_1 = Cafe.new
food_truck_1 = FoodTruck.new
juice_stand_1= JuiceStand.new

# puts cafe_1.order("Latte")
# puts food_truck_1.order("Sandwich")
# puts juice_stand_1.order("Smoothie")

# p Cafe.ancestors
# p FoodTruck.ancestors
# p JuiceStand.ancestors

puts cafe_1.is_a?(Cafe)       # Output: true
puts cafe_1.is_a?(Orderable)  # Output: true
puts cafe_1.is_a?(Object)     # Output: true
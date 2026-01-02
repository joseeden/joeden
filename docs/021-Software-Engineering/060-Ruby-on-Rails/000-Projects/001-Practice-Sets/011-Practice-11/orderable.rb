module Orderable 
  def order(item)
    "You ordered #{item}"
  end
end

class Cafe
  include Orderable
end

class FoodTruck
  include Orderable
end

class JuiceStand < FoodTruck
end

cafe = Cafe.new
truck = FoodTruck.new
juice = JuiceStand.new

puts cafe.order("Coffee")
puts truck.order("Tacos")
puts juice.order("Orange Juice")
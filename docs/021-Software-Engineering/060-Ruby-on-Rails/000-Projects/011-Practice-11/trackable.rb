module Trackable
  def track
    "Tracking activity for #{self}"
  end
end

class Cafe
  extend Trackable
end

class FoodTruck
  extend Trackable
end

puts Cafe.track
puts FoodTruck.track

puts cafe_1.track

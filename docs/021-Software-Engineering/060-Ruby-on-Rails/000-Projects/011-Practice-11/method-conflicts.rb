module Breakfast
  def serve(item)
    "Serving #{item} for breakfast"
  end

  def drink
    "Serving coffee"
  end
end

module Lunch
  def serve(item)
    "Serving #{item} for lunch"
  end
end

class Cafe
  include Lunch
  include Breakfast
end

cafe = Cafe.new
puts cafe.serve("Pancakes")  # Serving Pancakes for lunch
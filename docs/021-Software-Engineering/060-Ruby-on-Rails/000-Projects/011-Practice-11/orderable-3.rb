module Orderable
  def order(item)
    "You ordered #{item}"
  end
end

class Cafe
  # prepend Orderable

  def order(item)
    "You got a #{item} at the cafe"
  end
end

cafe = Cafe.new
puts cafe.order("Latte")

p Cafe.ancestors

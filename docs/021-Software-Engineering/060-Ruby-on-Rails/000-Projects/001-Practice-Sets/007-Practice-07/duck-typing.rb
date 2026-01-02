class Drink
  attr_reader :name, :volume, :price

  def initialize(name:, volume:, price:)
    @name = name
    @volume = volume
    @price = price
  end

  def ==(other)
    volume == other.volume && price == other.price
  end
end

class Juice
  attr_reader :volume, :price

  def initialize(volume:, price:)
    @volume = volume
    @price = price
  end
end

drink1 = Drink.new(name: "Cola", volume: 500, price: 2)
juice1 = Juice.new(volume: 500, price: 2)
juice2 = Juice.new(volume: 300, price: 1)

puts drink1 == juice1  # true
puts drink1 == juice2  # false
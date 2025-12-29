class Book
  attr_reader :title, :pages, :price

  def initialize(title:, pages:, price:)
    @title = title
    @pages = pages
    @price = price
  end

  # Defines the rules for equality
  def ==(other)
    pages == other.pages && price == other.price
  end
end

book1 = Book.new(title: "Ruby Basics", pages: 200, price: 25)
book2 = Book.new(title: "Advanced Ruby", pages: 200, price: 25)
book3 = Book.new(title: "Learning Rails", pages: 150, price: 20)

puts book1 == book2  
puts book1 == book3  
class Bookshelf
  include Enumerable

  def initialize(books:, magazines:)
    @books = books 
    @magazines = magazines
  end

  def books
    @books
  end

  def magazines
    @magazines
  end

  def items
    books + magazines
  end

  def each
    items.each do |item|
      yield item
    end
  end
end

shelf = Bookshelf.new(
  books: [
    "Slaughterhouse-Five by Kurt Vonnegut",
    "Cat's Cradle by Kurt Vonnegut",
    "Stranger in a Strange Land by Robert A. Heinlein",
    "Dune by Frank Herbert",
    "1984 by George Orwell"
  ],
  magazines: [
    "Asimov's Science Fiction",
    "The Magazine of Fantasy & Science Fiction",
    "Clarkesworld Magazine",
    "Weird Tales",
    "Analog Science Fiction and Fact"
  ]
)

# shelf.each do |item|
#   puts "#{item} is on the shelf"
# end

# puts shelf.sort

# puts shelf.any? { |item| item.length > 12 }

# puts shelf.map { |item| item.upcase }

puts shelf.select { |item| item.downcase.include?("g")}
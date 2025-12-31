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
  books: ["Ruby Basics", "Learn Rails", "Programming Tips"],
  magazines: ["Tech Monthly", "Code Weekly", "Dev Digest"]
)

p shelf.items

shelf.each do |item|
  puts "#{item} is on the shelf"
end

puts shelf.sort

p shelf.any? { |item| item.length > 12 }

p shelf.map { |item| item.upcase }

p shelf.select { |item| item.downcase.include?("g")}

class Book
  include Comparable 

  attr_reader :title, :pages 

  def initialize(title:, pages:)
    @title = title 
    @pages = pages 
  end

  def <=>(other)
    self.pages <=> other.pages 
  end 
end 

book1 = Book.new(title: "Short Story", pages: 100)
book2 = Book.new(title: "Novel", pages: 300)
book3 = Book.new(title: "Epic", pages: 500)

puts book1 < book2       
puts book3 > book2       
puts book3.between?(book1, book2)  
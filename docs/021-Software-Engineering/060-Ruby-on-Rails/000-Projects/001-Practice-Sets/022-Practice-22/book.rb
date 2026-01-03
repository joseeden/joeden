require "minitest/autorun"

class Book
  attr_reader :title, :author 
  def initialize(title, author)
    @title = title 
    @author = author 
  end
end

class TestBook < Minitest::Test 
  def test_title
    book_1 = Book.new("The War of the Worlds", "H.G. Wells")
    assert_equal("The War of the Worlds", book_1.title)
  end

  def test_author 
    book_1 = Book.new("The War of the Worlds", "H.G. Wells")
    assert_equal("H.G. Wells", book_1.author)
  end

  def test_title_2
    book = Book.new("The War of the Worlds", "H.G. Wells")
    assert_equal "The War of the World", book.title
  end
end
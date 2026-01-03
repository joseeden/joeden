# book.rb
require "minitest/autorun"

class Book
  attr_reader :title, :author 
  def initialize(title, author)
    @title = title 
    @author = author 
  end
end

class TestBook < Minitest::Test 
  def setup 
    @book_1 = Book.new("The War of the Worlds", "H.G. Wells")
  end

  def teardown
    puts "Cleaning up test data"
  end

  def test_title
    assert_equal("The War of the Worlds", @book_1.title)
  end

  def test_author 
    assert_equal("H.G. Wells", @book_1.author)
  end
end
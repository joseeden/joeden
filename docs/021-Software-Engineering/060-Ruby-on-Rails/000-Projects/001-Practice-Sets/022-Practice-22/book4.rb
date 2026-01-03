require "minitest/autorun"

class Book
  attr_reader :title
  def initialize(title)
    @title = title
  end
end

class TestBook < Minitest::Test
  def setup
    @book = Book.new("The Moon is a Harsh Mistress")
  end

  def test_book_title
    # Custom message
    assert_equal("The Mistress is a Harsh Moon", @book.title, "The book title was not assigned correctly")
  end

  def test_add_invalid_tag
    assert_raises(InvalidTagError, "Adding a non-string tag should raise an error") do
    @book.add_tag(123)
  end
end
end
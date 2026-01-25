# book4.rb
require "minitest/autorun"

class InvalidTagError < StandardError
end

class Book
  attr_reader :title, :tags
  def initialize(title)
    @title = title
    @tags = []
  end
  def add_tag(tag)
    @tags << tag
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

  def test_adds_tag_to_book
    @book.add_tag("Science Fiction")
    assert_includes(
      @book.tags,
      "Science Fiction",
      "The tag was not added to the book"
    )
  end

  def test_add_invalid_tag
    assert_raises(
      InvalidTagError, 
      "Adding a non-string tag should raise an error") do
      @book.add_tag(123)
    end
  end
end
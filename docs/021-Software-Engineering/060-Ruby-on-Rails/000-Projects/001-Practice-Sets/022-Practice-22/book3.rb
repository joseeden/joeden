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
    raise InvalidTagError, "Tag must be a string" unless tag.is_a?(String)
    @tags << tag
  end
end

class TestBook < Minitest::Test
  def setup
    @book = Book.new("The Moon is a Harsh Mistress")
  end
  
  def test_adds_tag_to_book
    @book.add_tag("Science Fiction")
    @book.add_tag("Adventure")
    @book.add_tag("Classic")
    @book.add_tag("Political")
    assert_includes(@book.tags, "Science Fiction")
  end

  def test_add_invalid_tag
    assert_raises(InvalidTagError) do
      @book.add_tag(8694)
    end
  end
end
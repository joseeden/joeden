# book2.rb
require "minitest/autorun"

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

  def test_adds_tag_to_book
    @book.add_tag("Science Fiction")
    @book.add_tag("Adventure")
    @book.add_tag("Classic")
    @book.add_tag("Political")
    assert_includes(@book.tags, "Historical")
  end
end
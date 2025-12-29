class Novel 
  attr_reader :title, :author, :pages 

  def initialize(title, author, pages)
    @title = title
    @author = author 
    @pages = pages
  end
end

lotr = Novel.new("The Lord of the Rings", "J.R.R. Tolkien", 1178)

puts lotr.title
puts lotr.author
puts lotr.pages

# Attempting to invoke read before its define
# puts lotr.read

# Adding a new method for the "Novel" class
class Novel 
  def read 
    1.step(pages, 10) do |page|
      puts "Reading page: #{page}"
    end
    puts "Done reading: #{title}"
  end
end

puts lotr.read

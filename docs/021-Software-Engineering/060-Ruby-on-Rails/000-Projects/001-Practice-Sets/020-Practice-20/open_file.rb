# open_file.rb
begin
  puts "Opening file"
  content = File.read("my-shopping-list.txt") 
rescue Errno::ENOENT
  puts "File not found"
ensure
  puts "Program finished"
end
# read_file.rb
def read_file(file_name)
  begin
    file = File.open(file_name, "r")
    content = file.read
    puts "file content: #{content}"
  rescue Errno::ENOENT
    puts "file not found, creating a new one"
    File.write(file_name, "new content")
    retry
  ensure
    file.close if file
    puts "file closed"
  end
end

read_file("hello1.txt")
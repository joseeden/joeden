require 'bundler/inline' 

gemfile true do 
  source 'http://rubygems.org' 
  gem 'bcrypt' 
end

require 'bcrypt'

my_password = BCrypt::Password.create("@Thr3@tL3v3Lm!dN!8hT")
puts my_password
puts

my_password = BCrypt::Password.new("$2a$12$WQw1LIO3alJ/6ZF8/BbgB.j99kxLLuDF6nPjKoMlaNDIyUbpVArtm")
puts my_password == "@Thr3@tL3v3Lm!dN!8hT"
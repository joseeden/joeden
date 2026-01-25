users = [
  { username: "adam", password: "adam123" },  
  { username: "alex", password: "alex123" },  
  { username: "bob", password: "bob123" },  
  { username: "james", password: "james123" },  
  { username: "john", password: "john123" },  
  { username: "robin", password: "robin123" },  
  { username: "ted", password: "ted123" }
]


def auth_user(username, password, list_of_users)

  list_of_users.each do |user_record|
    if user_record[:username] == username && user_record[:password] == password
      return user_record    
    end
  end

  return "Credentials are not correct"

end 


### BANNER ----------------------------------------------------------

50.times { print "-"}
puts
puts "Welcome to the Authenticator"
50.times { print "-"}
puts
puts "This program will take input from the user and compares the password."
puts "If the password is correct, you will get the user details."
puts 
puts "Please enter your username and password:"
puts

### BANNER ----------------------------------------------------------

attempts = 1

while attempts < 4 

  print "Username: "
  username = gets.chomp.downcase

  print "Password: "
  password = gets.chomp 
  puts 
  50.times { print "-"}
  puts 
  
  authenticate = auth_user(username, password, users)
  puts authenticate
  puts
  
  50.times { print "-"}
  puts 
  print "Press n to quit or any other key to continue: "
  next_step = gets.chomp.downcase
  break if next_step == "n"
  attempts += 1
  puts

end

if attempts == 4
  puts "You have exceeded the number of allowed attempts. Please try again later."
end




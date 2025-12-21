require_relative 'crud'

users = [
  { username: "adam", password: "adam123" },  
  { username: "alex", password: "alex123" },  
  { username: "bob", password: "bob123" },  
  { username: "james", password: "james123" },  
  { username: "john", password: "john123" },  
  { username: "robin", password: "robin123" },  
  { username: "ted", password: "ted123" }
]

hashed_users = Crud.create_secure_users(users)
puts hashed_users
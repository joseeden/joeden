require_relative 'crud' 

class Student
  include Crud 
  attr_accessor :first_name, :last_name, :email, :username, :password

  def initialize(first_name, last_name, email, username, password)
    @first_name = first_name
    @last_name = last_name
    @email = email 
    @username = username
    @password = password
  end

  def to_s 
    "Full name: #{@first_name} #{last_name}"
  end
end

student1 = Student.new("Alex", "Smith", "alex.smith@abc.com", "alsmith", "alex123")

hashed_pw_student1 = student1.create_hash_digest(student1.password)
puts hashed_pw_student1
class Student
  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end
end

student1 = Student.new("Alex", "Smith")
student2 = Student.new("Maria", "Lopez")

puts student1
puts student2

# class Student
#   attr_accessor :first_name, :last_name, :email 

#   def initialize(first_name, last_name, email)
#     @first_name = first_name
#     @last_name = last_name
#     @email = email
#   end

#   def to_s
#     "Full name: #{@first_name} #{@last_name}"
#   end
# end

# student1 = Student.new("Alex", "Smith", "alex.smith@abc.com")
# student2 = Student.new("Maria", "Lopez", "maria.lopez@abc.com")
# student3 = Student.new("Ted", "Mosby", "ted.mosby@abc.com")
# student4 = Student.new("James", "Dean", "james.dean@abc.com")

# puts student1
# puts student2
# puts student3
# puts student4

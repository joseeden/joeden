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

class Employee
  attr_reader :name, :age, :occupation, :hobby, :birthplace

  def initialize( name:,
                  age:,
                  occupation: "Employee",
                  hobby: "Unknown",
                  birthplace: "USA"
    )
    @name = name
    @age = age
    @occupation = occupation
    @hobby = hobby
    @birthplace = birthplace
  end
end



new_hire_1 = Employee.new(name: "John", 
                          age: 45, 
                          occupation: "Banker", 
                          hobby: "Fishing", 
                          birthplace: "Canada")

new_hire_2 = Employee.new(name: "Alex", age: 50)

# p new_hire_1.name        
# p new_hire_1.age        
# p new_hire_1.occupation        
# p new_hire_1.hobby        
# p new_hire_1.birthplace  

p new_hire_2.name        
p new_hire_2.age        
p new_hire_2.occupation        
p new_hire_2.hobby        
p new_hire_2.birthplace 
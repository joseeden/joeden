class Employee
  attr_reader :name, :age, :occupation, :hobby, :birthplace

  def initialize(details)
    @name = details[:name]
    @age = details[:age]
    @occupation = details[:occupation]
    @hobby = details[:hobby]
    @birthplace = details[:birthplace]
  end
end

new_hire_1 = Employee.new({ name: "Adam", 
                        age: 53, 
                        occupation: "Economist", 
                        hobby: "Running", 
                        birthplace: "Delaware" })

p new_hire_1.name        
p new_hire_1.age        
p new_hire_1.occupation        
p new_hire_1.hobby        
p new_hire_1.birthplace       
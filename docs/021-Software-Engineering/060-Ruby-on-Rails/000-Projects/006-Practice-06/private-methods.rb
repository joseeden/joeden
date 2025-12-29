class Gadget 

  attr_reader :username, :serial_id
  attr_writer :password 

  def initialize(username, password)
    @username = username 
    @password = password
    @serial_id = create_sid
  end

  private 
  
  def create_sid
    part_a = rand(10_000..99_999)
    part_b = rand(10_000..99_999)
    "ID-#{part_a}-#{part_b}"
  end

end


gadget_a = Gadget.new("veritymobile", "admin123")

p gadget_a.create_sid
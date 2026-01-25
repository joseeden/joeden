class GamesMedal
  include Comparable 
  attr_reader :type 

  def initialize(type:)
    @type = type 
  end 

  def <=>(other)
    medal_values = {
      gold: 3,
      silver: 2,
      bronze: 1 
    }
    medal_values[self.type] <=> medal_values[other.type]
  end
end

medal_gold = GamesMedal.new(type: :gold)
medal_silver = GamesMedal.new(type: :silver)
medal_bronze = GamesMedal.new(type: :bronze)

puts medal_silver < medal_gold        
puts medal_bronze > medal_gold      
puts medal_gold.between?(medal_silver, medal_bronze)  
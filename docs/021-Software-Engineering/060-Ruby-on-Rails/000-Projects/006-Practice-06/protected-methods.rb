class Tool
  def initialize(score)
    @quality_score = score 
  end

  # Public method 
  def compare_with(other_tool)
    if self.quality_score > other_tool.quality_score
      "This tool is higher quality."
    else
      "The other tool is higher quality"
    end
  end

  protected 

  # Protected 
  def quality_score 
    @quality_score
  end
end

hammer = Tool.new(80)
drill = Tool.new(95)

puts hammer.compare_with(drill)
puts hammer.quality_score 
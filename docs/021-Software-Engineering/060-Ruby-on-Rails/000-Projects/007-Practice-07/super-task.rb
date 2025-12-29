class Task
  attr_reader :title, :priority

  def initialize(title, priority)
    @title = title
    @priority = priority
  end

  # Base status message
  def status
    "#{@title} is in progress"
  end

  # Base description
  def description
    "Task: #{@title}, Priority: #{@priority}"
  end
end

class Bug < Task
  attr_reader :severity

  # 1. Using `super(arg)` 
  def initialize(title, priority, severity)
    super(title, priority)   
    @severity = severity
  end

  # 2. Using `super` (no parentheses) to extend status
  #    Automatically passes arguments if there were any
  def status
    super + " and needs attention"  
  end

  # 3. Using `super()` (no arguments) to extend description
  def description
    super() + ", Severity: #{@severity}"  
  end
end

# Create a bug instance
bug = Bug.new("Login error", "High", "Critical")

puts bug.title           # Login error
puts bug.priority        # High
puts bug.severity        # Critical
puts bug.status          # Login error is in progress and needs attention
puts bug.description     # Task: Login error, Priority: High, Severity: Critical

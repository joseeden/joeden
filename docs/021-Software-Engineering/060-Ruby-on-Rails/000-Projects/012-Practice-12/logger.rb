module Logger
  def log_request(endpoint)
    puts "[LOG] User #{@current_user || 'Guest'} accessed #{endpoint}"
  end
end
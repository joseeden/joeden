require_relative 'auth.rb'
require_relative 'logger.rb'
require_relative 'response_formatter.rb'

class RestApiHandler
  include Auth
  include Logger 
  include ResponseFormatter

  def get_user_profile(user)
    if authenticate(user)
      log_request("/profile")
      json_response({
        name: current_user,
        role: "developer"
      })
    else 
      {
        status: "Error",
        message: "Unauthorized"
      }.to_json
    end
  end
end

api_1 = RestApiHandler.new 

user = {
  name: "Alice",
  token: "valid_token"
}

puts api_1.get_user_profile(user)

unauthorized_user = {
  name: "Bob",
  token: "invalid"
}

puts api_1.get_user_profile(unauthorized_user)
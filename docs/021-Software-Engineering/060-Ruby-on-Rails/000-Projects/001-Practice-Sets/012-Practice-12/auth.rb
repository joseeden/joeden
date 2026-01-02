module Auth
  def authenticate(user)
    if user[:token] == "valid_token"
      @current_user = user[:name]
      true
    else
      false
    end
  end

  def current_user
    @current_user
  end
end
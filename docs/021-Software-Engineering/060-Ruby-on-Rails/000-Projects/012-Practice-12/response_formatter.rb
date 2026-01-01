require 'json'

module ResponseFormatter
  def json_response(data)
    { status: "success", data: data }.to_json
  end
end
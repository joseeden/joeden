require_relative "streamable/audio"
require_relative "streamable/video"

class MediaPlayer
  include Streamable
end

player = MediaPlayer.new
puts player.stream_audio("Jazz Classics")
puts player.stream_video("Nature Documentary")

require_relative "media_management/audio"
require_relative "media_management/video"

class MediaPlayer
  include MediaManagement::Audio
  include MediaManagement::Video
end

player_1 = MediaPlayer.new
puts player_1.stream_audio("The Run Experience – Marathon Training Tips")
puts player_1.stream_video("Edge of Tomorrow")


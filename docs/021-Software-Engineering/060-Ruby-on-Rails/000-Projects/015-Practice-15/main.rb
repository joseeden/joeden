require_relative "media_management/audio"
require_relative "media_management/video"

audio_1 = MediaManagement::Audio
video_1 = MediaManagement::Video

puts audio_1.stream("How to Improve Your 10K Running Time")
puts video_1.stream("War of the Worlds")
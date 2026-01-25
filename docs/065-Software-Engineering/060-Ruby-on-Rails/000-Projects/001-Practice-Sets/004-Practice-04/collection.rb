## collection.rb
class Collection
  include Enumerable

  # An array of track names
  attr_reader :tracks

  # Creates a new collection with no tracks
  def initialize
    @tracks = []
  end

  # Adds a track to the collection
  def add_track(track)
    @tracks << track
  end

  # Iterates over each track
  def each
    @tracks.each { |track| yield track }
  end
end
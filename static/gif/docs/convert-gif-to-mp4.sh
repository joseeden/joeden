#!/bin/bash


for gif in *.gif; do
    
# Check if any .gif files exist
    [ -e "$gif" ] || continue
    mp4="video/${gif%.gif}.mp4"
    
    # Convert using ffmpeg
    ffmpeg -y -i "$gif" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "$mp4"
    
    echo "Converted $gif -> $mp4"
done

echo "Conversion completed."

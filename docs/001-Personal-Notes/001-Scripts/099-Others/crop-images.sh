#!/bin/bash

# Check if a directory is provided
if [ -z "$1" ]; then
    echo "Usage: $0 /path/to/images"
    exit 1
fi

IMG_DIR="$1"

# Make sure the directory exists
if [ ! -d "$IMG_DIR" ]; then
    echo "Error: Directory '$IMG_DIR' not found!"
    exit 1
fi

# Loop through images
for img in "$IMG_DIR"/*.jpg "$IMG_DIR"/*.png; do
    [ -e "$img" ] || continue  # Skip if no images

    width=$(identify -format "%w" "$img")
    height=$(identify -format "%h" "$img")

    min_size=$(( width < height ? width : height ))

    # Crop to a centered square, then resize
    mogrify -gravity Center -crop "${min_size}x${min_size}+0+0" +repage "$img"
    mogrify -resize 450x300 "$img"

    echo "Cropped & resized: $img"
done

echo "Done!"

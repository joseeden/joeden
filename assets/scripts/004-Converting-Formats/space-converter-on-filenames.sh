#!/bin/bash

# Loop through all files in the current directory
for file in *
do
  # Check if the file name contains spaces
  if [[ "$file" == *" "* ]]; then
    # Replace the spaces with underscores
    new_file=$(echo "$file" | tr ' ' '_')
    # Rename the file with the new name
    mv "$file" "$new_file"
    echo "Renamed $file to $new_file"
  fi
done

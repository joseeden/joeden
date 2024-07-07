#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

directory="$1"

# Find all files in the specified directory containing <img> tags with src attribute, excluding .sh files
grep -rl '<img .*src=.*>' "$directory" --exclude="*.sh" | while IFS= read -r file; do
    echo 
    echo "Processing File: $file"

    if grep -q '<img .*src=.*>' "$file"; then
        echo "Found lines in file."

        sed -i -E 's|<img( .*width=[^ >]*)? src=[\"\x27]([^\"\x27]+)[\"\x27][^>]*>|![](\2)|g' "$file"

        echo "Successfully updated: $file"
    else
        echo "No lines found in file."
    fi
done


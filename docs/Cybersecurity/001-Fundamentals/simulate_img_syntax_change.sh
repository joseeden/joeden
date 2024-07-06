#!/bin/bash

# Find all files in the current directory containing <img> tags with width and src attributes, excluding .sh files
grep -rl '<img .*width=.* src=.*>' . --exclude="*.sh" | while IFS= read -r file; do
    echo 
    echo "File: $file"

    grep '<img .*width=.* src=.*>' "$file" | while IFS= read -r line; do
        old_line="$line"
        new_line=$(echo "$line" | sed -E 's|<img .*width=.* src=[\"\x27]([^\"\x27]+)[\"\x27].*>|![](\1)|g')
        echo "Old: $old_line"
        echo "New: $new_line"
    done
done

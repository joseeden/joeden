#!/bin/bash

directory="$1"

if [ -z "$directory" ]; then
    echo "Usage: $0 /path/to/directory"
    exit 1
fi

if [ ! -d "$directory" ]; then
    echo "Directory $directory not found."
    exit 1
fi

# Iterate over each .md file in the directory
for file in "$directory"/*.md; do
    if [ -f "$file" ]; then

        # Check if the first line is "---"
        # if yes, then file has been processed already, skip file, go to next.
        first_line=$(head -n 1 "$file")
        if [ "$first_line" = "---" ]; then
            echo "Skipping $file as it already starts with '---'."
            continue
        fi

        # Proceed with metadata insertion
        if [ -z "$first_line" ]; then

            # If first line is empty, replace with "---" and add metadata
            sed -i '1s/^$/---/' "$file"
            sed -i '2s/^# \(.*\)$/title: "\1"\ntags: [Cybersecurity]\nsidebar_position: 1\nlast_update:\n  date: 1\/30\/2024\n---/' "$file"
            echo "Changed headings in $file"
        else

            # If first line is not empty, add metadata assuming existing heading
            sed -i '1s/^/# /' "$file"  # Assuming first line is a heading
            sed -i '2i\
title: "Title Placeholder"\
tags: [Cybersecurity]\
sidebar_position: 1\
last_update:\
  date: 1\/30\/2024\
---' "$file"
            echo "Added metadata to $file"
        fi
    fi
done

echo "All .md files in $directory processed."

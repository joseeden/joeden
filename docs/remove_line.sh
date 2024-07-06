#!/bin/bash

# Define the line to search for
line_to_search="[Back to main page](../../README.md#security)"

# Loop through all files in the current directory
for file in *; do
    # Check if it's a regular file (not a directory or special file)
    if [ -f "$file" ]; then
        # Use awk to find and print the matching line along with the filename
        awk -v line="$line_to_search" -v filename="$file" '$0 == line {print filename ": " $0}' "$file"
    fi
done

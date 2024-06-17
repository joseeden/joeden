

## USAGE 
## chmod +x format-html-image-to-mdx-format.sh
## ./format-html-image-to-mdx-format.sh  /path/to/your/directory



#!/bin/bash

# Check if the file path was provided as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 /path/to/file.md"
    exit 1
fi

# Define the target file from the argument
file="$1"

# Check if the specified file exists
if [ ! -f "$file" ]; then
    echo "File not found: $file"
    exit 2
fi

# Search for image src attributes in <img> tags and generate import statements
matches=$(grep -oP 'src=[ ]*["'\'']?../../img/[^"'\'']+\.(png|jpg|jpeg)["'\'']?' "$file")
pic_number=1

# Initialize the import statements and count
imports=""
count=0

while IFS= read -r match; do
    # Remove quotes from the path for the import statement
    path=$(echo "$match" | sed -E 's/src=[ ]*["'\''"]?([^"'\'' ]+)["'\''"]?/\1/')
    import_name="Pic$(printf "%03d" $pic_number)"
    imports+="import $import_name from '$path';\n"
    pic_number=$((pic_number + 1))
    count=$((count + 1))

    # Correctly adjust pic_number for the replacement and format
    replacement_name="Pic$(printf "%03d" $((pic_number - 1)))"
    # Replace the src attribute without quotes
    sed -i "s|$path|{$replacement_name}|g" "$file"
done <<< "$matches"

# Remove <p>, </p>, and <p align="center">
sed -i 's|<p[^>]*>||g' "$file"
sed -i 's|</p>||g' "$file"

# Transform <img> tag format
# This pattern matches <img width=500 src="{Pic001}">
sed -i -r 's|<img width=([0-9]+) src="([^"]+)"|<img style={{width: \1}} src="\2" />|g' "$file"

# Print the number of photos found and the import statements
echo "Found $count number of photos."
echo -e "$imports"

# Backup the original file
cp "$file" "${file}.bak"

# Find all occurrences of "---" and get their line numbers
separator_lines=$(grep -n "^---$" "$file")

# Extract the line numbers of the "---" separators
line_numbers=($(echo "$separator_lines" | cut -d: -f1))

if [ ${#line_numbers[@]} -lt 2 ]; then
    echo "Error: Not enough '---' separators found. Found only ${#line_numbers[@]}. Exiting."
    exit 3
fi

# Calculate the line number to insert after
insert_after_line=$((line_numbers[1] + 2))

# Insert the imports at the calculated line number
temp_file=$(mktemp)
awk -v insert_line="$insert_after_line" -v imports="$imports" '
NR == insert_line { print imports }
{ print }
' "$file" > "$temp_file"

# Check if temp file was created successfully
if [ ! -s "$temp_file" ]; then
    echo "Error: Temporary file is empty."
    exit 4
fi

# Replace the original file with the modified content
mv "$temp_file" "$file"

echo "Imports added, occurrences replaced, and <img> tags formatted successfully."

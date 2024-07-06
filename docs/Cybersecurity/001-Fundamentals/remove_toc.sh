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

# Remove TOC section between second "---" and first subheading
remove_toc() {
    local file="$1"
    
    # Get line number of second occurrence of "---"
    front_matter_line=$(grep -m 2 -n -- '^---$' "$file" | tail -n 1 | cut -d':' -f1)
    
    # Get line number of first occurrence of "##"
    first_subheading_line=$(grep -m 1 -n "^##" "$file" | cut -d':' -f1)
    
    # If either not found, exit
    if [ -z "$front_matter_line" ] || [ -z "$first_subheading_line" ]; then
        echo "Second front matter or first subheading not found in $file"
        return 1
    fi
    
    # Calculate TOC section lines to remove
    toc_start=$(( front_matter_line + 2 ))
    toc_end=$(( first_subheading_line - 2 ))
    
    # Remove lines between TOC start and end
    if [ "$toc_start" -lt "$toc_end" ]; then
        sed -i "${toc_start},${toc_end}d" "$file"
        echo "Removed TOC section in $file"
    else
        echo "No TOC section found in $file"
    fi
}


for file in "$directory"/*.md; do
    if [ -f "$file" ]; then
        remove_toc "$file"
    fi
done

echo "TOC sections removed from all .md files in $directory."

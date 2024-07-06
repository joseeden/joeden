#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 /path/to-directory"
    exit 1
fi

directory="$1"

if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found."
    exit 1
fi

# Find all Markdown files in the specified directory containing image links
find "$directory" -type f -name "*.md" -exec awk -i inplace '
    {
        while(match($0, /!\[\]\(\.\.\/\.\.\/Images\/([^)]+)\)/, arr)) {
            gsub(/!\[\]\(\.\.\/\.\.\/Images\/([^)]+)\)/, "![](/img/docs/" arr[1] ")", $0);
        }
        print $0;
    }' {} +

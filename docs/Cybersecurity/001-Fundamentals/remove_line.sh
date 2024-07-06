#!/bin/bash

# Search for the line in all files in the specified directory
find "$1" -type f ! -name "create-a-document.md" -exec grep -rl "\[Back to main page\](../../README.md#security)" {} \; | while read -r file; do
    sed -i '/\[Back to main page\](\.\.\/\.\.\/README\.md#security)/d' "$file"
done

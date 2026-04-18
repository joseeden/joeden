#!/bin/bash
# download-icons.sh: Download tool icons and rename them according to _icon-list.txt
# Run this script from the tools-skills directory

set -e

ICON_LIST="_icon-list.txt"
URL_LIST="_download_urls.txt"
ICON_DIR="icons"
mkdir -p "$ICON_DIR"

# Build associative array from _download_urls.txt
declare -A ICON_URLS
while IFS= read -r line; do
  name="${line%% *}"
  url="${line#* }"
  ICON_URLS[$name]="$url"
done < "$URL_LIST"

while IFS= read -r line; do
  # Remove extension for lookup
  name="${line%.*}"
  ext="${line##*.}"
  url="${ICON_URLS[$name]}"
  target_file="$ICON_DIR/$name.$ext"
  svg_file="$ICON_DIR/$name.svg"

  if [[ -z "$url" ]]; then
    echo "No URL found for $name, skipping."
    continue
  fi

  # Skip if target file already exists
  if [[ -f "$target_file" ]]; then
    echo "$target_file already exists, skipping download."
    continue
  fi

  # Download SVG if not present
  if [[ ! -f "$svg_file" ]]; then
    echo "Downloading $name icon..."
    if ! curl -sSL "$url" -o "$svg_file" || [[ ! -s "$svg_file" ]]; then
      echo "Failed to download $name icon or file is empty, skipping."
      rm -f "$svg_file"
      continue
    fi
  else
    echo "$svg_file already exists, skipping download."
  fi

  # Convert to png if requested and convert is available
  if [[ "$ext" == "png" && -x "$(command -v convert)" ]]; then
    if convert "$svg_file" "$target_file"; then
      rm "$svg_file"
    else
      echo "Failed to convert $svg_file to $target_file, skipping."
      rm -f "$target_file"
    fi
  elif [[ "$ext" == "svg" ]]; then
    mv "$svg_file" "$target_file"
  fi
done < "$ICON_LIST"

echo "All icons downloaded."

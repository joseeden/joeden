#!/bin/bash
# Converts input images to one-page PDF files each, without changing image data.
# The image is centered on a A4 page with a 5% border.

# bc function to calculate maximum of two floats
bc_functions="
define max(a,b) {
  if (a>b) {
    return(a)
  } else {
   return(b)
  }
} ";

for file in "$@"; do \
  # Determine image dimensions in pixels.
  img_size_x=$(identify -format "%w" "$file");
  img_size_y=$(identify -format "%h" "$file");

  # Calculate image density (in dpi) needed to fit the image and a 5% 
  # border all around on an A4 page (8.27x11.69"). Factor 1.1 creates 
  # 2*5% borders, see https://unix.stackexchange.com/a/220114 for details.
  min_density_x=$(echo "$img_size_x/8.27*1.1"  | bc -l);
  min_density_y=$(echo "$img_size_y/11.69*1.1" | bc -l);
  # Use the higher density to prevent any dimension exceeding the required fit.
  density=$(echo "$bc_functions max($min_density_x,$min_density_y)" | bc -l);

  # Calculate canvas dimensions in pixels.
  # (Canvas is an A4 page (8.27x11.69") with the calculated density.)
  page_size_x=$(echo  "8.27*$density" | bc -l);
  page_size_y=$(echo "11.69*$density" | bc -l);

  # Center image on a larger canvas (with a size given by "-extent").
  convert "$file" \
    -gravity center -extent ${page_size_x}x${page_size_y} \
    -units PixelsPerInch -density $density \
    -format pdf -compress jpeg \
    "${file/.jpg/.pdf}";
done;

#!/usr/bin/env python3
import sys
from pypdf import PdfReader, PdfWriter

if len(sys.argv) != 3:
    print("Usage: python edit-pdf.py <input.pdf> <pages-to-keep.txt>")
    sys.exit(1)
    
input_pdf = sys.argv[1]
pages_file = sys.argv[2]
output_pdf = f"{input_pdf.rsplit('.', 1)[0]}-updated.pdf"

with open(pages_file, "r") as f:
    content = f.read().strip()

pages_to_keep = []
for part in content.replace(",", " ").split():
    if "-" in part:
        start, end = map(int, part.split("-"))
        pages_to_keep.extend(range(start - 1, end)) 
    else:
        pages_to_keep.append(int(part) - 1)  

reader = PdfReader(input_pdf)
writer = PdfWriter()

for p in pages_to_keep:
    if 0 <= p < len(reader.pages):
        writer.add_page(reader.pages[p])
    else:
        print(f"Warning: page {p+1} out of range, skipped.")

with open(output_pdf, "wb") as f:
    writer.write(f)

separator = "=" * 75

print(separator)
print(f"Created {output_pdf} with {len(pages_to_keep)} pages.")
print(separator)
#!/usr/bin/env python3
import sys
from pypdf import PdfReader, PdfWriter

if len(sys.argv) != 3:
    print("Usage: python remove-pdf-pages.py <input.pdf> <pages-to-delete.txt>")
    sys.exit(1)

input_pdf = sys.argv[1]
pages_file = sys.argv[2]
output_pdf = f"{input_pdf.rsplit('.', 1)[0]}-updated.pdf"

with open(pages_file, "r") as f:
    content = f.read().strip()

pages_to_delete = set()
for part in content.replace(",", " ").split():
    if "-" in part:
        start, end = map(int, part.split("-"))
        pages_to_delete.update(range(start - 1, end))  # zero-indexed
    else:
        pages_to_delete.add(int(part) - 1)

reader = PdfReader(input_pdf)
writer = PdfWriter()

total_pages = len(reader.pages)
deleted_pages = 0

for i in range(total_pages):
    if i not in pages_to_delete:
        writer.add_page(reader.pages[i])
    else:
        deleted_pages += 1

with open(output_pdf, "wb") as f:
    writer.write(f)

updated_page_count = total_pages - deleted_pages
separator = "=" * 75

print(separator)
print(f"Created {output_pdf} with {updated_page_count} pages.")
print(separator)

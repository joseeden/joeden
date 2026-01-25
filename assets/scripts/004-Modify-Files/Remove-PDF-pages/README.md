## Remove Specific Pages in a PDF File

This is a simple script which you can use to remove specific pages in a PDF file.

There are two ways to do this:

1. Specify the pages to keep in the `pages-to-keep.txt`
2. Specify the pages to remove in the `pages-to-delete.txt`

## Requirements

Enable a Python virtual environment first using `virtualenvwrapper`. 
See [Python Virtual Environments](/docs/065-Software-Engineering/020-Python/002-Fundamentals/060-Python-Virtual-Environments.md#using-virtualenvwrapper)

Then install the required packages using pip:

```bash
cd assets/scripts/004-Modify-Files/Remove-PDF-pages/remove-pdf-pages.py
pip install -r requirements.txt 
```

## Based on Pages to Keep 

Specify the pages to retain in the `pages-to-keep.txt`:

```bash
# pages can be specific pages 
# or ranges of pages
1 3-5 7 9-17 19-22 24-25 27-29 
31-36 38 39 41-70 
```

To run the script, use the following command:

```bash
python remove-pdf-pages.py input.pdf pages-to-keep.txt
```

Sample output:

```bash
===========================================================================
Created input-updated.pdf with 61 pages.
===========================================================================
```

## Based on Pages to Delete

Specify the pages to delete in the `pages-to-delete.txt`:

```bash
# pages can be specific pages 
# or ranges of pages
2 6 
8 18
23 26 
30 37 
40
```

Use the following command:

```bash
python delete-specific-pages.py input.pdf pages-to-delete.txt
```

Sample output:

```bash
===========================================================================
Created input-updated.pdf with 61 pages.
===========================================================================
```
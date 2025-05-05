---
title: "File converters"
description: "File converters"
sidebar_position: 1
---


## EPUB to PDF

Easiest way to convert an EPUB to PDF is to download the [Calibre Ebook Management](https://calibre-ebook.com/download). After downloading:

1. Open the EPUB in the app 
2. Select the EPUB --> Convert Books
3. Set the **Output format** to **PDF**

The output file will be saved to you *Calibre Library*, which is at `C:\Users\username\Calibre Library`


## EPUB to PDF (WSL2)

I installed `calibre` on WSL2 on my Windows 10 machine.

```bash
sudo apt-get install -y calibre 
```

Verify:

```bash
calibre --version
```

To convert epub to pdf:

```bash
ebook-convert file.epub file.pdf --enable-heuristics 
```

**Note:** There might be issue on the images, especially the cover or front page of the book after conversion

Other options:

- pandoc: 

    ```bash
    sudo apt install pandoc
    pandoc -f epub -t pdf infile.epub -o outfile.pdf 
    ```

- epub2pdf 

    - Download zip file from [SOFTPEDIA](https://linux.softpedia.com/get/Printing/epub2pdf-54373.shtml)
    - Unzip and make it executable 

        ```bash
        chmod +x ./epub2pdf.sh 
        ```
    - Run the file:

        ```bash
        ./epub2pdf.sh <path-to-epub-file> 
        ```

## File readers 

- [Calibre](https://calibre-ebook.com/download) 
- [Sumatra PDF](https://www.sumatrapdfreader.org/free-pdf-reader) 
- [Okular](https://okular.kde.org/)
- [Adobe Digital Edition](https://www.adobe.com/sg/solutions/ebook/digital-editions/download.html) (Preferred)
- [Aquile Reader](https://www.microsoft.com/store/apps/9P08T4JLTQNK)   
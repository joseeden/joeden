---
title: "File converters"
description: "Security Information and Event Management"
sidebar_position: 1
---


## epub to pdf 

I installed `calibre` on WSL2 on my Windows 10 machine.

```bash
sudo apt-get install -y calibre 
```

To convert epub to pdf:

```bash
ebook-convert file.epub file.pdf --enable-heuristics 
```

Notes:

- There might be issue on th eimages, especially the cover or front page of the book after conversion

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
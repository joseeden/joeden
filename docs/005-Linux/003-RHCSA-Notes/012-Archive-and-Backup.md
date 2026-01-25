---
title: "Archive and Backup"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 12
last_update:
  date: 3/21/2021
---


Archiving and backing up files in Linux is essential for data protection and management. Various tools and commands can help you achieve this, including `tar`, `gzip`, `bzip2`, and `xz`.

## `tar` - Tape Archiver

The `tar` command is used to create archive files and extract them. It can also compress the archives using `gzip`.


Commands: 

- To "compress" the files and print out a verbose output:

    ```bash
    tar -cvf <file.tar> <file-or-dir>
    ```

    where: 
    - `c`: Create a new archive.
    - `v`: Verbose, list files processed.
    - `f`: File name of the archive.


- To compress and zip the files/directories in one command:

    ```bash
    tar czvf <file.tar.gz> <files-or-dir>
    ```

    - `z`: Compress the archive using `gzip`.


- To compress and zip the files/directories, excluding specific files:

    ```bash
    tar cvzf bkup.tar.gz --exclude=file1 <files-or-dir>
    ```


- To compress the `tar` archive using `gzip`:

    ```bash
    gzip <file.tar>
    ```


- To extract the contents of a compressed `tar` file:

    ```bash
    tar xzvf <file.tar.gz>
    ```

- To extract the contents into a specific directory:

    ```bash
    tar xvf <file.tar.gz> -C /tmp/dir2
    ```


- To list the contents of a `tar` file without extracting:

    ```bash
    tar --list -f bkup.tar
    ```

- For a detailed list including permissions and owners:

    ```bash
    tar tvf bkup.tar
    ```

## `gzip`, `bzip2`, `xz`

These commands are used to compress and decompress files. `gzip` is the most common compression utility.


### `gzip`

- To zip a file, note that it replaces the original file with the zipped version:

    ```bash
    gzip <file>
    ```

- To keep the original file, add the `-k` flag:

    ```bash
    gzip -k <file>
    ```

- To unzip a file:

    ```bash
    gunzip <file.gz>
    ```

### `bzip2`

- To compress a file using `bzip2`:

    ```bash
    bzip2 <file>
    ```

### `xz`

- To compress a file using `xz`:

    ```bash
    xz -k <file>
    ```

- To view detailed help for `bzip2`:

    ```bash
    bzip2 --help
    ```

- To compress a file using `bzip2`:

    ```bash
    bzip2 sample.tar
    ```

- To compress a file using `xz` and keep the original file:

    ```bash
    xz -k sample.tar
    ```
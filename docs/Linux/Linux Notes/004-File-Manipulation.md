---
title: File Manipulation
tags: [Linux, Red Hat, Certifications]
sidebar_position: 4
last_update:
  date: 7/8/2022
---


## Streams and Redirects

These are what's displayed in the linux terminal screen. There are 3 types: 

- STDIN   - Standard input
- STDPUT  - Standard output
- STDERR  - Standard error

Display contents to screen:

```bash
echo "Hey!"
```

To redirect stdout to a new file, use ">". Note that this overrides the contents of a file: 

```bash 
cat file1 > new-file
```

To redirect stdout and just append to new file, use ">>". This just adds at the bottom of content: 

```bash
cat file1 >> new-file
```

To redirect echoed message to a file: 

```bash
echo "Hey!" > newfile
```

To append echoed message to a file: 

```bash
echo "How r u?" >> newfile
```

To get the list of files in a dir and direct to a file:

```bash
ls /dir > newfile
```

To redirect error to a file: 

```bash
<command> 2> file1
```

Example: List unknown dir and redirect error to file-err.txt. 

```bash
ls /weird/ 2> file-err.txt
```

If we dont want to log errors, just redirect to null:

```bash
ls /weird/ 2> /dev/null
```

To redirect stdout and stderr at the same time:

```bash
<command> > file-out 2> file-err
```
    
Example: Display an existing file and a non-existing file100.        

```bash
cat file1 file100 > outfile 2> errfile
```

Display contents of file1 and redirect error of file100 to a file:                
    
```bash
cat file1 file100 2> errorfile
```

Display error, and redirect contents of existing file1: 

```bash
cat file1 file100 > file2  
```

Redirect both output to a single file3: 

```bash
cat file1 file100 > file3 2>&1  
```

To prevent overwriting when using ">":                  

```bash
set -o noclobber  
```   

To allow overwriting (default): 

```bash
set +o noclobber
```

To see other options:

```bash
set -o
```  


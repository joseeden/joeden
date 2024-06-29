---
title: Working with Text Files
tags: [Linux, Red Hat, Certifications]
sidebar_position: 3
last_update:
  date: 7/8/2022
---



## File Editors

### The vi editor

Powerful editor, has three modes:

- INSERT MODE (i, allows edit of file)
- EX MODE 
- COMMAND MODE (allows commands, single-letter)

```bash
# enter INSERT mode               I 
# enter EX mode                   :
# escape mode                     ESC 
# Save but dont closing file      :w!
# Close file without saving       :q!
# save and close file             :wq!
# to navigate                     h, left arrow
                                  j, down arrow 
                                  k, up arrow
                                  l, right arrow

# to go to last line of page      shift-l 
# to go to first line of page     shift-h
# to go to last line of file      shift-g
# to go to first line of file     1-shift-g

# to go to line number-9          9-shift-g 

    NOTE: this can be any line no.

# undo recent change              u 
# to delete line of text          dd

# to delete line then switch 
# to insert mode                  cc

# to delete a word then switch    
# to insert mode                  cw
               
# to replace text as we write     R
# to copy a line - "yank"         yy

# to paste above a line           P           
# uppercase

# to paste below a line           p           
# lowercase

# to copy or yank 5 lines         5yy
# to delete 5 lines               5dd
# to search for a "word"          /word
# while searching,go forward      n
# find all and replace            :%s/word1/word2
# replace all occurence           :%s/word1/word2/g

# load contents of "file1"        
# to current file                 :r /dir/file1
```


### The vim

Notes: 

- vim is the default editor, used as embedded editor. 
- vim is enhanced version of vi. 
- To work with vim, you need to manage **command more** and **input mode**.

![](/img/docs/sv-vim-3.png)


Some common vim commands:

```bash 
Esc                 Escape mode
i                   insert mode
a                   append mode
:wq!                force write and quit
:q!                 quit without saving
o                   open a new line
dd                  delete line
yy                  copy or yank line
p                   paste
gg                  go to begining
shift-G             go to last line
/text               find text from position going down
?text               find text from position going up
^                   go to beginning of line
$                   go to end of line
:%s/old/new/        replace first occurence of 'old' with 'new'
:%s/old/new/g       replace all occurence of 'old' with 'new'
```

## Managing Files

### Creating and Deleting Files 

To create a file, there's two options:        

```bash
vi file1
touch file1
```

To edit an existing file: 

```bash
vi file1
nano file1
```

Rename a file: 

```bash
mv <old-name> <new-name>
```

Move file to another directory: 

```bash
mv file1 </new/dir> 
```

Delete a file:

```bash
rm file1
```

Create a copy of a file: 

```bash
cp file1 <file-copy>
```

Copy file to another directory:

```bash
cp file1 </new/dir>
```

Show last 10 lines of a file: 

```bash
tail file1
```

Show last 5 lines:    

```bash
tail -5 file1      
tail -n 5 <file?
```

Show contents of a file (in pages):

```bash
# Press UP/DOWN to move pages 
less file1
```

Show full content of a file:

```bash
cat file1 
```

Show contents of two files:

```bash
cat file1 file2
```


### Create numbered files

This is a neat trick that I saw in one of Sander Vugt's videos.
The command below creates "file1" up to "file15".
It then deletes "file12" to "file14"

```bash
$ touch file{1..15}
$ ll
total 0
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file1
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file10
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file11
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file12
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file13
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file14
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file15
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file2
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file3
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file4
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file5
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file6
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file7
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file8
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file9

$ rm file{12..14}
$ ll
total 0
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file1
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file10
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file11
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file15
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file2
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file3
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file4
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file5
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file6
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file7
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file8
-rw-rw-r--. 1 eden eden 0 Dec 23 23:48 file9
```


### Removing white spaces

To format contents of the file which has weird character spacing:

```bash
fmt -u <filename>
```

### Getting info from files

To get numbered lines:

```bash
nl <filename>
```

Get word count of a file:

```bash
wc file1
```

Get word count of multiple files:

```bash 
wc file1 <file2> ....
``` 

Additional flags:       

```bash
wc -l   # just no. of lines     
wc -w   # just no. of words     
wc -c   # just no. of chars     
```

Output og "wc": 

```bash
$ wc sample.txt
 25 114 647 sample.txt 
```

where:
- 25            number of lines
- 114           number of words
- 647           number of characters
- sample.txt    name of file

Use -l then define no. of lines per split:

```bash
split -l <no.of.lines> <file1>
```

Check difference between 2 files: 

```bash
diff file1 file2
```

Check last time a file was modified:

```bash
date -r file1
```


### When using "less file-name"

```bash
# to go 1 page back                                     b
# to go 1 page forward                                  f
# to go forward 1 line                                  e 
# to go backward 1 line                                 y
# to go to a line number, example, line 20              20
# to search a word, top to bottom                       /word
# to search a word, bottom to top                       ?word
```


## Common Text Tools 

### more, less, head, tail

- **more** was the original file pager.
- **less** was developed to offer more advanced features.
- Use **head** to show the first 10 lines of a text file. 
- Use **tail** to show the last 10 lines of a text file. 
- Use "-n nn" to specify another number of lines

As an example: 

```bash
$ cat sample.txt
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date;
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow’st;
Nor shall death brag thou wander’st in his shade,
When in eternal lines to time thou grow’st:
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee

$ head sample.txt
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date;
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow’st;

$ head -n 3 sample.txt
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,

$ head -n 5 sample.txt
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date;
Sometime too hot the eye of heaven shines,

$ tail sample.txt
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow’st;
Nor shall death brag thou wander’st in his shade,
When in eternal lines to time thou grow’st:
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee

$ tail -n 2 sample.txt
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee

$ tail -n 4 sample.txt
Nor shall death brag thou wander’st in his shade,
When in eternal lines to time thou grow’st:
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee 
```

### cat, tac

- **cat** displays the contents of a text file.
    - Use "-A" to show all non-printable characters.
    - Use "-b" to show number lines 
    - Use "-s" to suppress repeated empty lines 

- **tac** does the same but in reverse order.

example: 

```bash
$ cat -A sample.txt
$
Shall I compare thee to a summerM-bM-^@M-^Ys day?$
Thou art more lovely and more temperate:$
$
$
Rough winds do shake the darling buds of May,$
$
And summerM-bM-^@M-^Ys lease hath all too short a date;$
Sometime too hot the eye of heaven shines,$
And often is his gold complexion dimmM-bM-^@M-^Yd;$
And every fair from fair sometime declines,$
$
$
$
By chance or natureM-bM-^@M-^Ys changing course untrimmM-bM-^@M-^Yd;$
But thy eternal summer shall not fade,$
$
Nor lose possession of that fair thou owM-bM-^@M-^Yst;$
Nor shall death brag thou wanderM-bM-^@M-^Yst in his shade,$
When in eternal lines to time thou growM-bM-^@M-^Yst:$
$
$
$
So long as men can breathe or eyes can see,$
So long lives this, and this gives life to thee$
```
```bash
$ cat -b sample.txt

     1  Shall I compare thee to a summer’s day?
     2  Thou art more lovely and more temperate:


     3  Rough winds do shake the darling buds of May,

     4  And summer’s lease hath all too short a date;
     5  Sometime too hot the eye of heaven shines,
     6  And often is his gold complexion dimm’d;
     7  And every fair from fair sometime declines,



     8  By chance or nature’s changing course untrimm’d;
     9  But thy eternal summer shall not fade,

    10  Nor lose possession of that fair thou ow’st;
    11  Nor shall death brag thou wander’st in his shade,
    12  When in eternal lines to time thou grow’st:



    13  So long as men can breathe or eyes can see,
    14  So long lives this, and this gives life to thee
```
```bash
$ cat -s sample.txt

Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:

Rough winds do shake the darling buds of May,

And summer’s lease hath all too short a date;
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,

By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade,

Nor lose possession of that fair thou ow’st;
Nor shall death brag thou wander’st in his shade,
When in eternal lines to time thou grow’st:

So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee 
```
```bash
$ tac sample.txt
So long lives this, and this gives life to thee
So long as men can breathe or eyes can see,



When in eternal lines to time thou grow’st:
Nor shall death brag thou wander’st in his shade,
Nor lose possession of that fair thou ow’st;

But thy eternal summer shall not fade,
By chance or nature’s changing course untrimm’d;



And every fair from fair sometime declines,
And often is his gold complexion dimm’d;
Sometime too hot the eye of heaven shines,
And summer’s lease hath all too short a date;

Rough winds do shake the darling buds of May,


Thou art more lovely and more temperate:
Shall I compare thee to a summer’s day?
 
```

### cut, sort, tr

- **cut** - filters the output. 
- **sort** - sorts the output 
- **tr** - translates 

## Globbing   

File globbing in Linux is the process of using wildcard characters to match multiple files and directories.

- A shell feature that helps matching filenames. 
- Not the same as regex, which helps find text patterns
- For documentation, see **man 7 glob**

Common Wildcards

1. `*` - Matches zero or more characters.
2. `?` - Matches exactly one character.
3. `[]` - Matches any one of the enclosed characters.
4. `{}` - Matches a comma-separated list of patterns.

### Using `*`

1. **Match all files in a directory:**

   ```bash
   ls *
   ```

2. **Match all files with a `.txt` extension:**

   ```bash
   ls *.txt
   ```

3. **Match all files starting with `log` and ending with any extension:**

   ```bash
   ls log.*
   ```

### Using `?`

1. **Match files with exactly one character followed by `.txt`:**

   ```bash
   ls ?.txt
   ```

2. **Match files starting with `file` followed by any single character:**

   ```bash
   ls file?
   ```

### Using `[]`

1. **Match files starting with either `a`, `b`, or `c` and ending with `.txt`:**

   ```bash
   ls [abc]*.txt
   ```

2. **Match files starting with a digit and ending with `.log`:**

   ```bash
   ls [0-9]*.log
   ```

3. **Match files starting with either `file1`, `file2`, or `file3`:**

   ```bash
   ls file[1-3]
   ```

### Using `{}`

1. **Match files with either `.txt` or `.md` extensions:**

   ```bash
   ls *.{txt,md}
   ```

2. **Match files `file1`, `file2`, and `file3` with `.txt` extension:**

   ```bash
   ls file{1,2,3}.txt
   ```

### Additional Tips

1. **Recursive globbing with `**`:**

   The `**` wildcard can be used for recursive globbing (matching directories and files at any depth). Note that this requires enabling the `globstar` shell option:

   ```bash
   shopt -s globstar
   ls **/*.txt
   ```

2. **Combining patterns:**

   Combine different wildcards for more complex patterns. For example, match files starting with `data` followed by any two characters and ending with `.csv`:

   ```bash
   ls data??.csv
   ```

3. **Excluding patterns:**

   Use `find` or `grep` to exclude certain patterns. For example, to list all `.txt` files but exclude those containing `temp`:

   ```bash
   ls *.txt | grep -v temp
   ```


<!-- ![](/img/docs/sv-globbing.png)

![](/img/docs/sv-globbing-2.png) -->

<!-- Examples:

|list command||
|--|--|
|ls host* | list all files/dir that starts with "host" |
| ls ?ost | list all files/dir that start with any character, followed by  "ost" |
 -->


## rm -rf /

This is a dangerous command which will delete the root directory. This is why if you run this, it will prompt you to add another parameter to ensure that you are certain that you want to run this command.

To test it, I spun up a dummy EC2 instance and run it.

```bash
[eden@ip-172-31-19-144 ~]$ rm -rf /
rm: it is dangerous to operate recursively on `/'
rm: use --no-preserve-root to override this failsafe
[eden@ip-172-31-19-144 ~]$
[eden@ip-172-31-19-144 ~]$ sudo rm -rf / --no-preserve-root
```

It basically delete all commands, thus no command can be used,

```bash
[eden@ip-172-31-19-144 ~]$ ls
-bash: /bin/ls: No such file or directory
[eden@ip-172-31-19-144 ~]$ ll
-bash: /bin/ls: No such file or directory
[eden@ip-172-31-19-144 ~]$ touch test.txt
-bash: touch: command not found
[eden@ip-172-31-19-144 ~]$ cd
-bash: cd: /home/eden: No such file or directory
[eden@ip-172-31-19-144 ~]$ rm bashrc
-bash: /bin/rm: No such file or directory
```




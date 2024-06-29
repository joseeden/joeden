---
title: Working with Text Files
tags: [Linux, Red Hat, Certifications]
sidebar_position: 3
last_update:
  date: 7/8/2022
---


## Create numbered files

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

![](/img/docs/sv-vim-2.png)
![](/img/docs/sv-vim-3.png)


```bash
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

To create a file, there's two options:        

```bash
vi <file>
touch <file>
```

To edit an existing file: 

```bash
vi <file>
nano <file>
```

Rename a file: 

```bash
mv <old-name> <new-name>
```

Move file to another directory: 

```bash
mv <file> </new/dir> 
```

Delete a file:

```bash
rm <file>
```

Create a copy of a file: 

```bash
cp <file> <file-copy>
```

Copy file to another directory:

```bash
cp <file> </new/dir>
```

Show last 10 lines of a file: 

```bash
tail <file>
```

Show last 5 lines:    

```bash
tail -5 <file>      
tail -n 5 <file?
```

Show contents of a file (in pages):

```bash
# Press UP/DOWN to move pages 
less <file>
```

Show full content of a file:

```bash
cat <file> 
```


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


## Common Text Tools 

### more, less, head, tail

Notes: 

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



<!-- 
![](/img/docs/sv-more-less.png)
![](/img/docs/sv-head-tail.png) -->

### cat, tac

Notes: 

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

Notes: 

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

## Removing white spaces

```bash
# to format contents of the file which has weird character spacing
fmt -u <filename>
```



## Getting info from files

```bash
# to get numbered lines   
nl <filename></filename>

# to get specific info like no. of lines       
# to get word count of a file
wc <file>

# multiple files          
wc <file> <file2> ....

# Additional flags:       
    - just no. of lines     wc -l 
    - just no. of words     wc -w 
    - just no. of chars     wc -c

# to split the contents of a file
# use -l then define no. of lines per split
split -l <no.of.lines> <file1>

# to check difference between 2 files
diff <file1> <file2>
```



## When using "less file-name"

```bash
# to go 1 page back                                     b
# to go 1 page forward                                  f
# to go forward 1 line                                  e 
# to go backward 1 line                                 y
# to go to a line number, example, line 20              20
# to search a word, top to bottom                       /word
# to search a word, bottom to top                       ?word

OUTPUT OF "wc": 12 34 56 file1

where:
- 12        number of lines
- 34        number of words
- 56        number of characters
- file1     name of file

OTHERS

# to check last time afile was modified               
date -r <file>

# cat is actually "concatenate", you can use it to display contents of 2 files
cat <file1> <file2>

    example:
    concatenate all files that starts with "Team"
    
    cat team*
```



## Streams and Redirects

These are what's displayed in the linux terminal screen
There are 3 types
- STDIN     Standard input
- STDPUT    Standard output
- STDERR    Standard error

```bash
# to display contents to screen 
echo "Hey!"

# to redirect stdout to a new file, use ">"               
# note: this overrides contents of file
cat file1 > new-file

# to redirect stdout and just append to new file, use ">>"
# note: this just adds at the bottom of content
cat file1 >> new-file

# to redirect echoed message to a file      
echo "Hey!" > newfile

# to append echoed message to a file        
echo "How r u?" >> newfile

# to get the list of files in a dir and direct to a file
ls /dir > newfile

# to redirect error to a file     
<command> 2> file1

    example:
    list unknown dir and redirect error to file-err.txt  
        
        ls /weird/ 2> file-err.txt
    

# if we dont want to log errors, just redirect to null
ls /weird/ 2> /dev/null

# to redirect stdout and stderr at the same time
<command> > file-out 2> file-err
    
    example:
    display an existing file and a non-existing file100            
    
        cat file1 file100 > outfile 2> errfile

    display contents of file1 and redirect error of file100 to a file                          
        
        cat file1 file100 2> errorfile

    display error, and redirect contents of existing file1      
    
        cat file1 file100 > file2

    redirect both output to a single file3

        cat file1 file100 > file3 2>&1

    to prevent overwriting when using ">"                  
        
        set -o noclobber

    to allow overwriting (default)                       
    
        set +o noclobber

    to see other options            
        
        set -o
```



## grep, egrep, and fgrep

![](/img/docs/sv-grep.png)
grep allows matching of patterns

```bash
# to search for "word" in a file  
grep <word> <file>

    example:
    
    to search for words that
    starts with "hello" inside
    the file1                       grep ^hello file1
    
    to search for words that
    ends with "hello" inside
    the file1                       grep hello$ file1

    to search for words that 
    contain "h" inside file1        grep [h] file1

    to search for words that
    contain multiple letters        
    h,z,j,k,l                       grep [hzjkl] file1

    to search for lines that
    starts with any of these 
    letters: h,w,z,y                grep [hwzy] file1

    to disregard casing             grep -i

    to search for characters
    between a to g                  grep [a-g] file1

    to search for characters
    between 3 to 8                  grep [3-8] file1

If we will use a very long pattern, we can  put the pattern 
in a file and reference that file when doing grep

    example:

    "patternfile" contains "[4-6]", 
    to reference file, use -f      grep -f patternfile file1

# to search for files in a dir that contains "word"            
grep -lr word /dir

    example:
    find all files that contain 
    "cron" in /etc                  grep -lr cron /etc

egrep allows extended grep, using extended regex 

    example:

    search file1 for all lines
    that contain "hello" and
    "world"                         egrep "hello.*world" file1
    
    search file1 for all lines
    that contain either
    "hello" or "world"              egrep "hello|world" file1
    
    search file1 for all lines
    that DOES NOT contain either
    "hello" or "world"              egrep -v "hello|world" file1
    
    search file1 for all lines that contain either 
    "hello" or "world" but should not contain "hey"

        egrep "hello|world" file1 | grep -v "hey"

fgrep is similar with grep, except that it literally looks for
the pattern and disregards regex characters

    example:

    search for lines that
    contain "hello$"                fgrep "hello$" file1 
```



## Regex - Regular Expressions
![](/img/docs/sv-regex-1.png)
![](/img/docs/sv-regex-2.png)
![](/img/docs/sv-regex-3.png) 

In this example we have a sample **regtext** file:
```bash
$ cat regtext
bt
bit
bite
boot
bloat
boat
```

Let's try to use regex
```bash
# '.' represents a single character
# here we're looking for a word with 1st char=b and 3rd char=t
# the second character can be any character
$ grep 'b.t' regtext
bit
bite

# '*' means any character
# here we're looking for 'b' followed by any single character, followed by any characters, which is then followed by 't'
$ grep 'b.*t' regtext
bt
bit
bite
boot
bloat
boat

# here we're following for any word that has 'bo', a 't', and any charcter in between them.
$ grep 'bo*t' regtext
bt
boot

# here we're looking for a character/s which may or may not be sandwiched between 'b' and 't'
$ egrep 'b*?t' regtext
bt
bit
bite
boot
bloat
boat
$ egrep 'b.?t' regtext
bt
bit
bite
```



## Cut

Useful if we want to get specific field of a line in a file 

```bash

to get only "users" field in the /etc/passwd file,
we specify the field number (f1) and the character acting
as the delimiter (d:)

# to get only users:
cut -f1 -d: /etc/passwd

# to get only the shells
cut -f7 -d: /etc/passwd

# to get only user, pw, uid, gid, comment 
# here we're telling it to search everything before "/"
# thus everything before the first "/" is field 1
cut -f1 -d/ /etc/passwd
```



## awk
![](/img/docs/sv-awk.png)

awk is a text manipulation tool implementing a powerful scripting language.

example:
Here we're printing only the last field and tailing just the last 10 lines.
```bash
$ awk -F : '{print $NF}' /etc/passwd | tail -10
/sbin/nologin
/sbin/nologin
/bin/bash
```

Other examples:
```bash
# prints lines matching the given pattern
awk '/red/ {print}' colors.txt 

# split each line in columns (whitespace as separator) and prints column 1 and 4
awk '{print $1,$4}' colors.txt 

# prints from line 3 to 6 prefixed with the line number (NR)
awk 'NR==3, NR==6 {print NR,$0}' colors.txt 

 # prints from line 2 to end of file
awk 'NR > 1 {print}' colors.txt
```



## Sed - the Stream Editor

This can be used to find all occurence of a word in a file and 
replicate them with another word or character

```bash
sed "s/word/newword/" file
```

```bash
to preview all changes or replacements         
note: this doesnt really change the file

    sed "s/word/newword/" file

to find, replace and then save changes   

    sed -i "s/word/newword/" file     

to write all changed lines to file2

    sed "s/word/newword/w file2" file

if we dont want to change anything and just find lines
with "word" and save them to another file

    sed "/word/newword/w file3" file

if we dont want the command to return any output to the 
terminal after we save the changes, redirecto stdout 
to /dev/null

    sed "/word/newword/w file3" file > /dev/null

to just search first occurence and then do replacement on 
the first occurence of the word1

    sed "0,/word/s/word/newword/" file1

to just search first occurence and then do replacement on 
the first occurence of the word1, and SAVE CHANGES

    sed -i "0,/word/s/word/newword/" file1
```

Another complex example:

Here we have file100. we want to remove all html tags. We will need to search characters between angle brackets:

```
<...>
```

Here's a sample file:

```bash
# file100 

<html>
<p>
<>
hello world
hello galaxy
hello universe   
```

After search, replace them with space or nothing. then save changes.

```bash
[root@tst-rhel]# sed -i "s/<[^>]*>//" file100
[root@tst-rhel]# cat file100

hello world   
hello galaxy  
hello universe
```

Other examples:

```bash
# changes the first occurrence in each line containing the blue word to red
sed 's/blue/red/' colors.txt 

# changes the second occurrence in each line containing the blue word to red
sed 's/blue/red/2' colors.txt 

# changes all the occurrences containing the blue word to red
sed 's/blue/red/g' colors.txt 

# changes all the occurrences from line number 1 to 3 containing the blue word to red
sed '1,3 s/blue/red/g' colors.txt 

# deletes line number 5
sed '5d' colors.txt 

# deletes from line 12 to last line
sed '12,$d' colors.txt 
```


## Tee
This allows us to return the STDOUT to the terminal and  at the same time redirect STDOUT to a file

```bash

list contents of /home/eden and redirect output to a file

    [root@tst-rhel]# ll
    total 612
    -rw-r--r--. 1 root root    153 Jul 13 13:34 file1
    -rw-r--r--. 1 root root     43 Jul 13 13:51 file100
    -rw-r--r--. 1 root root      1 Jul 13 13:45 file101
    -rw-r--r--. 1 root root 594424 Aug 13  2018 nano-2.9.8-1.el8.x86_64.rpm
    -rw-r-. 1 root root   1786 Jul 13 11:30 sudo.conf
    -r--r-. 1 root root   4361 Jul 13 11:30 sudoers
    -rw-r--r--. 1 root root     37 Jul 13 13:37 xab
    [root@tst-rhel]#
    [root@tst-rhel]# ls | tee outfile
    file1
    file100
    file101
    nano-2.9.8-1.el8.x86_64.rpm
    outfile
    sudo.conf
    sudoers
    xab

Note that the stdout will overwrite the contents of the 
outputfile if its not empty

    [root@tst-rhel]# ll
    total 616
    -rw-r--r--. 1 root root    153 Jul 13 13:34 file1
    -rw-r--r--. 1 root root     43 Jul 13 13:51 file100
    -rw-r--r--. 1 root root      1 Jul 13 13:45 file101
    -rw-r--r--. 1 root root 594424 Aug 13  2018 nano-2.9.8-1.el8.x86_64.rpm
    -rw-r--r--. 1 root root     80 Jul 13 13:57 outfile
    -rw-r-. 1 root root   1786 Jul 13 11:30 sudo.conf
    -r--r-. 1 root root   4361 Jul 13 11:30 sudoers
    -rw-r--r--. 1 root root     37 Jul 13 13:37 xab

to just append the stdout to the outputfile

    ls | tee -a outfile
```



## Format of "/etc/passwd"

```bash
username : x : 123 : 456 : comment : /home/dir : /bin/bash

# username        user's login name
# x               password, shown as "x" because encrypted
# 123             USER ID(UID), custom users will automatically
#                 be assigned with UID in 1000 range
                    0               - root
                    1-99            - reserved
                    100-999         - admin/service accounts
                    1000-onwards    - custom accounts 
# 456             GROUP ID (GID), can be seen in /etc/group
# comment         free-form text
# /home/dir       absolute path of user's home directory
# /bin/bash       user's shell. default is /bin/bash  
```

**FORMAT OF /etc/passwd - REMINDER**

- if user's shell is set to "/sbin/nologin", user will not be able to loginn through SSH. If user tries to login, connection is closed
- if user is currently logged-in when shell is changed to nologin his connection will continue but if he logs out, he wont be log back again


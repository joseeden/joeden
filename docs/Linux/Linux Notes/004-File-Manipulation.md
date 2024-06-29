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


## grep, egrep, and fgrep

The `grep`, `egrep`, and `fgrep` commands are used for searching text using patterns. They differ mainly in the type of pattern matching they support and their default behavior.

### grep 

`grep` is used to search text using basic regular expressions. 

- Global Regular Expression Print
- It prints lines that match a given pattern.

Syntax:

```bash
grep [options] pattern [file...]
```

Examples:

1. Search for the word "hello" in a file:
   ```bash
   grep "hello" filename.txt
   ```

2. Search for lines that start with "hello:
   ```bash
   grep "^hello" filename.txt
   ```

3. Search for lines that end with "world:
   ```bash
   grep "world$" filename.txt
   ```

4. Search recursively in all `.txt` files in a directory:
   ```bash
   grep -r "hello" /path/to/directory/*.txt
   ```

5. Search for words that contain "h" inside a file:

   ```bash
   grep [h] file1.txt
   ```

6. Search for words that contain multiple specific letters inside a file:

   ```bash
   grep [hzjkl] file1.txt
   ```

7. Search for characters between "A" to "G":

   ```bash
   grep [a-g] file1
   ```

7. Search for characters between "3" to "8":

   ```bash
   grep [3-8] file1
   ```
             
8. We can also put the pattern in a file and reference that file when doing grep.
    Example: 

    ```bash
    # patternfile 
    [4-6]
    ```

    To reference file, use "-f":

    ```bash
    grep -f patternfile file1.txt
    ```


### egrep 

`egrep` is equivalent to `grep -E`.

- Extended Global Regular Expression Print
- Used to search text using extended regular expressions.

Syntax: 

```bash
egrep [options] pattern [file...]
```

Examples: 

1. Search for either "cat" or "dog":
   ```bash
   egrep "cat|dog" filename.txt
   ```

2. Search for words starting with "cat" and followed by any number of characters:
   ```bash
   egrep "cat.*" filename.txt
   ```

3. Search for for all lines that contain "hello" and "world":

   ```bash
   egrep "hello.*world" filename.txt
   ```

4. Search for lines containing a digit:
   ```bash
   egrep "[0-9]" filename.txt
   ```

5. Search recursively for lines that contain either "foo" or "bar":
   ```bash
   egrep -r "foo|bar" /path/to/directory
   ```

6. Search for all lines that DOES NOT contain either "hello" or "world":

   ```bash
   egrep -v "hello|world" filename.txt  
   ```
               
7. Search for all lines that contain either "hello" or "world" but should not contain "hey": 

   ```bash
   egrep "hello|world" file1 | grep -v "hey"  
   ```
        



### fgrep

`fgrep` is equivalent to `grep -F`.

- Fixed-string Global Regular Expression Print
- Used to search text using fixed strings (no regular expressions).

Syntax:

```bash
fgrep [options] string [file...]
```

Examples:
 

1. Search for the exact string "hello.world" without interpreting `.` as a wildcard:
   ```bash
   fgrep "hello.world" filename.txt
   ```

2. Search for lines containing the exact phrase "error occurred":
   ```bash
   fgrep "error occurred" filename.txt
   ```

3. Search for lines containing any of the patterns listed in a file:
   ```bash
   fgrep -f patterns.txt filename.txt
   ```


### Common Options

- `-i`: Ignore case.
  ```bash
  grep -i "hello" filename.txt
  ```

- `-v`: Invert match (show lines that do not match the pattern).
  ```bash
  grep -v "hello" filename.txt
  ```

- `-r`: Recursively search directories.
  ```bash
  grep -r "hello" /path/to/directory
  ```

- `-l`: Print only the names of files containing matches.
  ```bash
  grep -l "hello" *.txt
  ```

- `-n`: Print line numbers with output.
  ```bash
  grep -n "hello" filename.txt
  ```

### Combined Use

To search for the pattern "error" in all `.log` files in a directory, ignoring case, and showing line numbers:

```bash
grep -i -n "error" /path/to/directory/*.log
```



## Regex

Regular expressions (regex) are patterns used to match character combinations in strings. They are supported in many programming languages and tools. 

<!-- 
![](/img/docs/sv-regex-1.png)
![](/img/docs/sv-regex-2.png)
![](/img/docs/sv-regex-3.png)  -->


### Basic Syntax

1. **Literal Characters**: 
   - Matches the exact characters.
   - Example: `hello` matches the string "hello".

2. **Dot**: 
   - Matches any single character except newline.
   - Example: `h.llo` matches "hello", "hallo", "hxllo".

   ```bash
   .
   ```

3. **Caret**: 
   - Matches the start of a line.
   - Example: `^hello` matches "hello" at the beginning of a line.

   ```bash
   ^
   ```

4. **Dollar**: 
   - Matches the end of a line.
   - Example: `world$` matches "world" at the end of a line.

   ```bash
   $
   ```

5. **Asterisk**: 
   - Matches zero or more occurrences of the preceding element.
   - Example: `he*llo` matches "hello", "hllo", "heeeello".

   ```bash
   *
   ```

6. **Plus**: 
   - Matches one or more occurrences of the preceding element.
   - Example: `he+llo` matches "hello", "heeeello", but not "hllo".

   ```bash
   +
   ```

7. **Question Mark**: 
   - Matches zero or one occurrence of the preceding element.
   - Example: `he?llo` matches "hello" and "hllo".

   ```bash
   ?
   ```

8. **Braces**: 
   - Matches between `n` and `m` occurrences of the preceding element.
   - Example: `he{2,3}llo` matches "heello" and "heeello".

   ```bash
   ({n,m})
   ```

9. **Brackets**: 
   - Matches any one of the enclosed characters.
   - Example: `h[aeiou]llo` matches "hallo", "hello", "hillo".

   ```bash
   ([]) 
   ```

10. **Parentheses**: 

      - Groups elements together.
      - Example: `(hello|hi)` matches "hello" or "hi".

      ```bash
      (()) 
      ```

11. **Backslash**: 

      - Escapes a special character.
      - Example: `hello\.` matches "hello.".

      ```bash
      (\\)
      ```


### Advanced Syntax

1. **Alternation**: 
   - Matches either the expression before or the expression after.
   - Example: `cat|dog` matches "cat" or "dog".

   ```bash
   (|)
   ```
   
2. **Character Classes**:
   - `\d`: Matches any digit (equivalent to `[0-9]`).
   - `\D`: Matches any non-digit.
   - `\w`: Matches any word character (equivalent to `[a-zA-Z0-9_]`).
   - `\W`: Matches any non-word character.
   - `\s`: Matches any whitespace character.
   - `\S`: Matches any non-whitespace character.

3. **Anchors**:
   - `\b`: Matches a word boundary.
   - `\B`: Matches a non-word boundary.


### Examples

1. **Match a phone number pattern**:
   - Pattern: `\d{3}-\d{3}-\d{4}`
   - Matches: "123-456-7890"

2. **Match an email address**:
   - Pattern: `\w+@\w+\.\w+`
   - Matches: "example@example.com"

3. **Match a URL**:
   - Pattern: `https?://(\w+\.)*\w+`
   - Matches: "http://example.com", "https://example.com"

4. **Match a date (YYYY-MM-DD)**:
   - Pattern: `\d{4}-\d{2}-\d{2}`
   - Matches: "2023-06-30"

5. **Match a word starting with "a" and ending with "e"**:
   - Pattern: `\ba\w*e\b`
   - Matches: "apple", "arise"

### Using Regex with grep

1. **Basic `grep`**:
   ```bash
   grep "pattern" file.txt
   ```

2. **Extended regex with `egrep` or `grep -E`**:
   ```bash
   egrep "pattern" file.txt
   # or
   grep -E "pattern" file.txt
   ```

3. **Case-insensitive search**:
   ```bash
   grep -i "pattern" file.txt
   ```

4. **Recursive search in directories**:
   ```bash
   grep -r "pattern" /path/to/directory
   ```



### Using Regex with sed

`sed` (stream editor) is used for parsing and transforming text using regex.

1. **Substitute pattern in a file**:
   ```bash
   sed 's/oldpattern/newpattern/g' file.txt
   ```

2. **Delete lines matching a pattern**:
   ```bash
   sed '/pattern/d' file.txt
   ```

### Using Regex with awk

`awk` is a powerful text processing language with regex support.

1. **Print lines matching a pattern**:
   ```bash
   awk '/pattern/ {print}' file.txt
   ```

2. **Print specific fields of lines matching a pattern**:
   ```bash
   awk '/pattern/ {print $1, $3}' file.txt
   ```

### More examples

This is a sample **regtext** file:

```bash
$ cat regtext
bt
bit
bite
boot
bloat
boat
```

Search for a word with 1st character as "b" and 3rd character as "t".
The second character can be any character.

```bash
# '.' represents a single character
$ grep 'b.t' regtext
bit
bite
```

Search for 'b' followed by any single character, followed by any characters, which is then followed by 't'.

```bash 
# '*' means any character
$ grep 'b.*t' regtext
bt
bit
bite
boot
bloat
boat
```

Search for any word that has 'bo', a 't', and any character in between them.
```bash 
$ grep 'bo*t' regtext
bt
boot
```

To look for any character/s which may or may not be sandwiched between 'b' and 't':

```bash
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

Useful if we want to get specific field of a line in a file.

As an example, to get only "users" field in the /etc/passwd file, we can specify the field number (f1) and the character acting as the delimiter (d:):

```bash
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

<!-- ![](/img/docs/sv-awk.png) -->

awk is a powerful text manipulation tool used for pattern scanning and processing.

```bash
awk 'pattern { action }' input-file
```

Where: 

- `pattern`: A regular expression or condition that specifies which lines to match.
- `action`: A series of commands to execute on each matched line.
- `input-file`: The file to process. If omitted, `awk` reads from standard input.

### Common Options

- `-F`: Specifies the field separator.
  ```bash
  awk -F':' 'pattern { action }' input-file
  ```

- `-v`: Assigns a variable.
  ```bash
  awk -v var=value 'pattern { action }' input-file
  ```

### Field Variables

- `$0`: The entire current line.
- `$1`, `$2`, ...: The first, second, ..., field in the current line.

### Print Specific Fields

1. Print the first and second fields of each line:
   ```bash
   awk '{ print $1, $2 }' file.txt
   ```

2. Print the first and second fields, using a comma as the field separator:
   ```bash
   awk -F',' '{ print $1, $2 }' file.csv
   ```

### Filtering and Patterns

1. Print lines containing a specific pattern:
   ```bash
   awk '/pattern/ { print }' file.txt
   ```

2. Print lines where the second field is greater than 100:
   ```bash
   awk '$2 > 100 { print }' file.txt
   ```

### Built-in Functions

1. Print the length of the third field:
   ```bash
   awk '{ print length($3) }' file.txt
   ```

2. Calculate the sum of the second field:
   ```bash
   awk '{ sum += $2 } END { print sum }' file.txt
   ```

3. Convert the first field to uppercase:
   ```bash
   awk '{ print toupper($1) }' file.txt
   ```

### Formatting Output

1. Print fields with formatted output:
   ```bash
   awk '{ printf "%-10s %-10s\n", $1, $2 }' file.txt
   ```

2. Add headers to the output:
   ```bash
   awk 'BEGIN { print "Name\tAge" } { print $1, $2 }' file.txt
   ```


### Calculating Averages

Calculate and print the average of the second field:
```bash
awk '{ sum += $2; count++ } END { if (count > 0) print sum / count }' file.txt
```

### Extracting Specific Columns

Extract specific columns from a CSV file and save to another file:
```bash
awk -F',' '{ print $1, $3, $5 }' input.csv > output.txt
```

### Conditional Processing

Print lines where the first field is "John" and the second field is greater than 50:
```bash
awk '$1 == "John" && $2 > 50 { print }' file.txt
```

### Using External Variables

Pass an external variable to `awk`:
```bash
threshold=100
awk -v threshold="$threshold" '$2 > threshold { print }' file.txt
```

### Combining awk with Other Commands

Use `awk` in a pipeline to process the output of another command:
```bash
ls -l | awk '{ print $9, $5 }'
```

Find and process files with `find` and `awk`:
```bash
find /path -type f -name "*.log" -exec awk '/ERROR/ { print FILENAME, $0 }' {} +
```



## Sed

`sed` (stream editor) is a powerful Unix utility for parsing and transforming text in a data stream (typically a file or input from a pipeline).

```bash
sed [options] 'script' input-file
```

Where: 

- `options`: Command-line options to control the behavior of `sed`.
- `script`: A sequence of editing commands.
- `input-file`: The file to process. If omitted, `sed` reads from standard input.

### Common Options

- `-e script`: Adds the script to the commands to be executed.
- `-f script-file`: Adds the contents of script-file to the commands to be executed.
- `-n`: Suppresses automatic printing of pattern space.
- `-i[SUFFIX]`: Edits files in-place (optionally creating a backup with the given suffix).

### Basic Commands

- `s/pattern/replacement/flags`: Substitutes `replacement` for `pattern`.
  - `g`: Global replacement.
  - `p`: Print the result.
  - `i`: Ignore case.
  - `n`: Replace the nth occurrence.

- `d`: Deletes lines matching the pattern.

- `p`: Prints lines matching the pattern.


### Substitution

1. Replace the first occurrence of "apple" with "orange" in each line:
   ```bash
   sed 's/apple/orange/' file.txt
   ```

2. Replace all occurrences of "apple" with "orange" in each line:
   ```bash
   sed 's/apple/orange/g' file.txt
   ```

3. Replace "apple" with "orange" only on lines containing "fruit":
   ```bash
   sed '/fruit/s/apple/orange/' file.txt
   ```

4. Replace "apple" with "orange" ignoring case:
   ```bash
   sed 's/apple/orange/I' file.txt
   ```

### Deletion

1. Delete lines containing "apple":
   ```bash
   sed '/apple/d' file.txt
   ```

2. Delete the first line of the file:
   ```bash
   sed '1d' file.txt
   ```

3. Delete lines from 2 to 4:
   ```bash
   sed '2,4d' file.txt
   ```

### Printing

1. Print lines containing "apple":
   ```bash
   sed -n '/apple/p' file.txt
   ```

2. Print the first line of the file:
   ```bash
   sed -n '1p' file.txt
   ```

3. Print lines from 2 to 4:
   ```bash
   sed -n '2,4p' file.txt
   ```

### In-place Editing

1. Replace "apple" with "orange" in-place (modify the original file):
   ```bash
   sed -i 's/apple/orange/g' file.txt
   ```

2. Replace "apple" with "orange" in-place, creating a backup with a `.bak` extension:
   ```bash
   sed -i.bak 's/apple/orange/g' file.txt
   ```

### Multiple Commands

1. Delete lines 1 to 3 and replace "apple" with "orange":
   ```bash
   sed '1,3d; s/apple/orange/g' file.txt
   ```

2. Replace "apple" with "orange" and "banana" with "grape":
   ```bash
   sed 's/apple/orange/g; s/banana/grape/g' file.txt
   ```

### Using a Script File

1. Create a `sed` script file (script.sed) with multiple commands:
   ```bash
   # script.sed
   1,3d
   s/apple/orange/g
   s/banana/grape/g
   ```

2. Run `sed` with the script file:
   ```bash
   sed -f script.sed file.txt
   ```

### Extracting Data

1. Extract lines between patterns:
   ```bash
   sed -n '/START/,/END/p' file.txt
   ```

2. Extract the first 10 lines of a file:
   ```bash
   sed -n '1,10p' file.txt
   ```

### Combining sed with Other Commands

1. Use `sed` in a pipeline to process the output of another command:
   ```bash
   ls -l | sed 's/^/Line: /'
   ```

2. Find and replace text in multiple files:
   ```bash
   find /path -type f -name "*.txt" -exec sed -i 's/apple/orange/g' {} +
   ```

### More example

We want to remove all html tags file.txt. Here's a sample file:

```bash
# file.txt

<html>
<p>
<>
hello world
hello galaxy
hello universe   
```


We will need to search characters between angle brackets:

```
<...>
```

After search, replace them with space or nothing. then save changes.

```bash
[root@tst-rhel]# sed -i "s/<[^>]*>//" file.txt
[root@tst-rhel]# cat file.txt

hello world   
hello galaxy  
hello universe
```




## Tee

`Tee` reads from standard input and writes to standard output and one or more files simultaneously. This is useful for logging or capturing command output while still displaying it on the terminal.


```bash
command | tee [options] file(s)
```

Where: 

- `command`: The command whose output you want to capture.
- `file(s)`: One or more files to which the output should be written.

### Common Options

- `-a`, `--append`: Append the output to the files, rather than overwriting them.
- `-i`, `--ignore-interrupts`: Ignore interrupt signals.


### Basic Usage

1. Write the output of `ls` to a file:
   ```bash
   ls | tee output.txt
   ```

   This command lists the contents of the current directory and writes the output to `output.txt` while also displaying it on the terminal.

2. Write the output of `ls` to multiple files:
   ```bash
   ls | tee output1.txt output2.txt
   ```

   This command lists the directory contents and writes the output to both `output1.txt` and `output2.txt`.

### Append to Files

1. Append the output of `ls` to a file:
   ```bash
   ls | tee -a output.txt
   ```

   This command lists the directory contents and appends the output to `output.txt`.

### Ignoring Interrupts

1. Ignore interrupt signals:
   ```bash
   command | tee -i output.txt
   ```

   This command will run `command`, writing the output to `output.txt` and ignoring interrupt signals (e.g., `Ctrl+C`).

### Combining tee with Other Commands

1. Capture the output of a pipeline:
   ```bash
   ps aux | grep httpd | tee processes.txt
   ```

   This command captures the output of `ps aux | grep httpd` and writes it to `processes.txt`.

2. Use `tee` in a script to log output:
   ```bash
   #!/bin/bash
   echo "Starting script..."
   command1 | tee command1.log
   command2 | tee command2.log
   echo "Script completed."
   ```

### Redirecting stout and sterr

1. Capture both standard output and standard error:
   ```bash
   command 2>&1 | tee output.txt
   ```

### Practical Use Cases 

1. This command continuously monitors the system log and writes the output to `syslog_monitor.log` while displaying it on the terminal.

   ```bash
   tail -f /var/log/syslog | tee syslog_monitor.log
   ```

2. This command copies the configuration file and logs the backup operation to `backup.log`.
   ```bash
   cp /etc/config.conf /etc/config.conf.bak | tee backup.log
   ```

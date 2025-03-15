---
title: Grep, Regex, and Cut
tags: [Linux, Red Hat, Certifications]
sidebar_position: 4
last_update:
  date: 3/21/2021
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



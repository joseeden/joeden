---
title: Awk, Sed, and Tee
tags: [Linux, Red Hat, Certifications]
sidebar_position: 5
last_update:
  date: 7/8/2022
---


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

### Advanced Examples 

1. Calculate and print the average of the second field:

   ```bash
   awk '{ sum += $2; count++ } END { if (count > 0) print sum / count }' file.txt
   ```

2. Extract specific columns from a CSV file and save to another file:

   ```bash
   awk -F',' '{ print $1, $3, $5 }' input.csv > output.txt
   ```

3. Print lines where the first field is "John" and the second field is greater than 50:

   ```bash
   awk '$1 == "John" && $2 > 50 { print }' file.txt
   ```

4. Pass an external variable to `awk`:

   ```bash
   threshold=100
   awk -v threshold="$threshold" '$2 > threshold { print }' file.txt
   ```

### Combining awk with other commands 

1. Use `awk` to process the output of another command:

   ```bash
   ls -l | awk '{ print $9, $5 }'
   ```

2. Find and process files with `find` and `awk`:

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

### Examples

1. Append the output of `ls` to a file:

   ```bash
   ls | tee -a output.txt
   ```

2. Run the command while ignoring interrupt signals (e.g., `Ctrl+C`):

   ```bash
   command | tee -i output.txt
   ```

3. Capture both standard output and standard error:

   ```bash
   command 2>&1 | tee output.txt
   ```


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

### Practical Use Cases 

1. This command continuously monitors the system log and writes the output to `syslog_monitor.log` while displaying it on the terminal.

   ```bash
   tail -f /var/log/syslog | tee syslog_monitor.log
   ```

2. This command copies the configuration file and logs the backup operation to `backup.log`.
   ```bash
   cp /etc/config.conf /etc/config.conf.bak | tee backup.log
   ```

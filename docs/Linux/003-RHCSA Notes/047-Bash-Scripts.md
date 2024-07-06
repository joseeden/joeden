---
title: "Bash Scripts"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 47
last_update:
  date: 7/8/2022
---

Bash scripts automate tasks by executing commands in a specific order, making them powerful tools for automating repetitive tasks, managing system configurations, and performing complex operations efficiently in Unix-like operating systems.

- A shells cript can be as simple as a number of commands sequentially executed. 
- Scripts normally work with variables to make them react differently in different environments. 
- A shell will always be available to interpret code from shell scripts. 
- If the scripts use internal commands only, they're very fast as nothing needs to be loaded. 
- There is no need to compile anything 
- There are no modules to be used in the bash script, which makes them rather static.
- Bash shell scripts are not idempotent.
- Conditional statements such as `for`, `if`, `case`, and `while` can be used. 


## Essential Shell Script Components

Scripts will normally have ".sh" format and begins with `#!/bin/bash`. After creating script, make sure to grant execute-permission. If it's not *executable*, you will get a **permission denied** error. Here's a sample script.

<details>
  <summary> script.sh </summary>
  
```bash
#!/bin/bash

echo "Line 1"
echo "Line 2"
echo "Line 3"
```

</details>

```bash
[root@tstsvr ~]# ll
total 20
-rw-------. 1 root root 7194 May  4  2021 anaconda-ks.cfg
-rw-------. 1 root root 6940 May  4  2021 original-ks.cfg
-rw-r--r--. 1 root root   55 Jan  7 11:56 script.sh
```
```bash
[root@tstsvr ~]# ./script.sh
-bash: ./script.sh: Permission denied
```

We need to give it an execute-permission.

```bash
[root@tstsvr ~]# chmod +x script.sh
[root@tstsvr ~]# ll
total 20
-rw-------. 1 root root 7194 May  4  2021 anaconda-ks.cfg
-rw-------. 1 root root 6940 May  4  2021 original-ks.cfg
-rwxr-xr-x. 1 root root   55 Jan  7 11:56 script.sh

[root@tstsvr ~]# chmod 755 script.sh
[root@tstsvr ~]# ll
total 20
-rw-------. 1 root root 7194 May  4  2021 anaconda-ks.cfg
-rw-------. 1 root root 6940 May  4  2021 original-ks.cfg
-rwxr-xr-x. 1 root root   55 Jan  7 11:56 script.sh
```

Now if we try to run it,

```bash
[root@tstsvr ~]# ./script.sh
Line 1
Line 2
Line 3
```

Note that you need the `./` in front of the script to tell the system to runt he script from the current directory. If this is not added, then the system will try look for script from the directories that are defined in the **PATH** variable.

```bash
[root@tstsvr ~]# script.sh
-bash: script.sh: command not found

[root@tstsvr ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

[root@tstsvr ~]# pwd
/root
```

We can also put the script in a directory that's included on the **PATH** variable.

## Scripts run on a "subshell"

Here's another script. Notice that it starts with `#!/bin/bash`. This means this script will always be interpreted by bash shell.

<details>
  <summary> anotherscript.sh </summary>
  
```bash
#!/bin/bash

# sample comment.
# any lines that start with '#" or hash is a comment
# and is not interpreted when script is ran.
# Note that this doesn't apply to the first line, where the !/bin/bash is defined.
# lines that doesn't start with '#' are itnerpreted, like the lines below.

# The line below just prints a divider
echo '*****************************************************'

# The first line below jsut prints out a message
echo 'Which directory do you want to activate?'

# The line below will read the user input until user presses enter.
# Input is then stored in a variable 'DIR'
read DIR

# The line below just prints a divider
echo '*****************************************************'

# The line below will 'change directory' to the directory defined in the
# DIR variable.
cd $DIR

# Lastly, the lines below displays the current directory and it scontents
pwd
ls
```

</details>

Make it executable: 

```bash
[root@tstsvr ~]# chmod +x anotherscript.sh
[root@tstsvr ~]# ll
total 24
-rw-------. 1 root root 7194 May  4  2021 anaconda-ks.cfg
-rwxr-xr-x. 1 root root  691 Jan  7 12:11 anotherscript.sh
-rw-------. 1 root root 6940 May  4  2021 original-ks.cfg
-rwxr-xr-x. 1 root root   55 Jan  7 11:56 script.sh
```

Try running the script now. Notice that when script is run, it enters the specified directory.  The script runs in its own *subshell*. When it's done, it exits onto the the parent shell. The subshell is like its own environment that exists only during the execution of the script.

```bash
[root@tstsvr ~]# ./anotherscript.sh
*****************************************************
Which directory do you want to activate?
/tmp
*****************************************************
/tmp
systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SNBAPh
```

If you want to keep the directory, then you need to **source** the directory. This means script is not executed as a subshell, but is run on the current shell.

## Sourcing the script

When you "source" a script in Bash, you execute the script within the current shell session. This means any changes to environment variables, functions, or aliases made by the script will persist after the script finishes executing. Sourcing is particularly useful for configuring your shell environment or loading utility functions that you want to use interactively in your terminal session.

We can source a script in two ways:

1. source script-name.sh
2. . script-name.sh

Example: 
  
```bash
[root@tstsvr ~]# . anotherscript.sh
*****************************************************
Which directory do you want to activate?
/mnt
*****************************************************
/mnt
nfs_shares
[root@tstsvr mnt]# pwd
/mnt
[root@tstsvr mnt]# ll
total 0
drwxrwxrwx. 2 root root 6 Jan  6 17:23 nfs_shares
```
```bash
[root@tstsvr ~]# source anotherscript.sh
*****************************************************
Which directory do you want to activate?
/tmp
*****************************************************
/tmp
systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SNBAPh
[root@tstsvr tmp]#
[root@tstsvr tmp]# pwd
/tmp
[root@tstsvr tmp]# ll
total 0
drwx------. 3 root root 17 Jan  6 17:15 systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SNBAPh
[root@tstsvr tmp]#
```

## Run the script in the background

Running a script in the background allows it to execute independently of the current shell session, freeing up your terminal for other tasks. This is useful for running long-running processes or scripts that do not require immediate interaction. When a script runs in the background, it continues to execute while allowing you to continue working interactively in your shell.

```bash
./anotherscript.sh &
```

## Loops in Shell scripts

Loops in shell scripts are control structures that iterate over a set of instructions repeatedly until a specific condition is met. They are fundamental for automating repetitive tasks and processing data efficiently in Bash and other shell environments. Shell scripts support various types of loops, such as `for` loops and `while` loops, providing flexibility in how tasks are repeated and managed within scripts.

Here a second script. We'll grant it execute-permission and then run it.

<details>
  <summary> secondscript.sh </summary>
    

```bash
#!/bin/bash

# The '-z' statement inside square brackets is called test command.
# To learn for other test options, see 'man page'

# The if condition checks if user provided an argument or a string.

# If user didn't provide one, it will enter the loop and prompt a message.
# After the prompt, there's an exit code.
# There are two common exit codes:
#       0 - successful
#       1 - failed
# In this case, its exit code 6.

# We then close the if-loop with 'fi'
if [ -z $1 ]
then
        echo 'Please provide an argument'
        exit 6
fi

# Lastly the argument is printed out.
echo the argument is $1
```

</details>

```bash
[root@tstsvr ~]# chmod +x secondscript.sh
[root@tstsvr ~]# ll
total 28
-rw-------. 1 root root 7194 May  4  2021 anaconda-ks.cfg
-rwxr-xr-x. 1 root root  892 Jan  7 12:16 anotherscript.sh
-rw-------. 1 root root 6940 May  4  2021 original-ks.cfg
-rwxr-xr-x. 1 root root   55 Jan  7 11:56 script.sh
-rwxr-xr-x. 1 root root  584 Jan  7 12:38 secondscript.sh
```

Now we run.
```bash
[root@tstsvr ~]# ./secondscript.sh
Please provide an argument
[root@tstsvr ~]#
[root@tstsvr ~]# ./secondscript.sh what
the argument is what
[root@tstsvr ~]#
[root@tstsvr ~]# ./secondscript.sh okaygotit
the argument is okaygotit
[root@tstsvr ~]#
[root@tstsvr ~]# ./secondscript.sh okay got it
the argument is okay
```

We could also rewrite the script to a if-else.

<details>
  <summary> secondscript.sh </summary>
    
```bash
#!/bin/bash

if [ -z $1 ]
then
        echo 'Please provide an argument'
        exit 6
else
        # Lastly the argument is printed out.
        echo the argument is $1
fi
```

</details>
    
Run:

```bash
[root@tstsvr ~]# ./secondscript.sh again?
the argument is again?
[root@tstsvr ~]#
[root@tstsvr ~]# ./secondscript.sh
Please provide an argument
```

## Countdown script 

This is a script functions as a countdown timer, starting from a specified number of seconds and counting down to zero. After reaching zero, it continues to indicate how many seconds have passed beyond the initial countdown.


<details>
  <summary> countdown.sh </summary>

```bash
#!/bin/bash

# This is the argument passed. This is time, in seconds.
timer=$1
# If we want entered time to be in hour, uncomment line below.
# timer=$(( timer * 60 ))

minusone()
{
        timer=$(( timer - 1 ))
        sleep 1
}


while [ $timer -gt 0 ]
do
        echo 'you have $timer seconds left'
        minusone
done

[ $timer = 0 ] && echo 'time is up' && minusone
[ $timer = '-1' ] && echo 'you are one second late' && minusone

while true
do
        echo you are now ${timer#-} seconds late
        minusone
done
```

</details>


Run the script and specify the number of seconds. The script will then display a countdown. To exit the script, press Ctrl-C.


```bash
[root@tstsvr ~]# chmod +x countdown.sh
[root@tstsvr ~]# ll countdown.sh
-rwxr-xr-x. 1 root root 2024 Jan  7 14:20 countdown.sh
```
```bash
[root@tstsvr ~]# ./countdown.sh 3
you have 3 seconds left
you have 2 seconds left
you have 1 seconds left
time is up
you are one second late
you are now 2 seconds late
you are now 3 seconds late
you are now 4 seconds late
you are now 5 seconds late
you are now 6 seconds late
you are now 7 seconds late
you are now 8 seconds late
you are now 9 seconds late
you are now 10 seconds late
^C
[root@tstsvr ~]#
```

Here is another version of the script that has explanations:

<details>
  <summary> countdown.sh </summary>

```bash
#!/bin/bash

# This is the argument passed. This is time, in seconds.
timer=$1

# If we want entered time to be in hour, uncomment line below.
# timer=$(( timer * 60 ))

# This is a function, which is also just a set command you define within a script.
# The usecase of a function is that you can just define it one,
# and then run it as many time as you can inside the script.
# The name of function is minusone.
# This function just decrease the timer by 1 seconds and sleep by 1 second.
minusone()
{
        timer=$(( timer - 1 ))
        sleep 1
}

# Here we're  checking if the timer is greater than zero using the test command.
# If it is, then there's 'still time left' and it prompts with the message.
# After it prompts message, we see the function 'minusone' being called for the first time.
# This whil loop continues until countdown reaches zero, in which case it exits the loop.
while [ $timer -gt 0 ]
do
        echo you have $timer seconds left
        minusone
done

# As additional test to see if counter is indeed at '0', we add another logical operation.
# Below is similar to an IF-ELSE statement.
# The test command in the brackets is the IF,
# then the '&&' is th else.
# If the test statement in the bracket returns true, then the command after '&&' is executed.
# If the test returned false, then second command is not executed.
# First lline below checks if timer is at zero, and if it is, continues subtracting by 1
[ $timer = 0 ] && echo 'time is up' && minusone
[ $timer = '-1' ] && echo 'you are one second late' && minusone
# Note that the test above returns a '-2'
# This is then passed on to the while loop below.

# In another while loop below, we're prompting user with how manys seconds he's late.
# 'while true' means as long as TRUE is TRUE, it prints the message.
# The 'COUNTER#-' is pattern-matching.
# Remember that at this point, timer=-2.
# To remove the negative sign, we use '#-' which turns the negative value to positive.
while true
do
        echo you are now ${timer#-} seconds late
        minusone
done
```

</details>


## Remove specific line on files 

I used this script to remove a specific line on all files in the currect directory:

```bash
[Back to main page](../../README.md#security) 
```

**Usage:**

```bash
./remove_line.sh /path/to-directory
```
```bash
## If current directory 
./remove_line.sh . 
```     

**Output:** 

```bash
Removing "[Back to main page](../../README.md#security)" line in ./002-Security-Principles.md
Removing "[Back to main page](../../README.md#security)" line in ./003-Risk-Management.md
Removing "[Back to main page](../../README.md#security)" line in ./004-Security-Controls.md
Removing "[Back to main page](../../README.md#security)" line in ./005-Governance-Elements.md
Removing "[Back to main page](../../README.md#security)" line in ./006-Incident-Responses.md
Removing "[Back to main page](../../README.md#security)" line in ./007-Business-Continuity.md
Removing "[Back to main page](../../README.md#security)" line in ./008-Disaster-recovery.md
```


**Script:**

<details>
  <summary> remove_line.sh </summary>

```bash
#!/bin/bash

# Search for the line in all files in the specified directory
find "$1" -type f ! -name "create-a-document.md" -exec grep -rl "\[Back to main page\](../../README.md#security)" {} \; | while read -r file; do
    sed -i '/\[Back to main page\](\.\.\/\.\.\/README\.md#security)/d' "$file"
done
```

</details>



## Change headings to front matter 

I used this when I was migrating all my docs to Docusaurus. All docs starts with a title heading at the top of the file. Example:

```
# This is the title heading  
```

I wanted to replace the title heading  with a front matter:

```bash
---
title: "This is the title heading"
tags: [Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
--- 
```

**Usage:** 

```bash
./change_headings.sh /path/to-directory
```
```bash
## If current directory 
./change_headings.sh . 
```  

**Output:**

```bash
Changed headings in ./001-Terminologies.md
Changed headings in ./002-Security-Principles.md
Changed headings in ./003-Risk-Management.md
Skipping ./004-Security-Controls.md as it already starts with '---'.
Changed headings in ./005-Governance-Elements.md 
Changed headings in ./006-Incident-Responses.md
Changed headings in ./007-Business-Continuity.md
Skipping ./008-Disaster-recovery.md as it already starts with '---'.
```

If the file already has a frontmatter, it will skip the file.

**Script:**

<details>
  <summary> change_headings.sh </summary>

```bash
#!/bin/bash

directory="$1"

if [ -z "$directory" ]; then
    echo "**Usage:** $0 /path/to/directory"
    exit 1
fi

if [ ! -d "$directory" ]; then
    echo "Directory $directory not found."
    exit 1
fi

# Iterate over each .md file in the directory
for file in "$directory"/*.md; do
    if [ -f "$file" ]; then

        # Check if the first line is "---"
        # if yes, then file has been processed already, skip file, go to next.
        first_line=$(head -n 1 "$file")
        if [ "$first_line" = "---" ]; then
            echo "Skipping $file as it already starts with '---'."
            continue
        fi

        # Proceed with metadata insertion
        if [ -z "$first_line" ]; then

            # If first line is empty, replace with "---" and add metadata
            sed -i '1s/^$/---/' "$file"
            sed -i '2s/^# \(.*\)$/title: "\1"\ntags: [Cybersecurity]\nsidebar_position: 1\nlast_update:\n  date: 1\/30\/2024\n---/' "$file"
            echo "Changed headings in $file"
        else

            # If first line is not empty, add metadata assuming existing heading
            sed -i '1s/^/# /' "$file"  # Assuming first line is a heading
            sed -i '2i\
title: "Title Placeholder"\
tags: [Cybersecurity]\
sidebar_position: 1\
last_update:\
  date: 1\/30\/2024\
---' "$file"
            echo "Added metadata to $file"
        fi
    fi
done

echo "All .md files in $directory processed."
```

</details>


## Remove TOC 

I used this when I was migrating all my docs to Docusaurus. All docs starts with a front matter section, followed by the table of contents (TOC) section, then the first subheading. Example:

```bash
---
title: "Indicators of Compromise"
tags: [Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
---

- [Account Lockouts](#account-lockouts)
- [Concurrent Session Utilization](#concurrent-session-utilization)
- [Blocked Content](#blocked-content)
- [Impossible Travel](#impossible-travel)
- [Resource Consumption](#resource-consumption)
- [Resource Inaccessibility](#resource-inaccessibility)
- [Out-of-Cycle Logging](#out-of-cycle-logging)
- [Missing Logs](#missing-logs)
- [Published or Documented Attacks](#published-or-documented-attacks)


## Account Lockouts
```

How the script works:

- It tries to find the end of the front matter section, which is delimited by the second "---".
- It determines the line number of the second "---". Example: line 7
- It then adds 2 to the line number (7+2), then saves it to a variable. Example: toc_start=9
- It tries to find the first subheading, which is the first occurence of "##"
- It determines the line number of the first "##". Example: line 39
- It then substract 2 to the line number (39-2), then saves to variable. Example toc_end=37
- It now determines that the TOC section is from lines 9 to 37. 
- It proceeds this lines.

**Usage:** 

```bash
remove_toc.sh /path/to-directory
```
```bash
## If current directory 
remove_toc.sh . 
```  

**Output:**

```bash
Removed TOC section in ./001-Terminologies.md
Removed TOC section in ./002-Security-Principles.md
Removed TOC section in ./003-Risk-Management.md
Second front matter or first subheading not found in ./004-Security-Controls.md
Removed TOC section in ./005-Governance-Elements.md 
Removed TOC section in ./006-Incident-Responses.md
No TOC section found in  ./008-Disaster-recovery.md
Removed TOC section in ./007-Business-Continuity.md
```

**Script:**

<details>
  <summary> remove_toc.sh </summary>

```bash
#!/bin/bash

directory="$1"

if [ -z "$directory" ]; then
    echo "**Usage:** $0 /path/to/directory"
    exit 1
fi

if [ ! -d "$directory" ]; then
    echo "Directory $directory not found."
    exit 1
fi

# Remove TOC section between second "---" and first subheading
remove_toc() {
    local file="$1"
    
    # Get line number of second occurrence of "---"
    front_matter_line=$(grep -m 2 -n -- '^---$' "$file" | tail -n 1 | cut -d':' -f1)
    
    # Get line number of first occurrence of "##"
    first_subheading_line=$(grep -m 1 -n "^##" "$file" | cut -d':' -f1)
    
    # If either not found, exit
    if [ -z "$front_matter_line" ] || [ -z "$first_subheading_line" ]; then
        echo "Second front matter or first subheading not found in $file"
        return 1
    fi
    
    # Calculate TOC section lines to remove
    toc_start=$(( front_matter_line + 2 ))
    toc_end=$(( first_subheading_line - 2 ))
    
    # Remove lines between TOC start and end
    if [ "$toc_start" -lt "$toc_end" ]; then
        sed -i "${toc_start},${toc_end}d" "$file"
        echo "Removed TOC section in $file"
    else
        echo "No TOC section found in $file"
    fi
}


for file in "$directory"/*.md; do
    if [ -f "$file" ]; then
        remove_toc "$file"
    fi
done

echo "TOC sections removed from all .md files in $directory." 
```

</details>


## Simulate image syntax change 

I used this when I was migrating all my docs to Docusaurus. Some docs have images embedded in the following way:

```bash
<img width=500 src='../../Images/sec+-relaying-the-attack.png'> 
```

or:

```bash
<img src='../../Images/sec+-relaying-the-attack.png'>  
```

Before changing anything, I just wanted to simulate how it would look like if syntax is changed to: 

```bash
![](../../Images/sec+-relaying-the-attack.png) 
```

As such, this script will just print the expected syntax change but will not modify the file. 

**Usage:**

```bash
./simulate_img_syntax_change.sh /path/to-directory
```
```bash
## If current directory 
./simulate_img_syntax_change.sh . 
```  

**Output:**

```bash
File: ./048-Logging-Data.md
Old: <img width=600  src='../../Images/sec+-rsyslog-on-central-server.png'>
New: ![](../../Images/sec+-rsyslog-on-central-server.png)

File: ./053-Security-Techniques.md
Old: <img width=600 src='../../Images/sec+-wap-ess-configuration.png'>
New: ![](../../Images/sec+-wap-ess-configuration.png)
Old:     <img width=750 src='../../Images/sec+-adjacent-channel-interference-diagram.png'>
New:     ![](../../Images/sec+-adjacent-channel-interference-diagram.png)
```

**Script:**

<details>
  <summary> simulate_img_syntax_change.sh </summary>

```bash
#!/bin/bash

# Find all files in the current directory containing <img> tags with width and src attributes, excluding .sh files
grep -rl '<img .*width=.* src=.*>' . --exclude="*.sh" | while IFS= read -r file; do
    echo 
    echo "File: $file"

    grep '<img .*width=.* src=.*>' "$file" | while IFS= read -r line; do
        old_line="$line"
        new_line=$(echo "$line" | sed -E 's|<img .*width=.* src=[\"\x27]([^\"\x27]+)[\"\x27].*>|![](\1)|g')
        echo "Old: $old_line"
        echo "New: $new_line"
    done
done
```

</details>


## Apply first image syntax change 

This applies the change done in the previous simulation script (see above).

**Usage:**

```bash
./change_img_syntax_1.sh /path/to-directory
```
```bash
## If current directory 
./change_img_syntax_1.sh . 
```  

**Output:**

```bash
Processing File: ./003-Risk-Management.md
Found lines in file.
Successfully updated: ./003-Risk-Management.md

Processing File: ./016-Computer-Networking.md
Found lines in file.
Successfully updated: ./016-Computer-Networking.md

Processing File: ./022-Attack-Frameworks.md
Found lines in file.
Successfully updated: ./022-Attack-Frameworks.md
```

**Verify:**

```bash
grep -rl '<img .*width=.* src=.*>' . 
```

**Script:**

<details>
  <summary> script.sh </summary>

```bash
#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

directory="$1"

# Find all files in the specified directory containing <img> tags with src attribute, excluding .sh files
grep -rl '<img .*src=.*>' "$directory" --exclude="*.sh" | while IFS= read -r file; do
    echo 
    echo "Processing File: $file"

    if grep -q '<img .*src=.*>' "$file"; then
        echo "Found lines in file."
        sed -i -E 's|<img( .*width=[^ >]*)? src=[\"\x27]([^\"\x27]+)[\"\x27][^>]*>|![](\2)|g' "$file"
        echo "Successfully updated: $file"
    else
        echo "No lines found in file."
    fi
done
```

</details>


## Print image links 

This is continuation of the image syntax change above. This will just print all the image links in all the files in the cirrent directory. Note that the image links are in this format:

```bash
![](../../Images/sec+-eg-computations.png) 
```

**Usage:**

```bash
./print_image_links.sh /path/to-directory
```
```bash
## If current directory 
./print_image_links.sh . 
```  

**Output:**

```bash
Filename: ./002-Security-Principles.md
![](../../Images/security-cia-triad-diagram.png)
    ![](../../Images/sec+-accounting-audit-login-example.png)
        ![](../../Images/sec+-windows-credential-manager.png)

Filename: ./003-Risk-Management.md
    ![](../../Images/risk-matrix-for-prioritization.png)
![](../../Images/sec+-eg-computations.png)
![](../../Images/sec+-ale-computation-example.png)

Filename: ./006-Incident-Responses.md
![](../../Images/sec+-irp-lifecycle.png)

Filename: ./007-Business-Continuity.md
![](../../Images/sec+-bcp-disaster-types.png)
```

**Script:**

<details>
  <summary>  </summary>

```bash
#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 /path/to-directory"
    exit 1
fi

directory="$1"

if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found."
    exit 1
fi

# Find all Markdown files in the specified directory containing image links
find "$directory" -type f -name "*.md" -exec awk 'BEGIN { filename = ""; in_block = 0; } /!\[\]\([^)]+\)/ { if (filename != FILENAME) { if (filename != "") { print ""; } print "Filename: " FILENAME; filename = FILENAME; } print $0; }' {} +
```

</details>


## Apply second image syntax change 

This is continuation of the image syntax change above. I needed to make sure that all image are embedded the same way before I change the directory. I was going to add this onto the first script, but the first script only applies to files with the "img" tags. 

This script will apply to all files that has an image link with the following format:

```bash
![](../../Images/sec+-eg-computations.png) 
```

Before I attempted this, I first make sure to print the image links first using the script in the previous section.



**Usage:**

```bash
./change_img_syntax_2.sh /path/to-directory
```
```bash
## If current directory 
./change_img_syntax_2.sh . 
```  

**Verify:**

Before running the script:

```bash
$ grep -r "../Images" .
./006-Incident-Responses.md:![](../../Images/sec+-irp-lifecycle.png)
./007-Business-Continuity.md:![](../../Images/sec+-bcp-disaster-types.png)
./008-Disaster-recovery.md:![](../../Images/security-datacenter-redundancy.png)
./008-Disaster-recovery.md:  ![](../../Images/secplus-raid-0.png)
./008-Disaster-recovery.md:  ![](../../Images/secplus-raid-1.png)
```

After running the script:

```bash
$ grep -r "../Images" .
$ grep -r "/img/docs" .
./006-Incident-Responses.md:![](/img/docs/sec+-irp-lifecycle.png)
./007-Business-Continuity.md:![](/img/docs/sec+-bcp-disaster-types.png)
./008-Disaster-recovery.md:![](/img/docs/security-datacenter-redundancy.png)
./008-Disaster-recovery.md:  ![](/img/docs/secplus-raid-0.png)
./008-Disaster-recovery.md:  ![](/img/docs/secplus-raid-1.png)
```

**Script:**

<details>
  <summary>  </summary>

```bash
#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 /path/to-directory"
    exit 1
fi

directory="$1"

if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found."
    exit 1
fi

# Find all Markdown files in the specified directory containing image links
find "$directory" -type f -name "*.md" -exec awk -i inplace '
    {
        while(match($0, /!\[\]\(\.\.\/\.\.\/Images\/([^)]+)\)/, arr)) {
            gsub(/!\[\]\(\.\.\/\.\.\/Images\/([^)]+)\)/, "![](/img/docs/" arr[1] ")", $0);
        }
        print $0;
    }' {} +
```

</details>



## TODOs 

### Overview 

These are not scripts but are useful commands which I used for different tasks at work and in my personal labs.
I might turn them into scripts if I need to, but for now just dumping them here.

### Search for keywords 

To search for a keyword in all files within a directory and its subdirectories, excluding a specific file:

```bash
grep -r --exclude="name-of-files" "keyword" /path/to/directory 
```

Example: To check the values for "sidebar_position" for all files within the current directory, wwhile excluding dummy files called "create-a-document.md":

```bash
grep -r --exclude="create-a-document.md" "sidebar_position:" . 
```

**Output:**

```bash
./Amazon Web Services/Troubleshooting Notes/001-Attaching-multiple-EBS.md:sidebar_position: 1
./Amazon Web Services/Troubleshooting Notes/002-Expanding-EBS-Volumes.md:sidebar_position: 2
./Amazon Web Services/Troubleshooting Notes/003-EBS-stuck-in-Attaching.md:sidebar_position: 4
./Amazon Web Services/Troubleshooting Notes/004-EC2-Stuck-in-Initializing.md:sidebar_position: 52
./intro.md:sidebar_position: 1
./Linux/Linux Security/001-IPTables.md:sidebar_position: 1
./Linux/Linux Security/009-IPTables-and-getting-locked-out.md:sidebar_position: 9
./Linux/Linux Security/010-Firewalld.md:sidebar_position: 2
./Linux/Linux Security/020-SSH-Based-Logins.md:sidebar_position: 3
./Linux/Linux Security/030-SELinux.md:sidebar_position: 4
./Linux/Linux Security/040-Security-Updates.md:sidebar_position: 99
./Linux/RHCSA Labs/Lab 000 - Exam Objectives/README.md:sidebar_position: 1
./Linux/RHCSA Labs/Lab 001 - Basic Installation/README.md:sidebar_position: 1 
```

### Remove divider lines 

This is not a script, but I used this when I was migrating all my docs to Docusaurus. All of my MD docs has this divider at the bottom of the file.

```bash
---------------------------------------------- 
```

To remove those lines:

```bash
grep -rl -- "----------------------------------------------" . | xargs sed -i '/----------------------------------------------/d'
```

### Print line in files

To print line 1 of all files in current directory:

```bash
find . -maxdepth 1 -type f -exec sh -c 'echo "File: $0"; head -n 1 "$0"' {} \; 
```

To print line 7 to 8 of all files in current directory:

```bash
for file in *; do
    echo "---------------------------------"
    echo "Printing lines 7 to 8 of file: $file"
    head -n 8 "$file" | tail -n 2
done 
```


### Replace p headers 

I have a lot of files in the project directory that has either:

```bash
<p align=center> 
```

or:

```bash
<p> 
```

As can be seen:

```bash
$ grep -r "<p" .
./003-Risk-Management.md:    <p align=center>
./006-Incident-Responses.md:<p>
./006-Incident-Responses.md:<!-- <p align=center> -->
./008-Disaster-recovery.md:  <p align=center>
./008-Disaster-recovery.md:  <p align=center>
./008-Disaster-recovery.md:  <p align=center>
./008-Disaster-recovery.md:  <p align=center>
./008-Disaster-recovery.md:  <p align=center>
./009-Access-Control.md:    <p>
./009-Access-Control.md:    <p>
./009-Access-Control.md:    <p> 
```

I need to replace them with:

```bash
<div class="img-center"> 
```

To do this, run the commands below:

```bash
find . -type f -exec sed -i 's/<p align=center>/<div class="img-center">\n/g' {} +
find . -type f -exec sed -i 's/<p>/<div class="img-center">\n/g' {} + 
```

Output:

```bash
$ grep -r "<p" .
$ grep -r "<div class"
003-Risk-Management.md:    <div class="img-center">
006-Incident-Responses.md:<div class="img-center">
006-Incident-Responses.md:<!-- <div class="img-center"> -->
008-Disaster-recovery.md:  <div class="img-center">
008-Disaster-recovery.md:  <div class="img-center"> 
```

In addition to this, I also need to replace the closing headers:

```bash
$ grep -r "</p"
003-Risk-Management.md:    </p>
006-Incident-Responses.md:</p>
008-Disaster-recovery.md:  </p>
008-Disaster-recovery.md:  </p> 
```

Run:

```bash
find . -type f -exec sed -i 's/<\/p>/\n<\/div>/g' {} + 
```

Output:

```bash
$ grep -r "</p>"
$ grep -r "</div>"
003-Risk-Management.md:</div>
006-Incident-Responses.md:</div>
008-Disaster-recovery.md:</div>
008-Disaster-recovery.md:</div>
008-Disaster-recovery.md:</div>
```

### Remove br 

Before:

```bash
$ grep -r "<br>" .
./003-Risk-Management.md:<br>
./008-Disaster-recovery.md:<br>
./008-Disaster-recovery.md:<br>
./008-Disaster-recovery.md:<br> 
```

To remove:

```bash
grep -r -l "<br>" . | xargs sed -i 's/<br>/\n/g' 
```
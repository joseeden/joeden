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

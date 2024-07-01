---
title: "Process Management"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 11
last_update:
  date: 7/8/2022
---

## ps command

The `ps` command is used to display information about active processes. There are various options and flags to modify the output to suit your needs. 

- the `ps` command has two different dialects: BSD and System5.
- `ps -L` and `psL` are different commands. 

### Examples 

To see the current processes running in the terminal:

```bash
$ ps
    PID TTY          TIME CMD
  42657 pts/1    00:00:00 bash
  43459 pts/1    00:00:00 nslookup
  43529 pts/1    00:00:00 ps
```

To see more detailed information about all processes:

```bash
[root@server home]# ps -aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.0 241556 14516 ?        Ss   Nov17   0:07 /usr/lib/systemd/systemd --system --deserialize 21
root           2  0.0  0.0      0     0 ?        S    Nov17   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<   Nov17   0:00 [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<   Nov17   0:00 [rcu_par_gp]
root           6  0.0  0.0      0     0 ?        I<   Nov17   0:00 [kworker/0:0H-events_highpri]
```

To see processes in tree-view:

```bash
[root@server home]# ps af
   PPID     PID    PGID     SID TTY        TPGID STAT   UID   TIME COMMAND
      1    5969    5969    5969 ?             -1 Ss       0   0:00 sshd: eden [priv]
   5969    5980    5969    5969 ?             -1 S     1000   0:01  \_ sshd: eden@pts/1
   5980    5981    5981    5981 pts/1      49357 Ss    1000   0:00      \_ -bash
   5981    6015    6015    5981 pts/1      49357 T        0   0:00          \_ sudo yum install https://dl.fedoraproject.org/
   6015    6017    6015    5981 pts/1      49357 T        0   0:04          |   \_ /usr/libexec/platform-python /bin/yum inst
   5981   36086   36086    5981 pts/1      49357 T        0   0:00          \_ sudo yum install https://dl.fedoraproject.org/
  36086   36088   36086    5981 pts/1      49357 T        0   0:03          |   \_ /usr/libexec/platform-python /bin/yum inst
```

The `-fax` combination displays all processes in a hierarchical tree format, including processes without a terminal and those of other users. This is useful for understanding the parent-child relationships between processes.

```bash
[root@server home]# ps -fax
  PID  TTY      STAT   TIME COMMAND
    1  ?        Ss     0:07 /sbin/init
    2  ?        S      0:00  \_ [kthreadd]
    3  ?        I<     0:00      \_ [rcu_gp]
    4  ?        I<     0:00      \_ [rcu_par_gp]
  458  ?        Ss     0:00 /usr/sbin/sshd -D
  489  pts/0    Ss     0:00  \_ /bin/bash
  510  pts/0    R+     0:00      \_ ps -fax

```


The `-ef` combination provides a comprehensive list of all processes in the system with detailed information. It does not show the hierarchical tree structure but is more detailed about each process's attributes.

```bash
[root@server home]# ps -ef
    PID TTY      STAT   TIME COMMAND
  48963 pts/1    S      0:00 sudo su LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:su=37
  48965 pts/1    S      0:00  \_ su LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:su=37;
  36120 pts/1    T      0:00 sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:
  36088 pts/1    T      0:03  \_ /usr/libexec/platform-python /bin/yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm LS_COLORS
   6015 pts/1    T      0:00 sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=
   6017 pts/1    T      0:04  \_ /usr/libexec/platform-python /bin/yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm LS_COLORS
   1145 tty1     Ss+    0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin INVOCATION_ID=8b2bcd3d8abf440
```

To list full-format details of processes owned by user Ted:

```bash
[root@server home]# ps -fU Ted

UID        PID  PPID  C STIME TTY          TIME CMD
Ted       1234     1  0 12:00 ?        00:00:00 /usr/bin/bash
```

To show a tree view `--forest` of sshd processes and their children in full format:

```bash
[root@server home]# ps -f --forest -C sshd

UID        PID  PPID  C STIME TTY          TIME CMD
root       101   100  0 10:00 ?        00:00:00 sshd
root       102   101  0 10:01 ?        00:00:00  \_ sshd: root@pts/0
```

To list all the currently available format specifiers:

```bash
[root@server home]# ps L

%cpu         %CPU
%mem         %MEM
_left        LLLLLLLL
_left2       L2L2L2L2
_right       RRRRRRRR
_right2      R2R2R2R2
_unlimited   U
_unlimited2  U2
```

To dsplay all processes with specified columns: process ID, parent process ID, user, and command

```bash
[root@server home]# ps -eo pid,ppid,user,cmd
    PID    PPID USER     CMD
      1       0 root     /sbin/init
      2       1 root     /init
     11       2 root     plan9 --control-socket 6 --log-level 4 --server-fd 7 --pipe-fd 9 --log-truncate
     70       1 root     /lib/systemd/systemd-journald
     96       1 root     /lib/systemd/systemd-udevd
```

### Using grep

To find the process ID (PID) of a specific process using `pgrep`:

```bash
[root@server home]# pgrep bash
5900
5981
48966
```

To display specific process information using `grep`:

```bash
[root@server home]# ps aux | grep bash
eden        5900  0.0  0.0  24120  3976 pts/0    Ss+  05:58   0:00 -bash
eden        5981  0.0  0.0  24120  4020 pts/1    Ss   06:00   0:00 -bash
root       48966  0.0  0

.0  26328  4116 pts/1    S    09:46   0:00 bash
root       49389  0.0  0.0  12136  1120 pts/1    S+   11:18   0:00 grep --color=auto bash
```

To exclude the `grep` process from the output:

```bash
[root@server home]# ps aux | grep bash | grep -v grep
eden        5900  0.0  0.0  24120  3976 pts/0    Ss+  05:58   0:00 -bash
eden        5981  0.0  0.0  24120  4020 pts/1    Ss   06:00   0:00 -bash
root       48966  0.0  0.0  26328  4116 pts/1    S    09:46   0:00 bash
```

To see all processes running `http`:

```bash
[root@server home]# ps aux | grep http
root        6015  0.0  0.0 143304  7912 pts/1    T    06:00   0:00 sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
root        6017  0.0  0.9 581472 162040 pts/1   T    06:00   0:04 /usr/libexec/platform-python /bin/yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
root       36086  0.0  0.0 143328  8124 pts/1    T    06:05   0:00 sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
root       49004  0.0  0.0  12136  1100 pts/1    S+   09:50   0:00 grep --color=auto http
```

To count how many processes are running `http`:

```bash
[root@server home]# ps aux | grep http | wc -l
4
```

## Managing Startup Processes

In Linux, managing startup processes can differ based on the init system used by the distribution. Here are examples for Ubuntu using Upstart and RHEL using systemd.

### Ubuntu (Upstart)

To check the config files of services running during boot: 

```bash
[root@server home]# ll /etc/init.d
lrwxrwxrwx. 1 root root 11 Jul 27 15:12 /etc/init.d -> rc.d/init.d
```

### RHEL (systemd)

To check the systemd configuration directory: 

```bash
[root@server home]# ll /etc/systemd
total 28
-rw-r--r--.  1 root root  615 Jun 22  2018 coredump.conf
-rw-r--r--.  1 root root 1027 Jun 22  2018 journald.conf
-rw-r--r--.  1 root root 1052 May  5  2021 logind.conf
-rw-r--r--.  1 root root  631 Sep 23 18:50 resolved.conf
drwxr-xr-x. 14 root root 4096 Sep 23 18:51 system
-rw-r--r--.  1 root root 1722 Sep 23 18:50 system.conf
drwxr-xr-x.  2 root root    6 Sep 23 18:51 user
-rw-r--r--.  1 root root 1130 Jun 22  2018 user.conf
```

## Managing Services with systemd

Check status of a service:
```bash
systemctl status <service>
```

Stop a service:
```bash
systemctl stop <service>
```

Start a service:
```bash
systemctl start <service>
```

Restart a service:
```bash
systemctl restart <service>
```

Disable a service from starting automatically on boot:
```bash
systemctl disable <service>
```

Enable a service to start automatically on boot:
```bash
systemctl enable <service>
```

### Example

Disabling and enabling the `crond` service:

```bash
[root@server home]# systemctl disable crond
Removed /etc/systemd/system/multi-user.target.wants/crond.service.
[root@server home]#

[root@server home]# systemctl enable crond
Created symlink /etc/systemd/system/multi-user.target.wants/crond.service → /usr/lib/systemd/system/crond.service.
```

## Jobs and Processes

### Shell Jobs

In Linux, a "job" refers to a process that is started by the shell. Jobs can be managed directly from the shell, and this includes running processes in the background, bringing them to the foreground, and stopping or resuming them.

- All tasks are started as processes. 
- Processed have a PID.
- Common process management tasks include scheduling priority and sending signals.
- Some processes start multiple thread.
- Individual threads cannot be managed. 
- Tasks managed from a shell can be managed as jobs. 
- Jobs can be started in the foreground or background.

### Basic Job Commands

- **&**: Run a command in the background.
- **jobs**: List all current jobs.
- **fg**: Bring a job to the foreground.
- **bg**: Resume a stopped job in the background.
- **Ctrl+Z**: Suspend the current foreground job.
- **kill**: Terminate a job by sending a signal.

### Examples

1. **Running a Process in the Background**
   
   The "&" symbol runs `long_running_command` in the background, allowing you to continue using the shell. `1` is the job number, and `12345` is the process ID (PID).

   ```bash
   $ long_running_command &
   [1] 12345
   ```

2. **Listing Jobs**

   The `jobs` command lists all active jobs. The `+` indicates the current job, and the job number is `1`.

   ```bash
   $ jobs
   [1]+  Running                 long_running_command &
   ```


3. **Bringing a Job to the Foreground**

   The `fg` command followed by the job number brings job `1` to the foreground.

   ```bash
   $ fg %1
   ```

4. **Running a Stopped Job in the Background**

   The `bg` command resumes a stopped job in the background. This is useful after using `Ctrl+Z` to suspend a job.

   ```bash
   $ bg %1
   ```

5. **Suspending a Foreground Job**

   Press `Ctrl+Z` to suspend the current foreground job. The job is now stopped and can be resumed with `fg` or `bg`.

   ```bash
   $ long_running_command
   Ctrl+Z
   [1]+  Stopped                 long_running_command
   ```

6. **Terminating a Job**

   The `kill` command followed by the job number terminates the specified job. You can also use the PID instead of the job number.

   ```bash
   $ kill %1
   ```
   ```bash
   $ kill 12345
   ```

### Job Control Example

```bash
$ sleep 1000 &
[1] 12345
$ jobs
[1]+  Running                 sleep 1000 &
$ fg %1
sleep 1000
Ctrl+Z
[1]+  Stopped                 sleep 1000
$ bg %1
[1]+ sleep 1000 &
$ kill %1
[1]+  Terminated              sleep 1000
```

In this example:
1. `sleep 1000 &` runs the `sleep` command in the background.
2. `jobs` lists the active job.
3. `fg %1` brings the job to the foreground.
4. `Ctrl+Z` suspends the job.
5. `bg %1` resumes the job in the background.
6. `kill %1` terminates the job.


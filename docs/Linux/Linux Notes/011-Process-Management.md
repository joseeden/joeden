---
title: "Process Management"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 11
last_update:
  date: 7/8/2022
---

# Managing Processes

The `ps` command is used to display information about active processes. There are various options and flags to modify the output to suit your needs. 

![](/img/docs/sv-ps-10.png)

## Examples 

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
root           9  0.0  0.0      0     0 ?        I<   Nov17   0:00 [mm_percpu_wq]
root          10  0.0  0.0      0     0 ?        S    Nov17   0:00 [ksoftirqd/0]
root          11  0.0  0.0      0     0 ?        I    Nov17   0:01 [rcu_sched]
```

To see processes in a hierarchical view:

```bash
[root@server home]# ps -ef
    PID TTY      STAT   TIME COMMAND
  48963 pts/1    S      0:00 sudo su LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:su=37
  48965 pts/1    S      0:00  \_ su LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:su=37;
  48966 pts/1    S      0:00      \_ bash LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:
  48992 pts/1    R+     0:00          \_ ps ef LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;3
  36120 pts/1    T      0:00 sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:
  36088 pts/1    T      0:03  \_ /usr/libexec/platform-python /bin/yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm LS_COLORS
   6015 pts/1    T      0:00 sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=
   6017 pts/1    T      0:04  \_ /usr/libexec/platform-python /bin/yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm LS_COLORS
   1146 ttyS0    Ss+    0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,38400,9600 ttyS0 vt220 LANG=en_US.UTF-8 PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:
   1145 tty1     Ss+    0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin INVOCATION_ID=8b2bcd3d8abf440
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
   5981   36108   36108    5981 pts/1      49357 T        0   0:00          \_ sudo yum install https://dl.fedoraproject.org/
  36108   36110   36108    5981 pts/1      49357 T        0   0:02          |   \_ /usr/libexec/platform-python /bin/yum inst
   5981   36120   36120    5981 pts/1      49357 T        0   0:00          \_ sudo yum install https://dl.fedoraproject.org/
  36120   36123   36120    5981 pts/1      49357 T        0   0:02          |   \_ /usr/libexec/platform-python /bin/yum inst
   5981   42110   42110    5981 pts/1      49357 T     1000   0:28          \_ htop
```

## Using grep

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

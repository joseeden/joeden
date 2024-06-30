---
title: General System Check
tags: [Linux, Red Hat, Certifications]
sidebar_position: 2
last_update:
  date: 7/8/2022
---



## Linux Hierarchy System 

An excerpt from a [GeeksforGeeks article](https://www.geeksforgeeks.org/linux-file-hierarchy-structure/):

:::info[Linux File Hierarchy]

The Linux File Hierarchy Structure or the Filesystem Hierarchy Standard (FHS) defines the directory structure and directory contents in Unix-like operating systems. It is maintained by the Linux Foundation. 

- In the FHS, all files and directories appear under the root directory /, even if they are stored on different physical or virtual devices.
- Some of these directories only exist on a particular system if certain subsystems, such as the X Window System, are installed.
- Most of these directories exist in all UNIX operating systems and are generally used in much the same way; however, the descriptions here are those used specifically for the FHS and are not considered authoritative for platforms other than Linux.

:::


![](/img/docs/sv-fhs.png)


### Commands

To see man page for hierarchy:
```bash
man hier
```

To check if 32-bit or 4-bit:
```bash
uname -a
```

To see what OS is running:
```bash
cat /etc/os-release
cat /etc/redhat-release
cat /etc/system-release
cat /etc/issue
```

To see processes:
```bash
top
```

To see IP addresses:
```bash
ip addr show
```

Show available memory:
```bash
free -m
```

Show free/available disk space:
```bash
df -h
```

Show mounted filesystems:
```bash
findmnt
```

To show history of commands:
```bash
history
```

To see previous commands in reverse:

```bash
ctrl-r
```

**PIPING** - pass output of previous command.

In the example below, we're getting the output of "ps -aux".
And from that output, we're grepping for "java".

```bash
ps aux | grep java
```

![](/img/docs/sv-cli.png)


### Environment Variables


To get a list of your environment variables
```bash
env
```

To add a path to your $PATH variable:
```bash
[root@tstsvr ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```
```bash
[root@tstsvr ~]# export PATH=$PATH:/tmp/archive
```
```bash
[root@tstsvr ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/tmp/archive

```

![](/img/docs/sv-env.png)




### Memory

![](/img/docs/sv-memory.png)


To see free memory:

```bash
$ free
              total        used        free      shared  buff/cache   available
Mem:       16209956      741040    13031804       26564     2437112    15139920
Swap:             0           0           0
```

To see detailed memory information in megabytes:

```bash
$ free -m
              total        used        free      shared  buff/cache   available
Mem:          15830         723       12726          25        2380       14785
Swap:             0           0           0
```

Note that if used > free and there's some significant number for cached, then you're still running a bit of memory.
Cached memory is used to speed up your file system.


To see free space in disk:

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        7.7G     0  7.7G   0% /dev
tmpfs           7.8G     0  7.8G   0% /dev/shm
tmpfs           7.8G   25M  7.8G   1% /run
tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2       10G  3.2G  6.9G  32% /
tmpfs           1.6G     0  1.6G   0% /run/user/1000
```

To check disk usage in the current directory:

```bash 
$ du
24      ./.ssh
12      ./data-bkup/data-bkup
16      ./data-bkup
8       ./1-transfers
8       ./2-receives
0       ./.config/procps
0       ./.config/htop
0       ./.config
716     .
```

To see disk usage in a human-readable format:

```bash
$ du -h
24K     ./.ssh
12K     ./data-bkup/data-bkup
16K     ./data-bkup
8.0K    ./1-transfers
8.0K    ./2-receives
0       ./.config/procps
0       ./.config/htop
0       ./.config
716K    .   
```

To check disk space usage in specific directories:

```bash
[root@localhost eden]# du -sch /var/*
0       /var/adm
619M    /var/cache
0       /var/crash
0       /var/db
0       /var/empty
0       /var/ftp
0       /var/games
0       /var/gopher
0       /var/kerberos
226M    /var/lib
0       /var/local
0       /var/lock
27M     /var/log
0       /var/mail
0       /var/nis
0       /var/opt
0       /var/preserve
0       /var/run
20K     /var/spool
44K     /var/tmp
0       /var/yp
871M    total
```

### inodes

Inodes are file references in the filesystem table. It's possible for the number of used inodes to exceed the configured number without filling up all the space.

To check inodes:

```bash
$ df -hiT
Filesystem     Type     Inodes IUsed IFree IUse% Mounted on
devtmpfs       devtmpfs   2.0M   289  2.0M    1% /dev
tmpfs          tmpfs      2.0M     1  2.0M    1% /dev/shm
tmpfs          tmpfs      2.0M   428  2.0M    1% /run
tmpfs          tmpfs      2.0M    17  2.0M    1% /sys/fs/cgroup
/dev/xvda2     xfs        5.0M   56K  5.0M    2% /
tmpfs          tmpfs      2.0M     5  2.0M    1% /run/user/1000
```

You'll also notice that the partition with largest size also has the largest configured inode.

![](/img/docs/inode.png)


### CPU Load

![](/img/docs/sv-cpu-load.png)

To check system uptime and load averages:

```bash
$ uptime
 16:54:33 up 1 day, 18:27,  1 user,  load average: 0.00, 0.00, 0.00
```

For real-time updates of uptime and load averages:

```bash
$ watch uptime
Every 2.0s: uptime                                                                         tst-rhel: Sat Dec 25 16:56:00 2021

 16:56:00 up 1 day, 18:28,  1 user,  load average: 0.00, 0.00, 0.00
```

To display detailed CPU information:

```bash
$ lscpu
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
CPU(s):              4
On-line CPU(s) list: 0-3
Thread(s) per core:  1
Core(s) per socket:  4
Socket(s):           1
NUMA node(s):        1
Vendor ID:           GenuineIntel
CPU family:          6
Model:               79
Model name:          Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz
Stepping:            1
CPU MHz:             2300.134
BogoMIPS:            4600.14
Hypervisor vendor:   Xen
Virtualization type: full
L1d cache:           32K
L1i cache:           32K
L2 cache:            256K
L3 cache:            46080K
NUMA node0 CPU(s):   0-3
Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology cpuid pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm cpuid_fault invpcid_single pti fsgsbase bmi1 avx2 smep bmi2 erms invpcid xsaveopt
```



## Tuned


![](/img/docs/sv-tuned.png)
![](/img/docs/sv-tuned-2.png)

```bash
[root@localhost ~]# systemctl status tuned
● tuned.service - Dynamic System Tuning Daemon
   Loaded: loaded (/usr/lib/systemd/system/tuned.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2021-12-23 22:29:27 PST; 1 day 18h ago
     Docs: man:tuned(8)
           man:tuned.conf(5)
           man:tuned-adm(8)
 Main PID: 966 (tuned)
    Tasks: 5 (limit: 100840)
   Memory: 18.6M
   CGroup: /system.slice/tuned.service
           └─966 /usr/libexec/platform-python -Es /usr/sbin/tuned -l -P

Dec 23 22:29:26 tst-rhel systemd[1]: Starting Dynamic System Tuning Daemon...
Dec 23 22:29:27 tst-rhel systemd[1]: Started Dynamic System Tuning Daemon.
```

To see the profiles and the current active:

```bash
[root@localhost ~]# tuned-adm list
Available profiles:
- accelerator-performance     - Throughput performance based tuning with disabled higher latency STOP states
- balanced                    - General non-specialized tuned profile
- desktop                     - Optimize for the desktop use-case
- hpc-compute                 - Optimize for HPC compute workloads
- intel-sst                   - Configure for Intel Speed Select Base Frequency
- latency-performance         - Optimize for deterministic performance at the cost of increased power consumption
- network-latency             - Optimize for deterministic performance at the cost of increased power consumption, focused on low latency network performance
- network-throughput          - Optimize for streaming network throughput, generally only necessary on older CPUs or 40G+ networks
- optimize-serial-console     - Optimize for serial console use.
- powersave                   - Optimize for low power consumption
- throughput-performance      - Broadly applicable tuning that provides excellent performance across a variety of common server workloads
- virtual-guest               - Optimize for running inside a virtual guest
- virtual-host                - Optimize for running KVM guests
Current active profile: virtual-guest

```

To change the profile:

```bash
[root@localhost ~]# tuned-adm profile desktop
[root@localhost ~]#
[root@localhost ~]# tuned-adm active
Current active profile: desktop
[root@localhost ~]#
[root@localhost ~]# tuned-adm list
Available profiles:
- accelerator-performance     - Throughput performance based tuning with disabled higher latency STOP states
- balanced                    - General non-specialized tuned profile
- desktop                     - Optimize for the desktop use-case
- hpc-compute                 - Optimize for HPC compute workloads
- intel-sst                   - Configure for Intel Speed Select Base Frequency
- latency-performance         - Optimize for deterministic performance at the cost of increased power consumption
- network-latency             - Optimize for deterministic performance at the cost of increased power consumption, focused on low latency network performance
- network-throughput          - Optimize for streaming network throughput, generally only necessary on older CPUs or 40G+ networks
- optimize-serial-console     - Optimize for serial console use.
- powersave                   - Optimize for low power consumption
- throughput-performance      - Broadly applicable tuning that provides excellent performance across a variety of common server workloads
- virtual-guest               - Optimize for running inside a virtual guest
- virtual-host                - Optimize for running KVM guests

Current active profile: desktop
```
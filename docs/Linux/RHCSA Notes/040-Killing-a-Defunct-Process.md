---
title: Killing a Defunct Process
tags: [Linux, Red Hat, Labs, AWS]
sidebar_position: 40
last_update:
  date: 2/27/2022
---


Encountered this when I was trying to install htop on one of my test-RHEL EC2 instances. I was following the steps in this [link.](https://www.cyberciti.biz/faq/how-to-install-htop-on-rhel-8-using-yum/). 

I've also learned that defunct processes are almost similar with zombie processes, but there's also some differences which you can read [here.](https://stackoverflow.com/questions/47977402/zombie-vs-defunct-processes)


## What happened

- Two terminals opened, both connected to same instance
- installed the package on second terminal while update was running on first

Got this message on second terminal when trying to install package and update simultaneously:
```bash
Running transaction check
Waiting for process with pid 5941 to finish.
```

Checking which process is that
```bash
$ ps -ef |grep 5941
root        5941    5939 18 06:00 pts/0    00:01:42 yum update -y
root       36173   36153  0 06:09 pts/2    00:00:00 grep --color=auto 5941

```

Since it was taking some time, I had to cancel the update running on the first terminal so I can install some packages first and then run the update again.

When I try install the packages again, it still returned same messaged about the same pid. Checking the processes again, it now showed "defunct"
```bash
$ ps -ef |grep 5941
root        5941    5939 18 06:00 pts/0    00:01:42 [yum] <defunct>
```

I tried killing by running <code>kill -9 5941</code> but it still appear as a "defunct" process.

## What this means

Based on one of the link I found online:

> From your output we see a "defunct", which means the process has either completed its task or has been corrupted or killed, but its child processes are still running or these parent process is monitoring its child process. To kill this kind of process, kill -9 PID doesn't work. You can try to kill them with this command but it will show this again and again.

## What to do

Determine which is the parent process of this defunct process and kill it. To know this run the command:
```bash
$ sudo ps -ef|grep defunct
UID          PID    PPID  C    
root        5941    5939  6 06:00 pts/0    00:01:42 [yum] <defunct>
eden       36210    6097  0 06:24 pts/2    00:00:00 grep --color=auto defunct

```
Then run the sigkill cmmand again but this time include both the PID and PPID.
```bash
$ sudo kill -9 5941 5939
$ sudo kill -9 36210 6097
```
Verify the defunct process is gone by ps -ef | grep defunct



## References

- [How to install htop on RHEL 8 using yum](https://www.cyberciti.biz/faq/how-to-install-htop-on-rhel-8-using-yum/)
- [What is a defunct process, and why doesn't it get killed?](https://askubuntu.com/questions/201303/what-is-a-defunct-process-and-why-doesnt-it-get-killed)
- [Zombie vs Defunct processes?](https://stackoverflow.com/questions/47977402/zombie-vs-defunct-processes)

---
slug: killing-a-defunct-process
title: Killing a defunct process
tags: [Devnotes]
date: 2020-11-18
hide_table_of_contents: true
---

# Killing a defunct process

![alt text](image.png)

I encountered this while trying to install `htop` on one of my test RHEL EC2 instances. I was following the steps from this [guide](https://www.cyberciti.biz/faq/how-to-install-htop-on-rhel-8-using-yum/).

This also led me into learning a little more about **defunct**, or **zombie**, processes in Linux. You can read more about them [here](https://stackoverflow.com/questions/47977402/zombie-vs-defunct-processes).

---

## What happened

I had two terminals open, both connected to the same EC2 instance.

On the first terminal, I was running:

```bash
yum update -y
```

While the update was still running, I tried installing another package from the second terminal.

That gave me this message:

```text
Running transaction check
Waiting for process with pid 5941 to finish.
```

So I checked what process was using PID `5941`:

```bash
$ ps -ef | grep 5941

root        5941    5939 18 06:00 pts/0    00:01:42 yum update -y
root       36173   36153  0 06:09 pts/2    00:00:00 grep --color=auto 5941
```

Sure enough, PID `5941` was the `yum update` process running on my first terminal.

Since the update was taking some time, I decided to cancel it so I could install the packages I needed first and then run the update again afterward.

But when I tried installing the package again, I still got the same message referring to PID `5941`.

Checking the process again showed something different:

```bash
$ ps -ef | grep 5941

root        5941    5939 18 06:00 pts/0    00:01:42 [yum] <defunct>
```

The `yum` process was now marked as `<defunct>`.

Naturally, my first thought was:

```bash
kill -9 5941
```

Problem solved, right?

Not quite.

The process still appeared as `<defunct>`.

## What does `<defunct>` mean?

A process marked as `<defunct>` has already finished running.

In other words, there is technically nothing left to kill.

When a child process exits, its parent process is supposed to collect its exit status. Until the parent does that, Linux keeps a small entry for the child process in the process table.

That leftover entry is what we call a **zombie process**.

And when you run `ps`, zombie processes are commonly displayed as:

```text
<defunct>
```

This is also why running:

```bash
kill -9 PID
```

doesn't remove it.

The process is already dead. `SIGKILL` has nothing left to kill.

## What to do

First, find the parent process of the defunct process.

You can use:

```bash
$ ps -ef | grep defunct

UID          PID    PPID  C STIME TTY          TIME CMD
root        5941    5939  6 06:00 pts/0    00:01:42 [yum] <defunct>
eden       36210    6097  0 06:24 pts/2    00:00:00 grep --color=auto defunct
```

The important columns here are:

```text
PID     PPID
5941    5939
```

`5941` is the zombie process.

`5939` is its parent process.

Before killing anything, it's a good idea to check what that parent process actually is:

```bash
ps -fp 5939
```

If the parent process is something that can safely be terminated, you can try stopping it normally:

```bash
sudo kill 5939
```

Then check again:

```bash
ps -ef | grep defunct
```

If the parent refuses to terminate and you're sure it's safe to kill, you can use `SIGKILL` as a last resort:

```bash
sudo kill -9 5939
```

Once the parent process exits, the zombie should normally be adopted and cleaned up by another process such as `init` or `systemd`.

## One thing to remember

Don't immediately run `kill -9` against every process you see.

Especially when you're dealing with parent processes, always check what the process is first:

```bash
ps -fp <PPID>
```

A defunct process itself isn't actually consuming CPU or actively running. It's mostly just an entry waiting for its parent to acknowledge that it has already finished.

So if you ever see:

```text
[process] <defunct>
```

remember:

**The process is already dead. The real thing you need to investigate is its parent.**

---

## References

* [How to install htop on RHEL 8 using yum](https://www.cyberciti.biz/faq/how-to-install-htop-on-rhel-8-using-yum/)
* [What is a defunct process, and why doesn't it get killed?](https://askubuntu.com/questions/201303/what-is-a-defunct-process-and-why-doesnt-it-get-killed)
* [Zombie vs Defunct processes?](https://stackoverflow.com/questions/47977402/zombie-vs-defunct-processes)

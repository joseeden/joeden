---
title: Expanding EBS Volumes
tags: [Linux, AWS, Labs]
sidebar_position: 2
last_update:
  date: 2/27/2022
---


## Problem 

I've recentlly hit a wall in one of my lab sessions on **Backup Recovery Strategies for Linux** when my server complained about insufficient memory, so I had to expand the root volume from 10G to 50G. I made sure that it'll be large enough to hold other packages and installations.

There is a rich article from the official AWS Documentation on [how to expand EBS Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/requesting-ebs-volume-modifications.html) whicH I also followed.

But just as a summary, the steps are:
1. Increase the size of EBS Volume through the console or CLI
2. Extend the filesystem

## Growpart

Two days after expanding the EBS volume, I returned back to the lab to resume my session. In one of my to-dos was to extend the filesystem which I was not able to do last time because there was an AWS outage (lookup: us-east-1 outage doe to impared network devices, December 2021). 

I used the **growpart** to *grow the partitions* of my root volume.
However, I encountered an error message and it seems system is reading the already extended 50G when I ran **lsblk**.

```bash
$ sudo growpart /dev/xvda 1
NOCHANGE: partition 1 is size 2048. it cannot be grown
$
$ sudo growpart /dev/xvda 2
NOCHANGE: partition 2 is size 104853471. it cannot be grown
$

$ df -h
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        7.7G     0  7.7G   0% /dev
tmpfs           7.8G     0  7.8G   0% /dev/shm
tmpfs           7.8G   17M  7.8G   1% /run
tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2       50G   11G   40G  21% /
tmpfs           1.6G     0  1.6G   0% /run/user/1000
$
$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  50G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  50G  0 part /
xvdb    202:16   0   5G  0 disk
xvdc    202:32   0  25G  0 disk
└─xvdc1 202:33   0  25G  0 part
```

Searched online, found this two Stackoverflow discussion
- [EC2 Can't resize volume after increasing size](https://stackoverflow.com/questions/11014584/ec2-cant-resize-volume-after-increasing-size)
- [Extended a partition error](https://unix.stackexchange.com/questions/629584/extended-a-partition-error)

I'm not entirely sure if the issue has been resolved or if the filesystem has been extended. The previous error from the console suggesting that filesystem should be extended after resizing the EBS volume has also disappeared.

For now I guess I'll just let it be. If ever I encounter an issue that's related to not having extended the filesystem, I'll just revert back to this section or just go online to search.

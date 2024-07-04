---
title: EBS stuck in "Attaching"
tags: [Linux, AWS, Labs]
sidebar_position: 4
last_update:
  date: 2/27/2022
---



## Problem


I encountered this error when I was doing labs for storage management in Linux. I was having issues on not being able too format the disks. The EBS volume just stayed in "Attaching" status.

## Detaching and Force Detaching

I went to the EBS menu, selected my volume and deleted it. After detaching the volume, it still showed **"In-use"** volume state. Refreshed the menu a couple of times and it still showed the same. If the detachment is successful, it should instead show **"Available"**.

![](/img/docs/ebs-volume-stuck-in-attaching.png)

I selected the volume, hit **Actions**, and chose **Force detach volume**.
Note that it will prompt you to confirm by typing in *detach* on the prompt.

![](/img/docs/ebs-volume-force-detach.png)

![](/img/docs/ebs-volume-force-detach-2.png)

Afterwards, I deleted the volume so I can create a new one with the same.


## Creating and Attaching the new EBS volume

Created a new EBS volume and gave it the same **Name**. Attached it to the same EC2 instance and reused the same device name **/dev/sdc**.

![](/img/docs/ebs-volume-new.png)


## EBS Menu vs. EC2 Instance Menu

From the EBS volume menu, the new volume is immediately transitioned to **"In-use"** state.

![](/img/docs/eb2-volume-new-stuck.png)

However, it still showing as "**Attaching** from the EC2 instance menu. Refresh the menu a couple of times and it still shows the same.

![](/img/docs/eb2-volume-new-stuck-2.png)

From the terminal, I also can't see the new */dev/xvdc*.
```bash
eden@tst-rhel:~ $ sudo fdisk /dev/xvdc -l
fdisk: cannot open /dev/xvdc: Input/output error
```

## Google Time

Went online and immediately found this helpful article from AWS themselves. It carefully explained what may have caused the issue. Breezed through it and found the culprit:

:::info[**The block device driver didn't release the device name**]

If a user has initiated a forced detach of an Amazon EBS volume, the block device driver of the Amazon EC2 instance might not immediately release the device name for reuse. Attempting to use that device name when attaching a volume causes the volume to be stuck in the attaching state. You must either choose a different device name or reboot the instance.

:::

### Reboot

I went and rebooted the instance. After it went back, I checked again the **Storage** tab in the **Instance Summary** panel. But now it showed a new error at the bottom. It also still shows the specific volume stuck in "attaching" state.


![](/img/docs/ebs-volume-rebooted-ec2.png)


### Restart

Going back to the AWS articles, it suggested to do a restart.

:::info[**Additional steps**]

If these steps don’t resolve the issue, or if you must use the device name that isn't working, try the following procedures:
- Reboot the instance.
- Stop and start the instance to migrate it to new underlying hardware. 

Keep in mind that instance store data is lost when you stop and start an instance. If your instance is instance store-backed or has instance store volumes containing data, the data is lost when you stop the instance.

:::

I went back to the AWS Console to restart the instance. And what do you know. The new error is gone, the volume has also changed to **"Attached"** state.
![](/img/docs/ebs-volume-not-stuck.png)

Also can see it from the terminal:

```bash
eden@tst-rhel:~ $ sudo fdisk /dev/xvdc -l
Disk /dev/xvdc: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

That's it.


## References

- [Why is my Amazon EBS volume stuck in the "attaching" state?](https://aws.amazon.com/premiumsupport/knowledge-center/ebs-stuck-attaching/)




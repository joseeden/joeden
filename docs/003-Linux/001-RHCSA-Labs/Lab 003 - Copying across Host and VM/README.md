---
title: Copying across Host and Guest Machine
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 3
last_update:
  date: 3/27/2021
---


Thought I'd include this part since I used VirtualBox VMs in some of the labs in this series. I was having issues copying text from my laptop and then pasting them onto the terminal inside the VM (and then vice versa). I've also included some packages that would be helpful. Some setup doesn't come with pre-built packages like vim.

## The Shortcut

If you prefer to skip the lengthy reading, here is the summary of commands I ran. This can also be turned into a script. 

Summary of commands:

```bash
sudo dnf upgrade
sudo rm -r /var/cache/dnf
sudo dnf install -y vim bash-completion firewalld mlocate
sudo dnf install -y gcc make perl kernel-headers kernel-devel elfutils-libelf-devel.x86_64
sudo dnf update -y
sudo reboot
```

What does these commands do?

- Install vim, firewalld, if they don't come pre-installed yet.
- Install requirements for VBOX additions, which allows copying of text across host machine and the VMs.
- Updates all presently installed packages.

Note that after you reboot, you need to click **Devices** tab on the Virtualbox VM and enable "bidirectional" on the following options

- Drag and Drop
- Shared Clipboard


<div class="img-center"> 

![](/img/docs/vbox-bidir.png)

</div>


<div class="img-center"> 

![](/img/docs/vbox-bidir-2.png)

</div>


## The Detailed Steps


### Enable bidirectional on the VM menu

On the **Devices** tab, I set both **Shared Clipboard** and **Drag and Drop** to **bidirectional**. Then rebooted it.


<div class="img-center"> 

![](/img/docs/vbox-bidir.png)

</div>


<div class="img-center"> 

![](/img/docs/vbox-bidir-2.png)

</div>

Normally, this would allow the copying and pasting of text across the host and guest machine. But since this didn't worked, I had to install the Guest Additions.

### Install Guest Additions


Outline:

1. Start VirtualBox.
2. Start the host in question.
3. Once the host has booted, click Devices | Insert Guest Additions CD Image.
4. Open up a terminal window in the guest.
5. Mount the CD-ROM with the command sudo mount /dev/cdrom /mnt.
6. Change into the mounted directory with the command cd /mnt.
7. Install the necessary dependencies with the command 
    sudo dnf install -y dkms kernel-devel kernel-devel-$(uname -r).
8. Change to the root user with the command sudo su.
9. Install the Guest Additions package with the command 
    ./VBoxLinuxAdditions.run.
10. Allow the installation to complete.

On the **Devices** tab, click **Insert Guest Additions CD Images..**.


<div class="img-center"> 

![](/img/docs/vbox1.png)

</div>

<div class="img-center"> 

![](/img/docs/vbox2.png)

</div>

<div class="img-center"> 

![](/img/docs/vbox3.png)

</div>

However, I keep getting this error:

<div class="img-center"> 

![](/img/docs/vbox4.png)

</div>

So I tried running the command, and then inserting the guest additions image again.

<div class="img-center"> 

![](/img/docs/vbox5.png)

</div>

<div class="img-center"> 

![](/img/docs/vbox1.png)

</div>

Then I got a new error message. I went to the **Optical Drives** to force unmount the disk and tried to insert the guest additions image again. This required the authentication again.

<div class="img-center"> 

![](/img/docs/vbox6.png)

</div>

<div class="img-center"> 

![](/img/docs/vbox7.png)

</div>

<div class="img-center"> 

![](/img/docs/vbox8.png)

</div>

<div class="img-center"> 

![](/img/docs/vbox1.png)

</div>

I still got the same error.

<div class="img-center"> 

![](/img/docs/vbox9.png)

</div>


## Errors 

### 1. Kernel Headers Not Found For Target Kernel Error [RESOLVED]

Google time. Went online and found [this](https://www.dev2qa.com/how-to-resolve-virtualbox-guest-additions-kernel-headers-not-found-for-target-kernel-error/).

```bash
ls /usr/src/kernels/
sudo yum install -y "kernel-devel-uname-r == $(uname -r)"
```

<div class="img-center"> 

![](/img/docs/sv-error-1.png)

</div>

This need to be resolved first. Followed suggestions from [RH discussion](https://access.redhat.com/discussions/4656371), but this didn't helped.
Then I tried to compare the two repo file. Turns out I was using "zero" for "Base0S" instead of "BaseOS". Corrected this and run the new commands using dnf instead of yum.

```bash
sudo dnf clean all
sudo rm -r /var/cache/dnf
sudo dnf upgrade
```


<div class="img-center"> 

![](/img/docs/sv-error-2.png)

</div>

Went back to the original issue and re-run the install again.

```bash
sudo dnf install -y "kernel-devel-uname-r == $(uname -r)"
```

<div class="img-center"> 

![](/img/docs/sv-kernelerror-1.png)

</div>

Then retried adding guest additions again using the same steps:


<div class="img-center"> 

![](/img/docs/vbox1.png)

</div>

This time it showed a different error.

<div class="img-center"> 

![](/img/docs/vboxadd-1.png)
![](/img/docs/vboxadd-2.png)

</div>

### 2. Please install the gcc make perl packages from your distribution [RESOLVED] 

Following another link: [Guest additionals: Kernel headers not found for target kernel](https://superuser.com/questions/1532590/guest-additionals-kernel-headers-not-found-for-target-kernel)

```bash
sudo dnf install -y gcc make perl kernel-headers kernel-devel
```

<div class="img-center"> 

![](/img/docs/vboxadd-gcc.png)

</div>

<div class="img-center"> 

![](/img/docs/vboxadd-gcc-make.png)

</div>

<div class="img-center"> 

![](/img/docs/vboxadd-gcc-make-2.png)

</div>

Rebooted afterwards, then tried installing Guest Additions again.


<div class="img-center"> 

![](/img/docs/vbox1.png)

</div>


Got a new error:


<div class="img-center"> 

![](/img/docs/vboxadd-new-1.png)

</div>


### 3. Look at /var/log/vboxadd-setup.log to find out what went wrong [RESOLVED]

A quick Google search showed this: [elfutils-libelf-devel.x86_64 package on CentOS 8 / RHEL 8](https://linux-packages.com/centos-8/package/elfutils-libelf-develx86-64)

Followed it and then rebooted afterwards.

```bash
sudo dnf install -y elfutils-libelf-devel.x86_64
```

Tried installing the guest Additions again.


### Success!

After installing the **gcc, make**, **elfutils**, and doing the rest of the other previous steps, and restarting for the last time, I was able to finally copy and paste across my laptop and VMs in VIrtuaBox.


## References

- [How to enable copy and paste in VirtualBox](https://www.techrepublic.com/article/how-to-enable-copy-and-paste-in-virtualbox/)
- [Installing multiple packages with one yum command](https://unix.stackexchange.com/questions/7638/installing-multiple-packages-with-one-yum-command)


As always, happy learning! 😀

---
title: "Systemd and Systemd units"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 13
last_update:
  date: 7/8/2022
---


## Systemd and Systemd Units

Systemd is a system and service manager for Linux operating systems, designed to replace the traditional SysVinit system. It provides a more efficient and flexible way to manage system processes, startup services, and system states. Systemd introduces the concept of units and targets, which offer a modular and unified approach to system configuration and management.

- Systemd is the manager of everything after the Linux kernel starts. 
- Managed systems are called **units.** 
- Different unit types include:
  - services 
  - mounts 
  - timers
  - etc. 

**systemctl** is the management interface to work with **systemd**. 

![](/img/docs/sv-systemd-2.png)

### `systemd` vs `sysv init`

From [Differences between SysVinit, Upstart and Systemd](https://www.computernetworkingnotes.com/linux-tutorials/differences-between-sysvinit-upstart-and-systemd.html):

> Systemd is the replacement of the SysVinit and Upstart initializer programs. In RHEL6, the Upstart initialization program was used. Before RHEL6, the SysVinit was the default initialization program.

This diagram also shows the different `systemd` components: 

![](/img/docs/systemd-vs-sysv.png)


The sysv init contains various scripts:

```bash
$ ll /etc/rc*
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc0.d -> rc.d/rc0.d
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc1.d -> rc.d/rc1.d
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc2.d -> rc.d/rc2.d
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc3.d -> rc.d/rc3.d
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc4.d -> rc.d/rc4.d
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc5.d -> rc.d/rc5.d
lrwxrwxrwx.  1 root root  10 Jul 27  2021 /etc/rc6.d -> rc.d/rc6.d
lrwxrwxrwx.  1 root root  13 Dec 10 09:31 /etc/rc.local -> rc.d/rc.local
```

### Does systemd also rely on these sysvinit scripts?

Systemd has its collection of configuration files which are composed of unit and target files. The sysvinit scripts can be deleted, but it is recommended to maintain backwards compatibility since some services in the system may still expect those files to exist.

### Systemd Units

The configuration files for systemd can be found in `/lib/systemd/system`:

```bash
$ ls /lib/systemd/system
```

To see all unit types that can be managed through systemd:

```bash
[root@tst-rhel ~]# systemctl -t help
Available unit types:
service
socket
target
```

To get an overview of units:

```bash
systemctl list-unit-files
systemctl list-units
```

### Systemd Units vs. Targets

The individual files are considered units, while a target is a collection of units.

```bash
$ ls /lib/systemd/system/*.target

/lib/systemd/system/basic.target               /lib/systemd/system/kexec.target              /lib/systemd/system/runlevel4.target
/lib/systemd/system/bluetooth.target           /lib/systemd/system/local-fs-pre.target       /lib/systemd/system/runlevel5.target
/lib/systemd/system/boot-complete.target       /lib/systemd/system/local-fs.target           /lib/systemd/system/runlevel6.target
/lib/systemd/system/cloud-config.target        /lib/systemd/system/multi-user.target         /lib/systemd/system/selinux-autorelabel.target
/lib/systemd/system/cloud-init.target          /lib/systemd/system/network-online.target     /lib/systemd/system/shutdown.target
/lib/systemd/system/cryptsetup-pre.target      /lib/systemd/system/network-pre.target        /lib/systemd/system/sigpwr.target
```

### Which Files to Use and Load

How do we tell systemd which files to use and load? This is where **systemctl** comes into play. It lets us manage the configuration without the need for users to access and touch the files.
As an example, we can enable the HTTP server on bootup by running:

```bash
$ sudo systemctl enable httpd
```

To run the service right now, follow the `enable` command with:

```bash
$ sudo systemctl start httpd
```

The two commands can also be combined into a single one:

```bash
$ sudo systemctl enable --now httpd
```

To check the status of the service:

```bash
$ sudo systemctl status httpd
```

We can also use systemd to list all the services and tells you which ones took the longest to start.

```bash
$ sudo systemd-analyze blame
    8min 23.830s cloud-final.service
         11.964s kdump.service
          1.174s initrd-switch-root.service
           749ms ldconfig.service
           702ms cloud-config.service
           142ms choose_repo.service
           110ms sshd-keygen@ecdsa.service
           110ms sshd-keygen@ed25519.service
            94ms import-state.service
            93ms systemd-vconsole-setup.service
            89ms initrd-parse-etc.service
            85ms systemd-remount-fs.service
```

## Systemd Targets

Systemd target is essential in booting Linux. They are a group of unit files, but there are also **isolatable targets**
- **emergency.target** - minimal, allows troubleshooting and allows minimal services
- **rescue.target** - for troubleshooting also, loads more services. If you can't get to prompt, you can start with rescue and then proceed with emergency
- **multiuser.target** - this is where the server normally starts from, this is the state where all services are running, but there is no GUI
- **graphical.target** - all services are started + GUI

![](/img/docs/sv-systemd-targets.png)


### Target Files 

Notice that when you enable or disable a service, the service knows where it should be enabled into. As you can see, it is enabling the service into multiuser.target.

```bash
$ systemctl enable httpd
Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.
```
```bash
$ systemctl disable httpd
Removed /etc/systemd/system/multi-user.target.wants/httpd.service.
```

When you enable a service, a symbolic link is created here:

```bash
$ ll /etc/systemd/system/multi-user.target.wants/
total 0
lrwxrwxrwx. 1 root root 38 May  4  2021 auditd.service -> /usr/lib/systemd/system/auditd.service
lrwxrwxrwx. 1 root root 39 May  4  2021 chronyd.service -> /usr/lib/systemd/system/chronyd.service
lrwxrwxrwx. 1 root root 37 May  4  2021 crond.service -> /usr/lib/systemd/system/crond.service
lrwxrwxrwx. 1 root root 42 May  4  2021 irqbalance.service -> /usr/lib/systemd/system/irqbalance.service
lrwxrwxrwx. 1 root root 37 May  4  2021 kdump.service -> /usr/lib/systemd/system/kdump.service
```

We can open the target files using **systemctl**:

```bash
$ systemctl cat multi-user.target

[Unit]
Description=Multi-User System
Documentation=man:systemd.special(7)
Requires=basic.target
Conflicts=rescue.service rescue.target
After=basic.target rescue.service rescue.target
AllowIsolate=yes
```

To make our life easier, let's create a bash function that starts a systemd service and enables it automatically.

```bash
$ vim ~/.bashrc
# and add this at the end
function se() {
   sudo systemctl start $1
   sudo systemctl enable $1
}
```

Now, to start and enable `httpd`, we can simply run:
```bash
$ se httpd
```


### Dependency relations

Systemd targets have dependency relations. This means some units may be required. This can be seen by running:

```bash
$ systemctl list-dependencies
default.target
● ├─auditd.service
● ├─vdo.service
● ├─basic.target
● │ ├─-.mount
● │ ├─microcode.service
● │ ├─paths.target
● │ ├─slices.target
● │ │ ├─-.slice
● │ │ └─system.slice
● │ ├─sockets.target
● │ │ ├─dbus.socket
● │ │ ├─dm-event.socket
```

### Setting Default Systemd Targets

Common default targets are `multi-user.target` for a non-graphical multi-user system and `graphical.target` for systems with a graphical interface. You can easily check and change the default target using systemctl commands.

```bash
$ systemctl get-default
multi-user.target
```

To change:

```bash
$ systemctl set-default graphical.target
Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /usr/lib/systemd/system/graphical.target.

$ systemctl get-default
graphical.target
```


## Booting into a Specific Target

Sometimes, you may need to boot into a specific systemd target for troubleshooting or maintenance purposes. This can be done by modifying the boot parameters at startup to specify the desired target. 

- On the Grub 2 boot prompt, use the command below to boot into a specific target:

  ```bash
  systemctl.unit=xxx.target 
  ```

- To change between targets on a running system, use:

  ```bash
  systemctl isolate xxx.target
  ```

We can check the grub parameters during bootup.

![](/img/docs/sv-boot-grub-1.png)
![](/img/docs/sv-boot-grub-2.png)


### Booting into rescue.target

To boot into rescue.target, add **systemd.unit=rescue.target**:

![](/img/docs/sv-boot-grub-3.png)

It will proceed with the bootup. Here you'll need to enter root password to proceed with rescue.target.

![](/img/docs/sv-boot-grub-4.png)
![](/img/docs/sv-boot-grub-5.png)

To list the units that are loaded, including those that have an issue:

```bash
systemctl list-units
```

### Setting emergency.target

You will need to enter the root password again.

```bash
systemctl isolate emergency.target
```

![](/img/docs/sv-boot-grub-7.png)


To revert back: 

```bash
systemctl start graphical.target
```




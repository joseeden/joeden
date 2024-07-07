---
title: "Logging Options"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 45
last_update:
  date: 12/10/2021
---


## Logs for Hardware - `dmesg`

The `dmesg` command is useful for checking information about the boot process. 

- Hardware logs are maintained under the `dmesg` system.
- `dmesg` reads from the `/var/log/messages` file. 
- Messages are generated on every boot, showing the drivers loaded, the order they are loaded, addresses, and other relevant details.

Sample output: 

![dmesg logs](/img/docs/dmesg.png)

## Logs for Software - `syslog`

When you boot up a system, the systemd daemon is one of the first processes to start up, managing the bulk of software interactions with the kernel. When any of this software misbehaves, logs are stored in **/var/log/messages**.

## Do Logs Get Full?

For `dmesg`, it tracks all hardware changes since boot-up, and typically, hardware modifications while running are minimal. It creates a backup for:

- dmesg logs for the previous boot
- dmesg logs for the current boot

For `syslog`, logs can accumulate, especially if the system has been running for months without rebooting. To prevent the **messages** file from getting too large, the system performs a **log rotation**. This process renames the "messages" file by appending a date and creates a new, empty "messages" file for new logs.

## Centralized Logging

In cases where we might have hundreds of machines, we can forward all the logs into one central server. To do this, we use can use a **remote syslog** or**rsyslog** which takes all of the files and ships them off to a remote server.

## `journald` Replacing `syslog`

Systemd includes a new service called **journald** intended to replace syslog, though this transition has not yet occurred. As of RHEL 8, syslog remains the primary logging facility. Journald can be used but note that it is not persistent by default.

## `rsyslogd`

The `rsyslogd` daemon is an enhanced version of the `syslogd` daemon, designed to handle high-performance and enterprise-level logging. It is highly configurable, allowing for detailed log management, including filtering, forwarding, and storing logs in various formats. In RHEL 8, `rsyslogd` works alongside `systemd-journald` to ensure comprehensive logging. 

To view logs:

```bash
journalctl
```

To check if `rsyslog` is installed and running:

```bash
sudo dnf list rsyslog
```

### Persistence 

Note that it is not persistent by default. As such, systemd-journald is being connected to rsyslogd via /dev/log. The way it happens is:

1. Everything that systemd-journald logs are logged into /dev/log.
2. Rsyslogd monitors /dev/log, gets the messages from it, and writes it to /var/log.

To make systemd-journald persistent:

1. Create a directory **/var/log/journal**
2. Restart systemd-journal process or restart your system
3. After restarting, all logs will be written to /var/log/journal

### Configuration Files 

The main configuration file for rsyslogd is located at `/etc/rsyslog.conf`, and additional configurations can be added in the `/etc/rsyslog.d/` directory. The configuration file is divided into modules, global directives, and rules.

- `rsyslogd` is and must be backwards compatible with the archaic syslog service. 
- In syslog, a fixed number of facilities was defined, like kern, authpriv, cron, and more. 
- To work with services that don't have their own facility, local (0..7) can be used. 
- Because of the lack of facilities, some services take care of their own logging and don't use rsyslog.
- Use `logger` command to write messages to rsyslog manually. 

Each logger line contains three items:

- `facility`: the specific facility that the log is created for.
- `severity`: the severity from which should be logged. 
- `destination`: the file of other destination the log should be written to.

Check the status of the `rsyslog` service:

```bash
systemctl status rsyslog.service
```

List configuration files:

```bash
$ ll /etc/rsyslog.
rsyslog.conf  rsyslog.d/

$ ll /etc/rsyslog.*
-rw-r--r--. 1 root root 3186 Aug  6 13:31 /etc/rsyslog.conf

/etc/rsyslog.d:
total 4
-rw-r--r--. 1 root root 255 Dec  9 02:07 21-cloudinit.conf
```

## Rsyslog Configuration File

The main configuration file, `/etc/rsyslog.conf`, contains several sections that define how logs are handled. The important part of the rsyslog.conf is the **RULES** section:

```bash
vi /etc/rsyslog.conf
```

```bash
## RULES ####

# Log all kernel messages to the console.
# Logging much else clutters up the screen.
#kern.*                                                 /dev/console

# Log anything (except mail) of level info or higher.
# Don't log private authentication messages!
*.info;mail.none;authpriv.none;cron.none                /var/log/messages

# The authpriv file has restricted access.
authpriv.*                                              /var/log/secure

# Log all the mail messages in one place.
mail.*                                                  -/var/log/maillog


# Log cron stuff
cron.*                                                  /var/log/cron

# Everybody gets emergency messages
*.emerg                                                 :omusrmsg:*

# Save news errors of level crit and higher in a special file.
uucp,news.crit                                          /var/log/spooler

# Save boot messages also to boot.log
local7.*                                                /var/log/boot.log
```

### Kernel Messages

This section logs all kernel messages to the console. It is usually commented out to avoid cluttering the screen with too many messages.

```bash
# Log all kernel messages to the console.
# Logging much else clutters up the screen.
#kern.* /dev/console
```

### General Messages

This rule logs all messages of level `info` or higher, excluding mail, private authentication, and cron messages. These logs are stored in `/var/log/messages`.

```bash
# Log anything (except mail) of level info or higher.
# Don't log private authentication messages!
*.info;mail.none;authpriv.none;cron.none /var/log/messages
```

### Authentication Messages

Authentication-related messages are logged by the `authpriv` facility and stored in `/var/log/secure`.

```bash
# The authpriv file has restricted access.
authpriv.* /var/log/secure
```


### Mail Messages

Mail-related messages are logged by the `mail.*` facility and stored in `/var/log/maillog`.

```bash
# Log all the mail messages in one place.
mail.* -/var/log/maillog
```

### Cron Messages

Messages related to cron jobs are logged by the `cron.*` facility and stored in `/var/log/cron`.

```bash
# Log cron stuff
cron.* /var/log/cron
```

### Emergency Messages

Notice that for emergency messages, logs doesn't go to a file. Instead, it is written to a module, `omusrmsg` (pronounced "om-user-message") is the output module (om) that makes sure message is written to user.

```bash
# Everybody gets emergency messages
*.emerg                                                 :omusrmsg:*
```

### Printer and News Messages

Messages related to printing and news are logged by the `uucp` and `news` facilities, respectively, and stored in `/var/log/spooler`.

```bash
# Save news errors of level crit and higher in a special file.
uucp,news.crit /var/log/spooler
```

### Boot Messages

Messages generated during the boot process are logged by the `local7` facility and stored in `/var/log/boot.log`.

```bash
# Save boot messages also to boot.log
local7.* /var/log/boot.log
```

## `systemd-journald`

Configurations for `systemd-journald` are set up in the `journald.conf` file. This service is responsible for collecting and storing logging data.

```bash
$ ll /etc/systemd/
coredump.conf  journald.conf  logind.conf    resolved.conf  system/        system.conf    user/          user.conf

$ ll /etc/systemd/journald.conf
-rw-r--r--. 1 root root 1027 Jun 22  2018 /etc/systemd/journald.conf
```

To view log messages, use the `journalctl` command. This command has many options to filter and display logs. You can press Tab after entering `journalctl` to see available options.

```bash
journalctl
```

Sampel output: 

```bash
Jun 15 09:22:51 LinuxServer kernel: Linux version 5.15.153.1-microsoft-standard-WSL2 (root@643s912k67d5) (gcc (GCC) 11.2.0>
Jun 15 09:22:51 LinuxServer kernel: Command line: initrd=\initrd.img WSL_ROOT_INIT=1 panic=-1 nr_cpus=4 hv_utils.timesync_>
Jun 15 09:22:51 LinuxServer kernel: KERNEL supported cpus:
Jun 15 09:22:51 LinuxServer kernel:   Intel GenuineIntel
Jun 15 09:22:51 LinuxServer kernel:   AMD AuthenticAMD
Jun 15 09:22:51 LinuxServer kernel:   Centaur CentaurHauls
Jun 15 09:22:51 LinuxServer kernel: BIOS-provided physical RAM map:
Jun 15 09:22:51 LinuxServer kernel: BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable
Jun 15 09:22:51 LinuxServer kernel: BIOS-e820: [mem 0x00000000000e0000-0x00000000000e0fff] reserved
Jun 15 09:22:51 LinuxServer kernel: BIOS-e820: [mem 0x0000000000100000-0x00000000001fffff] ACPI data
Jun 15 09:22:51 LinuxServer kernel: BIOS-e820: [mem 0x0000000000200000-0x00000000f7ffffff] usable
Jun 15 09:22:51 LinuxServer kernel: BIOS-e820: [mem 0x0000000100000000-0x00000001021fffff] usable 
```

Example: Check logs for `sshd`.

```bash
$ journalctl UNIT=sshd
-- Logs begin at Thu 2021-12-23 22:27:11 PST, end at Sun 2021-12-26 18:11:47 PST. --
-- No entries --
```

## Preserving `systemd-journald`

By default, `systemd-journald` writes logs to a runtime journal, which is not persistent across reboots. To preserve logs:

1. Check the current status of `systemd-journald`.

    ```bash
    systemctl status systemd-journald
    ```

2. Create the `/var/log/journal` directory.

    ```bash
    sudo mkdir /var/log/journal
    ```

3. Restart the `systemd-journald` service.

    ```bash
    sudo systemctl restart systemd-journald
    ```

4. Verify that logs are now written to a persistent system journal.

    ```bash
    sudo systemctl status systemd-journald
    ```

## Systemd Journal Log Rotation

Log rotation ensures that log files do not consume too much disk space. It is managed by the `logrotate` utility. Configuration files for log rotation are located in `/etc/logrotate.conf` and `/etc/logrotate.d/`.

- Built-in log rotation for the journal runs monthly. 
- The journal cannot grow beyond 10% of the size of the file system it is on. 
- The journal will also make sure at least 15% of its file system will remain available as free space. 
- These settings can be changed through `/etc/systemd/journald.conf`. 
- Logrotate is started through **cron.daily** to ensure that log files don't grow too big. 

List logrotate configurations:

```bash
ll /etc/logrotate.conf
```

Open the `logrotate.conf` file:

```bash
vim /etc/logrotate.conf
```

```bash
# see "man logrotate" for details
# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# use date as a suffix of the rotated file
dateext

# uncomment this if you want your log files compressed
#compress

# RPM packages drop log rotation information into this directory
include /etc/logrotate.d

# system-specific logs may also be configured here.
```

List contents of the logrotate.d directory:

```bash
$ ll /etc/logrotate.d/

total 56
-rw-r--r--. 1 root root 130 Feb 19  2018 btmp
-rw-r--r--. 1 root root 160 May 12  2021 chrony
-rw-r--r--. 1 root root 113 Aug  4 17:58 corosync
-rw-r--r--. 1 root root  88 Apr 12  2021 dnf
-rw-r--r--. 1 root root  93 Jul 30 22:31 firewalld
-rw-r--r--. 1 root root 194 Oct 27 02:15 httpd
-rw-r--r--. 1 root root 162 Dec  9 11:18 kvm_stat
-rw-r--r--. 1 root root 277 Aug 20 22:47 pacemaker
-rw-r--r--. 1 root root 151 Sep 24 17:24 pcsd
-rw-r--r--. 1 root root 155 Nov 22 17:13 samba
-rw-r--r--. 1 root root 237 Dec  7 22:41 sssd
-rw-r--r--. 1 root root  88 Sep  3 02:16 subscription-manager
-rw-r--r--. 1 root root 226 Aug  6 13:31 syslog
-rw-r--r--. 1 root root 145 Feb 19  2018 wtmp
```
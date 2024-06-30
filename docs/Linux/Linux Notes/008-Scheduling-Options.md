title: Scheduling Options
tags: [Linux, Red Hat, Certifications]
sidebar_position: 8
last_update:
  date: 7/8/2022
---




## Scheduling Options 

![](/img/docs/sv-cron-at.png)
![](/img/docs/sv-cron-1.png)
![](/img/docs/sv-cron-2.png)


## System Cron

Cron is a scheduling tool used to execute commands or scripts at specific dates, times, or intervals. It is stateless, meaning it doesn't remember the last time a job was run. One disadvantage is that if the server is turned off at the scheduled time, the job will not run.

To check all CRON jobs:
```bash
ll | grep cron 
```

To stop users from scheduling a cron, put them in `/etc/cron.deny`:
```bash
vim /etc/cron.deny
```

To specify users allowed and deny the rest, put them in `/etc/cron.allow`:
```bash
vim /etc/cron.allow
```

To schedule cron job (obsolete method):
```bash
vim /etc/crontab
```

New way to generate time-specific cron jobs:
```bash
vim /etc/cron.d
```

### Crontab Format

The format for a cron job entry in the crontab file:
```bash
* * * * *  <user> <command or script>
```
- First `*`   - Minutes, 0-59
- Second `*`  - Hours, 0-23
- Third `*`   - Day of the month, 1-31
- Fourth `*`  - Month of the year, 1-12 or jan,feb,mar...
- Fifth `*`   - Day of the week, 0-6 or sun,mon,tue...

Examples:

Write "Hey!" to hello.txt every minute of every hour of every day:
```bash
* * * * * root echo "Hey!" >> /tmp/hello.txt
```

Run command every 5 minutes of every hour:
```bash
*/5 * * * * root <command>
```

Run command at 1am and then every 5 minutes afterwards:
```bash
*/5 1 * * * root <command>
```

Run command every 2 minutes of every 3 hours:
```bash
*/2 */3 * * * root <command>
```

Run every 2 minutes between 12am to 3am:
```bash
*/2 0-3 * * * root <command>
```

Run command every 2 minutes starting 1am, on the first 3 days of the month:
```bash
*/2 1 1-3 * * root <command>
```

Run command every 2 minutes starting 1am on 1st and 15th day of the month:
```bash
*/2 1 1,15 * * root <command>
```

### Cron - Simplified

For simplified scheduling, place scripts in the appropriate directory:

To run script daily, put script here:
```bash
/etc/cron.daily 
```

To run script hourly, put script here:
```bash
/etc/cron.hourly
```

To run script weekly, put script here:
```bash
/etc/cron.weekly 
```

### User Cron - Format

The format for a user-specific cron job entry:
```bash
* * * * *  <command or script>
```

To specify user-specific cron:
```bash
crontab -e 
```

To view all my cron jobs:
```bash
crontab -l
```

To view all users with cron:
```bash
# NOTE: Files in this dir should not be edited directly
ll /var/spool/cron
```

To check logs of cron:
```bash
tail -f /var/log/cron
```


### Anacron

![](/img/docs/sv-anacron.png)

```bash
[root@tst-rhel ~]# vim /etc/anacrontab
# /etc/anacrontab: configuration file for anacron

# See anacron(8) and anacrontab(5) for details.

SHELL=/bin/sh
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
# the maximal random delay added to the base delay of the jobs
RANDOM_DELAY=45
# the jobs will be started during the following hours only
START_HOURS_RANGE=3-22

#period in days   delay in minutes   job-identifier   command
1       5       cron.daily              nice run-parts /etc/cron.daily
7       25      cron.weekly             nice run-parts /etc/cron.weekly
@monthly 45     cron.monthly            nice run-parts /etc/cron.monthly
```


## Systemd Timers

![](/img/docs/sv-systemd-timer-2.png)
```bash
$ man systemd.time
systemd.time   systemd.timer

$ ll /usr/lib/systemd/system/*timer
-rw-r--r--. 1 root root 138 Jun 15  2021 /usr/lib/systemd/system/chrony-dnssrv@.timer
-rw-r--r--. 1 root root 320 Apr 12  2021 /usr/lib/systemd/system/dnf-makecache.timer
-rw-r--r--. 1 root root 170 Jun  7  2021 /usr/lib/systemd/system/fstrim.timer
-rw-r--r--. 1 root root 696 Mar  3  2021 /usr/lib/systemd/system/insights-client.timer
-rw-r--r--. 1 root root 146 Aug 12  2018 /usr/lib/systemd/system/mlocate-updatedb.timer
-rw-r--r--. 1 root root 130 Aug 18 15:39 /usr/lib/systemd/system/nm-cloud-setup.timer
-rw-r--r--. 1 root root 490 Jun 22  2018 /usr/lib/systemd/system/systemd-tmpfiles-clean.timer
-rw-r--r--. 1 root root 346 Apr 30  2021 /usr/lib/systemd/system/unbound-anchor.timer
```

In the examples above, we see timer files. All timer files has associated service files. As example, we see fstrim.
```bash
$ cd /usr/lib/systemd/system
eden@tst-rhel:system $ ll fstrim*
-rw-r--r--. 1 root root  96 Jun  7  2021 fstrim.service
-rw-r--r--. 1 root root 170 Jun  7  2021 fstrim.timer
```

fstrim.timer tells how often fstrim.service is ran.
```bash

eden@tst-rhel:system $ cat fstrim.service
[Unit]
Description=Discard unused blocks

[Service]
Type=oneshot
ExecStart=/usr/sbin/fstrim -av

eden@tst-rhel:system $ cat fstrim.timer
[Unit]
Description=Discard unused blocks once a week
Documentation=man:fstrim

[Timer]
OnCalendar=weekly
AccuracySec=1h
Persistent=true

[Install]
WantedBy=timers.target
```

Checking status
```bash
eden@tst-rhel:system $ systemctl status fstrim.service
● fstrim.service - Discard unused blocks
   Loaded: loaded (/usr/lib/systemd/system/fstrim.service; static; vendor preset: disabled)
   Active: inactive (dead)
eden@tst-rhel:system $
eden@tst-rhel:system $ systemctl status fstrim.timer
● fstrim.timer - Discard unused blocks once a week
   Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; disabled; vendor preset: disabled)
   Active: inactive (dead)
  Trigger: n/a
     Docs: man:fstrim
```

To enable and start fstrim, **you enable the timer, NOT the service**.
Notice the line with **Active**, it is followed by "waiting". This means it is waiting until the time the service is suppose to run.
```bash
[root@tst-rhel ~]# systemctl enable fstrim.timer
Created symlink /etc/systemd/system/timers.target.wants/fstrim.timer → /usr/lib/systemd/system/fstrim.timer.
[root@tst-rhel ~]#
[root@tst-rhel ~]# systemctl start fstrim.timer
[root@tst-rhel ~]#
[root@tst-rhel ~]# systemctl status fstrim.timer
● fstrim.timer - Discard unused blocks once a week
   Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; enabled; vendor preset: disabled)
   Active: active (waiting) since Sun 2021-12-26 14:42:07 PST; 28s ago
  Trigger: Mon 2021-12-27 00:00:00 PST; 9h left
     Docs: man:fstrim

Dec 26 14:42:07 tst-rhel systemd[1]: Started Discard unused blocks once a week.

```


## At

![](/img/docs/sv-atd-1.png)
![](/img/docs/sv-atd-2.png)

#### Unit atd.service could not be found.

```bash
eden@tst-rhel:system $ systemctl status atd
Unit atd.service could not be found.
eden@tst-rhel:system $
eden@tst-rhel:system $ systemctl status atd.service
Unit atd.service could not be found.
eden@tst-rhel:system $
eden@tst-rhel:system $ which atd
/usr/bin/which: no atd in (/home/eden/.local/bin:/home/eden/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin)
eden@tst-rhel:system $
eden@tst-rhel:system $ where atd
-bash: where: command not found
```

Following this link online: [How to install and use at job scheduling?](https://unix.stackexchange.com/questions/86016/how-to-install-and-use-at-job-scheduling)
```bash
eden@tst-rhel:system $ sudo yum whatprovides atd
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:22:31 ago on Sun 26 Dec 2021 01:25:20 PM PST.
at-3.1.20-11.el8.x86_64 : Job spooling tools
Repo        : rhel-8-baseos-rhui-rpms
Matched from:
Filename    : /usr/sbin/atd

eden@tst-rhel:system $
eden@tst-rhel:system $
eden@tst-rhel:system $ sudo yum info atd
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:23:04 ago on Sun 26 Dec 2021 01:25:20 PM PST.
Error: No matching Packages to list
eden@tst-rhel:system $
eden@tst-rhel:system $
eden@tst-rhel:system $ sudo yum info rhel-8-baseos-rhui-rpms
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:23:19 ago on Sun 26 Dec 2021 01:25:20 PM PST.
Error: No matching Packages to list
```

Then I tried installing it. atd.service doesn't work, so I installed **at**.
```bash
eden@tst-rhel:system $ sudo yum install -y atd.service
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:24:31 ago on Sun 26 Dec 2021 01:25:20 PM PST.
No match for argument: atd.service
```
```bash
eden@tst-rhel:system $ sudo yum install -y at
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:24:40 ago on Sun 26 Dec 2021 01:25:20 PM PST.
Dependencies resolved.
=============================================================================================================================
 Package             Architecture            Version                          Repository                                Size
=============================================================================================================================
Installing:
 at                  x86_64                  3.1.20-11.el8                    rhel-8-baseos-rhui-rpms                   81 k
```

Enable it and start.
```bash
eden@tst-rhel:system $ systemctl status at
Unit at.service could not be found.
eden@tst-rhel:system $
eden@tst-rhel:system $ systemctl status atd
● atd.service - Job spooling tools
   Loaded: loaded (/usr/lib/systemd/system/atd.service; enabled; vendor preset: enabled)
   Active: inactive (dead)
eden@tst-rhel:system $
eden@tst-rhel:system $ systemctl status atd.service
● atd.service - Job spooling tools
   Loaded: loaded (/usr/lib/systemd/system/atd.service; enabled; vendor preset: enabled)
   Active: inactive (dead)
eden@tst-rhel:system $
eden@tst-rhel:system $
eden@tst-rhel:system $ sudo systemctl enable atd.service
eden@tst-rhel:system $ sudo systemctl start atd.service
eden@tst-rhel:system $ systemctl status atd.service
● atd.service - Job spooling tools
   Loaded: loaded (/usr/lib/systemd/system/atd.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2021-12-26 15:52:36 PST; 3s ago
 Main PID: 74416 (atd)
    Tasks: 1 (limit: 100840)
   Memory: 372.0K
   CGroup: /system.slice/atd.service
           └─74416 /usr/sbin/atd -f

Dec 26 15:52:36 tst-rhel systemd[1]: Started Job spooling tools.
```


#### Using atd

Here we'll try to schedule a job at 4pm, which is also called "teatime".
We'll send a "Heya!" to the log message and then send an email from the command line.

To exit the cli, use *Ctrl-D*.
```bash
eden@tst-rhel:system $ at teatime
warning: commands will be executed using /bin/sh
at> logger 'have a cup of tea'
at> mail -s 'hello root' < .
at>  <EOT>
job 1 at Sun Dec 26 16:00:00 2021
```

To query all scheduled jobs, run **atq**. Here we can see the job number on the first column.
```bash
eden@tst-rhel:system $ atq
1       Sun Dec 26 16:00:00 2021 a eden
```

To see the log,
```bash
$ sudo tail -f /var/log/messages

Dec 26 15:59:37 localhost systemd[1]: NetworkManager-dispatcher.service: Succeeded.
Dec 26 16:00:00 localhost systemd-logind[861]: New session 226 of user eden.
Dec 26 16:00:00 localhost systemd[1]: Started Session 226 of user eden.
Dec 26 16:00:00 localhost eden[74508]: have a cup of tea

```

To remove the job, use "atrm <job-num>". Since the job has ran already, it won't appear anymore.

```bash
$ atrm 1
Cannot find jobid 1
$
$ atq
$
```

------------------------------------------------

## Managing Temporary Files

![](/img/docs/sv-temp.png)
![](/img/docs/sv-temp-2.png) 

```bash
$ man tmpfile
tmpfile     tmpfiles.d
$ man tmpfiles.d

TMPFILES.D(5)                                           tmpfiles.d                                          TMPFILES.D(5)

NAME
       tmpfiles.d - Configuration for creation, deletion and cleaning of volatile and temporary files

SYNOPSIS
       /etc/tmpfiles.d/*.conf
       /run/tmpfiles.d/*.conf
       /usr/lib/tmpfiles.d/*.conf

       ~/.config/user-tmpfiles.d/*.conf
       $XDG_RUNTIME_DIR/user-tmpfiles.d/*.conf
       ~/.local/share/user-tmpfiles.d/*.conf
       ...
       /usr/share/user-tmpfiles.d/*.conf

DESCRIPTION
       systemd-tmpfiles uses the configuration files from the above directories to describe the creation, cleaning and
       removal of volatile and temporary files and directories which usually reside in directories such as /run or /tmp.

       Volatile and temporary files and directories are those located in /run (and its alias /var/run), /tmp, /var/tmp,
       the API file systems such as /sys or /proc, as well as some other directories below /var.

       System daemons frequently require private runtime directories below /run to place communication sockets and
       similar in. For these, consider declaring them in their unit files using RuntimeDirectory= (see systemd.exec(5)
       for details), if this is feasible.
```

```bash
$ systemctl cat systemd-tmpfiles-
systemd-tmpfiles-clean.service      systemd-tmpfiles-setup-dev.service
systemd-tmpfiles-clean.timer        systemd-tmpfiles-setup.service
```

To check the clean.timer,
```bash
$ systemctl cat systemd-tmpfiles-clean.timer
# /usr/lib/systemd/system/systemd-tmpfiles-clean.timer
#  SPDX-License-Identifier: LGPL-2.1+
#
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.

[Unit]
Description=Daily Cleanup of Temporary Directories
Documentation=man:tmpfiles.d(5) man:systemd-tmpfiles(8)

[Timer]
OnBootSec=15min
OnUnitActiveSec=1d
$
```
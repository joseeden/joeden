---
title: Scheduling Options
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 8
last_update:
  date: 12/27/2021
---


## Cron

Cron is a scheduling tool used to execute commands or scripts at specific dates, times, or intervals. 

- It is stateless, meaning it doesn't remember the last time a job was run. 
- If the server is turned off at the scheduled time, the job will not run.
- Different configuration files can be used to specify job schedule.
- Cron does not have STDOUT.
- Useful for re-occuring jobs, like backup jobs. 

Scheduling options:

- `crontab -e` - use as a specific user. 
- Can also create a cron file in /etc/cron.d 

Examples: 

1. To check all CRON jobs:
    ```bash
    ll | grep cron 
    ```

2. To stop users from scheduling a cron, put them in `/etc/cron.deny`:
    ```bash
    vim /etc/cron.deny
    ```

3. To specify users allowed and deny the rest, put them in `/etc/cron.allow`:
    ```bash
    vim /etc/cron.allow
    ```

4. To schedule cron job (obsolete method):
    ```bash
    vim /etc/crontab
    ```

5. New way to generate time-specific cron jobs:
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

1. Write "Hey!" to hello.txt every minute of every hour of every day:
    ```bash
    * * * * * root echo "Hey!" >> /tmp/hello.txt
    ```

2. Run command every 5 minutes of every hour:
    ```bash
    */5 * * * * root <command>
    ```

3. Run command at 1am and then every 5 minutes afterwards:
    ```bash
    */5 1 * * * root <command>
    ```

4. Run command every 2 minutes of every 3 hours:
    ```bash
    */2 */3 * * * root <command>
    ```

5. Run every 2 minutes between 12am to 3am:
    ```bash
    */2 0-3 * * * root <command>
    ```

6. Run command every 2 minutes starting 1am, on the first 3 days of the month:
    ```bash
    */2 1 1-3 * * root <command>
    ```

7. Run command every 2 minutes starting 1am on 1st and 15th day of the month:
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

Anacron is a periodic command scheduler, similar to cron, but it is used for running commands with a frequency of days instead of minutes or hours. Anacron ensures that jobs are run even if the machine was off during the scheduled time.

- Execute jobs on a regular basis, but not at a specific time. 
- Takes care of the jobs in:

    - `/etc/cron.hourly`
    - `/etc/cron.daily`
    - `/etc/cron.weekly`
    - `/etc/cron.monthly`

To configure Anacron, edit the file `/etc/anacrontab`:

```bash
[root@localhost ~]# vim /etc/anacrontab
```

Example of an Anacron configuration file:

```bash
# /etc/anacrontab: configuration file for anacron
# See anacron(8) and anacrontab(5) for details.

SHELL=/bin/sh
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
# the maximal random delay added to the base delay of the jobs
RANDOM_DELAY=45
# the jobs will be started during the following hours only
START_HOURS_RANGE=3-22

# period in days   delay in minutes   job-identifier   command
1       5       cron.daily              nice run-parts /etc/cron.daily
7       25      cron.weekly             nice run-parts /etc/cron.weekly
@monthly 45     cron.monthly            nice run-parts /etc/cron.monthly
```


## Systemd Timers

Systemd timers provide a more powerful and flexible way to schedule tasks compared to traditional cron jobs. Timers can be used to trigger systemd services at specific times or intervals.

- Read **man 7 systemd-timer** for more information about systemd timers.
- Read **man 7 systemd-timer** for specification of the time format to be used.

To view the manual for systemd timers:

```bash
man systemd.time
```

To list all timer files:
```bash
ll /usr/lib/systemd/system/*timer
```

In the examples above, we see timer files. All timer files have associated service files. For example, we see `fstrim`. To view the `fstrim` service and timer files:

```bash
cd /usr/lib/systemd/system
ll fstrim*
```

The `fstrim.timer` file specifies how often the `fstrim.service` is run:
```bash
cat fstrim.service
```
```
[Unit]
Description=Discard unused blocks

[Service]
Type=oneshot
ExecStart=/usr/sbin/fstrim -av
```

To view the `fstrim.timer` file:
```bash
cat fstrim.timer
```
```bash
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

To check the status of the `fstrim` service:
```bash
systemctl status fstrim.service
```

To check the status of the `fstrim` timer:
```bash
systemctl status fstrim.timer
```

To enable and start `fstrim`, you enable the timer not the service:

```bash
systemctl enable fstrim.timer
systemctl start fstrim.timer
systemctl status fstrim.timer
```
```bash
● fstrim.timer - Discard unused blocks once a week
   Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; enabled; vendor preset: disabled)
   Active: active (waiting) since Sun 2021-12-26 14:42:07 PST; 28s ago
  Trigger: Mon 2021-12-27 00:00:00 PST; 9h left
     Docs: man:fstrim

Dec 26 14:42:07 localhost systemd[1]: Started Discard unused blocks once a week.
```


## At

The `at` command is used to schedule commands to be executed once at a particular time in the future. It uses the `atd` daemon to execute scheduled commands.

### Unit atd.service could not be found.

To check the status of the `atd` service:
```bash
user1@localhost:system $ systemctl status atd
Unit atd.service could not be found.
```

```bash
user1@localhost:system $ systemctl status atd.service
Unit atd.service could not be found.
```


To locate `atd`:
```bash
user1@localhost:system $ which atd
/usr/bin/which: no atd in (/home/user1/.local/bin:/home/user1/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin)
```


Following this link online: [How to install and use at job scheduling?](https://unix.stackexchange.com/questions/86016/how-to-install-and-use-at-job-scheduling)

To find which package provides `atd`:
```bash
user1@localhost:system $ sudo yum whatprovides atd

Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:22:31 ago on Sun 26 Dec 2021 01:25:20 PM PST.
at-3.1.20-11.el8.x86_64 : Job spooling tools
Repo        : rhel-8-baseos-rhui-rpms
Matched from:
Filename    : /usr/sbin/atd
```

To get information about `atd`:
```bash
user1@localhost:system $ sudo yum info atd

Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 2:23:04 ago on Sun 26 Dec 2021 01:25:20 PM PST.
Error: No matching Packages to lis
```

To install `at`:
```bash
user1@localhost:system $ sudo yum install -y at
```

To enable and start `atd`:
```bash
user1@localhost:system $ sudo systemctl enable atd.service
user1@localhost:system $ sudo systemctl start atd.service
```

To check the status of `atd`:
```bash
user1@localhost:system $ systemctl status atd.service

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

### Using `atd`

To schedule a job at 4 PM (teatime):

```bash
user1@localhost:system $ at teatime
warning: commands will be executed using /bin/sh
at> logger 'have a cup of tea'
at> mail -s 'hello root' < .
at>  <EOT>
job 1 at Sun Dec 26 16:00:00 2021
```

To query all scheduled jobs, run `atq`:

```bash
user1@localhost:system $ atq
1       Sun Dec 26 16:00:00 2021 a eden
```

To see the log:
```bash
$ sudo tail -f /var/log/messages

Dec 26 15:59:37 localhost systemd[1]: NetworkManager-dispatcher.service: Succeeded.
Dec 26 16:00:00 localhost systemd-logind[861]: New session 226 of user eden.
Dec 26 16:00:00 localhost systemd[1]: Started Session 226 of user eden.
Dec 26 16:00:00 localhost eden[74508]: have a cup of tea
```

To remove a job, use "atrm job-num":

```bash
$ atrm 1
Cannot find jobid 1
$ atq
```

Since the job has ran already, it won't appear anymore.

## Managing Temporary Files

Systemd provides mechanisms for the creation, deletion, and cleaning of temporary files using the `tmpfiles.d` configuration.

- `/usr/lib/tmpfiles.d` manages setting for creating, deleting, and cleaning up temporary files. 
- **systemd-tmpfiles-clean.timer** unit can be configured to automatically clearn up temporary files.

    - Triggers the **systemd-tmpfiles-clean.service**.
    - Runs **systemd-tmpfiles --clean**.


To view the manual for `tmpfiles.d`:
```bash
man tmpfile
man tmpfiles.d
```

Example of the `tmpfiles.d` configuration files:
```bash
$ systemctl cat systemd-tmpfiles-
systemd-tmpfiles-clean.service      systemd-tmpfiles-setup-dev.service
systemd-tmpfiles-clean.timer        systemd-tmpfiles-setup.service
```

To check the `clean.timer`:
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
```

### Automatic File Cleanup

The `usr/lib/tmpfiles.d/tmp.conf` contains the settings for the automatic tmp file cleanup. 

When making any changes, you should create a copy of `/usr/lib/tmpfiles.d/tmp.conf` to `/etc/tmpfiles.d.` After making modifications, run the command to ensure the files doesn't contain any errors:

```bash
systemd-tmpfiles --clean /etc/tmpfiles.d/tmp.conf
```

### Modifying tmp.conf

To modify `tmp.conf` and manage temporary files using systemd's `tmpfiles.d` mechanism, follow these steps:

1. **Copy the tmp.conf File**:
   You should copy the original `tmp.conf` from `/usr/lib/tmpfiles.d/` to `/etc/tmpfiles.d/` where local modifications are intended.

   ```bash
   $ sudo cp /usr/lib/tmpfiles.d/tmp.conf /etc/tmpfiles.d/
   ```

2. **Edit tmp.conf**:
   Use your preferred text editor (e.g., `vim`) to modify `/etc/tmpfiles.d/tmp.conf`. For example:

   ```bash
   $ sudo vim /etc/tmpfiles.d/tmp.conf
   ```

   Modify the `tmp.conf` file according to your requirements. For instance, to clean `/tmp` every 5 days instead of 10 days, adjust the `q` line:

   ```ini
   # Clear tmp directories separately, to make them easier to override
   q /tmp 1777 root root 5d
   q /var/tmp 1777 root root 30d
   ```

   Save and exit the editor after making your changes.

3. **Cleaning Temporary Files**:

   - To create and manage a custom temporary directory using a separate configuration file (`mytemp.conf`), follow these steps:

     ```bash
     $ sudo vim /etc/tmpfiles.d/mytemp.conf
     ```

     Add a line to create a temporary directory `/run/mytemp` with appropriate permissions and cleanup time:

     ```ini
     d /run/mytemp 0700 root root 30s
     ```

     Save and exit the editor.

   - Apply the configuration changes using `systemd-tmpfiles`:

     ```bash
     $ sudo systemd-tmpfiles --create /etc/tmpfiles.d/mytemp.conf
     ```

   - Verify the creation of the temporary directory and file:

     ```bash
     $ sudo ls -l /run/mytemp/
     -rw-r--r--. 1 root root 0 Dec 26 16:31 myfile
     ```

   - Clean up temporary files using `systemd-tmpfiles`:

     ```bash
     $ sudo systemd-tmpfiles --clean /etc/tmpfiles.d/tmp.conf
     ```

     This command cleans up according to the modified rules in `/etc/tmpfiles.d/tmp.conf`.

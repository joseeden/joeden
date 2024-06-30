---
title: Scheduling Options
tags: [Linux, Red Hat, Certifications]
sidebar_position: 8
last_update:
  date: 7/8/2022
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


Anacron is a periodic command scheduler, similar to cron, but it is used for running commands with a frequency of days instead of minutes or hours. Anacron ensures that jobs are run even if the machine was off during the scheduled time.

To configure Anacron, edit the file `/etc/anacrontab`:

```bash
[root@tst-rhel ~]# vim /etc/anacrontab
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

![](/img/docs/sv-systemd-timer-2.png)


Systemd timers provide a more powerful and flexible way to schedule tasks compared to traditional cron jobs. Timers can be used to trigger systemd services at specific times or intervals.

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

Dec 26 14:42:07 tst-rhel systemd[1]: Started Discard unused blocks once a week.
```
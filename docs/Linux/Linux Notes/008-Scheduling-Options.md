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
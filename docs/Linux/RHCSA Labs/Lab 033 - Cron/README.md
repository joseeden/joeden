---
title: 033 - Cron
tags: [Linux, Red Hat, Certifications, Labs]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---

## Tasks

Schedule a cron job to automatically write "hello world" to syslog at every 10th minute after the hour. Ensure message is written with "notice" priority.


## Solution

Create a script that echoes "hello world" to syslog with the desired priority. 

```bash
#!/bin/bash

### syslog_hello.sh
logger -p local0.notice "hello world"
```

Make sure the script is executable:

```bash
chmod +x syslog_hello.sh
```


Edit the cron jobs for the current user:

```bash
crontab -e
```

Add the following line to schedule the script to run every 10th minute after the hour:

```plaintext
10 * * * * /path/to/syslog_hello.sh
```



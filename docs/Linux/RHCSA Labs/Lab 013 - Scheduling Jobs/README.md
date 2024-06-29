---
title: 013 - Scheduling Jobs
tags: [Linux, Red Hat, Certifications, Labs]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---


## Tasks

1. Ensure systemd timer cleans up the tmp files..
2. Run a cron job that will issue the command "touch /tmp/cronfile" 5 minutes from now.
3. Use **at** to schedule a job to power off your system at a convenient time laer today.


## Solution

### 1. Systemd timer cleans up the tmp files


Check if the `systemd-tmpfiles-clean` timer is enabled

```sh
sudo systemctl status systemd-tmpfiles-clean.timer
```

Enable the timer if it is not already enabled

```sh
sudo systemctl enable systemd-tmpfiles-clean.timer
sudo systemctl start systemd-tmpfiles-clean.timer
```

Verify the timer is active

```sh
sudo systemctl status systemd-tmpfiles-clean.timer
```

### 2. Run a scheduled crob job

Run a cron job that will issue the command below 5 minutes from now.

```bash
touch /tmp/cronfile
```
	
Open the crontab editor

```sh
crontab -e
```

Add the following line to schedule the cron job

```sh
# (Replace `date` and `time` with the current time plus 5 minutes)
MM HH DD MM * touch /tmp/cronfile
```

Where:
- `MM` is the minute (current minute + 5)
- `HH` is the hour
- `DD` is the day of the month
- `MM` is the month

For example, if the current time is `14:00`, the line would look like this:

```sh
05 14 * * * touch /tmp/cronfile
```

Save and exit the editor.

### 3. Schedule power off using at

Install `at` if it is not already installed

```sh
sudo yum install at
sudo systemctl enable atd
sudo systemctl start atd
```

Schedule the power-off job

```sh
echo "sudo poweroff" | at HH:MM
```

Replace `HH:MM` with the time you want to power off the system. For example, to power off at 10:30 PM:

```sh
echo "sudo poweroff" | at 22:30
```

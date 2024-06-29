---
title: 026 - Time Services
tags: [Linux, Red Hat, Certifications, Labs]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---


## Tasks

1. Set timezone to Singapore time.
2. Manually set time to 5 minutes ahead.
3. Verify time sync is active. Observe NTP.

----

## Solution

#### 1. Set timezone to Singapore time.

Before setting the timezone, check the current timezone settings:

```bash
timedatectl
```

Set the timezone to Singapore:

```bash
sudo timedatectl set-timezone Asia/Singapore
```

Verify the timezone change:

```bash
timedatectl
```

Ensure that `Time zone` now reflects `Asia/Singapore`.


#### 2. Manually set time to 5 minutes ahead.

Use the `date` command to set the system time 5 minutes ahead of the current time:

```bash
sudo date --set="+5 minutes"
```

Verify the updated time:

```bash
date
```

#### 3. Verify time sync is active. Observe NTP.

Use `timedatectl` to verify if NTP synchronization is active:

```bash
timedatectl status
```

Look for `NTP synchronized` in the output. It should indicate `yes` if NTP synchronization is active and the system clock is synchronized with a time server.

To observe logs related to NTP synchronization, check the logs depending on your Linux distribution:

```bash
journalctl -u systemd-timesyncd.service    # For systems using systemd-timesyncd
journalctl -u ntpd.service                # For systems using NTP daemon (ntpd)
```
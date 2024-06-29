---
title: 014 - Logging
tags: [Linux, Red Hat, Certifications]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---


## Tasks

1. Make sure systemd journal is logge dpersistently.
2. Create an entry in **rsyslog** that writes all messages with a severity of error or higher to /var/log/error.
3. Ensure /var/log/error is rotated on a monthly basis, and the 12 last logs are kept before they are rotated out.


## Solution

### 1. Ensure systemd journal is logged persistently

Create the directory for persistent journal logs:

```sh
sudo mkdir -p /var/log/journal
```

Modify the systemd journal configuration to enable persistent ging:

```sh
sudo nano /etc/systemd/journald.conf
```

Uncomment and set the `Storage` parameter to `persistent`:

```ini
[Journal]
Storage=persistent
```

Restart the systemd journal service:

```sh
sudo systemctl restart systemd-journald
```

### 2. Configuring rsyslog 

Create/modify the rsyslog configuration file:

```sh
sudo nano /etc/rsyslog.d/50-default.conf
```

Add the following line to log error and higher severity sages to `/var/log/error`:

```sh
*.err /var/log/error
```

Restart the rsyslog service:

```sh
sudo systemctl restart rsyslog
```


### 3. Log rotation and retention

Create a logrotate configuration file for `/var/log/error`:

```sh
sudo nano /etc/logrotate.d/error
```

Add the following configuration to rotate the log monthly and p the last 12 logs:

```sh
/var/log/error {
    monthly
    rotate 12
    compress
    missingok
    notifempty
    create 0640 root adm
    postrotate
        /usr/lib/rsyslog/rsyslog-rotate >/dev/null 2>&1 || true
    endscript
}
```
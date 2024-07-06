---
title: Systemd
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 12
last_update:
  date: 2/27/2022
---


## Tasks

1. Make sure httpd service is automatically started.
2. Edit its config such that on failure, it will continue afte 1 minute.


## Solution

### 1. Auto-start httpd

Enable the `httpd` service:

```sh
sudo systemctl enable httpd
```

Start the `httpd` service:

```sh
sudo systemctl start httpd
```


### 2. Configure httpd


Create a systemd override file for `httpd`:

```sh
sudo systemctl edit httpd
```

Add the following lines to the override file:

```ini
[Service]
Restart=on-failure
RestartSec=60
```

This will ensure that the `httpd` service restarts after 1 minute if it fails. Save and exit the editor.
Reload the systemd manager configuration:

```sh
sudo systemctl daemon-reload
```

Restart the `httpd` service to apply the changes:

```sh
sudo systemctl restart httpd
```

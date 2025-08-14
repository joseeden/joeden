---
title: "Name Resolution"
description: "Name Resolution"
tags: 
- Networking
- Cybersecurity
sidebar_position: 13
last_update:
  date: 1/16/2018
---


## Local Name Resolution

Local name resolution allows a computer to resolve hostnames to IP addresses without using external DNS servers. It relies on a simple file called the hosts file.

- Works entirely on the local machine
- Uses a hosts file with static IP-to-name mappings
- No root or TLD servers are involved

In Windows, the `hosts` file is located at

```bash
C:\Windows\System32\drivers\etc\hosts
```

In Linux: 

```bash
/etc/hosts 
```

Each line maps an IP address to one or more hostnames. Comments start with `#` and blank lines are ignored.

Example: 

```text
192.168.1.1   home-router
192.168.1.6   home-printer printer
127.0.0.1     localhost
```

This setup allows you to reach devices by name instead of typing IP addresses. For example:

```bash
ping home-router
```

This resolves to `192.168.1.1` and works immediately without restarting the system.

**Common Use Cases**

- Small local networks without internet
- Speed up access to frequently used sites by overriding DNS
- Test websites or redirect domains for development
- Basic URL filtering, e.g., mapping a site to `127.0.0.1`
- Ensure critical hosts are accessible when DNS is unavailable

**Best Practices**

- Avoid unnecessary entries to keep lookups fast
- Multiple aliases can share a single IP
- Organize mappings with comments by purpose
- Keep a backup of the hosts file before editing
- Restrict write access to prevent unauthorized changes

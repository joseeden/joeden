---
title: "Logging Tools"
description: "Tools for Logs"
tags: [Security, Cybersecurity, Security Operations, Networking, Vulnerability Management]
sidebar_position: 41
last_update:
  date: 1/30/2024
---

## Tools 

### Journalctl

Linux command-line utility for querying and displaying logs from the systemd journal, which is responsible for managing and storing log data on a Linux machine. 

- Part of the systemd system and service manager used in many Linux distributions.
- Filtering options, including time range, unit, priority, and log level.
- Offers interactive and non-interactive modes for browsing log entries efficiently.

### NXLog

NXLog is an open-source, cross-platform log collection and management tool that facilitates the collection, processing, and forwarding of logs from various sources.

- Supports multiple log formats and protocols, including syslog, JSON, and XML.
- Offers filtering, parsing, and enrichment capabilities for log data.
- Integrates with SIEM solutions and log management platforms.
- Unix, Linux, and Windows.


## Syslog 

There are different variations of syslog which all permit the logging of data from different types of systems in a central repository.

### Syslog

- Standard logging protocol used for message logging on Unix-like systems.
- Sends log messages to a central server or repository for storage and analysis.
- Widely supported by various network devices, servers, and applications.

### Rsyslog

- Enhanced version of syslog, offering additional features and capabilities.
- Supports reliable transmission of log messages over TCP and TLS.
- Provides advanced filtering, message modification, and routing options.
- Linux and Unix.

### Syslog-ng

- Advanced features and customization options.
- High-performance log processing, including filtering, routing, and correlation.
- Offers support for log classification, encryption, and archival.
- Linux and Unix.

### Configuring Linux Log Forwarding

Configure first the centralized host that will receive the logs.
Modify the /etc/rsyslog.conf. Enable a listener on port 514 or you can also specify a different port.

```bash
# /etc/rsyslog.conf

#### MODULES ####
module(load="imuxsock")  # provides support for local system logging (e.g., via logger command)
module(load="imklog")    # provides kernel logging support (previously done by rklogd)
module(load="imudp")     # provides UDP syslog reception
input(type="imudp" port="514")
module(load="imtcp")     # provides TCP syslog reception
input(type="imtcp" port="514")
```

Save the file and restart rsyslog afterwards.

```bash
sudo systemctl restart rsyslog 
sudo systemctl status rsyslog 
```

Verify that the listener is created:

```bash
sudo netstat -tnlpu | grep rsyslog  
```


<div class="img-center">

![](/img/docs/sec+-rsyslog-on-central-server.png)


</div>



Next, configure the client that will be forwarding the logs to the centralized log server. Modify the /etc/rsyslog.conf and add the line at the bottom of the file:

```bash
*.*  @10.1.1.5      # IP of the central log server.
``` 

"*.*" means any log entry. Save the file and restart the rsyslog service.

```bash
sudo systemctl restart rsyslog 
sudo systemctl status rsyslog 
```

To verify, we can use the logger utility.

```bash
logger "testing forwarding from client"  
```

This should appear in the syslog file in the client side.

```bash
tail -10 /var/log/syslog 
```

Go to the central log server and run the same command. We should see the same message.



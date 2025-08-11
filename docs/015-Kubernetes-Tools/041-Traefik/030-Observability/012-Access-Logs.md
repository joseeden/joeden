---
title: "Access Logs"
description: "Access Logs"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 12
last_update:
  date: 2/5/2023
---


## Overview

Access logs record details about who uses your service and what happens during their requests.

- They show if requests succeed or fail.
- These logs help track user activity and build web analytics.

They capture informatioon such as:

- Visitor’s IP address
- Requested path
- Response status (like 200 or 404)


## Configuring Access Logs

You can set access logs similarly to traffic logs by adjusting:

- File path and log format.
- Buffer size to control performance.
- Filters to log only certain status codes, retries, or slow requests.

For example, filter out all 200 status logs and only show errors like 404 or 500 to quickly find problems.

## Managing Access Logs

Good log management keeps your logs clean and useful.

- Limit or include **specific header** fields to reduce clutter.
- Use **log rotation** to prevent large log files from filling storage.
- Adjust **time zone settings** from default UTC to your preferred zone.

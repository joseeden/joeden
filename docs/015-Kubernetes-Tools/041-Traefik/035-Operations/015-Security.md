---
title: "Security"
description: "Security"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 10
last_update:
  date: 2/5/2023
---


## Securing Traefik Access

- **Restrict access to known IP addresse**s

  - Limit to internal networks or VPN users only
  - Prevent public internet access to reduce exposure

- **Enable secure mode**

  - Require access via domain names instead of IP addresses
  - Helps avoid accidental direct IP access

- **Avoid enabling the API in production unless necessary**

  - Only turn on features you really need
  - Minimizes potential attack surface

- **Use basic authentication middleware for dashboard and API**

  - Adds a login step for authorized users only
  - Works even if IP restrictions are in place

- **Always use HTTPS for dashboard and API**

  - Encrypts data in transit
  - Prevents exposing sensitive info in plain text


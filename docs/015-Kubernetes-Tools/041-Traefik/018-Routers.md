---
title: "Routers"
description: "Routers"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 18
last_update:
  date: 2/5/2023
---


## Router Labels 

Routers in Traefik connect incoming requests to backend services. To do that, we define rules using **labels** on containers or services.

- Labels are key-value pairs that guide how traffic is handled.
- Routers use these labels to match requests to services.
- Includes details like protocol, router type, name, and options.

Here’s the basic structure of a router label:

```bash
traefik.http.routers.<ROUTER_NAME>.rule
```

Where:

- `traefik` - Refers to the Traefik service in Docker.
- `http` - Protocol being used (could be `http`, `tcp`, or `udp`).
- `routers` - Type of config (can also be `services` or `middlewares`).
- `<ROUTER_NAME>` - A name you choose (user-defined).
- `rule` - The option you’re setting on the router (like matching a path or host).

Example Label:

```yaml
labels:
  - "traefik.http.routers.myapp.rule=Host(`example.com`)"
```

This means:

> "Create an HTTP router named `myapp`, and match requests where the host is `example.com`."


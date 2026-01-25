---
title: "Health Checks"
description: "Health Checks"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 11
last_update:
  date: 2/5/2023
---


## CLI - Health Check

Traefik includes a built-in command to check its health. This can be run inside the container to verify Traefik is working.

- The command is `traefik healthcheck`
- It checks the `/ping` endpoint to confirm Traefik is healthy
- Requires the ping feature to be enabled in static configuration

This makes it easy to quickly verify Traefik’s status without relying only on external monitoring.

## Ping Endpoint

The ping endpoint is enabled in the static configuration file.

```yaml
ping: {}
```

This provides a simple and direct way to confirm Traefik is responding.
 
- Can be left on the default entry point 
- Can be assigned to a separate port
- Useful for checking if Traefik is up

To access it from the dashboard:

```
http://localhost:8080/ping
```

It returns:

```bash
OK
```



## Docker Health Check

Docker can monitor Traefik using its built-in health check system.

- Runs `traefik healthcheck` on a set interval
- Retries if it fails and restarts the container if it stays unhealthy
- Can be customized for check interval, retries, and startup delay

Example in `docker-compose.yml`:

```yaml
healthcheck:
  test: ["CMD", "traefik", "healthcheck"]
  interval: 10s
  timeout: 2s
  retries: 3
  start_period: 5s
```

With this setup, Docker automatically restarts Traefik if it becomes unresponsive, reducing downtime and manual intervention.



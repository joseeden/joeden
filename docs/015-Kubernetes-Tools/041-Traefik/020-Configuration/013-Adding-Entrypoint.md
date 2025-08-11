---
title: "Adding Entrypoint"
description: "Adding Entrypoint in Docker Compose"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 13
last_update:
  date: 2/5/2023
---


## Overview

You can add `--entrypoints.web.address` in your Docker Compose file to have explicit control over the web entrypoint. This makes your setup more deterministic and configurable. 

Sample `docker-compose.yaml`:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.3
    command:
      - --api.insecure=true       # Enables the Traefik Dashboard
      - --providers.docker=true
      - --log.level=INFO
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"                   # Exposes port 80 for incoming web requests
      - "8080:8080"               # The Web UI port http://0.0.0.0:8080
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  whoami:
     image: containous/whoami
     labels:                      # Set hostname to the new service
       - "traefik.http.routers.whoami.rule=Host(`whoami.docker.localhost`)"
```

The line explicitly defines an entrypoint named `web` and bind it to port 80 on all network interfaces (`:` means all interfaces):

```yaml
- "--entrypoints.web.address=:80"
```

**If you add it:**

- You can change the port if needed (e.g., `:8080`)
- Entrypoint can be used in:

  - labels (e.g., `traefik.http.routers.myrouter.entrypoints=web`)
  - Routing rules


**If you don't add it:**

- Traefik creates a default `web` entrypoint on port 80 only if it's not overridden elsewhere.
- But:

  - If you define custom entrypoints (e.g., `websecure`) and don’t define `web`, then `web` won't exist.
  - Routes relying on `web` might break or not be matched.

- It's less predictable if you don't declare it explicitly, especially in complex setups.



## `ports` vs `entrypoints`

#### `ports` 

In the same `docker-compose.yml`:

```yaml
ports:
  - "80:80"
  - "8080:8080"
```

This means **Docker** maps:

- Host port `80` → Container port `80`
- Host port `8080` → Container port `8080`

It lets **Traefik reach the container**, but it **doesn’t tell Traefik what to do with those ports**.


#### `entrypoints`

On the other hand:

```yaml
`--entrypoints.web.address=:80
```

This tells **Traefik** to listen for HTTP traffic on port 80 inside the container and call that entrypoint `web`.

- Traefik uses this to define its internal routing logic.
- You can later reference `web` in your service/router labels.


## Do You Need Both?

Yes, **both serve different purposes**:

| Purpose                       | `ports`                                              | `--entrypoints.web.address=:80`                        |
| ----------------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Docker-level                  | **Yes** - Maps host to container port                | **No** - Doesn't affect Docker port mapping            |
| Traefik entrypoint definition | **No** - Does not affect Traefik's behavior directly | **Yes** - Defines how Traefik listens and labels ports |
| Needed for routing            | **No** - just exposes port                           | **Yes** - Required for Traefik to know what `web` is   |

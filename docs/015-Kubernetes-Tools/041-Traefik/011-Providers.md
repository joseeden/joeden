---
title: "Providers"
description: "Traefik Providers"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 11
last_update:
  date: 2/5/2023
---

## Overview

Providers help Traefik connect to other tools like Docker or Kubernetes. This is how Traefik knows where your apps are and how to route traffic to them.

- Providers connect Traefik to systems like Docker or Kubernetes  
- They detect changes like new containers or services  
- Traefik updates routes automatically through the provider  

Traefik watches your system and adjusts routes without needing manual changes, making your setup easier.


## How Traefik Uses a Provider

Once Traefik is linked to a provider, it listens for events and updates itself.

- New containers are auto-registered  
- Configuration is pulled in automatically  
- No need to restart or manually edit files  

For example, when you start a new Docker container, Traefik gets notified and instantly knows how to route traffic to it.


## Supported Providers in Traefik 2.x

Traefik 2.x supports many types of providers, grouped into categories.

- **Orchestrators**
  - Docker
  - Kubernetes
  - Rancher  

- **Key-value stores**
  - Consul
  - Etcd  

- **Manual config**
  - File  

Each provider type has its own setup method. You can find full documentation on [docs.traefik.io](https://doc.traefik.io).


## Example: Docker Provider Setup

When using Docker, Traefik is configured using labels. These labels tell Traefik how to handle containers.

- Use labels for router rules and service settings  
- Traefik listens to Docker events  
- Automatically updates when containers change  

Here’s a simple `docker-compose.yml` example:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.11
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"

  web:
    image: containous/whoami
    labels:
      - "traefik.http.routers.web.rule=Host(`localhost`)"
```

**Expected result:**  
When the stack runs, Traefik automatically detects the `web` container and routes traffic from `http://localhost` to it.


## Differences Between Traefik 1.x and 2.x

Some older providers from version 1.7 are still missing in 2.x.

- Not all 1.7 providers are in 2.x yet  
- Community is still working on porting them  
- 2.x focuses on the most used and stable providers  

If you’re looking for a provider that’s missing, check if it’s still only in 1.7. Updates are ongoing, and more providers are added over time.


## Final Thoughts on Providers

Providers are the way Traefik talks to your system and finds your apps.

- They help Traefik detect services in real time  
- Setup is different per provider but usually simple  
- Docker is a good example with label-based configuration  

By using providers, Traefik removes the need for static configs. It keeps routing up to date by watching your infrastructure, which saves time and avoids downtime.
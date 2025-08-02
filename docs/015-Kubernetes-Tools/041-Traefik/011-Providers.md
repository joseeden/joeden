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

Providers help Traefik connect to your system and finds your apps. This is how Traefik knows where your apps are and how to route traffic to them.

- They connect Traefik to systems like Docker or Kubernetes  
- They detect changes like new containers or services  
- Traefik updates routes automatically through the provider  

By using providers, Traefik removes the need for static configs. It keeps routing up to date by watching your infrastructure, which saves time and avoids downtime.


## How Traefik Uses a Provider

Once Traefik is linked to a provider, it listens for events and updates itself.

- New containers are auto-registered  
- Configuration is pulled in automatically  
- No need to restart or manually edit files  

For example, when you start a new Docker container, Traefik gets notified and instantly knows how to route traffic to it.


## Supported Providers 

Traefik 2.x supports many types of providers, grouped into categories.

Each provider type has its own setup method. You can find full documentation on [docs.traefik.io](https://doc.traefik.io).


| **Provider**     | **Type**        | **Configuration Type**         |
|------------------|------------------|---------------------------------|
| Docker           | Orchestrator     | Label                           |
| Kubernetes       | Orchestrator     | Custom Resource or Ingress      |
| ConsulCatalog    | Orchestrator     | Label                           |
| Marathon         | Orchestrator     | Label                           |
| Rancher          | Orchestrator     | Label                           |
| File             | Manual           | TOML/YAML format                |
| Consul           | KV               | KV                              |
| etcd             | KV               | KV                              |
| Redis            | KV               | KV                              |
| Zookeeper        | KV               | KV                              |

Below are some providers that are only available in Traefik 1.7:

| **Provider**         | **Type**     | **Configuration Type** |
| -------------------- | ------------ | ---------------------- |
| Azure Service Fabric | Orchestrator | Label                  |
| Eureka               | API          | TOML                   |
| Amazon ECS           | Orchestrator | Label                  |
| Amazon DynamoDB      | Orchestrator | Label                  |
| REST                 | API          | TOML                   |


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




---
title: "Static Configurations"
description: "Static Configurations"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 16
last_update:
  date: 2/5/2023
---


## Overview 

Static configuration sets up how Traefik should start and behave initially.

- Needed to enable features like dashboard and logs
- Used to define entry points (e.g. HTTP, HTTPS)
- Includes provider details (like Docker, file, etc.)

Static config is essential for starting Traefik and enabling core features. Once Traefik is running, changing static config needs a restart.


## Setting Static Configuration 

Before running Traefik, you need to set up its **static configuration**. This tells Traefik how to start and what core features to enable. There are three methods:

- Using a configuration file
- Using Command Line Arguments
- Using Environment Variables


Traefik only accepts one static config source at a time. This means you can only pick **one** method; mixing methods can sometimes cause issues.


## Using a Configuration File

You can define static settings in a YAML or TOML file.

- File should be named `traefik.yaml` or `traefik.toml`
- Traefik checks the `/etc/traefik/` folder by default
- You can override the path if needed

Consider the sample `traefik.yaml` file below: 

```yaml
# traefik.yaml
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
```

Traefik will look for this file when it starts. If found, it loads the settings from there.


## Using Command Line Arguments

You can also set static config directly in the command line or in a Docker Compose file.

- Use `command:` section in Compose
- All settings must go inside this section
- Clean and easy for small setups

This method is useful for quick testing or small container setups.

```yaml
## Docker compose file
version: "3.3"

services:
  traefik:
    image: traefik:v2.9
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
```


## Using Environment Variables

Static config can also be set through environment variables.

- Use `environment:` in Docker Compose
- Good for automation and scripting
- Variables must start with `TRAEFIK_` and use underscores

Environment variables are helpful when you want to change settings depending on where you deploy.

```yaml
services:
  traefik:
    image: traefik:v2.9
    environment:
      - "TRAEFIK_API_DASHBOARD=true"
      - "TRAEFIK_ENTRYPOINTS_WEB_ADDRESS=:80"
```



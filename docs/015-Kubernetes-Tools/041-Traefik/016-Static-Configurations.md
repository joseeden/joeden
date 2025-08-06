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

**Traefik only accepts one static config source at a time.** This means you can only pick one method; mixing methods can sometimes cause issues.


### Using a Configuration File

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


### Using Command Line Arguments

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


### Using Environment Variables

Static config can also be set through environment variables.

- Use `environment:` in Docker Compose
- Good for automation and scripting
- Variables must start with `TRAEFIK_` and use underscores

Environment variables are helpful when you want to change settings depending on where you deploy.

```yaml
## Docker compose file
version: "3.3"

services:
  traefik:
    image: traefik:v2.9
    environment:
      - "TRAEFIK_API_DASHBOARD=true"
      - "TRAEFIK_ENTRYPOINTS_WEB_ADDRESS=:80"
```

## Docker Provider 

Traefik supports Docker as a provider. You can connect it directly to your Docker environment to auto-discover services and route traffic to them.

- Only one provider should be used at a time
- Docker services are auto-detected 

You configure Traefik to use Docker so that it can watch running containers and automatically route traffic to them.

### Setting Up 

Start simple with just the basic settings to avoid confusion.

- Use only a few settings at first
- Add more only if needed
- Keep config changes small and easy to test

Start with a minimal setup like this so you can test each setting clearly and avoid unnecessary issues.

```yaml
api:
  dashboard: true

providers:
  docker:
    watch: true
    exposedByDefault: false
    swarmMode: true

log:
  level: INFO
```

This configuration enables the dashboard, watches for Docker events, and disables automatic exposure of all containers.


### How Networking Works

When Docker containers start, Traefik automatically connects to those exposing ports.

- Traefik uses the container’s published port (e.g. port 80)
- It routes internal traffic to that port
- If no port exists, use a label to choose the correct one
- If there are multiple ports, use a label as well

You can specify the port like this:

```yaml
labels:
  - "traefik.http.services.myapp.loadbalancer.server.port=8080"
```

This tells Traefik exactly which port to route traffic to. It's helpful for multi-port containers or when no port is exposed.

### Secure Integration

Security is very important when using Docker with Traefik.

- Enable TLS between Traefik and orchestrator (Docker)
- Do not expose the Docker API to the public
- Use best practices for securing Docker

Example: Mounting Docker like this gives Traefik full access:

```yaml
volumes:
  - "/var/run/docker.sock:/var/run/docker.sock"
```

This can be risky. It’s best to follow Docker’s security recommendations and only allow what’s truly needed.

You can also use Docker Bench to scan your system:

```bash
docker run -it --net host --pid host --cap-add audit_control \
  --security-opt apparmor=unconfined \
  --security-opt seccomp=unconfined \
  docker/docker-bench-security
```

This tool checks for common security issues in your Docker setup.


## EntryPoints in Traefik

EntryPoints define which ports Traefik listens on for incoming requests.

- Used to define ports like `80` for HTTP and `443` for HTTPS
- Can redirect traffic from one EntryPoint to another
- Supports TLS and headers for secure communication

EntryPoints control what traffic is allowed into Traefik, and how it should be handled from the start.

![](/imdg/docs/all-things-devops-traefik-entrypoint.png)

### Defining EntryPoints

You can define EntryPoints in YAML, TOML, or via command line.

- Name each EntryPoint (like `web` or `websecure`)
- Assign a port using `address`
- Add redirect rules if needed

Here’s an example in YAML:

```yaml
entryPoints:
  web:
    address: ":80"

  websecure:
    address: ":443"
```

This setup tells Traefik to listen on port 80 for HTTP and 443 for HTTPS.

### Redirecting HTTP to HTTPS

You can redirect HTTP traffic to HTTPS using a simple setting.

```yaml
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https

  websecure:
    address: ":443"
```

This setup helps enforce secure connections for all incoming traffic.

### Adding TLS and Headers

You can add TLS settings directly in the EntryPoint.

- Use custom certificates
- Apply forwarded headers

Here’s an example with TLS and forwarded headers:

```yaml
entryPoints:
  websecure:
    address: ":443"
    http:
      tls:
        certResolver: myresolver
      forwardedHeaders:
        insecure: true
```

This allows Traefik to apply security settings to all services using that EntryPoint.

### How It Appears in the Dashboard

Once set, Traefik’s dashboard will show all configured EntryPoints.

- `web` for HTTP (port 80)
- `websecure` for HTTPS (port 443)
- Internal EntryPoints like the dashboard itself may also be listed

If a test app like `cat-app` is connected, you’ll see how EntryPoints link routers to services in the dashboard.


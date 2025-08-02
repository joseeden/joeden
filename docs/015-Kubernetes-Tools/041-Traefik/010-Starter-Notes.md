---
title: "Starter Notes"
description: "Starter Notes on Traefik"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 10
last_update:
  date: 2/5/2023
---


## Overview

Traefik is a tool used for managing and routing web traffic. It’s popular because it’s simple to use and works well with modern tools like Docker and Kubernetes.

- Used by many people
- Easy to find on Docker Hub and GitHub
- Active community behind it

Traefik is designed to run efficiently and handle changes quickly.

- Written in Go (just like Docker and Kubernetes)
- Lightweight and fast
- No downtime when updating routes

This makes it a perfect fit for dynamic environments like containers, where things start and stop often.

## Why Traefik Was Created

Traefik was built to make handling traffic for microservices easier. Older proxies didn’t work well with fast-changing apps, so something more dynamic was needed.

- Traditional proxies were static
- Updating config manually took too much time
- Traefik was created to handle changes automatically

The goal was to remove the need to manually adjust settings every time something in your app changes. Traefik listens to your system and adjusts routing for you.


## How Traefik Works 

Traefik works by watching for changes in your system (like a new container starting) and then updating itself without needing a restart.

- Watches orchestrators like Docker or Kubernetes
- Detects new containers or services
- Updates routing automatically in real time

This means you no longer need to manually edit proxy settings every time your app changes. Traefik takes care of it instantly.


## Key Features

Traefik connects easily to many systems and adjusts its behavior on its own.

- Automatic discovery of new services
- Real-time updates to routing
- Integrates with Docker, Kubernetes, Nomad, and more

Even as your apps change constantly, Traefik makes your infrastructure easier to manage and keeps everything running smoothly.

- No manual config needed
- Containers can come and go freely
- Routing updates happen with no delay

:::info 

You just start your container, and Traefik figures out where it is and how to send traffic to it; No extra config needed.

:::


### Edge Router

Traefik acts like a doorman; it decides who gets in and where they should go.

- Handles incoming web traffic
- Decides if the request is allowed
- Sends allowed traffic to the right service

Think of it as someone at a door: they check who’s there, ask what room they want, and then let them in if everything checks out.

Here’s an example of how Traefik can route traffic based on domain name:

```yaml
labels:
  - "traefik.http.routers.my-service.rule=Host(`example.local`)"
```

**What it does:** 
When someone visits `http://example.local`, Traefik sends them to `my-service`.

This kind of rule makes it easy to control where traffic goes, without writing long config files.


### Real-Time Autodiscovery

The main benefit of Traefik is its ability to keep up with your apps automatically.

- Knows about services as soon as they start
- Pulls config from running containers
- No need to restart or reload
- Updates routing instantly

You can set rules like:

```yaml
labels:
  - "traefik.http.routers.app1.rule=Host(`app1.local`)"
  - "traefik.http.routers.app2.rule=Host(`app2.local`)"
```

**What it means:**
When you start a container with these labels, Traefik will immediately know where to send traffic for `app1.local` and `app2.local`.


## Use Cases 

### Traefik as a Reverse Proxy

Traefik’s main job is to sit in front of your apps and help route traffic to the right place.

- Acts as a reverse proxy
- Routes traffic using rules
- Supports load balancing

This helps you send requests to the right backend services. You can set up routes, handle API traffic, and manage which apps respond to which URLs.

### Load Balancing 

Load balancing helps spread traffic across multiple services so no single app is overloaded.

- Round-robin and least-connected methods
- Use request headers to decide routing
- Supports health checks

Unhealthy services are skipped during routing until they recover. This keeps apps stable and responsive even if one service fails.


### Certificate Management with Let’s Encrypt

Managing HTTPS certificates manually is hard. Traefik makes it easy with built-in support.

- Supports Let’s Encrypt out of the box
- Automatically handles renewals
- No need to manage certs manually

For example, if you run 10 or more sites, Traefik can automatically give each one a certificate and renew them regularly without you doing anything.


### Ingress for Kubernetes

Many people use Traefik as an Ingress controller in Kubernetes.

- One of the most popular Ingress controllers
- Works well with Kubernetes services
- But we’ll focus on Docker setup first


## Traefik Products 

Traefik comes in several versions and tools, depending on your needs.

- **Traefik CE** – Community Edition (free, open-source)
- **Traefik Enterprise (EE)** – Paid version with support and clustering
- **Traefik Mesh** – Service mesh for internal Kubernetes traffic
- **Traefik Pilot** – SaaS dashboard to control your Traefik setups remotely

<div class="img-center"> 

![](/img/docs/08012025-traefik-usecases.PNG)

</div>


## Lab: Basic Traefik Setup in Docker

Here’s a really simple example of a Traefik Docker Compose setup:

```yaml
version: '3'

services:
  reverse-proxy:
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

  whoami:
    image: containous/whoami
    labels:
      - "traefik.http.routers.whoami.rule=Host(`localhost`)"
```

**Expected result:**

When you open your browser to `http://localhost`, it should route you to the `whoami` service, and you’ll see some basic request info.



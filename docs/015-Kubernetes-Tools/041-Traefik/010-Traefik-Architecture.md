---
title: "Traefik Architecture"
description: "Traefik Architecture"
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

Traefik is a modern reverse proxy and load balancer designed for microservices. It automatically discovers services and routes traffic to them based on rules you define.

Traefik manages incoming traffic by organizing it into key parts you can configure.

- **Providers** 

  - Inform Traefik about available services and their health.
  - Provide details like IP addresses and status updates.

- **Entry points** 

  - Static ports defined in configuration.
  - Examples: 80 (HTTP), 443 (HTTPS), 8080 (dashboard).

- **Routers** 

  - Match requests to services using rules (like host or path).
  - Decide the destination for each incoming request.

- **Services** 

  - Use load balancers to spread traffic across containers.
  - Specify which ports the services use to listen for requests.


Traefik listens on entry points (ports) for incoming requests. Routers check these requests against rules like host names or paths. If a request matches, the router sends it to the right service. Services then balance the load across containers and handle ports.

<div class="img-center"> 

![](/img/docs/all-things-devops-traefik-architecture.png)

</div>

All these parts can be customized using **labels** on your containers. Labels let you define routing rules, load balancing options, and other settings without restarting Traefik. This makes Traefik flexible and easy to update dynamically.


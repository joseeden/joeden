---
title: "Middleware"
description: "Middleware"
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

Middleware sits between the router and the backend service. It processes requests before they reach the service and can be reused across multiple routers.

- Connects to routers
- Can link to one or many routers
- Handles request transformations

Middleware ensures requests are processed in a controlled way before reaching the backend.

<div class="img-center"> 

![](/img/docs/all-things-devops-traefik-middleware.png)

</div>


## Common Functions

Each middleware type helps control traffic flow and improve security.

- **Authentication**

  - Adds basic login credentials
  - Requires username and password
  - Returns 401 if access is denied

- **Content modification**

  - Manages the served content
  - Compresses images and data 
  - Reduces data size before sending to clients

- **Path modification**

  - Changes or strips parts of the URL
  - Redirects to different endpoints

- **Request lifecycle control**

  - Limits request rates
  - Manages API traffic bursts
  - Prevents abuse of services

- **Security features**

  - Adds extra protection layers
  - Works with authentication tools


## Middleware Deployment

Deployment requires linking middleware to routers.

- Create the middleware
- Attach middleware to the router
- Match names exactly between middleware and router

Without correct linking, middleware won’t be applied to requests.

## Middleware Labels

Labels define middleware and connect it to routers.

- `traefik.http.middlewares` defines middleware name and settings
- Router references middleware name exactly
- Matching names ensures connection between router and middleware

In the example below, we have the middleware called `test-compress`:

```yaml
labels:
  - "traefik.http.middlewares.test-compress.compress=true"
  - "traefik.http.routers.cat-app.middlewares=test-compress"
```

This links the `test-compress` middleware to the `cat-app` router.

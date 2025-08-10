---
title: "Basic Auth"
description: "Basic Auth"
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

Basic authentication middleware protects services by requiring a username and password before granting access.

- Connects to the router
- Checks username and password
- Allows or blocks requests based on credentials

This ensures that only authorized users can access the service.

## How It Works

When a request reaches the router, the basic authentication middleware intercepts it.

- If the credentials match, the request continues to the service
- If they are incorrect, the middleware responds with a 401 Unauthorized

This adds a security layer for services without built-in authentication.

<div class="img-center"> 

![](/img/docs/all-things-devops-traefik-basic-auth.png)

</div>


## Configuring Basic Authentication

Basic authentication in Traefik is set up using labels.

- Define middleware name
- Use `basicAuth` with hashed passwords
- Attach middleware to a router

Example:

```yaml
labels:
  - "traefik.http.middlewares.test-auth.basicauth.users=traffic:$$apr1$$xyz123$$abc456, user2:$$apr1$$def789$$ghi012"
  - "traefik.http.routers.cat-app.middlewares=test-auth"
```

Here:

- `test-auth` is the middleware name
- `traffic` and `user2` are usernames
- Passwords are stored as hashes

## Creating Password Hashes

Passwords must be hashed before adding them to the middleware.

- Use the `htpasswd` command in Linux
- Escape dollar signs by doubling them (`$` becomes `$$`)

Example:

```bash
htpasswd -nb traffic mypassword | sed 's/\$/\$\$/g'
```

Expected output:

```
traffic:$$apr1$$xyz123$$abc456
```

This output can be placed directly into the middleware label.

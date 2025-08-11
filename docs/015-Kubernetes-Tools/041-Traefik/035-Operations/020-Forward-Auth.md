---
title: "Forward Auth"
description: "Forward Auth"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 20
last_update:
  date: 2/5/2023
---


## Basic Authentication

Basic authentication protects your apps by checking who can access them but limited and less secure.

- Basic auth is good for simple password protection.
- It’s easy to crack and not ideal for bigger setups.
- For stronger security, you need more advanced options.

## Using Forward Auth with Auth0

Forward Auth acts as a gatekeeper for your apps. It improves authentication by connecting with **Auth0**, a cloud-based authentication service.

- Forward Auth sits with Traefik to control access.
- Apps use Auth0 libraries to manage users and groups.
- This setup enables single sign-on (SSO) across your apps.

When a user tries to access an app, Traefik checks with Forward Auth and Auth0 to confirm access. This way, you get better security and easier user management compared to basic auth.

<div class="img-center"> 

![](/img/docs/all-things-devops-traefik-forward-auth.png)

</div>
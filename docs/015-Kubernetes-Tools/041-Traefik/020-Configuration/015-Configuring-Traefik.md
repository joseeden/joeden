---
title: "Configuring Traefik"
description: "Configuring Traefik"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 15
last_update:
  date: 2/5/2023
---

## Overview

Traefik uses two main types of configurations: **static** and **dynamic**. Each type plays a specific role and behaves differently when changes are made.

- Static configuration is used when Traefik starts
- Dynamic configuration is used for live service changes
- Static config needs a restart to apply changes

Static configuration sets up the base of Traefik. Dynamic configuration handles live updates without restarting Traefik.

## Static Configurations

Static configuration sets up how Traefik should start and behave initially.

- Needed to enable features like dashboard and logs
- Used to define entry points (e.g. HTTP, HTTPS)
- Includes provider details (like Docker, file, etc.)

This setup is done before Traefik starts and cannot be changed without restarting it. It can be set using:

- A config file
- Environment variables
- Command-line flags

Static config is essential for starting Traefik and enabling core features. Once Traefik is running, changing static config needs a restart.

For more information, please see [Static Configurations](/docs/015-Kubernetes-Tools/041-Traefik/020-Configuration/016-Static-Configurations.md)


## Dynamic Configurations

Dynamic configuration is used to define services, routers, middlewares, and other runtime behaviors.

- Applied while Traefik is running
- Changes are picked up automatically
- Does not require a restart

You can update dynamic config by modifying the file, labels, or any connected provider. Traefik watches these and hot-reloads the changes.

Dynamic config lets you change routing behavior or service details on the fly, without restarting or losing traffic.

For more information, please see [Dynamic Configurations](/docs/015-Kubernetes-Tools/041-Traefik/020-Configuration/017-Dynamic-Configurations.md)


:::info 

You use static config to define how Traefik starts. You use dynamic config to control how Traefik works while it runs. Both are important and work together to keep your services running properly.


:::
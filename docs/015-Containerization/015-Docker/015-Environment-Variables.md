---
title: "Environment Variables"
description: "Environment Variables"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 15
last_update:
  date: 7/7/2022
---

## Overview

Environment variables allow us to use configurable values in our code without modifying the code itself. This flexibility is beneficial for changing settings without redeploying applications.

<div class='img-center'>

![](/img/docs/Images/docker-env-vars.png)

</div>

## Ways to Define Environment Variables

- **Dockerfile**
  - Use the `ENV` directive to set variables.
  - Automatically available in the container.

- **Environment File**
  - Store variables in a `.env` file.
  - Load them when starting a container.

- **Shell Environment Variables**
  - Set variables in the terminal session.
  - Pass them to the container at runtime.

- **Compose File**
  - Define variables in `docker-compose.yml`.
  - Simplifies configuration for multi-container applications.

## Additional Resources

- [Substitute environment variables in Compose files](https://docs.docker.com/compose/environment-variables/)
- [Exploring Docker Compose Environment variable behaviour](https://www.profit4cloud.nl/blog/exploring-docker-compose-environment-variable-behaviour/#:~:text=Environment%20variables%20can%20be%20defined%20in%20the%20Dockerfile.,the%20resulting%20image%20and%20container.)

 

 
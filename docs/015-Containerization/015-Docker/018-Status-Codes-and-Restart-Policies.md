---
title: "Status Codes and Restart Policies"
description: "Status Codes and Restart Policies"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 18
last_update:
  date: 7/7/2022
---


## Overview

It is helpful to know status codes especially when you're troubleshooting errors.

<div class='img-center'>

![](/img/docs/lab11statuscode0.png)

</div>

For managing container issues, restart policies can be defined in your docker-compose file. The default policy is `"no"`, meaning the container will not restart if it stops or crashes.

<div class='img-center'>

![](/img/docs/dockerbasics-restartpolicies.png)

</div>

In the example below, the restart policy is set to `"no"`. Quotes are necessary, as using `no` without quotes may be interpreted as a boolean false in YAML.

```yml
version: '3'
services:
  node-app:
    image: node
    restart: "no"
```

## `always` vs. `on-failure`

You do not need quotes for these options.

- **always**: The container will restart automatically if it crashes.
- **on-failure**: The container will restart only if it exits with a non-zero status code.


```yml
version: '3'
services:
  node-app:
    image: node
    restart: "no"
  
  web-server:
    image: redis
    restart: always
  
  worker:
    image: ubuntu
    restart: on-failure
```

When to use: 

- Use **always** for critical containers, like web servers, that should be running continuously.
- Use **on-failure** for containers handling batch jobs or processing files.
 

 
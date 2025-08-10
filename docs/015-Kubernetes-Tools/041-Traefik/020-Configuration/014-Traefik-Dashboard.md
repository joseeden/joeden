---
title: "Traefik Dashboard"
description: "Traefik Dashboard"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 14
last_update:
  date: 2/5/2023
---

## Overview

The dashboard gives a clear view of your traffic system and running services.

- Quick health check of traffic and services
- Helps with troubleshooting and monitoring
- Shows warnings and errors

To setup the dashboard and a simple test service, please see [Deploy Traefik with Docker.](/docs/015-Kubernetes-Tools/041-Traefik/020-Configuration/012-Deploy-Traefik-wth-Docker.md)


## Access the Dashboard 

To access the Traefik dashboard:

- Open `http://0.0.0.0:8080` to access the dashboard.
- Port 80 handles traffic; port 8080 shows the dashboard.
- Dashboard shows HTTP, TCP, UDP services and key features.

**NOTE:** If you get `ERR_ADDRESS_INVALID` when you try to access `http://0.0.0.0:8080` in your  dashboard, this means the browser cannot use the specific address as a destination address:

Instead, use the `localhost`:

```bash
http://localhost:8080/ 
```

![](/img/docs/08032025-traefik-dashboard-2.PNG)



## Routers and Services

Routers allow you easily check traffic flow and service health.

- Routers handle incoming traffic.
- Services are backend targets.
- Shows entry points, status, and container IPs.

For example, the dashboard itself runs under the `dashboard@internal` service:

![](/img/docs/08032025-traefik-dashboard-3.PNG)


If you click the **HTTP Services** tab, you will see all the active services. In this example, one of them is `whoami-01-overview@docker`:

![](/img/docs/08032025-traefik-dashboard-4.PNG)


If you click the service, you can see more details like health and endpoints:

![](/img/docs/08032025-traefik-dashboard-5.PNG)


Open a terminal and scale the `whoami` service to three containers:

```bash
docker compose scale whoami=3
```

:::info 

The `whoami` service is deployed with Docker. 
Please see [Deploy Traefik with Docker.](/docs/015-Kubernetes-Tools/041-Traefik/020-Configuration/012-Deploy-Traefik-wth-Docker.md)

:::


Going back to your browser, you should now see three servers listed for the `whoami` service.


![](/img/docs/08032025-traefik-dashboard-6.PNG)




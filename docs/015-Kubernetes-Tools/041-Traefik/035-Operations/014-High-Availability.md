---
title: "High Availability"
description: "High Availability"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 14
last_update:
  date: 2/5/2023
---



## Single Traefik Instance

Running a single Traefik instance is simple, but it has its risks. If Traefik crashes or stops, traffic won’t reach your containers.

- Containers keep running, but new requests get blocked.
- Issues like disk space filling up can cause failures.
- Updating Traefik may lead to downtime.
- During these moments, your service becomes unavailable.


## Traefik Cluster

To avoid downtime, use multiple Traefik instances working together in a cluster.

- Run several Traefik instances at the same time.
- Deploy each instance on a different server.
- If one server fails, the others keep handling traffic.

A typical high-availability setup includes:

- **Multiple Traefik instances:**

  - At least three, on different hosts.
  - Keeps traffic flowing if one node fails.

- **Virtual or Elastic IP:**

  - One IP address for all traffic.
  - Automatically routes to healthy instances.

- **Common storage:**

  - Shared place for storing SSL certificates.
  - Also holds configuration files, keeping instances in sync


## Common Storage

Traefik instances need to share certificates and configurations using common storage.

- They elect a leader to handle updates like renewing certificates.
- This keeps everything in sync and working well.

## How HA Traefik Works

Setting up HA Traefik involves:

- Incoming traffic goes to the virtual IP.
- The virtual IP routes requests to any healthy Traefik instance.
- Each Traefik reads and writes to the shared storage.
- Leader election makes sure updates are handled properly.

This setup helps avoid failures and downtime, keeping your services available all the time.

<div class="img-center"> 

![](/img/docs/07-traefik-canary-many-boxes.png)

</div>

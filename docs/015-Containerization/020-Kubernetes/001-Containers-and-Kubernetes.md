---
title: "Containers and Kubernetes"
description: "Container Management Challenges"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 1
last_update:
  date: 7/7/2022
---

## Containers

**Containers** are a way to package applications with their dependencies and runtimes, ensuring consistency across environments. 

In brief, containers:

- Are managed as "Linux processes."
- Stop running once their tasks are complete.
- Can map external volumes to keep data.
- Can publish ports for external access 

<div class='img-center'>

![](/img/docs/udacity-suse-1-container.png)

</div>

## Challenges of Containers

Containers have transformed software delivery but come with some challenges:

- How do we manage which ports map to which containers?
- How do we efficiently allocate containers to hosts?
- With horizontal scaling, how do we map service dependencies?
- As applications update and ports change, how do we handle frequent changes?

For example, the diagram below shows three NGINX containers running on one server. We can map container ports to host ports, allowing traffic to reach the containers. 

<div class='img-center'>

![](/img/docs/Server.png)

</div>

You can manually map ports, or use dynamic port mapping with the `-P` flag when starting containers. Running the command below three times will create three containers, each with a dynamically assigned port.

```bash
docker run -d -P nginx 
```

We can also throw in some basic scripting so that we can run the containers in one swoop.

```bash
for i in $(seq 3) ; do docker run -d -P nginx; done
```

Manually mapping ports works for a few containers, but adding more applications and hosts becomes challenging. Dependencies between applications add complexity.

<div class='img-center'>

![](/img/docs/manydockers.png)

</div>

For instance, this script can set up multiple containers across multiple hosts:

```bash
for i in $(seq 6); do
    for j in $(seq 3); do
        ssh node0$i docker run -d -P app${i}-${j};
    done;
done 
```

## What Developers Want

Ideally, we could:

- Package applications and leave container management to an orchestrator.
- Avoid worrying about scaling or single points of failure.
- Update containers without downtime.
- Use robust networking and persistent storage.


## Kubernetes

With the rise of containers, better management tools became essential. Leading container orchestrators include Kubernetes, Apache Mesos, and Docker Swarm, with Kubernetes as the top choice for deploying containerized workloads.

<div class='img-center'>

![](/img/docs/udacity-suse-1-kubernetes.png)

</div>

**What does Kubernetes do?**

- Starts and stops containerized apps
- Manages workload placement
- Automates configuration, scaling, and management
- Ensures zero downtime with automated rollouts/rollbacks
- Abstracts infrastructure management
- Enforces a *desired state* to define end-state configurations

<div class='img-center'>

![](/img/docs/pluralsightwhatiskubernetesfordevs.png)

</div>

**Additional Functionalities**

- Runtime management
- Networking and storage orchestration
- Self-healing capabilities
- Service mesh support
- Logs, metrics, and tracing
- Secrets management

**Benefits for Administrators**

- Faster deployments
- Quick adaptation to changes
- Self-healing and recovery
- Container scaling and orchestration
- Simplifies cluster complexity
- Ensures secure handling of secrets/configurations

**Benefits for Developers**

- Zero-downtime deployments
- Production-like local environments
- End-to-end testing setups
- Performance testing to find app limits
- Various deployment strategies (A/B, canary, etc.)
- CICD pipeline support for multiple builds
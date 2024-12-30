---
title: "Docker Swarms"
description: "Cluster of nodes working together"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 1
last_update:
  date: 7/7/2022
---

## Swarm 

A **swarm** is a cluster of nodes working together, serving as Docker's official orchestration system, akin to Kubernetes. It provides an API and manages services rather than running individual containers.

## Security Features

A swarm automatically encrypts services for enhanced security, including:

- Distributed cluster store 
- Networks 
- TLS (Transport Layer Security)
- Cluster joining tokens
- PKI (Public Key Infrastructure)

## Types of Nodes 

Swarm consists of two main types of nodes, each serving a unique role:

- **Manager Node**
  - Manages the cluster and maintains its state.
  - Schedules services and translates API commands into actions.
  - It's advisable to have an odd number of nodes for high availability.
  - An even number (e.g., 4 nodes) may lead to a *split-brain* scenario.
  - Supports a maximum of 7 nodes.

- **Worker Node**
  - Executes the containers.
  - Requires at least one manager node to function.

To view all nodes in your swarm, use:

```bash
docker node ls 
```

## Creating a Swarm 

To initialize the swarm on the first manager node, run:

```bash
docker swarm init \
    --advertise-addr <private-ip>:2377 \
    --listen-addr <private-ip>:2377
```

After initialization, create a token for joining additional manager nodes:

```bash
docker swarm join-token manager 
```

For worker nodes, generate a token with:

```bash
docker swarm join-token worker 
```

Use the generated token to join a node as a worker:

```bash
docker swarm join \
    --token <worker-node-token> \
    --advertise-addr <private-ip>:2377 \ 
    --listen-addr <private-ip>:2377
```

## Locking a Node 

If a node goes offline and restarts, it may conflict with the swarm's data. To prevent this, enable locking, which stops the node from rejoining until an administrator password is provided:

```bash
docker swarm init --autolock 
```

You can also update the swarm to enable autolock:

```bash
docker swarm update --autolock=true 
```

It’s often better to delete and recreate the node to ensure it has the latest data.

Here's a more concise version of the section on creating services:

## Creating Services 

To define a service in the swarm, specify the image to be used. The service will manage the container automatically:

- Specify the desired state (e.g., replicas).
- Allows for scaling up or down as needed.

Example: To create a service named `web` using the `nginx` image with 3 replicas, you can use the following command:

```bash
docker service create --name web --replicas 3 nginx
```

After executing the command, you might see output similar to the following:

```
creating service web
```

To verify the service has been created and check its status, you can run:

```bash
docker service ls
```

Output:

```
ID                  NAME                MODE                REPLICAS            IMAGE
abcd1234efgh       web                 Replicated          3/3                nginx:latest
```


## Modes

Different modes dictate how services run in the swarm:

- **Replicate Mode**: 
  - Evenly distributes containers across nodes.
  - Specifies the number of replicas for load balancing.

- **Global Mode**: 
  - Ensures one replica runs on each node.
  - Automatically creates a container for every active node.
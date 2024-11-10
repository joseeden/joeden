---
title: "Kubernetes API Objects"
description: "Kubernetes API Objects"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 2
last_update:
  date: 7/7/2022
---

## Overview

<div class='img-center'>

![](/img/docs/k8s-object.png)

</div>


## Pods

A Pod is the basic deployment unit in Kubernetes, representing one or multiple containers that run together.

- Atomic scheduling unit
- Represents container-based applications
- Defines required resources

Important concepts:

- **Ephemeral**: Pods are not reused; a new pod is created if needed
- **Atomicity**: If a container fails, the entire pod is terminated

Kubernetes manages the pod by monitoring:

- **State** – Is the pod running?
- **Health** – Is the app inside the pod active?
- **Liveness probes** – Are expected responses returned?

Each Pod has a single IP address:

- Containers in the same Pod share the IP
- Containers communicate via `localhost`
- Pods coordinate port assignments

## Controllers

Controllers maintain the desired system state.

- Creates and manages Pods
- Ensures desired state is achieved
- Monitors and adjusts for pod health

Common Controllers:

- **ReplicaSet** – Keeps a specified number of pod replicas running
- **Deployment** – Manages changes between ReplicaSets

## Services

Services offer stable access points for applications provided by Pods, adding persistence to the system.

- Networking layer for Pod access
- Allocates an IP and DNS for the service
- Automatically updates routing for redeployed Pods
- Scales apps by adjusting Pods
- Enables load balancing across Pods

A Service uses a virtual IP address:

- Maps to multiple Pods
- Allows external services to use a single IP

## Storage

Storage objects provide persistent storage for data.

- **Volumes** – Tightly coupled storage with physical media for Pods
- **Persistent Volumes** – Cluster-level storage, independent of Pods, using a *Persistent Volume Claim*
---
title: "Kubernetes Networking"
description: "Kubernetes Networking"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 26
last_update:
  date: 4/7/2022
---


## Overview

Key rules in Kubernetes networking:

1. All Pods can communicate with each other across nodes.
2. Nodes can communicate with all Pods.
3. No Network Address Translation (NAT) is needed.

## Inside a Pod

In a multi-container Pod, containers communicate via localhost within the Pod's namespace.

<div class='img-center'>

![](/img/docs/k8snetworkinginsideapod2.png)

</div>

## Pod to Pod within a Node

With multiple Pods on a single node, they communicate over real IP addresses through the node's Layer-2 software bridge.

<div class='img-center'>

![](/img/docs/k8snetworkingpodtopodinsidenode.png)

</div>

## Pod to Pod on Another Node

When Pods on different nodes need to communicate, they use their IP addresses and connect over the underlying network.

<div class='img-center'>

![](/img/docs/pod-to-pod-to-another-node.png)

</div>


## Overlay Network

In cases where developers don’t manage the underlying network, an **overlay network** enables Pods to be connected within a virtualized network.

- Enables Pod communication across nodes
- Isolates Kubernetes traffic from infrastructure
- Abstracts physical network for easier scaling

## External Services 

To expose a cluster application to the internet, Kubernetes uses **External Services**, such as an HTTP service.

<div class='img-center'>

![](/img/docs/k8sexternalserviceshttp.png)

</div>

## Cluster Network Ports 

On the Master node:

Components | Ports (TCP) | Used By
---------|----------|---------
API                 | 6443      | All
etcd                | 2379-2380 | API server and other instances of etcd
Scheduler           | 10251     | Itself, not exposed to outside world 
Controller Manager  | 10252     | Itself, not exposed to outside world 
Kubelet             | 10250     | Control Plane 

On the Worker nodes:

Components | Ports (TCP) | Used By
---------|----------|---------
Kubelet             | 10250         | Control Plane 
NodePort            | 30000-32767   | All 



 

 

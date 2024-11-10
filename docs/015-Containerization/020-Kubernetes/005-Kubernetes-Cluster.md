---
title: "Kubernetes Cluster"
description: "Container Management Challenges"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 1
last_update:
  date: 7/7/2022
---



## Overview

A **Cluster** is a collection of distributed physical or virtual servers or *nodes*, which is used to host and manage workloads.

<div class='img-center'>

![](/img/docs/k8sclustercomponentsbigpicture2.png)

</div>

It has two types nodes:

- **Master Node (Control Plane)**
  - Manages the cluster, making global decisions.
  - Components:
    - **kube-apiserver** – Exposes Kubernetes API
    - **kube-scheduler** – Assigns workloads to nodes
    - **kube-controller-manager** – Keeps resources current
    - **etcd** – Stores cluster data and configurations

- **Worker Nodes (Data Plane)**
  - Host application workloads.
  - Components running on all nodes (master and worker):
    - **kubelet** – Agent on each node, registers it with the cluster
    - **kube-proxy** – Network proxy ensuring workload reachability


## Master Node (Control Plane) 

The master node manages core control functions of the cluster.

- Primary access point for administration
- Coordinates cluster operations
- Manages monitoring and scheduling
- Runs system Pods (API server, Cluster Store, Scheduler, Control Manager)
- Forwards workloads to worker node Pods

<div class='img-center'>

![](/img/docs/controlplanecomponents.png)

</div>


### API Server

- essentially the commmunication hub
- core to all the operationa
- all configuration changes pass through the API server
- simple REST API interface
- verifies the operation and updates the etcd

### etcd (Cluster store)

- persists the state of the Kubernetes objects
- objects are persisted into a key-value store called **etcd**
- implements watches on the stored keys
- all other services are stateless and grab from API server

### Scheduler

- manages which Nodes to start Pods on
- watches the API server for unsceduled Pods,
- evaluates the resources required by a Pod,
- handles the resource constraints that we define,
- and then schedule the Pods on nodes
- 2-steps process

    - **Filtering** - find feasible nodes where resources could fit 
    - **Score** - Rank each node to choose the most suitable Pod placement

### Controller Manager

- handles lifecycle functions of the Controllers
- constantly running the controller loops
- watch the current state of the system
- update the API server based on the desired state
- types:

    - **Node controller** - noticing and responding to nodes 
    - **Replication Controller** - maintain the correct number of Pods 
    - **Endpoints Controller** - populates endpoint objects (join servces and Pods)
    - **Service Account and Token Controllers** - create default accounts and API access tokens for namespaces

### Cloud Controller Manager - for EKS Setup only

- handles communication with AWS
- autoscaling for bringing up more nodes 
- provision EBS to back container volumes 
- provision loadbalancers

In addition to these five, we'll also mention **kubectl**, which isn't a part of the control plane but is necessary to interact with the API Server.

## Worker Node  

A worker node starts and maintains Pods, ensuring they run smoothly. It manages networking and operates within a cluster of multiple nodes.

<div class='img-center'>

![](/img/docs/k8snode.png)

</div>

### Kubelet

The **Kubelet** is the node agent that communicates with the Kubernetes API server.

- Starts and stops Pods as directed by the API server
- Monitors Pod and node status; reports back to API server
- **Liveness probes** - for health check of Pods and applications

### Kube-proxy

The **Kube-proxy** is a network proxy that runs on each node to manage network traffic.

- Provides rules for cluster IPs and Pod networking
- Talks to the API server for networking information
- Handles service abstraction and load balancing
- Routes traffic to Pods


### Container Runtime

The **Container Runtime** is the environment where the container image runs.

- Pulls images from the registry 
- Provides the execution environment
- Default runtime is Docker, though others are supported

## Scheduled/Add-Ons

Add-ons are specialized Pods offering extra cluster services.

- **DNS Pod** – Manages DNS and service discovery within the cluster
- **Ingress controllers** and **dashboards** – Provide web-based administration


 


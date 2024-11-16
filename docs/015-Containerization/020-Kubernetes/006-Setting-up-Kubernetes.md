---
title: "Setting Up Kubernetes the Hard Way"
description: "Container Management Challenges"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 6
last_update:
  date: 7/7/2022
---


## Setup Kubernetes

There are multiple ways to setup a kubernetes cluster. 

- A local cluster (on your machine)
- A production cluster on the cloud
- A on-prem, cloud-agnostic cluster
- A managed production cluster on AWS using EKS

There are available tools to automate bootstrapping clusters on on-premise and public cloud platforms.

For **production-grade cluster**:

- kubeadm
- Kubespray
- Kops
- K3s

For **development-grade cluster** (testing):

- minikube
- k3d

**k3s** is a lightweight version of kubernetes that can be installed using one binary.

- creates a 1-node operational cluster
- includes **kubectl** CLI tool

Here are some ways to run Kubernetes on your local machine.

- Minikube
- Docker Desktop
- kind
- kubeadm

## Which is the Right Solution?

Before we start running Kubernetes, we must review some considerations. 

**Where to install?**

- **Cloud**
    - Using virtual machines (IaaS)
    - Using managed service (PaaS)

- **On-prem**
    - Bare metal
    - VirtuaL machines 

**Which one should we choose?**

- Depends on the strategy of the organization
- Depends on the skillset and expertise of people

**We've decided where to run Kubernetes, what's next?**

- Cluster Networking 
- Scalability
- High Availability 
- Disaster Recovery

See these resources for more details:

- [Picking the Right Solution](https://jamesdefabia.github.io/docs/getting-started-guides/)
- [Getting started](https://kubernetes.io/docs/setup/)


## After Installing Kubernetes 

Once Kubernetes packages are installed:

1. Create the cluster (start with the master node)
2. Disable swap space on the nodes
3. Configure Pod networking
4. Join additional nodes to the cluster

## Create a Cluster using kubeadm

To set up a Kubernetes cluster, we first need to ensure both the control plane and data plane are running, a process called **bootstrapping**. While it can be done manually, using kubeadm is simpler and reduces the risk of misconfigurations. The process includes these steps:

1. Run `kubeadm init`.
2. kubeadm performs **pre-flight checks** to ensure the system has the right permissions and resources.
3. kubeadm creates a **certificate authority** for secure communication.
4. kubeadm generates **kubeconfig files** for authentication with the API server.
5. kubeadm generates **Static Pod Manifests**, monitored by the kubelet.
6. kubeadm starts the control plane.
7. kubeadm taints the master node to ensure pods run only on worker nodes.
8. kubeadm creates a **Bootstrap Token** to join nodes to the cluster.
9. kubeadm starts **Add-on Pods** like DNS and kube-proxy.

This process can be customized by specifying additional parameters.

 

---
title: "Pods"
description: "The building blocks of Kubernetes"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 28
last_update:
  date: 4/7/2022
---


## Overview

A **Pod** is the smallest unit in Kubernetes. It can contain one or more containers that always run together. If you run single containers, think of a Pod as just one container.

Kubernetes manages Pods by:

- Deciding when and where to run them
- Handling traffic routing
- Scaling Pods based on metrics

Additionally, Kubernetes:

- Starts Pods based on resource needs
- Restarts Pods if they or their hosts fail
- Assigns an IP address and DNS name to each Pod

## Pod Commands

To view Pods in the default namespace:

```bash
kubectl get pods
```

To view Pods in all namespaces:

```bash
kubectl get pods -A
```

To view Pods in a specific namespace (e.g., kube-system):

```bash
kubectl get pods -n kube-system
```

To get details about a Pod:

```bash
kubectl describe <pod-name>
```

To view logs of a Pod:

```bash
kubectl logs <pod-name>
```

To delete a Pod:

```bash
kubectl delete pod <pod-name>
```

To delete a Pod created from a manifest:

```bash
kubectl delete -f <pod-manifest-file.yml>
```


## IPs and Ports

Each Pod is assigned a single IP address, regardless of how many containers are in the Pod. To allow access to a Pod, we must specify which port to publish.

- Kubernetes **cannot update ports** on a running Pod. 
- If you need to change the port, delete the Pod.
- Then update the port in the manifest, and recreate the Pod.
- By default, Kubernetes uses **TCP** as the protocol.

For more details, check out [Pods in Kubernetes](https://kubernetes.io/docs/concepts/workloads/pods/).


## Pod Declaration

A Pod declaration defines all the properties of a Pod. Some common attributes include:

- The container image to use
- The container ports to publish
- The restart policy for handling container failures
- CPU and memory resources

<div class='img-center'>

![](/img/docs/theory-podsdeclaration.png)

</div>

Here’s an example of a simple Pod manifest that launches an NGINX server:

```bash
apiVersion: v1
kind: Pod
metadata:
  name: app
  labels:
  - app: webserver
spec:
  containers:
  - name: app-nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```


## Multi-container Pod

In a multi-container Pod, each container should run a process that stays alive for the Pod's entire lifecycle. For example, if a Pod has:

- A web application
- A logging agent

Both containers need to run together. If either container fails, the Pod restarts.

However, some tasks may only need to run once, such as pulling code from a repository before the main application starts. These tasks can be handled using **initContainers**.

For more information, please see [Probes and InitContainers](/docs/015-Containerization/020-Kubernetes/040-Probes-and-MultiContainer-Pods.md).


 

 

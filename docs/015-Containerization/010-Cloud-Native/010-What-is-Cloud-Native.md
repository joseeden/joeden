---
title: "Being Cloud Native"
description: "Being Cloud Native"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 10
last_update:
  date: 7/7/2022
---


## Overview

<div class='img-center'>

![](/img/docs/udacity-suse-1.JPG)

</div>

As defined by [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/about/charter/) 

> *Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.*
>
> *These techniques enable loosely coupled systems that are resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably with minimal toil.*

In its simplest terms, **Cloud native** refers to building and managing applications at scale using either private, public, or hybrid cloud platforms.

Now, when we hear containers, it is also often followed by another buzzword: **microservices**.

<div class='img-center'>

![](/img/docs/udacity-suse-1-microservices.png)

</div>

## Microservices

**Microservices** are small, independent, and containerized applications, each handling a specific function and running as separate processes.

- Independent Development and Deployment
  - Services can be developed and updated separately
  - Faster release cycles without impacting other services

- Scalability and Flexibility
  - Services scale individually based on demand
  - Allows for diverse tech stacks across services

- Fault Isolation
  - Failure in one service doesn't affect the whole system
  - Resilient to partial failures, reducing downtime

## Containers and being Cloud Native

There are three key things to know here. 

The first two are **speed** and **agility** - how quickly an organization can response and adapt to change. 

The third key thing is **containers**.

<div class='img-center'>

![](/img/docs/udacity-suse-1-container.png)

</div>

To recall, containers are simply **processes** which wraps the dependencies and libraries so that it can be shipped as runnable applications across different platforms. 

They are closely associated with cloud native applications as containers are a great way to deploy applications quickly and resiliently given their lightweight feature.


## Cloud-Native Landscape

With the advent of containers, the need for tools to manage and maintain them also arise. Some of the container orchestrator tools that are being used is the market are:

- Kubernetes,
- Apache Mesos, and 
- Docker Swarm 

Of the three, **Kubernetes** is currently the leading tool in deploying containerized workloads.
 
<div class='img-center'>

![](/img/docs/udacity-suse-1-kubernetes.png)

</div>

It was a project inside Google and was released in 2014 and is currently being maintained by **CNCF** or **Cloud Native Computing Foundation**, a vendor-agnostic organization that manages open-source projects. The main features of Kubernetes are the automation of:

- Configuration 
- Management
- Scalability

Over time, Kubernetes was developed to include more than just automation but also other functionalities:

- Runtime
- Networking
- Storage
- Service Mesh
- Logs and metrics
- Tracing



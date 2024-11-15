---
title: "Container Sandboxing"
description: "Isolating containers for enhanced security"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 50
last_update:
  date: 7/7/2022
---


## Multi-Tenant Environment 

A multi-tenant environment allows multiple independent users (tenants) to share the same resources while maintaining privacy and isolation between them.

<div class='img-center'>

![](/img/docs/multitenant-environment.png)

</div>

In this setup, a single infrastructure instance serves multiple users, each with their own isolated space, applications, and data.

**Challenges**:  

While multi-tenancy is cost-effective and scalable, it introduces security risks. A breach in one tenant's app can affect others' data and services, highlighting the importance of container sandboxing.

## Container Sandboxing 

Container sandboxing isolates applications for security and resource protection. Containers are lightweight and portable but require sandboxing mechanisms to ensure they don't interfere with each other or the system.

<div class='img-center'>

![](/img/docs/container-sandboxing-diaggg.png)

</div>

This isolation prevents unauthorized access and improves system security.

## gVisor 

gVisor enhances container isolation by acting as a middle layer between containers and the host kernel.

<div class='img-center'>

![](/img/docs/gvisor-isolation-diagram.png)

</div>

**gVisor** provides better security for containers by creating a secure sandbox environment without sacrificing performance. 

### gVisor Components

gVisor has the following components:

- **Sentry**:

  - Acts as a user-space kernel for containers.
  - Intercepts system calls from containerized applications.
  - Forwards system calls to the host kernel after filtering.

- **Gofer**:

  - Manages file system interactions within the sandbox.
  - Handles file I/O operations outside the sandbox for security.
  - Reduces attack surface by separating file system tasks from containers.

<div class='img-center'>

![](/img/docs/gvisor-components-sentry-gofer.png)

</div>

### Dedicated gVisor

Each container has a dedicated gVisor instance to ensure isolation. If one gVisor fails, only the affected container is impacted.

- Provides container-specific isolation.
- Limits failure impact to a single container.
- Enhances security by isolating system calls.
- Keeps other containers unaffected during issues.

## Kata Containers 

Kata containers go further by isolating containers into their own lightweight virtual machines (VMs), each with its own kernel.

<div class='img-center'>

![](/img/docs/kata-containers-way-of-workuing.png)

</div>

This prevents issues from affecting other containers, but the added isolation comes with a performance trade-off.

### Performance and Virtual Machine Support

While Kata Containers provide enhanced isolation, this comes with a slight performance trade-off compared to traditional containers. The added isolation requires more memory and compute resources. 

- VMs add a small performance penalty.
- Needs hardware virtualization support.
- Google Cloud supports nested virtualization.
- Nested virtualization can slow performance.

## Container Runtimes

While Docker uses **runC** as its container runtime, gVisor and Kata containers use their own runtimes:

- **Kata Containers**: `kata-runtime`
- **gVisor**: `runsc`

These runtimes can also be specified when running Docker containers:

```bash
docker run --runtime kata -d nginx 
docker run --runtime runsc -d nginx 
```

## Using Runtimes in Kubernetes

To use these runtimes in Kubernetes, define a `RuntimeClass` object:

```yaml
## gvisor.yaml  
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: gvisor-for-my-pods
handler: runsc
```

Then specify the runtime in your pod definition:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod-gvisor
spec:
  runtimeClassName: gvisor-for-my-pod
  containers:
  - name: nginx-container
    image: nginx
```

Apply the configuration:

```bash
kubectl apply -f .
```
---
title: "Mutable and Immutable Infrastructure"
description: "Mutable and Immutable Infrastructure"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 10
last_update:
  date: 3/11/2022
---


## Immutability

Immutability means something cannot be changed after creation. Once defined, it stays fixed, offering consistency and reliability.

- Keeps configurations consistent
- Simplifies debugging and troubleshooting
- Reduces errors by preventing accidental changes

## Mutable Infrastructure

In mutable infrastructure, servers are updated directly in place. The underlying servers remain the same, but their software and configurations can be altered with each update.

<div class='img-center'>

![](/img/docs/mutable-infraexplanation.png)

</div>

A drawback of this setup is **configuration drift**—where system settings deviate over time. For instance, if three servers are updated simultaneously, network issues or missing dependencies might cause the update to fail on one server, creating inconsistency.

## Immutable Infrastructure

Instead of updating existing servers, immutable infrastructure involves deploying new servers with updated software, then removing the old ones.

<div class='img-center'>

![](/img/docs/immutbalae-infra-setup-explain.png)

</div>

## Immutable Containers

Containers are inherently immutable, created from fixed images. Changes to a container, such as upgrading software, require deploying a new container from an updated image.

**Runtime Changes Are Not Recommended**

Though designed to be immutable, containers can still be modified at runtime (e.g., by copying files or editing configurations inside the container). However, this practice is **not recommended**.

## Enforcing Container Immutability at Runtime

To ensure containers remain unmodified during runtime, a security context can be applied:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: cache-volume 
      mountPath: /var/cache/nginx
    - name: runtime-volume 
      mountPath: /var/run 
  volumes:
  - name: cache-volume
    emptyDir: {}      
  - name: runtime-volume 
    emptyDir: {}      
```

Any attempts to modify the files in the container should now fail.

<div class='img-center'>

![](/img/docs/adding-security-context-to-ensure-immutability.png)

</div>
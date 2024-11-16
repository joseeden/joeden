---
title: "Security Contexts"
description: "Security Contexts"
tags: 
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
    - Cybersecurity
sidebar_position: 20
last_update:
  date: 7/7/2022
---


## Overview

A security context defines the access control settings for pods, containers, and volumes. Some examples of what can be controlled include:

- User and group IDs for the first process in a container
- Group ID for volumes
- Whether the container's root filesystem is read-only
- SELinux options
- Privileged container access, granting root-like permissions
- Whether privilege escalation is allowed.

The security context of a container takes precedence over the pod's security context when both are set. Configuring security contexts reduces security risks, especially when using third-party images.

## Pod-level Security Context

To view pod-level security options:

```bash
kubectl explain pod.spec.securityContext
```

This explains various fields that can be set at the pod level, such as:

- `fsGroup`: A supplemental group for all containers in the pod.
- `fsGroupChangePolicy`: Controls when volume ownership is changed.
- `runAsUser`: Specifies the user ID for the container process.
- `runAsGroup`: Specifies the group ID for the container process.
- `runAsNonRoot`: Ensures the container does not run as root.
- `seLinuxOptions`: SELinux context for containers.
- `seccompProfile`: Seccomp options for containers.
- `supplementalGroups`: Additional groups for the container's process.
- `sysctls`: List of sysctls for the pod.
- `windowsOptions`: Settings specific to Windows containers.

## Container-level Security Context 

To view container-level security options:

```bash
kubectl explain pod.spec.containers.securityContext
```

This explains container-level settings such as:

- **allowPrivilegeEscalation**: Controls if a process can gain higher privileges than its parent.
- **privileged**: Grants root-like permissions to the container.
- **readOnlyRootFilesystem**: Specifies if the container's root filesystem is read-only.
- **seLinuxOptions**: SELinux context for the container.
- **seccompProfile**: Seccomp options for the container.

## Risks of Privileged Containers 

A privileged container runs with root-like access to the host, which introduces several security risks. To mitigate these risks, follow these best practices:

- Avoid using privileged containers.
- Use RBAC to restrict access to exec and attach.
- Use trusted image registries.
- Enable **PodSecurityPolicies** to enforce unprivileged mode.
- Ensure containers do not run as root.

Example of a privileged container manifest:

```bash
# pod-privileged.yml 
apiVersion: v1
kind: Pod
metadata:
  name: pod-privileged
spec:
  containers:
  - image: busybox
    name: busybox
    args:
    - sleep
    - "3600"
    securityContext:
      privileged: true
```


## Run as Non-Root 

This manifest creates a pod that enforces the container to run as a non-root user (user ID 1000). The container also has a specific user ID (2000) and a read-only root filesystem.

```bash
# pod-secured.yml
apiVersion: v1
kind: Pod
metadata:
  name: pod-secured
  namespace: test
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
  containers:
  - image: busybox
    name: busybox
    args:
    - sleep
    - "3600"
    securityContext:
      runAsUser: 2000
      readOnlyRootFilesystem: true
```

:::info[NOTE]

The container's security context overrides the pod's security context when both are set.

:::



## Resources

- [Security Group Rules in EKS](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html)

- [Kubernetes Security - Best Practice Guide](https://github.com/freach/kubernetes-security-best-practice/blob/master/README.md#firewall-ports-fire)

- [Using Security Contexts to Secure Kubernetes Clusters](https://cloudacademy.com/lab/using-security-contexts-to-secure-kubernetes-cluster/?context_id=888&context_resource=lp)




 

 

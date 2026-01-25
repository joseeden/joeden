---
title: "Application Lifecycle Management"
description: "Application Lifecycle Management"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 49
last_update:
  date: 4/7/2022
---

## Rolling Updates and Rollbacks 

Kubernetes performs rollouts to update deployments by replacing replicas to match the new deployment specifications. Updates may include changes to environment variables, labels, or code.

For more information, please see [Rollouts and Rollbacks](/docs/015-Containerization/020-Kubernetes/039-Rollouts-and-Rollbacks.md)


## Environment Variables 

Environment variables can be set using the **env** property with key-value pairs. Example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  labels:
    name: myapp
spec:
  containers:
  - name: myapp
    image: <Image>
    ports:
      - containerPort: <Port>
    env:
      - name: USERNAME 
        value: paul 
      - name: DEPARTMENT
        value: finance 
      - name: ROLE 
        value: read-only 
```

Other ways of setting environment variables are through:

- ConfigMaps 
- Secrets 

The main difference is how the variables are defined in the Pod manifest;

```yaml
# Set directly in the Pod manifest
env:
  - name: USERNAME 
    value: paul
```

```yaml
# Set from ConfigMap
env:
  - name: USERNAME 
    valueFrom:
      configMapKeyRef:
```

```yaml
# Set from Secret
envFrom:
  - secretRef:
      name: USERNAME
```

## ConfigMaps and Secrets 

**ConfigMaps** are used to separate configuration data from container images, making applications more portable. The configuration is stored as key-value pairs in a YAML file, separate from the Deployment manifest.

**Secrets** are used to store sensitive information, helping to reduce the risk of accidental exposure compared to storing it in an image or Pod specification.

For more information, please see [ConfigMaps and Secrets](/docs/015-Containerization/020-Kubernetes/044-Configmaps.md) 

## Multi-Container Pods 

Multi-container Pods share the same lifecycle, meaning they are created and destroyed together. These Pods also share:

- A common network space for communication
- Access to the same storage volume

 

 

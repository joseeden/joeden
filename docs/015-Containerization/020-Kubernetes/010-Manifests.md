---
title: "Manifests"
description: "Configuration file for resources"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 10
last_update:
  date: 4/7/2022
---


## Overview

A **Manifest** defines the properties and configurations of Kubernetes resources. It uses the **spec** (specification) to describe resource-specific attributes.

## How Manifests Work

1. Use `<code>kubectl create</code>` to create resources from the manifest.
2. `kubectl` sends the manifest to the Kubernetes API server.
3. The API server performs the following actions:
   - Selects a node with available resources
   - Schedules the Pod on the selected node
   - The node pulls the Pod's container image
   - The node starts the Pod's containers

## Sample Manifest

Here’s an example manifest for creating a basic NGINX Pod:

```bash
apiVersion: v1 
kind: Pod
metadata:
    name: pod-nginx
spec:
    containers:
    - name: container-nginx-1
      image: nginx:latest
```

Key Manifest Properties:

- `apiVersion`: The API version (usually v1).
- `kind`: The resource type being created (e.g., Pod).
- `metadata`: Information about the resource.
- `spec`: Configuration details for the resource.
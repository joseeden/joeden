---
title: "ConfigMaps"
description: "Storing non-sensitive data"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 24
last_update:
  date: 7/7/2022
---

## Overview

ConfigMaps store configuration data separately from container images, making applications portable. The data is stored as key-value pairs.

- Data is stored as key-value pairs.
- Pods reference ConfigMaps to access data.
- Can be mounted as volumes or set as environment variables.

ConfigMaps can be created from:

- Environment variable files (key-value pairs).
- Files or directories (keys are filenames, values are file contents).
- Command-line literals (key-value pairs).
- YAML manifest files of kind **ConfigMap**.

ConfigMaps are namespace-specific, meaning only Pods in the same Namespace can use them.


## Injecting ConfigMap into Pods

Example ConfigMap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: USERNAME
data:
  DB_USERNAME: "admin"
  DB_PASSWORD: "password123"

```

After the ConfigMap is created, the next step is to inject it to the Pod.


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: myapp
    image: <Image>
    envFrom:
      - configMapRef:
          name: USERNAME
```



## Ways to Inject ConfigMap into Pods

As environment variables:

```yaml
envFrom:
  - configMapRef:
      name: USERNAME
```

As a single environment variable:

```yaml
env:
  - name: DB_Username
    valueFrom:
      configMapKeyRef:
        name: USERNAME
        key: DB_USERNAME
```

Mount ConfigMap as a volume:

```yaml
volumes:
  - name: app-configMap-volumes
    configMap:
      name: USERNAME
```
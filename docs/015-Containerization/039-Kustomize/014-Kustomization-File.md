---
title: "Kustomization File"
description: "Kustomization File"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 14
last_update:
  date: 4/19/2022
---



## Overview

A **Kustomization file** is a YAML file that defines how to customize your Kubernetes resources. It lets you apply changes like adding labels, setting a namespace, or generating new resources without modifying the original YAML files.

Example:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml

namespace: my-namespace

commonLabels:
  app: my-app
  environment: staging
```

In this example:

- `deployment.yaml` and `service.yaml` are the base resources.
- All resources are set to use the `my-namespace` namespace.
- Common labels (`app` and `environment`) are added to all resources.

You can also use Kustomize to generate things like Secrets or ConfigMaps from files or data—more on that in later videos.

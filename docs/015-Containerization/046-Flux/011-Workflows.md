---
title: "Workflows"
description: "Flux CD Workflows"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
  - Git
  - Flux
sidebar_position: 11
last_update:
  date: 8/19/2022
---


## Overview

Flux CD helps manage Kubernetes using Git as the single source of truth. It follows a GitOps model to keep your system up to date automatically.

- Uses Git to store your desired system state
- You don't manually apply updates
- Updates your cluster when Git change
- Automates keeping workloads up to date

## Stages In Flux CD

Flux CD works in a loop with three key stages: source control, synchronization, and reconciliation.

- **Source Control**
- **Synchronization**
- **Reconciliation**

### Stage 1: Source Control

Flux CD starts by checking Git for updates to your Kubernetes files.

- Detects any file change like image tags or service settings
- Uses the source controller to fetch updates regularly

Flux CD looks at this `GitRepository` object and pulls updates every minute.

```yaml
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: my-git-repo
spec:
  interval: 1m
  url: https://github.com/example-org/my-k8s-configs
  branch: main
```


### Stage 2: Synchronization

Once changes are fetched from Git, they are stored as Kubernetes objects inside the cluster. This avoids frequent Git calls and keeps the desired state easily accessible.

The Kustomization file below tells Flux where in the Git repo the config lives and how often to sync.

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: my-app
spec:
  interval: 5m
  path: "./apps/my-app"
  prune: true
  sourceRef:
    kind: GitRepository
    name: my-git-repo
```


### Stage 3: Reconciliation

Flux CD then makes the actual changes to the cluster to match what’s in Git.

- Compares current cluster state with desired Git state
- Updates, deletes, or creates resources to match Git

Controllers like Kustomize or Helm apply these changes. If the chart or values change in Git, Flux updates your app accordingly.


```yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: my-helm-app
spec:
  chart:
    spec:
      chart: mychart
      version: "1.2.3"
  interval: 5m
  values:
    replicaCount: 2
```



## Use Helm with Flux CD

You can also manage Helm apps declaratively with Flux CD.

- Use `HelmRelease` CRD in your Git repo
- Define your chart, version, and values
- Flux reads and installs it for you

Here’s an example:

```yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: my-app
spec:
  chart:
    spec:
      chart: nginx
      version: "9.0.1"
      sourceRef:
        kind: HelmRepository
        name: bitnami
  interval: 5m
  values:
    replicaCount: 2
```

Flux will install the chart and keep it in sync with the values in your Git file.

## Customize for different environments

You can handle dev, test, and prod using Kustomize overlays.

- Write a base config once
- Add overlays for each environment
- Use the Kustomize controller to apply the right one

This helps you reuse files and only change what's different in each environment.

## Automate Image Updates

Flux CD can also update workloads automatically when a new Docker image is available.

- Checks image tags in your container registry
- Updates Git with the new tag
- Applies the updated manifest automatically
- Removes the need to manually edit image tags.

In the example below, Flux updates Git and your app whenever a new image tag is pushed.

```yaml
apiVersion: image.toolkit.fluxcd.io/v1beta1
kind: ImageRepository
metadata:
  name: myapp
spec:
  image: myregistry.com/myapp
  interval: 1m
```

```yaml
apiVersion: image.toolkit.fluxcd.io/v1beta1
kind: ImageUpdateAutomation
metadata:
  name: myapp-automation
spec:
  sourceRef:
    kind: GitRepository
    name: my-git-repo
  update:
    strategy: Setters
```




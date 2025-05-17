---
title: "Running PodInfo"
description: "Running PodInfo"
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
sidebar_position: 12
last_update:
  date: 8/19/2022
---

## Overview 

Podinfo is a small web application used to test, demo, and learn Kubernetes and GitOps tools like FluxCD. 

- Shows pod details through a web UI
- Supports health checks and horizontal scaling
- Good for testing GitOps flows with FluxCD

## Pre-requisites 

- [Setting Up Flux](/docs/015-Containerization/046-Flux/011-Setting-Up-Flux.md)


## Project Structure 

If you followed the steps in [setting up Flux](/docs/015-Containerization/046-Flux/011-Setting-Up-Flux.md, your project directory should have the following files:

```bash
$ tree
.
├── README.md
└── clusters
    └── dev
        └── flux-system
            ├── gotk-components.yaml
            ├── gotk-sync.yaml
            └── kustomization.yaml

3 directories, 4 files 
```

This repository contains the Flux CD configuration files, but it doesn't necessaruly need to contain the application files as well. 

## `podinfo-repo.yaml`

To use a different repository which contain the application files, create a new config file which tells Flux to monitor a new Git repository:

```yaml 
# clusters/dev/flux-system/podinfo-repo.yaml 
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: podinfo
  namespace: flux-system
spec:
  interval: 30s       ## how frequent flux will sync
  url: https://github.com/stefanprodan/podinfo.git
  ref:
    branch: master
```

:::info 

This only tells FluxCD to watch the repo, not what to do with it.

:::


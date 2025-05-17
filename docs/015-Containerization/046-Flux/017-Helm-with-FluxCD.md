---
title: "Helm with FluxCD"
description: "Helm with FluxCD"
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
  - Helm
sidebar_position: 17
last_update:
  date: 8/19/2022
---


## Overview

This is a simple guide on how to use Flux CD to automatically deploy a Helm chart to Kubernetes.

- Helm charts can be deployed using source code or packaged charts
- Flux CD detects and deploys the changes from Git automatically

Helm is like a tool that bundles your Kubernetes setup into charts. Flux CD then watches your Git repo to make sure your cluster always matches the setup you saved there.



## Helm

Helm helps you package, deploy, and manage apps in Kubernetes using a structure called **charts**.

- Charts group related Kubernetes resources
- You can version your app deployments with Helm

Charts are like *blueprints*. With Helm, you install or upgrade apps using those blueprints without writing YAML files from scratch each time.

## Helm with Flux CD

You can store Helm charts and their configs in Git and let Flux CD manage them.

- Flux can deploy Helm charts from Git or Helm repos
- You define what you want using YAML files in Git
- Flux applies the Helm chart to your cluster

Flux CD tracks updates to Helm charts or container images and apply them.

- It checks for new chart versions in Helm repos
- It can update charts and values automatically
- You define rules or policies for updates

For example, if a new chart version comes out, Flux can update your app without you doing anything manually.


## `HelmRelease` Resource

Flux adds a special object called `HelmRelease` to manage Helm deployments declaratively.

- `HelmRelease` defines the chart, version, and values
- You commit the `HelmRelease` file to Git
- Flux reads it and applies the Helm release

You don’t need to run Helm commands manually. Just update the YAML file in Git, and Flux will do the rest.

Sample `HelmRelease`:

```yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: my-app
  namespace: default
spec:
  chart:
    spec:
      chart: my-chart
      sourceRef:
        kind: HelmRepository
        name: my-repo
        namespace: flux-system
  interval: 5m
  values:
    replicaCount: 3
```

This file tells Flux to deploy `my-chart` from `my-repo` every 5 minutes with 3 replicas.



## Ways to Use Helm Charts

There are two main ways to use Helm charts with Kubernetes.

- Use chart source code stored locally
- Use pre-packaged charts from repositories

Using source code is good for testing while using packaged charts is better for production.


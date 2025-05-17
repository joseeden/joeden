---
title: "Starter Notes"
description: "Starter Notes"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
sidebar_position: 10
last_update:
  date: 8/19/2022
---


## Overview

GitOps uses Git to manage and automate everything about your infrastructure and app deployments.

* Git holds all the configuration
* Everything is written in files
* It keeps the real system in sync with the files

This means Git becomes the only place where you make changes, and your systems follow automatically.

* Every change is tracked
* Teams work better together
* Deployments happen automatically

## How Flux CD Helps

Flux CD is a tool that keeps your Kubernetes apps in sync with your Git repository.

* Uses Git to define how apps should run
* Automatically updates your cluster
* Works well with Kubernetes
* Syncs your cluster to match your Git files
* Supports multiple teams and clusters

Flux CD connects your Git repository to your Kubernetes cluster and keeps everything in sync.

## Good Practices with Flux CD

To make GitOps work well, use these tips with Flux CD.

* Keep files simple and clean
* Always check Git pull requests before merging
* Watch the sync status
* Protect your Git repo with SSH or tokens

These habits help you stay secure, make fewer mistakes, and catch problems early.

## Example Setup

Here’s a basic example using Flux CD to watch a Kubernetes deployment file:

```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: my-app-config
  namespace: flux-system
spec:
  interval: 1m
  url: https://github.com/example-user/my-gitops-repo
  branch: main
```

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: my-app
  namespace: flux-system
spec:
  interval: 5m
  path: ./deployments/my-app
  prune: true
  sourceRef:
    kind: GitRepository
    name: my-app-config
```

This tells Flux to pull the config from Git and apply it every few minutes.


## Add-Ons in Flux CD

Flux CD supports extra tools for more complex deployments.

* **Helm controller** for using Helm charts
* **Kustomize controller** for plain YAML configs

## Managing Deployments

Flux gives you tools to check what’s happening in your cluster.

* Use CLI or dashboard to see status
* Check for errors or issues
* Track changes using Git history

This visibility helps you understand what changed, when, and why.
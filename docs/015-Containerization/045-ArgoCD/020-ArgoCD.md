---
title: "ArgoCD"
description: "ArgoCD"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
sidebar_position: 20
last_update:
  date: 3/9/2023
---

## Overview

ArgoCD is a GitOps continuous delivery tool for Kubernetes. It keeps applications in sync with their desired state stored in Git.  

- Automates deployments using Git as a single source of truth.  
- Continuously monitors and syncs applications.  
- Supports multiple clusters with features like RBAC and SSO.  

## How ArgoCD Works

ArgoCD automatically deploys and ensures the application matches the Git repository. If changes occur, it syncs them automatically.

- Uses Git repositories to store the desired application state.  
- Compares the live state with the desired state and reports any differences.  
- Supports Kubernetes manifests in different formats:  
  - Kustomize  
  - Helm charts  
  - YAML or JSON files  
- Automatically syncs applications to match their defined state.  

<div class="img-center"> 

![](/img/docs/2023-argocd-simple-diagram.png)

</div>

Example: Deploying an App with ArgoCD

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
spec:
  project: default
  source:
    repoURL: https://github.com/example/my-app.git
    path: manifests
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    namespace: my-namespace
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Expected Result:

- ArgoCD deploys `my-app` to the Kubernetes cluster.
- Automatically syncs changes from Git when updated.
- Ensures live state matches the target state.

## Key Concepts 

| **Concept**           | **Description**                                                                                                                                     |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Application**        | A Kubernetes resource managed by ArgoCD, defining the source (Git) and destination (Kubernetes cluster).                                             |
| **Application Source Type** | Specifies how the app is built, using tools like Helm, Kustomize, or raw manifests.                                                                  |
| **Project**            | Groups multiple applications, useful when multiple teams use ArgoCD.                                                                               |
| **Target State**       | The desired application state stored in Git.                                                                                                      |
| **Live State**         | The current state of resources (pods, secrets, configmaps) in the cluster.                                                                         |
| **Sync**               | The process of making the live state match the target state.                                                                                       |
| **Sync Status**        | Shows whether the application matches the state in Git.                                                                                           |
| **Sync Operation Status** | Indicates if the sync succeeded or failed.                                                                                                        |
| **Refresh**            | Compares the latest Git code with the live state and detects differences.                                                                           |
| **Health Assessment**  | Evaluates the overall health of an application based on Kubernetes resources.                                                                     |

## ArgoCD Architecture

ArgoCD helps manage and deploy applications in Kubernetes environments. It uses Git as the source of truth to keep applications synchronized and ensures consistent deployment across environments.

- **Kubernetes Controller**  
  - ArgoCD runs as a controller in a Kubernetes cluster.  
  - Accessible via CLI or UI for app management.

- **Operations**  
  - Create/manage applications.  
  - Configure SSO and sync projects.

- **State Monitoring & Sync**  
  - Compares live state with Git's desired state.  
  - Auto-applies changes from Git to environments.

- **Webhooks**  
  - Set up Git webhooks to notify ArgoCD on Git events.

- **ArgoCD API Server**  
  - Exposes gRPC/REST APIs.  
  - Used by CLI, UI, and CI/CD pipelines.

- **Multi-Cluster Support**  
  - Deploy resources across multiple Kubernetes clusters.

- **Metrics & Notifications**  
  - Prometheus metrics and Grafana integration.  
  - Notification service supports Slack, email, GitHub, etc.

<div class="img-center"> 

![](/img/docs/2023-argocd-architecture.png)

</div>

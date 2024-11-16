---
title: "Kubernetes Ecosystem"
description: "Kubernetes Ecosystem"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 50
last_update:
  date: 7/7/2022
---


## Helm

Helm is a Kubernetes package manager, with packages called charts that can be installed using the Helm CLI.

- Helm charts bundle all resources for a package
- Simplifies sharing complete applications
- Public charts are available at hub.helm.sh

## Kustomize

Kustomize.io allows easy customization of YAML manifests to manage application complexities.

- Manages environments and stages
- Uses `kustomization.yaml` to declare customization rules
- Keeps original manifests intact and reusable
- Integrated with kubectl

Examples:

- Generate ConfigMaps and Secrets from files
- Configure common fields across resources
- Apply patches to manifest fields

## Prometheus

Prometheus is an open-source monitoring and alerting system for time-series data.

- Standard tool for monitoring Kubernetes clusters
- Collects metrics from Kubernetes components in Prometheus format
- Integrates with Kubernetes for metric collection
- Often used with Grafana for dashboards
- Supports alert rules and notifications
- Can be installed using a Helm chart

## Kubeflow

Kubeflow simplifies deploying machine learning workflows on Kubernetes, including model deployment and serving.

- Leverages Kubernetes autoscaling
- Deployable anywhere

## Knative

Knative is a platform for managing serverless workloads on Kubernetes.

- Focuses on code rather than underlying resources
- Deployable anywhere, avoiding vendor lock-in
- Supported by Google, IBM, and SAP

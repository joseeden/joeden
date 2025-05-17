---
title: "OCI Repositories"
description: "OCI Repositories"
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
sidebar_position: 13
last_update:
  date: 8/19/2022
---


## Overview

This guide shows how to use public and private OCI Helm repositories with Flux CD to install applications like MySQL and Apache on Kubernetes clusters.

## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/044-GitOps/017-Setting-Up-Kubernetes.md)
- [Setting Up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md)


## Open Container Initiative (OCI)

**Open Container Initiative (OCI)** defines a standard way to share software like container images and Helm charts.

- Defines how container images and charts are shared
- Uses digests for better security
- Can be used by many tools

OCI registries support stronger security features than basic HTTP Helm repos and are becoming a common choice for hosting Helm charts.
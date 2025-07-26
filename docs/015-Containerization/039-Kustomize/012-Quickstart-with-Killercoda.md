---
title: "Quickstart with Killercoda"
description: "Quickstart with Killercoda"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 12
last_update:
  date: 4/19/2022
---


## Overview

We won’t set up a Kubernetes cluster from scratch. Instead, we’ll use **Killercoda**, a free online playground. Visit [Killercoda](https://killercoda.com/playgrounds/scenario/kubernetes) and sign in with your GitHub or Gmail account.

If you prefer to setup a cluster and install Kustomize, please see [Installing Kustomize.](/docs/015-Containerization/039-Kustomize/013-Install-Kustomize.md)

## Pre-installed Tools

Killercoda already includes `kubectl`. To check:

```bash
kubectl version
```

You should see something like:

```bash
Client Version: v1.33.2
Kustomize Version: v5.6.0
Server Version: v1.33.2
```

If your `kubectl` version is v1.14 or higher, Kustomize is included and you're good to go.


## Clone the Repository

The sample codes can be found at joseeden/test-kustomize-labs. In your Killercoda terminal, clone the repository: 

```bash
git clone https://github.com/joseeden/test-kustomize-labs.git 
```
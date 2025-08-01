---
title: "Killercoda"
description: "Killercoda"
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

The labs in this documentation require a running Kubernetes cluster.

If you don’t want to set up a Kubernetes cluster, you can use a free online playground called **Killercoda**. Go to [Killercoda](https://killercoda.com/playgrounds/scenario/kubernetes) and sign in with your GitHub or Gmail account.

If you prefer to set up your own cluster and install Kustomize, please see [Installing Kustomize](/docs/015-Kubernetes-Tools/039-Kustomize/013-Install-Kustomize.md).



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
---
title: Installing Kustomize"
description: Installing Kustomize"
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

Since `kubectl` v1.14, **Kustomize** has been bundled with it. However, the bundled version can be outdated.

If you want the **latest features**, it’s best to install Kustomize separately. But if you’re in a restricted environment with only `kubectl` available, the built-in version should still work.

## macOS

Use Homebrew or MacPorts:

```bash
brew install kustomize
# or
sudo port install kustomize
```

## Other Options

- Download binaries from the [GitHub releases](https://github.com/kubernetes-sigs/kustomize/releases) page
- Build from source (requires Go)
- Use Docker images (from v3.5.7):
  [Public images on Google Container Registry](https://console.cloud.google.com/gcr/images/k8s-artifacts-prod/US/kustomize/kustomize)
- Windows (Chocolatey):

  ```bash
  choco install kustomize
  ```

For full instructions, see:
[https://kubectl.docs.kubernetes.io/installation/kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize)

---
title: Installing Kustomize
description: Installing Kustomize
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

## Using a Script 

This script automatically detects your operating system and downloads the appropriate binary. 

```bash
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash 
```

By default, it will place the kustomize binary in your current working directory. To make it globally accessible, you should move it to a directory included in your system's `PATH`, such as `/usr/local/bin/`:

```bash
mv kustomize /usr/local/bin/
chmod +x /usr/local/bin/kustomize 
```

For Windows (using PowerShell):

```bash
iwr -useb "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.ps1" | iex 
```

After running the appropriate installation script and moving the binary (if necessary), you can verify the installation by running:

```bash
kustomize version 
```

Sample output:

```bash
v5.7.1 
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

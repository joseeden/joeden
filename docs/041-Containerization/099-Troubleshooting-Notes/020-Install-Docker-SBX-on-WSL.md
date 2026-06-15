---
title: "Install Docker SBX on WSL"
description: "Install Docker Sandboxes (SBX) CLI on Windows Subsystem for Linux (WSL)"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 20
# last_update:
#   date: 3/11/2022
---


## Overview

This KB explains how to install the Docker Sandboxes (`sbx`) CLI inside Windows Subsystem for Linux (WSL) on an Ubuntu/Debian-based distribution. 

## Prerequisites

- Windows 10/11 with WSL2 enabled
- Ubuntu/Debian-based WSL distro installed.
- Admin access on the Windows host

## 1. Enable nested virtualization in WSL

1. Open your Windows user profile folder (for example: `C:\Users\<YourUsername>`).

2. Create or edit a file named `.wslconfig` with the following contents:

    ```ini
    [wsl2]
    nestedVirtualization=true
    ```

3. Open an elevated PowerShell (or standard if allowed) and fully restart WSL:

    ```powershell
    wsl --shutdown
    ```

4. Restart your WSL distro (open your Ubuntu terminal again).

    **Note**: enabling nested virtualization allows the WSL kernel to expose KVM capabilities required by sbx.

## 2. Install the `sbx` CLI inside WSL

Open your WSL terminal and run these commands sequentially:

1. Register Docker repositories (official setup script only registers `apt` sources)

    ```bash
    curl -fsSL https://get.docker.com | sudo REPO_ONLY=1 sh
    ```

2. Update and install the sbx CLI package

    ```bash
    sudo apt-get update && sudo apt-get install -y docker-sbx
    ```

3. Add your user to the kvm group so sbx can access the virtualization layer

    ```bash
    sudo usermod -aG kvm $USER
    ```

4. Refresh group membership without logging out (applies 

    ```bash
    immediately in current shell)
    newgrp kvm
    ```


5. If `docker-sbx` is not available in your distribution's mirrors after running the setup script, confirm that the Docker repository was added:

    ```bash
    /etc/apt/sources.list.d/
    ```

    Then re-run:

    ```bash
    sudo apt-get update`.
    ```

## 3. Authenticate and run a test sandbox

1. Login to sbx (authenticate with your Docker ID):

    ```bash
    sbx login
    ```

2. Start a sandbox in a project directory (example: Claude agent):

    ```bash
    cd ~/your-project-directory
    sbx run claude
    ```

If authentication or credential storage has issues in WSL, this is a known area tracked on Docker's sbx GitHub Issues. Try logging in from the Windows host or consult the issue tracker for workarounds.

## Notes

1. If `kvm` devices are unavailable

    - Check `/dev/kvm` inside WSL. 
    - If missing, confirm that `nestedVirtualization=true` is present in `.wslconfig`
    - Ensure`wsl --shutdown` was executed on Windows.

    After `usermod -aG kvm`, you can try logging out and back in (or opening a new shell) 
    
    This ensures group membership persists across sessions.

3. If `sbx run` fails due to missing dependencies

    - Check `dmesg` and `journalctl` output inside WSL for kernel or KVM errors.

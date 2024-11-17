---
title: "Install Docker Desktop"
description: "Install Docker Desktop"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
sidebar_position: 2
last_update:
  date: 7/7/2022
---


## Enable WSL Integration 

If you're using WSL2 in your Windows machine, you need to enable the integration between WSL and Docker Desktop. Open the Docker Desktop console and click the gear icon to open the settings.

Go to **Resources** > **WSL Integration**, and then select the distro. Click **Apply and Restart** afterwards.

![](/img/docs/11172024-enable-wsl2-integration.png)


## Docker Context 


> You may encounter this issue if you installed Docker in WSL separately from Docker Desktop.

When you run containers from the WSL terminal, the containers won't sometimes show in Docker Desktop console. This is because Docker Desktop and the Docker in WSL are using different Docker engine. Check the contexts first to verify:

```bash
docker context ls
```

Output:

```bash
NAME            DESCRIPTION                               DOCKER ENDPOINT                             ERROR
default *       Current DOCKER_HOST based configuration   unix:///mnt/wsl/shared-docker/docker.sock
desktop-linux   Docker Desktop                            npipe:////./pipe/dockerDesktopLinuxEngine
Warning: DOCKER_HOST environment variable overrides the active context. To use a context, either set the global --context flag, or unset DOCKER_HOST envirironment variable. 
```

To use the context for Docker Desktop:

```bash
docker context use desktop-linux
```

Output:

```bash
desktop-linux
Current context is now "desktop-linux" 
```

Optionally, you can also set the `DOCKER_HOST` variable in your `.bashrc` file:

```bash
export DOCKER_HOST="npipe:////./pipe/dockerDesktopLinuxEngine"
```

You may need to restart WSL from a Powershell terminal:

```bash
wsl --shutdown 
```
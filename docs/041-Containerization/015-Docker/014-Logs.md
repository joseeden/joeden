---
title: "Logging"
description: "Container Logging"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 14
last_update:
  date: 3/11/2022
---


## Logs

To see the logs, you can simply use the logs command:

```bash
docker ps
docker logs <container-id>
```

Another way to see logs related to Docker:

```bash
journalctl -u docker.service 
```

You may also view the logs in the directory:

```bash
# Linux
/var/log
```

For Windows:

```powershell
~AppData\Local\Docker
```


 

 
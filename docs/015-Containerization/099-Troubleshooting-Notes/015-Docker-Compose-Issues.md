---
title: "Docker Compose Issues"
description: "Docker Compose Issues"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 15
last_update:
  date: 7/7/2022
---



## Incompatible Versions

When you have a docker-compose file with a specified version like this:

```bash
version: '3.9' 
```

You may sometimes encounter an issue when you try to run the file:

```bash
$ docker-compose up -d --build

ERROR: Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version. Either specify a supported version (e.g "2.2" or "3.3") and place your service definitions under the `services` key, or omit the `version` key and place your service definitions at the root of the file to use version 1.
For more on the Compose file format versions, see https://docs.docker.com/compose/compose-file/  
```

This might be due to incompatible docker-compose binary installed on your host. To check:

```bash
$ docker-compose version

docker-compose version 1.25.0, build unknown
docker-py version: 4.1.0
CPython version: 3.8.10
OpenSSL version: OpenSSL 1.1.1f  31 Mar 2020 
```

:::info

Docker Compose 1.25.0 only supports up to version 3.7 of the Compose file format, while version: '3.9' requires Docker Compose version 1.27.0 or higher.

::: 

**Solution**:

Update Docker Compose to a newer version (1.27.0 or later).

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version 
```

Alternatively, you can downgrade the docker-compose file to a supported version:

```bash
version: '3.7' 
```
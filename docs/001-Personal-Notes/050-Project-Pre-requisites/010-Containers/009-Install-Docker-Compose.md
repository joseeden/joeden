---
title: "Install Docker Compose"
description: "Install Docker Compose"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 9
last_update:
  date: 7/7/2022
---


## Ubuntu 

If you're using Ubuntu, you can install docker-compose by simply running the two commands below:

```bash
sudo apt-get update 
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

For more information, please see [Install Docker Compose CLI plugin page.](https://docs.docker.com/compose/install/compose-plugin/#installing-compose-on-linux-systems)



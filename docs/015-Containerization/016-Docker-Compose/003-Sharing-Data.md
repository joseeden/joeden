---
title: "Sharing Data"
description: "Sharing Data in Docker Compose"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 3
last_update:
  date: 3/11/2022
---


## Overview

Sharing data between the host and a container can be achieved using bind mounts. The command below maps a host directory to a container directory.

```bash
docker run -v ~/hostdata:/containerdata
```  

Bind mounts can also be specified in Docker Compose files. Multiple entries can be added for required bind mounts.   

```yaml
services:
  app:
    volumes:
      - ~/hostdata:/containerdata
```  

## Networks

To connect containers to specific networks, use the `--network` flag or define networks in Compose files.  

```bash
docker run --network net1
```  

In a docker compose file, the networks section allows additional configurations like assigning specific IP addresses.    

```yaml
services:
  app:
    networks:
      net1:
        ipv4_address: 192.168.1.100
networks:
  net1:
    driver: bridge
```  

## Port Mapping

Port mapping connects traffic between the host and container.  

```bash
docker run -p 8000:8000
```  

In a docker compose file, each port mapping uses a separate line.

```yaml
services:
  app:
    ports:
      - 8000:8000
```  

## `docker inspect`

The `docker inspect` command provides detailed information about containers, including networking and mounted data.  

```bash
docker inspect container_id_or_name
```  

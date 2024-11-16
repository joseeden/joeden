---
title: "Docker Compose"
description: "Managing multiple containers"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 18
last_update:
  date: 7/7/2022
---

## Using Docker Compose

**Docker Compose** simplifies the management of multiple containers by allowing you to define and run them using a single configuration file. Here’s a comparison between running multiple containers using individual `RUN` commands and using Docker Compose.

- **First Method - Multiple RUNs**

    ```bash
    docker run voting-app
    docker run redis
    docker run worker
    docker run db
    docker run result-app
    ```

- **Second Method - Using Docker Compose**

    ```yaml
    # docker-compose.yml
    services:
        web:
            image: "voting-app"
        cache:
            image: "db"
        messaging:
            image: "worker"
        db:
            image: "db"
        result:
            image: "result-app"
    ```

The second method is cleaner and more organized. To run the entire stack defined in `docker-compose.yml`, execute:

```bash
docker-compose up
```

:::info[NOTE]

**Note**: This command is applicable only for multiple containers on a **single Docker host**.

:::


## Adding More Details to docker-compose.yml

You can enhance the `docker-compose.yml` file with additional configurations:

```yaml
services:
  redis:
      image: "redis"
  db:
      image: postgres:9.4
  vote:
      build: ./vote
      ports:
          - 5000:80
      links:
          - redis
  result:
      build: ./result
      ports:
          - 5001:80
      links:
          - db
  worker:
      image: worker
      links:
          - db
          - redis
```

Explore the labs in this repository to learn more about Docker Compose.

## Docker Compose Versions

There are three versions of a Docker Compose file. For versions 2 and 3, you must specify the version.

- **Version 1**

    All containers are attached to the default bridge network and use links for communication.

    ```yaml
    redis:
        image: redis
    db:
        image: postgres:9.4
    vote:
        image: voting-app
        ports:
            - 5000:80
        links:
            - redis
    ```

- **Version 2**

    A dedicated network is automatically created for the application, and containers can have dependencies.

    ```yaml
    version: '2'
    services:
        redis:
            image: redis
        db:
            image: postgres:9.4
        vote:
            image: voting-app
            ports:
                - 5000:80
            depends_on:
                - redis
    ```

- **Version 3**

    Similar to version 2 but includes support for Docker Swarm.

    ```yaml
    version: '3'
    services:
        redis:
            image: redis
        db:
            image: postgres:9.4
        vote:
            image: voting-app
            ports:
                - 5000:80
    ```


## Docker Compose Commands

The **docker-compose** commands outlined here are essential for managing your containerized applications. The `--build` option rebuilds the images specified in the docker-compose file before starting the containers.

To run containers in the background, use:

```bash
docker-compose up -d 
```

To stop the containers, use:

```bash
docker-compose down 
```

To view the running containers, run this command in the directory containing your docker-compose file. This command checks the docker-compose file for the container list and their status:

```bash
docker-compose ps 
```

If executed in a directory without a docker-compose file, you'll see an error:

```bash
docker-compose ps
```

Output:

```bash
ERROR:
        Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml 
```
  
 

 
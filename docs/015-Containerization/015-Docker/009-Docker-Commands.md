---
title: "Docker Cheatsheet"
description: "Docker Cheatsheet"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 9
last_update:
  date: 7/7/2022
---

## Docker commands

This section provides commands to create, manage, and interact with Docker containers.

<div class='img-center'>

![](/img/docs/dockerrunequalsdockercreateplusdockerstart.png)

</div>


## Creating and Starting Containers

- **Create a container** (but don't start it yet):

  ```bash
  docker create <image-id>
  ```

- **Start a container**:

  ```bash
  docker start <container-id>
  ```

- **Run a container from an image**:

  ```bash
  docker run <image-id>
  ```

For example, to run an NGINX container, Docker checks the host for the image. If not found, it pulls the image from DockerHub:

```bash
sudo docker run nginx
```

Subsequent executions will reuse the same image. To see valid options for the `run` command:

```bash
docker run --help
```

## Listing Containers

- **List running containers**:

  ```bash
  docker ps
  ```

- **List all containers (running and stopped)**:

  ```bash
  docker ps -a
  ```

## Setting Container Names and Tags

- **Set a custom container name**:

  ```bash
  sudo docker run --name Thanos_of_2019 docker/whalesay cowsay I'm-Inevitable!
  ```

- **Specify an image version (tag)**:

  ```bash
  sudo docker run nginx:1.14-alpine
  ```

- **Run multiple instances from the same image**:

  ```bash
  sudo docker run docker/whalesay cowsay Infinity-and-beyond!
  sudo docker run docker/whalesay cowsay Hello-there!
  sudo docker run docker/whalesay cowsay Cowabunga!
  ```

## Pulling Images

To pull an image to your host (without running a container):

```bash
sudo docker pull <image-name>
sudo docker pull nginx
```

## Managing Containers

- **Stop a running container**:

  ```bash
  docker stop <container-name>
  docker stop <container-id>
  ```

- **Remove a container**:

  ```bash
  docker rm <container-name>
  ```

- **Forcefully remove a running container**:

  ```bash
  docker rm -f <container-name>
  ```

- **Remove all containers**:

  ```bash
  docker rm -f $(docker container ls -aq)
  ```

- **Remove all stopped containers without confirmation**:

  ```bash
  docker container prune -f
  ```

- **Delete stopped containers, unused images, and build cache**:

  ```bash
  docker system prune
  ```

## Removing Images

- **Remove an image** (ensure no containers are using it):

  ```bash
  docker rmi <image-name>
  ```

- **Remove all images without associated containers**:

  ```bash
  docker image prune -a -f
  ```

## Container Lifecycle

Containers are designed to run specific tasks or processes. When the task completes, the container exits. For example, running Ubuntu:

```bash
sudo docker run ubuntu
```

To run a process (like sleeping for 60 seconds):

```bash
sudo docker run ubuntu sleep 60
```

## Executing Commands in Running Containers

To execute a command in a running container:

```bash
sudo docker exec <container-id> <command>
sudo docker exec <container-name> <command>
```

For example, to view the hosts file of a running container:

```bash
sudo docker exec <container-id> cat /etc/hosts
sudo docker exec <container-name> cat /etc/hosts
```

<div class='img-center'>

![](/img/docs/all-things-docker-k8s-docker-exec.png)

</div>
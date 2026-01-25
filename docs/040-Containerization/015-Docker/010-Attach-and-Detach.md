---
title: "Attach and Detach Mode"
description: "Attach and detaching from containers"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 10
last_update:
  date: 3/11/2022
---

## Overview

In Docker, containers can be run in two main modes: **attach** mode and **detach** mode.

## Attach Mode

When a container is run in attach mode, the process runs in the foreground, meaning the console will not respond to any other inputs until the container exits. You can stop the process by pressing `Ctrl-C`.
  
- **Example**: To run a simple web server that listens on port 8080:

  ```bash
  sudo docker run kodekloud/simple-webapp
  ```

- **Check Running Containers**:

  To see the running containers, you can use:

  ```bash
  sudo docker ps
  ```

  **Output Example**:

  ```bash
  CONTAINER ID   IMAGE                     COMMAND           CREATED          STATUS          PORTS      NAMES
  734e84936864   kodekloud/simple-webapp   "python app.py"   30 seconds ago   Up 29 seconds   8080/tcp   relaxed_grothendieck
  ```

## Detach Mode

Running containers in detach mode allows them to run in the background. This is achieved using the `-d` flag. The terminal remains free for other commands while the container runs.

- **Example**: To run an Ubuntu container that sleeps for 60 seconds in detach mode:

  ```bash
  sudo docker run -d ubuntu sleep 60
  ```

- **Attaching to a Running Container**:

  If you need to interact with a container that is running in the background, you can attach to it by using the `attach` command along with the container ID or name:

  ```bash
  sudo docker ps
  sudo docker attach <container-id>
  sudo docker attach <container-name>
  ```

- **Interactive Mode**:

  You can also run a container and automatically log into it by using the `-it` flag, which combines the `-i` (interactive) and `-t` (tty) options:

  ```bash
  sudo docker run -it -d --name nyancat2 06kellyjac/nyancat
  ```

This setup allows users to manage containers effectively based on their needs for interaction and control, whether they want a foreground process or prefer to run containers in the background.
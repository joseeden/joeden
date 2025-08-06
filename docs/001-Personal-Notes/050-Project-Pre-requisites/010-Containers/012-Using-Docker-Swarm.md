---
title: "Using Docker Swarm"
description: "Using Docker Swarm"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
sidebar_position: 12
last_update:
  date: 7/7/2022
---


## Recommended Setup

:::info 

These are **optional**, and you can setup a basic Docker Swarm after installing the necessary tools. For a quick setup, please see:

- [Recommended Setup](#recommended-setup)
- [Tools](#tools)
- [Docker Swarm with Multiple Nodes](#docker-swarm-with-multiple-nodes)
- [Docker Swarm with One Node](#docker-swarm-with-one-node)
- [Optional but Useful Tools](#optional-but-useful-tools)

:::

Below are some recommended settings when setting up a Docker Swarm. 

- **Number of nodes**

  - At least 3 Linux nodes (VMs or physical machines)
  - 1 manager node
  - 2+ worker nodes

- **Recommended OS**
  
  - Ubuntu 20.04+
  - CentOS 7+
  - Rocky Linux
  - AlmaLinux

- **CPU and RAM**

  - Each node should have minimum **1 CPU and 1GB RAM**
  - Docker Engine installed (version 20.10+ recommended)
  - Static IP or properly configured networking (especially if across machines)

- **Network Requirements**

  - All nodes must be reachable over the network
  - Especially on these ports:

      - `2377/tcp` – for cluster management
      - `7946/tcp` and `7946/udp` – for node communication
      - `4789/udp` – for overlay network (VXLAN)

  - No firewalls blocking the required ports between nodes
  - Consistent DNS or `/etc/hosts` entries for node name resolution (if no DNS)


- **User & Access**

  - SSH access between nodes (especially for setup convenience)
  - User with sudo privileges on all nodes


## Tools

- Install Docker:

  ```bash
  curl -fsSL https://get.docker.com | bash
  sudo usermod -aG docker $USER
  ```

- Enable and start Docker:

  ```bash
  sudo systemctl enable docker
  sudo systemctl start docker
  ```

- Install Docker Compose plugin:

    For Ubuntu/Debian:

    ```bash
    sudo apt-get update
    sudo apt-get install docker-compose-plugin
    ```

    For CentOS/RHEL:

    ```bash
    sudo yum install docker-compose-plugin
    ```

- Verify installation

    ```bash
    docker compose version
    ```
    

## Docker Swarm with Multiple Nodes

1. On the intended manager node, initialize the swarm:

    ```bash
    docker swarm init
    ```

2. **Optional**: Bind it to a specific IP (recommended in multi-node labs):

    ```bash
    docker swarm init --advertise-addr <MANAGER-IP>
    ```

3. Get the join command:

    ```bash
    docker swarm join-token worker
    ```

4. On the worker node, run the output command (something like):

    ```bash
    docker swarm join --token SWMTKN-xxxx <MANAGER-IP>:2377
    ```

5. To verify, run `docker stack deploy` **on a manager node**.

    ```bash
    docker info | grep 'Swarm'
    ```

    Expected output if it's a **manager**:

    ```
    Swarm: active
    Is Manager: true
    ```

    If it shows `inactive`, or `Is Manager: false`, you're not on the right node.



## Docker Swarm with One Node

**A few notes:**

- A single-node swarm works just like a multi-node one (for testing).
- You can run both **manager** and **worker** roles on the same machine.

**Ideal for testing features like**:

- `docker stack deploy`
- `docker service ls`
- Rolling updates, constraints, placement preferences (in limited form)

**Steps:**

1. Initialize the swarm:

    ```bash
    docker swarm init
    ```

    This makes your local machine the **manager node**, and it's automatically part of the swarm.

    ```bash
    Swarm initialized: current node (abcdefgh12345) is now a manager. 
    ```

2. Verify it’s active:

    ```bash
    docker info | grep Swarm
    ```

    You should see:

    ```
    Swarm: active
    Is Manager: true
    ```

## Optional but Useful Tools

- **Visualizers** like [Docker Swarm Visualizer](https://github.com/dockersamples/docker-swarm-visualizer)
- **Portainer** (lightweight web UI for Docker Swarm)



---
title: "Container Metrics"
description: "Container Metrics"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- Containers
- Containerization
- DevOps
sidebar_position: 20
last_update:
  date: 11/20/2022
---


## Overview 

Container metrics provide insights into the performance and health of containers running in your environment. Prometheus can collect these metrics by using tools like **cAdvisor**, which exposes container-level metrics such as CPU usage, memory consumption, and network traffic. T

## Pre-requisites  

- [Setup Prometheus](/docs/018-Observability/010-Prometheus/011-Installation.md)
- [Setup Docker](https://docs.docker.com/engine/install/)
- [Run sample containers](https://docs.docker.com/reference/cli/docker/container/run/#examples)

## Docker Engine Metrics vs cAdvisor Metrics 

Docker Engine and cAdvisor provide different sets of metrics for monitoring containers. While Docker Engine focuses on overall Docker performance, cAdvisor offers detailed metrics specific to individual containers.

- **Docker Engine Metrics**
    - CPU usage by Docker
    - Total failed image builds
    - Time to process container actions
    - No container-specific metrics

- **cAdvisor Metrics**
    - CPU and memory usage per container
    - Number of processes running in a container
    - Uptime for each running container

## Docker Engine Metrics

1. Create or edit the `/etc/docker/daemon.json` file:

   ```bash
   vi /etc/docker/daemon.json
   ```

2. Add the following lines to the file:

   ```bash
   {
     "metrics-addr" : "127.0.0.1:9323",
     "experimental" : true
   }
   ```

   If you have an existing daemon file, then adding the new lines should look like this:

   ```bash
    {
    "exec-opts": [
        "native.cgroupdriver=cgroupfs"
    ],
    "bip": "172.12.0.1/24",
    "registry-mirrors": [
        "http://docker-registry-mirror.abc.com"
    ],
    "metrics-addr" : "127.0.0.1:9323",
    "experimental" : true
    }
   ```

3. Restart the Docker service:

   ```bash
   systemctl restart docker
   systemctl status docker
   ```

4. Verify if Docker is exporting the metrics:

   ```bash
   curl localhost:9323/metrics
   ```

   It should return a long list of metrics:

    ```bash
    # HELP builder_builds_failed_total Number of failed image builds
    # TYPE builder_builds_failed_total counter
    builder_builds_failed_total{reason="build_canceled"} 0
    builder_builds_failed_total{reason="build_target_not_reachable_error"} 0
    builder_builds_failed_total{reason="command_not_supported_error"} 0
    builder_builds_failed_total{reason="dockerfile_empty_error"} 0
    ........
    ```

5. Edit `/etc/prometheus/prometheus.yml` file and add below given lines under `scrape_configs`:

    ```bash
    - job_name: "docker"
        static_configs:
        - targets: ["localhost:9323"] 
    ```

6. Restart prometheus service:

    ```bash
    systemctl restart prometheus 
    systemctl status prometheus 
    ```

7. Access the Prometheus console and go to Status > Targets. The Docker host should show "up".

    ![](/img/docs/12112024-observability-prometheus-docker-containers-up.png)

8. Go back to the main page and enter the following in the expression bar:

    ```bash
    engine_daemon_container_states_containers 
    ```

    ![](/img/docs/12112024-observability-prometheus-docker-containers-detailed.png)


## Container-level Metrics 

To collect container-level metrics, run a cAdvisor container on the Docker host. cAdvisor exposes metrics like CPU usage, memory, and network traffic, which Prometheus can scrape for monitoring.

1. Create the docker compose file for the cAdvisor. Note that this container is exposed on port 8070.

    ```yaml
    version: '3.4'
    services:
    cadvisor:
        image: gcr.io/cadvisor/cadvisor
        container_name: cadvisor
        privileged: true
        devices:
        - "/dev/kmsg:/dev/kmsg"
        volumes:
        - /:/rootfs:ro
        - /var/run:/var/run:ro
        - /sys:/sys:ro
        - /var/lib/docker/:/var/lib/docker:ro
        - /dev/disk/:/dev/disk:ro
        ports:
        - 8070:8080 
    ```

2. Run the docker compose file.

    ```bash
    docker compose up -d
    ```

    It should return:

    ```bash
    ✔ Container cadvisor  Running  
    ```

3. Create a new job named "cadvisor" in `/etc/prometheus/prometheus.yml` and add `localhost:8070` as the target. 

    ```bash
    - job_name: "cadvisor"
        static_configs:
        - targets: ["localhost:8070"] 
    ```

4. Restart the Prometheus service after applying the changes.

    ```bash
    systemctl restart prometheus 
    systemctl status prometheus 
    ```

5. Login to the Prometheus console and enter the following in the expression bar:

    ```bash
    container_cpu_system_seconds_total{job="cadvisor", name="opt-redis3-1"} 
    ```

    We should now see the metrics of the individual containers:

    ![](/img/docs/12112024-observability-prometheus-docker-containers-level-metrics.png)

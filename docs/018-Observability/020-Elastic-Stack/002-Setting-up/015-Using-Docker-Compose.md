---
title: "Using Docker Compose"
description: "Using Docker Compose"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 1
last_update:
  date: 12/30/2022
---




## Overview

This lab provides a local multi-node Elasticsearch environment using Docker Compose. It simulates a realistic cluster environment similar to production, including Kibana, Logstash, and Metricbeat.

## Components

This setup includes the core Elastic Stack components:

- **Elasticsearch**

  - Multi-node cluster with 3 nodes (es01, es02, es03).
  - Supports shard allocation, failover, and real-world cluster behaviors.

- **Kibana**

  - Web UI to visualize, search, and manage data.
  - Connects to Elasticsearch for dashboards and observability.

- **Logstash**

  - Ingest pipeline tool for transforming and forwarding data.
  - Reads custom `.conf` files from the mounted `./logstash/pipeline` directory.

- **Metricbeat**

  - Collects metrics from Docker containers and host system.
  - Configurable via `./metricbeat/metricbeat.yml`.

The files can be found here: [GitHub repo](#)

## Deploy the Stack

Follow these steps to launch the stack:

1. Clone the repository.
2. Ensure Docker Desktop is running.
3. From the project directory, crun:

    ```bash
    docker compose -p dev-elastic-stack -f docker-compose-elk.yaml up -d
    ```

4. Wait a few minutes for the Elasticsearch cluster to form.


5. Check cluster health:

    ```bash
    curl -u elastic:changeme http://localhost:9200/_cluster/health?pretty
    ```

6. Verify Kibana is accessible at:

    ```bash
    http://localhost:5601
    ```


- Check Logstash pipelines:

    ```bash
    docker logs logstash
    ```

- Check Metricbeat metrics in Kibana’s “Metrics” app.


## How to Extend

This stack can be expanded for more advanced use cases:

- Add a **Fleet Server** container for Elastic Agent experiments.
- Mount custom pipelines, dashboards, or config files to simulate real workloads.
- Can be easily scaled like a Kubernetes pod, just increase replicas in Docker Compose.


## Cleanup


1. Clean up stopped containers, volumes, and dangling mounts

    ```bash
    docker compose -p dev-elastic-stack -f docker-compose-elk.yaml down
    docker volume prune -f
    docker system prune -f
    ```

    - This removes stopped containers, unused volumes, and any leftover mount metadata.
    - Be careful: `system prune` will remove all unused data on Docker.



2. Restart WSL2 Docker Desktop integration

    ```bash
    wsl --shutdown
    ```

    - Then reopen Docker Desktop.
    - This clears lingering mount points in `/run/desktop/mnt/host/wsl/`.


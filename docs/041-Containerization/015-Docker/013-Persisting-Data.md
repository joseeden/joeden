---
title: "Persisting Data"
description: "Persisting Data"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 13
last_update:
  date: 3/11/2022
---

## Persisting Data

Docker images are composed of multiple layers, with the first layer being the base image and subsequent layers containing additional packages and modifications. 

![Docker Image Layers](/img/docs/dp-docker-image-layers.png)

The last layer is a writable layer used by applications running in the container. If a container is started without a defined storage option, any data written to this writable layer will be lost when the container is stopped. To avoid data loss, Docker provides three storage options:

- Bind mounts 
- Volumes 
- tmpfs

![Storage Options](/img/docs/dp-storage-options.png)

## Bind Mounts

Bind mounts allow you to mount a directory from the host into the container. This is a beneficial storage option because the data resides on the host's filesystem and remains intact even when the container is stopped or terminated. 

:::info[NOTE]

**Note:** You must provide the fully qualified path of the host directory to mount it inside the container.

:::


**Use Cases:**

- Sharing config files

  - Mount `/etc/resolv.conf` for DNS.
  - Ensures proper network resolution.

- Sharing source code/build artifacts

  - Copy artifacts in Dockerfile.
  - Avoids reliance on bind mounts.

- Consistent bind mounts

  - Match host structure with container.
  - Simplifies development setup.

## Volumes

Volumes are another storage option managed by Docker, allowing you to store data independently of the host's filesystem. With volumes, you do not need to know the host directory path, as Docker manages this for you.

**Key Points**:

- Volumes are created automatically on first mount.
  - No need for prior definition.
  - Ensures quick setup.

- Volumes are deleted only when explicitly removed.
  - Provides data safety.
  - Avoids accidental loss.

**Use Cases**:

- Sharing data between containers
  - Access simultaneously in read-write or read-only.
  - Supports collaboration among containers.

- Decoupling host configuration
  - Useful with uncertain host file structures.
  - Reduces dependencies on host configurations.

- Remote storage
  - Utilize external storage, including cloud.
  - Flexibility in data management.

- Backup, restore, or migrate
  - Facilitates data transfer across hosts.
  - Ensures data availability and integrity.

**Examples:**

To add a local volume to a container:

```bash
docker run -d \
    -v <name>:<path/on/container> \ 
    --name <name> \
    <image>
```

To mount an existing directory to a container:

```bash
docker run -d \
    --mount type=bind,source=<path/on/host>,target=<name> \
    --name <name> \
    <image>
```


## tmpfs (Temporary Filesystem)

The `tmpfs` option creates an in-memory filesystem that exists only while the container is running. Data stored in `tmpfs` is not persistent and will be lost once the container stops. This is useful for temporary data that does not need long-term storage.

- **Performance**  
  - Offers faster read and write speeds compared to disk storage.  
  - Ideal for applications requiring high-speed data access.

- **Memory Limitations**  
  - Size can be controlled with the `size` option (e.g., `size=100m` for 100 MB).  
  - Helps manage memory usage effectively.

- **Use Cases**  
  - Suitable for transient data and caching.  
  - Useful for maintaining state in applications that handle sensitive information.

To define a `tmpfs` mount in a Docker container using the `--tmpfs` option:  

```bash
docker run -d --tmpfs /app/tmp:rw,size=100m my-image
```  

This creates a writable `tmpfs` mount at `/app/tmp` with a 100 MB size limit.
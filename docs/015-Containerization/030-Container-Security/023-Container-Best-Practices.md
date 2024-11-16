---
title: "Container Best Practices"
description: "Container Best Practices"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 23
last_update:
  date: 7/7/2022
---



## Writing Dockerfiles 

To learn more, check out [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).

- Use Alpine as base image. It's small and still a full Linux distribution.

    ```bash
    FROM alpine
    ```

- Add `MAINTAINER` to let others know who to contact.

    ```bash
    MAINTAINER John Smith <john.smith@abc.com>
    ```

- Run multiple commands in one `RUN` statement, connected by &&.

    ```bash
    RUN apt-get update && apt-get install -y subversion 
    ```

- Split long `RUN` statements on multiple lines to keep them readable.

    ```bash
    RUN apt-get update && apt-get install -y \
        bzr \
        cvs \
        git \
        mercurial \
        subversion \
        && rm -rf /var/lib/apt/lists/*
    ```

- Use `ENV` to set environment variables for entrypoint applications.

    ```bash
    ENV PG_MAJOR=9.3
    ENV PG_VERSION=9.3.4
    RUN curl -SL https://example.com/postgres-$PG_VERSION.tar.xz | tar -xJC /usr/src/postgres && …
    ENV PATH=/usr/local/postgres-$PG_MAJOR/bin:$PATH
    ```

- Use `COPY` not `ADD` to copy files onto the containers 

    ```bash
    COPY requirements.txt /tmp/
    RUN pip install --requirement /tmp/requirements.txt
    COPY . /tmp/    
    ```

- Use `USER` to run as a non-root user

    ```bash
    USER Johnsmith  
    ```

## Container Security 

When it comes to container security, keep these tips in mind:

- Include as little as possible in the container images.  
- Run rootless containers.  
- Specify which user account to use in an image.  
- Use verified images.  
- For custom images, sign your images.  
- Use access control on container registries.  
- Run containers on isolated networks.  
- Use Kubernetes for implementing Role-based Access Control (RBAC).  



 

 
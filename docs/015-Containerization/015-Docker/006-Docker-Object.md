---
title: "Docker Objects"
description: "Docker Objects"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 6
last_update:
  date: 7/7/2022
---


## Overview

Docker objects are the essential components that make up a Docker environment, facilitating application deployment and management.

<div class='img-center'>

![](/img/docs/docker-objects.png)

</div>

## Dockerfile

A Dockerfile is a series of instructions for creating a Docker image:

- Packages code and dependencies.
- Each command creates a layer that is cached.
- Only modified layers are rebuilt when changes occur.

For a complete list of instructions, refer to the official [Docker documentation](https://docs.docker.com/engine/reference/builder/). Common instructions include:

- `FROM` - Specifies the base image.
- `RUN` - Executes a command during image build.
- `COPY` and **ADD** - Transfer files from the host to the container.
- `CMD` - Default command to run when the container starts.
- `EXPOSE` - Opens a port for communication.

Here’s an example **Dockerfile** for a Python hello-world application:

```bash
# Set the base image
FROM python:3.8

# Set the maintainer label
LABEL maintainer="Eden Jose"

# Copy files to the container
COPY . /app

# Set the working directory
WORKDIR /app

# Install dependencies
RUN pip install -r requirements.txt

# Command to run on container start
CMD [ "python", "app.py" ]
```

## Creating the Dockerfile

Before creating the image, outline the steps to deploy the application. For example, deploying a web application might involve:

1. Start with OS - CentOS
2. Update repo
3. Install dependencies
4. Install Python packages
5. Copy source code to /opt
6. Run the web server

With these steps, you can begin containerizing your application:

1. Create a Dockerfile.
2. Build your image using the Dockerfile.
3. Push it to a Docker registry.

Here's a basic flow for creating a Dockerfile:

<div class='img-center'>

![](/img/docs/dockerfilebasicflow.png)

</div>

## Docker Image

After creating the Dockerfile, you can build a Docker image, which is:

- A read-only template.
- Composed of an **overlay filesystem**.
- Used to run container instances.

## Overlay Filesystem

A Docker image consists of multiple layers, starting with a base image and adding installed packages on top. The last layer is writable; data written here will be lost once the container stops unless specific storage options are set.

## Building the Docker Image

To build a Docker image from a Dockerfile, use the `docker build` command:

```docker
docker build [OPTIONS] PATH
```

To see all valid options for the `build` command, use:

```docker
docker build --help
```

For example, to build a Python "Hello-world" application from the current directory:

```docker
docker build -t python-helloworld .
```

To build from a different directory, use:

```docker
docker build -t python-helloworld /another/directory/python-app
```

To list all available images:

```docker
docker images
```


 
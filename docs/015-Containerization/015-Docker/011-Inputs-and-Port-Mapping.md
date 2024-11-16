---
title: "Inputs and Port Mapping"
description: "Inputs and Port Mapping"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 11
last_update:
  date: 7/7/2022
---

## Inputs

By default, a Docker container does not listen to standard input and runs in a non-interactive shell. However, you can enable interactive input and terminal mapping by using specific flags:

- **`-i`**: Runs the container in interactive mode, allowing it to receive input from the standard input (stdin).
- **`-t`**: Allocates a pseudo-TTY, mapping the terminal of the host to the container's terminal.

As an example, you can use a simple image of an app that prompts the user for input:

```bash
docker pull kodekloud/simple-prompt-docker
docker run -it kodekloud/simple-prompt-docker
```

## Port Mapping

The underlying host where Docker is installed is referred to as the **Docker Host** or **Docker Engine**. To access applications running in a Docker container from a web browser, you can use the container's internal IP address, which is only accessible from the host itself.

### Getting the Container IP Address

To retrieve the IP address of a running container:

```bash
docker ps
docker inspect <container-id>
```

To access the IP from within the host, you can open the IP address in a web browser or use `curl` in the host's terminal. For example, if the container is running on port 8080, you can test it with:

```bash
curl <ip-of-vm>:8080
```

### Port Mapping to Access from Outside

To make your application accessible from outside the host, you need to map the internal container port to a port on the Docker host. This can be achieved using the `-p` flag.

Example: To map container port 5000 to host port 80, you would run:

```bash
docker run -d -p 80:8080 kodekloud/simple-webapp
```

### Viewing Port Mappings

To see the current port mappings on your Linux machine, you can run:

```bash
netstat -tulpn
```

This command will display a list of all network connections and listening ports, helping you verify the mappings you've set up.
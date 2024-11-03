---
title: "CMD and ENTRYPOINT"
description: "Defining default commands on containers"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 16
last_update:
  date: 7/7/2022
---


## Overview

Containers are designed to run specific applications rather than host full operating systems. For instance, when you launch a Linux image like Ubuntu, its default command (CMD) is `bash`. If there’s no terminal detected, the container will stop.

## `CMD`

You can define a default command for the container using the `CMD` keyword in the Dockerfile. For example, to make the container sleep for 60 seconds:

```bash
docker run ubuntu sleep 60
```

You can also include this command directly in the Dockerfile:

```bash
$ cat > Dockerfile 

FROM ubuntu
CMD sleep 60
```

**Command Formats:**

- `CMD <command> <parameter1>`
- `CMD ["<command>", "<parameter1>"]` (JSON format)

## `ENTRYPOINT`

To allow parameters from the command line, use `ENTRYPOINT` in the Dockerfile:

```bash
FROM ubuntu
ENTRYPOINT ["sleep"]
```

When running the container, provide the parameter:

```bash
docker run ubuntu-sleeper 60
```

If no parameter is given, you'll encounter an error since ENTRYPOINT requires one.

**Default Parameter:**

To set a default parameter if none is provided, combine `CMD` and `ENTRYPOINT`:

```bash
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["60"]
```

## Overriding `ENTRYPOINT`

You can override the ENTRYPOINT at runtime using the `--entrypoint` flag:

```bash
docker run --entrypoint sleep2.0 ubuntu-sleeper 60
```
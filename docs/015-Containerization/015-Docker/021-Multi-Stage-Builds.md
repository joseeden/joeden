---
title: "Multi-Stage Builds"
description: "Multi-Stage Builds"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
sidebar_position: 21
last_update:
  date: 3/11/2022
---


## Single-Stage Builds  

Single-stage builds use a single `FROM` statement to create a Docker image. This approach can lead to larger images and unnecessary clutter.

- All steps occur in one container.  
- Tools and source code remain in the final image.  
- Larger image size, harder to manage.

Example:  

```dockerfile
FROM ubuntu:latest  
RUN apt-get update && apt-get install -y build-essential  
COPY source /src  
RUN gcc /src/main.c -o /app  
CMD ["/app"]
```

## Multi-Stage Builds  

Multi-stage builds use multiple `FROM` statements to streamline the process, creating smaller and cleaner images.

- Separate build and runtime stages.  
- Build stages compile code or prepare data.  
- Final stages include only essential runtime components.  
- Containers from build stages are discarded automatically.  

Example:  

```dockerfile
# Build stage  
FROM ubuntu:latest AS stage1  
RUN apt-get update && apt-get install -y build-essential  
COPY source /src  
RUN gcc /src/main.c -o /app  

# Final stage  
FROM alpine:latest  
COPY --from=stage1 /app /app  
CMD ["/app"]
```

Key points:  

- `AS` keyword assigns an alias to the build stage (e.g., `stage1`).  
- `COPY --from` copies files from a build stage into the final image.  

Using multi-stage builds creates efficient images and automates cleanup, resulting in a cleaner development workflow.


## Multi-Platform  

Multi-platform refers to compatibility across operating systems and CPU types.

- OS types: Linux, Windows, macOS.  
- CPU types: x86_64 (Intel/AMD), arm64 (mobile/Apple).  
- Platforms defined as `os/cpu` (e.g., `linux/amd64`, `macos/arm64`).  

## Creating Multi-Platform Builds  

Multi-platform builds rely on multi-stage builds and cross-compilers.  

- Build stages use host platform tools.  
- Cross-compilers enable builds for different platforms.  
- Final stage uses the target platform to assemble binaries.  

Options define target platforms for builds.  

- `--platform=$BUILDPLATFORM`: Matches host platform.  
- `ARG TARGETOS TARGETARCH`: Passes target OS and architecture.  
- Environment variables (e.g., `TARGETOS=linux`, `TARGETARCH=arm64`).  

Example:  

```dockerfile
FROM --platform=$BUILDPLATFORM golang:1.21 AS build  
WORKDIR /app  
COPY . .  
ARG TARGETOS TARGETARCH  
RUN GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o main .  

FROM alpine:latest  
COPY --from=build /app/main /main  
CMD ["/main"]
```

## Running Multi-Platform Builds  

Use `docker buildx` for multi-platform images.  

- Command:  
  ```bash
  docker buildx build --platform linux/amd64,linux/arm64 -t myimage .
  ```  
- Requires buildx setup:  
  ```bash
  docker buildx create --bootstrap --use
  ```  

`docker buildx` simplifies creating images for multiple platforms efficiently.
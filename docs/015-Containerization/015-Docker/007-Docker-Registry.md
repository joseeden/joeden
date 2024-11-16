---
title: "Docker Registry"
description: "Where you store and share container images"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 7
last_update:
  date: 7/7/2022
---



## Docker Registry

Once your application is packaged and tested, you can store and distribute the image via a public Docker registry such as:

- [DockerHub](https://hub.docker.com/)
- [Harbor](https://goharbor.io/)
- [Amazon Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/)
- [Google Container Registry](https://cloud.google.com/container-registry)
- [Quay Container Registry](https://quay.io/)

You can also use private registries to share images with authorized users. Authentication is required to access these registries.

## Authenticating to the Registry

To log in to Docker Hub from your terminal, you need to [create an account](https://hub.docker.com/signup):

```bash
docker login
```

With access granted, you can push images, but remember to tag them before sharing for better organization.
 

## Retrieving an Image from Container Registry

This section outlines how to work with DockerHub as an example.

Once you've [set up a DockerHub account](https://hub.docker.com/signup), log in through the terminal:

```bash
docker login
```

If your image is tagged, you can push it to the registry:

```bash
docker push NAME[:TAG]
```

For instance, to push the Python hello-world application tagged with v1 to the 'my-repo' repository in DockerHub, use:

```bash
docker push my-repo/python-helloworld:v1.0.0
```

To pull an image from DockerHub, execute:

```bash
docker pull NAME[:TAG]
```
 
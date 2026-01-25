---
title: "Minimize Base Image Footprint"
description: "Best practices for securing container images"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 10
last_update:
  date: 3/11/2022
---

## Base and Parent Images

A **base image** starts from scratch, often seen in Dockerfiles like this:

```dockerfile
FROM scratch
ADD rootfs.tar.xz /
CMD ["bash"]
```

A **parent image** builds on top of a base or other parent image. For example, the HTTPD image:

```dockerfile
FROM debian:buster-slim

ENV HTTPD_PREFIX /usr/local/apache2
ENV PATH $HTTPD_PREFIX/bin:$PATH
WORKDIR $HTTPD_PREFIX
...
```


## Best Practices

To secure container images, follow these best practices:

- Use modular images with isolated dependencies.
- Avoid storing state/data inside containers
- Use external volumes for data storage
- Choose small, efficient base images on DockerHub.
- Install only essential packages
- Remove package managers like `yum`, `apt`, and `wget`.

For DockerHub base images:

- Only use "Official" or "Verified" images.
- Use frequently updated images to reduce vulnerabilities.

**Application containers should only contain:**

- The application
- Required runtime dependencies

**Exclude from containers:**

- Package managers, shells, network tools, text editors, or other unnecessary programs

  
## Securing Images 


Follow a clear naming convention for images:

<div class='img-center'>

![](/img/docs/naming-convention-of-images.png)

</div>

When storing images in private registries, replace "docker.io" with your private registry's name. To pull and run containers from private registries:

<div class='img-center'>

![](/img/docs/running-containers-from-private-registry.png)

</div>

To use containers from private registries in Pod definition files, first create a Docker registry secret to store credentials:

```bash
kubectl create secret docker-registry my-creds \
--docker-server=private-registry.io \
--docker-username=registry-user \
--docker-password=registry-password \
--docker-email=registry-user@org.com
```

Next, reference the image and secret in the Pod manifest:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: mycontainer
    image: private-registry.io/apps/internal-app:latest
  imagePullSecrets:
  - name: my-creds
```





 

 

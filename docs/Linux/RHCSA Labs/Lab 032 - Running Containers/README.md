---
title: 032 - Running Containers
tags: [Linux, Red Hat, Certifications, Labs]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---

## Tasks

1. Ensure that registry.access.redhat.com container registry is used.
2. Download nginx image to the local computer.
3. Start the nginx container.


## Solution

### 1. Use the container registry

Red Hat container images are typically available on the Red Hat container registry (`registry.access.redhat.com`). Ensure your Docker configuration is set to use this registry for pulling Red Hat certified images.

To do this, you can authenticate first to the Red Hat Container Registry. Run the following command and enter your Red Hat account username and password when prompted:

```bash
docker login registry.access.redhat.com
```

### 2. Download nginx image

Assuming you have Docker installed on your local computer, pull the Nginx image from Red Hat registry:**

```bash
docker pull registry.access.redhat.com/rhscl/nginx-116-rhel7
```

Verify that the Nginx image is downloaded:

```bash
docker images
```

### 3. Start the nginx container

Start a Nginx container based on the downloaded image:

```bash
docker run -d --name my-nginx -p 80:80 registry.access.redhat.com/rhscl/nginx-116-rhel7
```

Check the status of running containers:

```bash
docker ps
```

Open a web browser and navigate to `http://localhost`. You should see the default Nginx welcome page, indicating that the container is running successfully.

![](/img/docs/lab-032-nginx-default-landing-page.png)
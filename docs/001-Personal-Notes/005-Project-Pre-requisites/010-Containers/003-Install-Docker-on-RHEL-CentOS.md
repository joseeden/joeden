---
title: "Install Docker on RHEL/CentOS"
description: "Install Docker on RHEL/CentOS"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
sidebar_position: 2
last_update:
  date: 7/7/2022
---



These are the steps I followed on installing docker on RHEL 8/CentOS in an Amazon EC2 instance. Detailed steps can be found in the [Docker's official documentation](https://docs.docker.com/engine/install/centos/).

## Uninstall older versions

Check version.

```bash
ll /etc/*release
cat /etc/*release
```

Update base image.

```bash
sudo yum -y update
```

Uninstall older versions of docker - if one exists.

```bash
sudo yum remove -y docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-engine
```

To install Docker, you can do it in two ways:

- Install from a package
- Install from a script

## Install from a package 

Choose your OS version in https://download.docker.com/linux/centos/, head to **x86_64/stable/Packages/**, and download the **.rpm** file.

Go to the directory where the rpm file is downloaded and do the installation.

```bash
cd <path-to>/package.rpm
sudo yum install -y package.rpm
```

Start docker and verify version.

```bash
sudo systemctl start docker 
docker version 
```

Run a simple "hello-world" container.

```bash
sudo docker run hello-world 
```
 
## Install from a script 

This method is **NOT RECOMMENDED** for production environments. Do a preview first of the changes before actually applying them.

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
DRY_RUN=1 sh ./get-docker.sh 
```

Download the script and install the latest release.

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh 
```

Start docker and verify version.

```bash
sudo systemctl start docker 
docker version 
```

Run a simple "hello-world" container.

```bash
sudo docker run hello-world 
```

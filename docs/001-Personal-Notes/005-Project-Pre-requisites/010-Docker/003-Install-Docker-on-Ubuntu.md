---
title: "Install Docker on Ubuntu"
description: "Install Docker on Ubuntu"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 3
last_update:
  date: 7/7/2022
---


## Manual Method 

This is a summary of the commands that you can run to install docker on Ubuntu.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" &&
sudo apt-get update -y 
sudo sudo apt-get install docker-ce docker-ce-cli containerd.io -y 
sudo usermod -aG docker ubuntu 
```

For more information, please see [official Docker installation guide](https://docs.docker.com/engine/install/ubuntu/) for more details.
  
</details>

## Using Terraform 

Whether you've dabbled around in Terraform or not, this is the fastest way to provision a resource in AWS with Docker installed. This will provision the following:

- A VPC
- An EC2 instance with Docker installed

For more details, check out this [repository](https://github.com/joseeden/All-Things-Terraform/tree/master/lab12_Docker_Kubernetes_Env).
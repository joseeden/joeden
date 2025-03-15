---
title: "Docker on Windows"
description: "Running Docker on Windows"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 5
last_update:
  date: 3/11/2022
---


# Overview

Containers leverage Linux kernel features like **namespacing** and **control groups** to manage the resources used by container processes. These features are specific to Linux and are not included by default in all operating systems.

## Running Containers on Windows

When Docker is installed on Windows or Mac, it sets up a Linux virtual machine on your computer. Containers and processes are created within this virtual machine.

<div class='img-center'>

![](/img/docs/howdockerrunsonwindows.png)

</div>


 

 
---
title: "Dev Environment for Docker and Kubernetes"
description: "Dev Environment for Docker and Kubernetes"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 16
last_update:
  date: 1/24/2021
---

## Overview

This project provisions a small public AWS environment for practicing Docker and Kubernetes setup with Terraform.

- Version 1 is the preconfigured bootstrap version. The EC2 nodes are created with user data that installs the container runtime and common Kubernetes tooling during launch.

- Version 2 is the from-scratch bootstrap version. The EC2 nodes are created first, then you can install and configure the container runtime, Kubernetes packages, and cluster components yourself. See [Version 2.](/docs/048-Infrastructure-as-Code/010-Terraform/005-Projects/004-Dev-Environment-for-Docker-and-Kubernetes-v2/README.md)

## Version 1

Use this version when you want the instances to come up with the main tooling already installed:

- `containerd`
- `kubeadm`
- `kubelet`
- `kubectl`
- Docker Compose
- NodeJS
- Go
- `tree`

The Terraform configuration creates:

- A VPC
- A public subnet
- An internet gateway
- A route table and route table association
- A security group restricted to your IP
- One master EC2 instance
- Three worker EC2 instances
- SSH config entries generated through Terraform provisioners

## Project Files

| Path                                       | Purpose                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| `version-1/main`                           | Terraform provider, resources, data sources, and outputs |
| `version-1/vars`                           | Variable definitions and example values                  |
| `version-1/template-files/userdata.tpl`    | Installs the runtime and Kubernetes tooling              |
| `version-1/template-files/ssh-linux.tpl`   | Generates a Linux or WSL SSH config entry                |
| `version-1/template-files/ssh-windows.tpl` | Generates a Windows SSH config entry                     |

<!-- ## Runbook

For the full walkthrough, use the version-specific README:

[Version 1 README](./version-1/README.md) -->

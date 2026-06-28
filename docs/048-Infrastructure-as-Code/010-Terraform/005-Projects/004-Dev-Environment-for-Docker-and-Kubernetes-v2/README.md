---
title: "Dev Environment for Docker and Kubernetes Version 2"
description: "Dev Environment for Docker and Kubernetes Version 2"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 17
last_update:
  date: 1/24/2021
---

## Overview

This project provisions the same small public AWS environment as version 1, but leaves the Docker and Kubernetes setup mostly manual.

Version 2 is the from-scratch bootstrap version. The EC2 nodes are created first, then you can install and configure the container runtime, Kubernetes packages, and cluster components yourself.

## Version 2

Use this version when you want to practice the installation steps instead of having user data do most of the work.

The Terraform configuration creates:

- A VPC
- A public subnet
- An internet gateway
- A route table and route table association
- A security group restricted to your IP
- One master EC2 instance
- Three worker EC2 instances
- SSH config entries generated through Terraform provisioners

The user data keeps most Docker and Kubernetes installation commands commented out. It only performs minimal instance setup, such as creating the default user and installing `tree`.

## Project Files

| Path                                       | Purpose                                                            |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `version-2/main`                           | Terraform provider, resources, data sources, and outputs           |
| `version-2/vars`                           | Variable definitions and example values                            |
| `version-2/template-files/userdata.tpl`    | Minimal bootstrap; tool installation commands are kept as comments |
| `version-2/template-files/ssh-linux.tpl`   | Generates a Linux or WSL SSH config entry                          |
| `version-2/template-files/ssh-windows.tpl` | Generates a Windows SSH config entry                               |

<!-- ## Runbook

For the full walkthrough, use the version-specific README:

[Version 2 README](./version-2/README.md) -->

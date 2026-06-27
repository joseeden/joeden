---
title: "AWS Networking and Compute"
description: "AWS networking and compute patterns with Terraform"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 10
last_update:
  date: 1/24/2021
---

## Overview

The AWS labs build from a small public EC2 environment into multi-AZ networking with private subnets, NAT gateways, launch templates, and load balancing.

## Basic VPC Pattern

A public EC2 lab usually includes:

- A VPC with DNS support enabled.
- One or more public subnets.
- An internet gateway.
- A public route table.
- A security group.
- An EC2 key pair.
- An EC2 instance.

## Load Balanced Pattern

The advanced VPC labs extend the design with:

- Public and private subnets across two availability zones.
- NAT gateways for private subnet egress.
- Separate security groups for the ALB and web servers.
- A launch template for reusable EC2 settings.
- An autoscaling group behind an Application Load Balancer.

## User Data

Several labs use template files such as `userdata.tpl` or `webserver.tpl` to install Docker, Kubernetes tools, or NGINX during instance bootstrap.

**Note**: Keep user data small and predictable. For larger configuration workflows, use images or configuration management after the instance is reachable.

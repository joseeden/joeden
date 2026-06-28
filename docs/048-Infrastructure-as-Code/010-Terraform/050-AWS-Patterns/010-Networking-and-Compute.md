---
title: "Networking and Compute"
description: "Networking and compute patterns with Terraform"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 10
last_update:
  date: 1/24/2021
---

## Overview

AWS networking and compute designs usually start with a VPC boundary, then layer routing, subnet tiers, security controls, and compute placement around the application.

Terraform is useful here because the relationships are explicit: 

- Subnets depend on the VPC
- Route tables point at gateways
- Security groups express traffic paths
- Compute resources attach to the network design

## Baseline VPC Pattern

A practical VPC design commonly includes:

- A VPC CIDR range sized for expected growth.
- DNS hostnames and DNS support enabled.
- Public subnets for internet-facing entry points.
- Private application subnets for workloads.
- Private data subnets for databases, caches, or internal services.
- Route tables separated by subnet tier.
- Tags that identify environment, owner, application, and cost center.

Keep subnet naming and CIDR allocation predictable. 

Teams should be able to understand the purpose of a subnet from its name, availability zone, and route table.

## Public and Private Routing

Public subnets usually route outbound traffic through an internet gateway. They are appropriate for load balancers, NAT gateways, bastion alternatives, and other controlled edge resources.

Private subnets should not route directly to an internet gateway. When private workloads need outbound internet access, route through NAT gateways or a centralized egress pattern.

| Subnet tier  | Typical resources                      | Common route                   |
| ------------ | -------------------------------------- | ------------------------------ |
| Public       | ALB, NAT gateway, edge services        | Internet gateway               |
| Private app  | EC2, ECS, EKS nodes, internal services | NAT gateway or internal routes |
| Private data | RDS, ElastiCache, data stores          | Internal routes only           |

:::note

NAT gateways are convenient but can become expensive. 

For private access to AWS services, consider VPC endpoints where they fit the traffic pattern.

:::

## Security Groups

Security groups should describe application traffic paths instead of broad network access.

For example:

- The ALB security group allows inbound `80` and `443` from users.
- The application security group allows inbound traffic only from the ALB security group.
- The database security group allows inbound traffic only from the application security group.
- Administrative access uses Systems Manager Session Manager or a controlled access path instead of open SSH.

Prefer security group references over hard-coded CIDR ranges when the source is another AWS workload managed in the same design.

## Compute Placement

Compute resources should match the workload pattern.

| Compute option     | Good fit                                        |
| ------------------ | ----------------------------------------------- |
| EC2 instance       | Simple servers, appliances, custom host control |
| Launch template    | Reusable EC2 configuration                      |
| Auto Scaling group | Horizontally scalable instance fleets           |
| ECS or EKS nodes   | Container platforms                             |
| Lambda             | Event-driven or short-running workloads         |

For EC2-based applications, place instances in private subnets and expose them through a load balancer. Directly public EC2 instances are usually reserved for temporary testing, appliances, or tightly controlled edge cases.

## Load Balanced Pattern

A common web application pattern uses:

- Public subnets across at least two availability zones.
- An Application Load Balancer in the public subnets.
- Private application subnets across the same availability zones.
- A launch template for AMI, instance type, IAM role, user data, and block devices.
- An Auto Scaling group attached to the load balancer target group.
- Health checks that reflect real application readiness.

This pattern separates the public entry point from the application hosts. The ALB receives internet traffic, while the instances remain private.

## User Data and Images

User data is useful for small, predictable bootstrap tasks:

- Install lightweight dependencies.
- Pull configuration from a trusted source.
- Register the instance with an agent or service.
- Start the application process.

Keep user data short. 

For larger setup workflows, prefer golden images, container images, configuration management, or a deployment pipeline. Terraform should create the infrastructure; it should not become the main application deployment engine.

## Production Checks

Before using a networking and compute pattern in a real project, check:

- [] CIDR ranges do not overlap with connected networks.
- [] Subnets span multiple availability zones.
- [] Route tables match the intended subnet tier.
- [] Security groups allow only required traffic.
- [] Instances use IAM roles instead of static credentials.
- [] Logs, metrics, and alarms exist for load balancers and compute.
- [] State is stored remotely and protected with locking.
- [] Modules expose useful inputs without hiding important decisions.

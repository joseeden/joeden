---
title: "Kubernetes in the Cloud"
description: "Kubernetes in the Cloud"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 71
last_update:
  date: 4/7/2022
---


## Elastic Kubernetes Service (EKS)

**Amazon EKS** is AWS’s managed Kubernetes service that simplifies the deployment of Kubernetes control planes.

AWS handles the control plane and components, while users decide where to run their workloads, either on Fargate or EC2.

Benefits of EKS:

- No control plane management required
- Built-in load balancing, networking, and volume storage
- Easy to start or stop
- Integrates with AWS services like S3, Redshift, RDS, Lambda, and Cognito


## ECS and Fargate

**Amazon ECS** is AWS's proprietary container management service, developed to compete with Kubernetes.

- Uses JSON task definitions
- Similar to EKS but is proprietary to AWS

**Amazon Fargate** is a serverless container service that abstracts away server management.

- No node management required
- Automatic scaling
- Can be used with EKS and ECS
- Uses JSON task definitions
- Pay only for active pods, not nodes

Important reminders for Fargate:

- Map container services to Fargate’s CPU or memory tiers
- Mapping uses the largest sum of resources
- Mapping consumes 250M cores and 512Mi memory
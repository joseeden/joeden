---
title: "Application Delivery and Storage"
description: "AWS application delivery and storage Terraform patterns"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 16
last_update:
  date: 1/24/2021
---

## Overview

Application delivery on AWS often combines compute, artifact storage, container registries, object storage, databases, IAM, logging, and deployment automation.

Terraform should define the durable platform pieces. Application builds, image publishing, migrations, and release promotion are usually handled by CI/CD pipelines that consume the infrastructure outputs.

## Common Building Blocks

| Pattern           | Use case                                            |
| ----------------- | --------------------------------------------------- |
| S3                | Static assets, application artifacts, logs, backups |
| DynamoDB          | Serverless key-value or document-style data         |
| ECR               | Private container image registry                    |
| Elastic Beanstalk | Managed application platform for simple web apps    |
| ECS or EKS        | Containerized services and worker workloads         |
| CloudFront        | Global content delivery and edge caching            |

Pick the smallest managed service that meets the operational requirement. A simpler managed service is often better than a highly customizable design that the team cannot operate confidently.

## S3 Storage Pattern

S3 buckets are commonly used for:

- Static websites and frontend assets.
- Terraform remote state.
- Build artifacts.
- Data exchange between systems.
- Logs and backups.

For project use, configure:

- Public access blocks by default.
- Bucket encryption.
- Versioning when recovery matters.
- Lifecycle rules for retention and cost control.
- Bucket policies that grant access to specific principals.

Avoid making buckets public unless the design explicitly requires it. 

For public static content, prefer CloudFront in front of S3.

## DynamoDB Pattern

DynamoDB is a good fit for serverless and high-throughput access patterns when the data model is known.

Design decisions should include:

- Partition key and sort key.
- Billing mode.
- Global secondary indexes.
- TTL for expiring records.
- Point-in-time recovery.
- Streams if downstream processing is required.

Terraform can create the table and indexes, but application access patterns should drive the table design. 

Do not start with indexes first; start with the queries the application must serve.

## ECR Pattern

ECR provides private container image repositories for services that run on ECS, EKS, Lambda container images, or EC2.

Useful repository settings include:

- Image scanning.
- Tag immutability for release images.
- Lifecycle policies to remove old images.
- Cross-account or cross-region replication when needed.
- IAM policies for CI/CD push and runtime pull access.

Terraform should create the repository and policies. The CI/CD pipeline should build and push the images.

## Managed Application Platforms

Elastic Beanstalk, ECS, EKS, App Runner, and Lambda all deliver applications differently.

| Platform          | Good fit                                                       |
| ----------------- | -------------------------------------------------------------- |
| Elastic Beanstalk | Simple web applications with managed deployment mechanics      |
| ECS               | Container services without Kubernetes control plane management |
| EKS               | Kubernetes workloads and platform engineering standards        |
| App Runner        | Simple containerized web services                              |
| Lambda            | Event-driven or short-running application logic                |

Choose based on deployment model, scaling needs, team skills, and operational responsibility.

## Module Boundaries

A real project often separates modules by responsibility:

- `network`
- `security`
- `compute`
- `storage`
- `application`
- `observability`

The root configuration should wire these modules together with clear inputs and outputs. 

Keep shared values such as environment name, tags, VPC ID, subnet IDs, and IAM role ARNs explicit.

## Delivery Pipeline Boundary

Terraform is not the whole delivery system.

Terraform should usually manage:

- Repositories and buckets.
- IAM roles and policies.
- Databases and queues.
- Load balancers and DNS records.
- Runtime platforms and service definitions.

CI/CD should usually manage:

- Building code.
- Running tests.
- Building container images.
- Publishing artifacts.
- Running database migrations.
- Promoting releases between environments.

This separation keeps infrastructure changes reviewable and application releases repeatable.

## Production Checks

Before using an application delivery or storage pattern in a real project, check:

- [] Data stores have backup and recovery settings.
- [] Buckets block public access unless public access is intentional.
- [] Container repositories have lifecycle policies.
- [] IAM permissions are scoped to each workload.
- [] Logs and metrics exist for the runtime platform.
- [] Deployment artifacts are versioned.
- [] Environment configuration is separated from secrets.
- [] Terraform state does not contain sensitive application secrets.

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

The later labs collect application delivery examples such as Elastic Beanstalk, ECR, S3, DynamoDB, and a cloud-native application pattern.

## Patterns

| Pattern             | Lab focus                                        |
| ------------------- | ------------------------------------------------ |
| DynamoDB            | Table creation and dependency troubleshooting.   |
| Elastic Beanstalk   | Managed application environment deployment.      |
| ECR                 | Container registry creation and provisioners.    |
| S3                  | Simple bucket deployment.                        |
| Cloud-native app    | Modular network, security, storage, and app code. |

## Modules

The cloud-native application lab splits infrastructure into module folders:

- `application`
- `bastion`
- `network`
- `security`
- `storage`

This keeps the root configuration focused on wiring modules together and passing shared inputs.

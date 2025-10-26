---
title: "Registry"
description: "Registry"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 11
last_update:
  date: 6/11/2022
---

## Overview

Terraform providers are downloaded from the **Terraform Registry**, which is the default source if no specific location is given. The official registry is [registry.terraform.io](https://registry.terraform.io).

- Providers are automatically downloaded from the registry
- Examples in the registry use this default source
- You can specify a custom source if needed

## Documentation

The registry also hosts official documentation for each provider. For example, the AWS provider docs are at [AWS provider docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

- Documentation includes all available resources and their options
- You can view docs for older versions using the version dropdown
- The registry docs are the best resource when creating or modifying Terraform plans

Provider pages include example configurations for resources, including any pre-requisite resources. For instance, an AWS EC2 instance example shows:

- `aws_vpc`
- `aws_subnet`
- `aws_security_group`
- `aws_iam_role`

These are all needed to create an `aws_instance`.

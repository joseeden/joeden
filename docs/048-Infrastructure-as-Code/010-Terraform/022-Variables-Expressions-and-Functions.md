---
title: "Variables, Expressions, and Functions"
description: "Terraform variables, expressions, and common functions"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 22
last_update:
  date: 1/24/2021
---

## Overview

Variables keep Terraform code reusable. Expressions and functions let configuration select values, calculate network ranges, and render small dynamic strings without duplicating resources.

## Variable Files

Variables are declared in the configuration and assigned through defaults, `.tfvars` files, CLI flags, environment variables, or module inputs. 

For the basic root-module file layout, see [Configurations](/docs/048-Infrastructure-as-Code/010-Terraform/013-Configurations.md#core-files).

| File               | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `variables.tf`     | Declares accepted input variables and their types. |
| `terraform.tfvars` | Assigns values to declared variables.              |
| `outputs.tf`       | Prints useful values after Terraform applies.      |

Example variable declaration:

```hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}
```

Example assignment:

```hcl
instance_type = "t3.micro"
```

## Useful Types

Terraform variables can use simple and complex types.

| Type     | Example                         | Use case                         |
| -------- | ------------------------------- | -------------------------------- |
| `string` | `"ap-southeast-1"`              | Region names and resource names. |
| `number` | `2`                             | Counts and sizes.                |
| `bool`   | `true`                          | Feature toggles.                 |
| `list`   | `["a", "b"]`                    | Availability zones or names.     |
| `map`    | `{ linux = "ami-1234567890" }`  | Lookup tables.                   |
| `object` | `{ size = 20, encrypted = true }` | Grouped settings.              |

## `lookup`

The `lookup` function selects a value from a map. It is useful when a variable controls which AMI, CIDR block, or setting should be used.

```hcl
ami = lookup(var.ami_ids, var.os_type, null)
```

## `cidrsubnet`

The `cidrsubnet` function creates smaller subnets from a larger CIDR block.

```hcl
cidr_block = cidrsubnet(var.cidr_block, 8, 1)
```

This keeps VPC subnet math in code and reduces hardcoded subnet values.

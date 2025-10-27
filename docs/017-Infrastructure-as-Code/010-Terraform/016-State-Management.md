---
title: "State Management"
description: "State Management"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 16
last_update:
  date: 6/11/2022
---



## Overview

Terraform keeps track of all deployed infrastructure using a **state file**, usually named `terraform.tfstate`. This file is a JSON-formatted record of every resource and its attributes.

- Tracks the current status of all resources
- Detects and corrects configuration drift
- Keeps an updated record of current resource states

## Refresh 

You can refresh the state file to ensure it matches the actual deployed infrastructure.

```bash
terraform refresh
```

**NOTE**: This command does not create, modify, or destroy resources; it only syncs Terraform’s view with reality.


## Viewing State

You can inspect the resources recorded in the state file using Terraform commands.

- To show all resources in the current state:

    ```bash
    terraform state list
    ```

    Output:

    ```
    module.ec2[0].aws_instance.web
    module.ec2[1].aws_instance.web
    ```

- To display full details for a specific resource:

    ```bash
    terraform state show module.ec2[0].aws_instance.web
    ```

    Output:

    ```
    # module.ec2[0].aws_instance.web:
    resource "aws_instance" "web" {
        id           = "i-0abcd1234efgh5678"
        ami          = "ami-0a1b2c3d4e5f6g7h8"
        instance_type = "t2.micro"
    }
    ```

## Remote State

Terraform state can be stored locally or remotely for better collaboration and security.

- Can be stored in S3, GCS, or other backends
- Supports team collaboration without conflicts
- Encrypts data at rest and in transit
- Centralizes state for multiple users or CI/CD pipelines

Using remote state makes Terraform safer and easier to manage across teams.

## State Locking

Terraform locks the state during writes to prevent corruption.

- Prevents concurrent changes by multiple users
- Ensures state consistency
- Avoids accidental overwrites

Locking keeps your infrastructure safe during updates.

## Remove State File

You can remove resources from the state without deleting them from the cloud.

- Rarely needed, but useful for orphaned resources
- Does not affect actual deployed resources

To remove: 

```bash
terraform state rm <resource_name>
```
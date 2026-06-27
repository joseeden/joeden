---
title: "Provisioners and Packaging"
description: "Terraform provisioners and deployment packaging"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 37
last_update:
  date: 1/24/2021
---

## Overview

Terraform can package small deployment artifacts and run provisioners, but infrastructure definitions should stay the main responsibility of Terraform.

## Archive File

The `archive_file` data source can create a zip file for simple Lambda deployments.

```hcl
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "main.py"
  output_path = "main.zip"
}
```

The generated zip should not be committed. It can be recreated during `terraform plan` or `terraform apply`.

## Provisioners

Provisioners run scripts or local commands as part of resource creation.

| Provisioner    | Runs on              | Common use                         |
| -------------- | -------------------- | ---------------------------------- |
| `local-exec`   | Terraform workstation | Build or registration commands.    |
| `remote-exec`  | Created instance      | Bootstrap commands over SSH or WinRM. |
| `file`         | Created instance      | Copy scripts or config files.      |

:::warning

Use provisioners carefully. Prefer cloud-init, user data, managed images, or a configuration management tool when those options fit the job.

:::

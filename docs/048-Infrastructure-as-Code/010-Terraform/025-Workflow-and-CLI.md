---
title: "Workflow and CLI"
description: "Terraform workflow and CLI commands"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 25
last_update:
  date: 1/24/2021
---

## Overview

Terraform work usually follows the same rhythm: write configuration, initialize the working directory, review the plan, apply the changes, and destroy the resources when they are no longer needed.

## Common Workflow

| Step       | Command              | Purpose                                      |
| ---------- | -------------------- | -------------------------------------------- |
| Initialize | `terraform init`     | Downloads providers and prepares the folder. |
| Format     | `terraform fmt`      | Rewrites configuration into standard style.  |
| Validate   | `terraform validate` | Checks syntax and internal consistency.      |
| Plan       | `terraform plan`     | Shows the changes Terraform intends to make. |
| Apply      | `terraform apply`    | Creates, updates, or removes resources.      |
| Destroy    | `terraform destroy`  | Removes resources managed by the state file. |

For more details about each execution command, see [Execution](/docs/048-Infrastructure-as-Code/010-Terraform/028-Execution.md).

## Workspaces

Workspaces let one configuration keep separate state for multiple environments.

To list all workspaces: 

```bash
terraform workspace list
```

To create a new workspace,

```bash
terraform workpace  new  <name> 
```

To select a workspace:

```bash
terraform workspace select <name>
```

**Note**: Workspaces separate state, but they do not automatically make a design production-ready. Keep environment naming, variables, and backend configuration clear.

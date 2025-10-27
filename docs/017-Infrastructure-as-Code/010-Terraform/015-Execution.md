---
title: "Execution"
description: "Execution"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 15
last_update:
  date: 6/11/2022
---

## Overview

Terraform provides commands to check, apply, and remove infrastructure safely.

## Validate 

Checks the configuration files for syntax errors and internal consistency.

```bash
terraform validate 
```

## Plan

Acts like a **dry-run** that checks your configuration for errors and dependencies.

- Verifies syntax and variable assignments
- Helps prevent mistakes before applying changes

Command:

```bash
terraform plan 
```

## Apply

Executes the planned changes and updates the state file.

- Creates or updates resources to match the configuration
- Only modifies resources that need changes
- Writes successful actions to `terraform.state`

Command:

```bash
terraform apply 
```

Note that this command requires interactive approval before actually making any changes. To bypass the interactive approva:

```bash
terraform apply --auto-approve
```

## Destroy

Removes deployed resources in reverse order of creation to respect dependencies defined in the state file.

```bash
terraform destroy
```

Similar with `apply`, this also requires interactive approval. To bypass it:

```bash
terraform destroy --auto-approve
```

## Target Specific Resources

Terraform allows targeting **specific resources** for testing or debugging.

```bash
terraform apply --auto-approve --target=module.webserver
terraform destroy --auto-approve --target=module.webserver
```

**NOTE**: This should only be used for debugging, not regular production runs

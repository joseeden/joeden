---
title: "Terraform"
id: terraform-starter-notes
description: "Starter Notes on Terraform"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 10
last_update:
  date: 1/24/2021
---

## Overview 

From the official [Hashicorp documentation:](https://www.terraform.io/docs)

> Terraform is an infrastructure as code (IaC) tool that allows you to build, change, and version infrastructure safely and efficiently. This includes both low-level components like compute instances, storage, and networking, as well as high-level components like DNS entries and SaaS features.

Terraform can be used to:

- Provision on-prem resources
- Provision multi-cloud deployments
- Has open-source but also has *Terraform Cloud*
- Codify infra into machine-readable executable documentation
- Repeatable infra builds
- Manage and maintain infra configuration drift
- Version-controll through git
- Integrate with CICD systems

<!-- Suggested path through these notes:

1. Start with Terraform basics and installation.
2. Learn the root module and core files in [Configurations](/docs/048-Infrastructure-as-Code/010-Terraform/013-Configurations.md).
3. Add providers and registry documentation in [Providers](/docs/048-Infrastructure-as-Code/010-Terraform/016-Providers.md) and [Registry](/docs/048-Infrastructure-as-Code/010-Terraform/019-Registry.md).
4. Learn reusable inputs in [Variables, Expressions, and Functions](/docs/048-Infrastructure-as-Code/010-Terraform/022-Variables-Expressions-and-Functions.md).
5. Run the workflow using [Workflow and CLI](/docs/048-Infrastructure-as-Code/010-Terraform/025-Workflow-and-CLI.md) and [Execution](/docs/048-Infrastructure-as-Code/010-Terraform/028-Execution.md).
6. Continue with [State Management](/docs/048-Infrastructure-as-Code/010-Terraform/031-State-Management.md), [Dependencies and Graph](/docs/048-Infrastructure-as-Code/010-Terraform/034-Dependencies-and-Graph.md), and [Provisioners and Packaging](/docs/048-Infrastructure-as-Code/010-Terraform/037-Provisioners-and-Packaging.md). -->

## Install Terraform

To use Terraform, it needs to be installed on your machine.

See: [Install Terraform.](/docs/001-Personal-Notes/050-Project-Pre-requisites/015-Terraform.md)

## Workspaces

We can utilize **workspaces** to manage separate environments using the same set of configuration files.

For more information, please see [Workflow and CLI](/docs/048-Infrastructure-as-Code/010-Terraform/025-Workflow-and-CLI.md#workspaces).

<div class='img-center'>

![](/img/docs/tf-workflow-diagram.png)

</div>


## Root Module

The root module is the working directory that contains the main Terraform configuration files.

- `main.tf`
- `variables.tf`
- `outputs.tf`
- `provider.tf`

This root directory may also contain:

- `terraform.state`
- `terraform.state.backup`

For more information, please see [Configurations](/docs/048-Infrastructure-as-Code/010-Terraform/013-Configurations.md#root-module).

## Providers 

Terraform uses **providers** to interact with various cloud platforms and services. Some popular providers include:

- AWS
- Azure
- Google Cloud Platform (GCP)
- Kubernetes

For more information, please see [Providers](/docs/048-Infrastructure-as-Code/010-Terraform/016-Providers.md).

## Using Terraform with Git

Terraform configurations are often stored in Git for version control. Some files should **never** be committed because they contain local state or downloaded dependencies.

These files can be added to your `.gitignore` to prevent accidental commits. Sample `.gitignore`:

```bash 
.terraform*
.terraform.tfstate*
*.tfstate.*
*.tfstate
.terraform.lock.hcl
linux_386
linux_amd64
```

## Authentication

Before writing Terraform code, you need to make sure authentication with API keys is set up. Terraform reads credentials in the order specified below:

1. API keys can be hardcoded in `main.tf` (not recommended)
2. Environment variables to store keys securely
3. `shared_credentials_file` for local credentials

For provider-specific examples, see [Providers](/docs/048-Infrastructure-as-Code/010-Terraform/016-Providers.md).

## Terraform CLI

See: [Hashicorp documentation.](https://www.terraform.io/cli/commands)

For the common command sequence, see [Workflow and CLI](/docs/048-Infrastructure-as-Code/010-Terraform/025-Workflow-and-CLI.md).


## Provisioning Workflow

The typical workflow when using Terraform involves the following commands:

- `terraform init`
- `terraform validate`
- `terraform plan `
- `terraform apply`
- `terraform destroy`

For command details, see [Execution](/docs/048-Infrastructure-as-Code/010-Terraform/028-Execution.md).

## Terraform HCL Language

Terraform uses the **HashiCorp Configuration Language (HCL)** to define and manage infrastructure. 

- Defines the basic structure and grammar of Terraform code
- JSON syntax is available for systems that don’t use HCL directly
- Style conventions ensure consistent formatting across files

You can automatically apply formatting standards using `terraform fmt`.

Comments can be added using the `#` symbol:

```bash
# This is a comment
```

For multi-line comments, use `/* */`:

```go
/* This is
a comment
spanning multiple lines
*/
```

Strings can be defined in different ways depending on their length and purpose:

```bash
"This is a single-line string"
```

For multi-line strings, use the `EOF` marker:

```bash
<<EOF
This message
is composed of
multiple lines.
EOF
```

For more information, refer to the official [Terraform syntax documentation](https://www.terraform.io/language/syntax/configuration).

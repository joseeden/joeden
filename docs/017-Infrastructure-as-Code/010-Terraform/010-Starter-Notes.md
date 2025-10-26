---
title: "Starter Notes"
description: "Starter Notes on Terraform"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 10
last_update:
  date: 6/11/2022
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

## Install Terraform

To use Terraform, it needs to be installed on your machine.

See: [Install Terraform.](/docs/001-Personal-Notes/050-Project-Pre-requisites/015-Terraform.md)

## Workspaces

We can utilize **workspaces** to manage separate environments using the same set of configuration files.

```bash
terraform workspace 
```

To create a new workspace,

```bash
terraform workpace  new  <name> 
```

To select a workspace,

```bash
terraform workspace select <name>
```

<div class='img-center'>

![](/img/docs/tfworkspaces.png)

</div>


## Root Module

This is a directory on the local filesystem containing all the configuration files and code files. This is typically consists of three files:

- `main.tf`
- `variables.tf`
- `outputs.tf`
- `provider.tf`

This root directory may also contain:

- `terraform.state`
- `terraform.state.backup`

## Providers 

Terraform uses **providers** to interact with various cloud platforms and services. Each provider is responsible for understanding API interactions and exposing resources. Some popular providers include:

- AWS
- Azure
- Google Cloud Platform (GCP)
- Kubernetes

For more information, please see [Providers](/docs/017-Infrastructure-as-Code/010-Terraform/011-Providers.md)


## `terraform init` 

Terraform needs to prepare your environment before it can create resources. This is done with `terraform init`.

- Reads all `.tf` files in your working directory
- Downloads required providers automatically
- Detects all modules and writes a list to `.terraform/modules/modules.json`
- Looks for `terraform` blocks with `required_providers` for third-party providers
- Does not verify that your configuration will successfully create resources

To initialize:

```bash
terraform init
```

Expected output:

```
Initializing the backend...
Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v4.30.0...
Terraform has been successfully initialized!
```

:::info 

`terraform init` happens **after*- you write your configuration but **before*- running `terraform plan` or `terraform apply`. 

:::

## Terraform State

Terraform is a **stateful** tool that tracks all infrastructure created beyond Day 0.

- Manages the lifecycle of infrastructure
- Detects and corrects configuration drift
- Keeps an updated record of current resource states
- Can be refreshed anytime using `terraform refresh`

This state tracking ensures your deployed infrastructure always matches your configuration files.

### Remote State

By default, Terraform stores state files locally, but they can also be stored remotely for better collaboration and security.

- Can be stored in an S3 bucket or similar backend
- Enables safe team collaboration
- Provides stronger security controls
- Encrypts data at rest and in transit with TLS

Using remote state makes your Terraform setup more reliable and easier to manage in shared environments.

### Locking

Terraform locks the state file during write operations to prevent conflicts or corruption when multiple users or systems run Terraform at the same time.

This locking mechanism ensures state integrity and avoids accidental overwrites during concurrent updates.

## Terraform CLI

See: [Hashicorp documentation.](https://www.terraform.io/cli/commands)

Here is a summarized cheatsheet.

<div class='img-center'>

![](/img/docs/tfclicheatsheet.png)

</div>


## Provisioning Workflow

The typical workflow when using Terraform involves the following commands:

- `terraform init`
- `terraform validate`
- `terraform plan `
- `terraform apply`
- `terraform destroy`

## Terraform HCL Language

Terraform uses the **HashiCorp Configuration Language (HCL)** to define and manage infrastructure. 

- Defines the basic structure and grammar of Terraform code
- JSON syntax is available for systems that don’t use HCL directly
- Style conventions ensure consistent formatting across files

You can automatically apply formatting standards using `terraform fmt`.

Comments can be added using the `#` symbol:

```
# This is a comment
```

For multi-line comments, use `/* */`:

```
/* This is
a comment
spanning multiple lines
*/
```

Strings can be defined in different ways depending on their length and purpose:

```
"This is a single-line string"
```

For multi-line strings, use the `EOF` marker:

```
<<EOF
This message
is composed of
multiple lines.
EOF
```

For more details, refer to the official [Terraform syntax documentation](https://www.terraform.io/language/syntax/configuration).

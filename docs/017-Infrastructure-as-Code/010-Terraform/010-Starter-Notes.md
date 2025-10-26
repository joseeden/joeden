---
title: "Starter Notes"
description: "Starter Notes on Terraform"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 0
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

This root directory may also contain:

- `terraform.state`
- `terraform.state.backup`

## Providers 

Terraform uses **providers** to interact with various cloud platforms and services. Each provider is responsible for understanding API interactions and exposing resources. Some popular providers include:

- AWS
- Azure
- Google Cloud Platform (GCP)
- Kubernetes

You can access the list of providers from the [Terraform registry](https://registry.terraform.io/). Once you've selected the provider, you can start creating your `provider.tf` in your project directory:

```json
terraform {
  required_version = ">= 0.12"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.16.0"
    }
  }

}
provider "aws" {
  # Configuration options
  region     = "ap-southeast-1"
  access_key = "my-access-key"
  secret_key = "my-secret-key"
}
```

:::warning 

Hard-coded credentials are not recommended in any Terraform configuration and risks secret leakage should this file ever be committed to a public version control system.

:::


## Core Files 

### Main file (`main.tf`)

This file contains the core configurations:

- Resources
- Provider 
- Data Sources 

This file can be modularized by splitting the sections into their own separate `.tf` files.

```bash
provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = var.instance_type
}
```

### Variables file (`variables.tf`)

This file contains all possible variables referenced in the `main.tf` file.

```bash
variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "instance_type" {
  description = "Type of EC2 instance"
  type        = string
  default     = "t2.micro"
}
```

### Outputs file (`outputs.tf `)

This is used to explicitly export values after you ran `terraform apply`.

- Outputs can be references within any parent templates
- Often used to create modules

Example: 

```bash
output "instance_public_ip" {
  description = "The public IP of the EC2 instance"
  value       = aws_instance.example.public_ip
}

output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.example.id
}
```

### `terraform.tfvars` vs `variables.tf`

Based on a [Stack Overflow discussion](https://stackoverflow.com/questions/56086286/terraform-tfvars-vs-variables-tf-difference):

The difference between these files is **declaration vs. assignment**.

- `variables.tf` is where variables are **declared**.
- `terraform.tfvars` is where variable **values are assigned**.

Example declaration:

```hcl
variable "example" {}
```

This tells Terraform that the module accepts an input variable called `example`. You can then reference it anywhere using `var.example`.

There are several ways to assign values to variables:

- Use `-var` on the `terraform plan` or `terraform apply` command
- Use `-var-file` to load a `.tfvars` file with multiple variable values
- Create a `terraform.tfvars` or `.auto.tfvars` file, which Terraform loads automatically
- Assign values directly when calling a child module

You can also set default values in the variable declaration to make them optional:

```hcl
variable "example" {
  default = "default_value"
}
```

Note that new variables **cannot** be created in `terraform.tfvars`.
All variables must first be **declared** in `variables.tf`.

In smaller setups, you can declare and assign values in the same file for simplicity.

**References**

- [terraform.tfvars vs variables.tf difference](https://stackoverflow.com/questions/56086286/terraform-tfvars-vs-variables-tf-difference)
- [What is the difference between variables.tf and terraform.tfvars?](https://stackoverflow.com/questions/55959202/what-is-the-difference-between-variables-tf-and-terraform-tfvars)


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

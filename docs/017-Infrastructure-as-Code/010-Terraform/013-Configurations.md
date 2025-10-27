---
title: "Configurations"
description: "Configurations"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 10
last_update:
  date: 6/11/2022
---


## Root Module

This is a directory on the local filesystem containing all the configuration files and code files. This is typically consists of three files:

- `main.tf`
- `variables.tf`
- `outputs.tf`
- `provider.tf`

This root directory may also contain:

- `terraform.state`
- `terraform.state.backup`

## Core Files 

### `main.tf`

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

### `variables.tf`

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

### `outputs.tf `

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

## Resources

A Terraform **Resource** describes an infrastructure object. It tells Terraform what to create, how it should be configured, and which provider should manage it.

- Defines an infrastructure object like a VM, database, or network
- Includes all configuration details such as CPU, memory, disk, and interfaces
- Terraform sends this definition to the provider to create the actual resource

Here is a simple AWS EC2 instance resource. It tells Terraform to create a small EC2 instance using the specified AMI.

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

The [resource documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) shows all supported resources for a provider.

---
title: "Providers"
description: "Providers"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 11
last_update:
  date: 6/11/2022
---

## Overview

Terraform uses **providers** to interact with various cloud platforms and services. Each provider is responsible for understanding API interactions and exposing resources. Some popular providers include:

- AWS
- Azure
- Google Cloud Platform (GCP)
- Kubernetes

For a complete list of providers, see [Terraform registry](https://registry.terraform.io/). 

When you run terraform init, Terraform automatically detects and downloads the required providers for your configuration. The provider configuration has two main parts:

1. Required provider 
2. Actual provider configuration

## Provider Configuration

Each provider requires a configuration block, even if you don’t change any default settings. These blocks can also include multiple providers, not just one.

- You can define additional providers as needed
- Each provider corresponds to a different platform or service

This allows a single Terraform run to manage resources across multiple environments or services.

### Azure 

Default Azure provider block:

```hcl
provider "azurerm" { }
```

Example with customized behavior:

```hcl
provider "azurerm" {
  features {
    virtual_machine {
      graceful_shutdown                  = true
      delete_os_disk_on_deletion         = true
    }
    template_deployment {
      delete_nested_items_during_deletion = true
    }
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}
```

### AWS 

AWS provider can use local credentials and a default region:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.16.0"
    }
  }
}

provider "aws" {
  shared_credentials_file = local.creds_file
  profile                 = local.profile
  region                  = var.region
}
```

You can also specify the access keys. However, hard-coded credentials are not recommended and risks secret leakage should this file ever be committed to a public version control system


```hcl
provider "aws" {
  # Configuration options
  region     = "ap-southeast-1"
  access_key = "my-access-key"
  secret_key = "my-secret-key"
} 
```

### GCP 

GCP provider uses project, region, and zone settings:

```hcl
terraform {
  required_providers {
    google = {
      version = "4.40.0"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}
```

## Provider Versions 

When running `terraform init`, Terraform identifies and downloads the required providers. If no version is specified, it may also upgrade to a newer provider automatically.

- Specifying a version (e.g., `= 3.14.0`) locks the provider to that version
- Using a range (e.g., `~> 3.14.0`) allows automatic upgrades when new versions are released
- Upgrading automatically can sometimes require changes to your Terraform code

**Best practice:** lock to a specific version during development, and upgrade when convenient to avoid unexpected code changes.
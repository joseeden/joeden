---
title: "Dependencies and Graph"
description: "Terraform dependencies and graph behavior"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 34
last_update:
  date: 1/24/2021
---

## Overview

Terraform builds a dependency graph from resource references. It uses that graph to decide which resources can be created in parallel and which resources must wait.

## Implicit Dependencies

An implicit dependency is created when one resource references another resource.

```hcl
resource "aws_dynamodb_table_item" "item" {
  table_name = aws_dynamodb_table.table.name
}
```

Terraform knows the table must exist before the table item can be created.

## Dependency Problems

A dependency problem often appears when a resource uses a literal string instead of a reference.

```hcl
resource "aws_dynamodb_table_item" "item" {
  table_name = "lab08-ddb-table"
}
```

The value may look correct, but Terraform cannot infer that this item depends on a Terraform-managed table unless the resource is referenced.

## Visualize the Graph

Terraform can print the dependency graph in DOT format.

```bash
terraform graph
terraform graph | dot -Tpng > graph.png
```

**Note**: The graph is most useful when troubleshooting ordering issues, module relationships, or unexpected replacement behavior.

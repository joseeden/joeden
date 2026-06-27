---
title: "Lab Setup Templates"
description: "Lab Setup Templates"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 10
last_update:
  date: 12/6/2020
---

## Overview

These CloudFormation templates create AWS resources for an Ansible lab environment.

Use them when you want repeatable lab hosts instead of manually creating EC2 instances.

## Files

| File                         | Purpose                                  |
| ---------------------------- | ---------------------------------------- |
| `cf-ansible-lab-1.yml`       | Main Ansible lab CloudFormation template. |
| `cf-ansible-lab-1-test.yml`  | Test variant of the lab template.        |

## Cleanup

Delete the CloudFormation stack when you are done with the lab.

:::warning

CloudFormation itself is not the main cost. The EC2, load balancer, Elastic IP, and related resources created by the stack can incur AWS charges.

:::

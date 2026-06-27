---
title: "Project 003 Confluent Cloud"
description: "Project 003 Confluent Cloud"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 40
last_update:
  date: 1/10/2021
---

## Overview

This project keeps the Confluent Cloud Ansible playbooks together.

## Files

| File                                | Purpose                                  |
| ----------------------------------- | ---------------------------------------- |
| `playbooks/ccloud-user-create.yml`  | Creates Confluent Cloud users.           |
| `playbooks/ccloud-user-list.yml`    | Lists Confluent Cloud users.             |
| `playbooks/confluent-cloud-deploy.yml` | Runs the Confluent Cloud deployment workflow. |

## Notes

Review required environment variables and API credentials before running these playbooks.

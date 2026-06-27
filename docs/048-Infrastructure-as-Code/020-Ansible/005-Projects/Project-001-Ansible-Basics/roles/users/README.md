---
title: "Users Role"
description: "Users Role"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 90
last_update:
  date: 1/8/2021
---

## Overview

This role contains user-management tasks used by the Ansible basics project.

It is intended for lab work around variables, conditionals, and reusable role structure.

## Structure

| Path                 | Purpose                         |
| -------------------- | ------------------------------- |
| `tasks/main.yml`     | Main user-management tasks.     |
| `defaults/main.yml`  | Default role variables.         |
| `vars/main.yml`      | Role variables.                 |
| `handlers/main.yml`  | Handlers available to the role. |
| `tests`              | Basic role test inventory and playbook. |

## Usage

Use the role from a playbook.

```yaml
- name: Manage users
  hosts: all
  become: true
  roles:
    - users
```

---
title: "Project 002 Ansible Roles"
description: "Project 002 Ansible Roles"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 30
last_update:
  date: 1/4/2021
---

## Overview

This project focuses on role-based Ansible structure.

It contains a `webservers` role and playbooks that apply the role with standard variables and vault-protected variables.

## Structure

| Path                  | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `ansible.cfg`          | Project-level Ansible configuration.         |
| `edendev.inv`          | Lab inventory.                               |
| `setup-app-roles.yml`  | Applies the web server role.                 |
| `setup-app-vault.yml`  | Applies the role with vault-related values.  |
| `roles/webservers`     | Web server role with tasks, handlers, files, vars, and defaults. |

## Useful Commands

```bash
ansible-playbook setup-app-roles.yml
ansible-playbook setup-app-vault.yml --ask-vault-pass
```

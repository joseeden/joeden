---
title: "Webservers Role"
description: "Webservers Role"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 90
last_update:
  date: 1/12/2021
---

## Overview

This role configures web servers for the role-based Ansible project.

It keeps package installation, service handling, variables, and application files together in a reusable role layout.

## Structure

| Path                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `tasks/main.yml`     | Main web server setup tasks.             |
| `handlers/main.yml`  | Service restart handlers.                |
| `files/index.php`    | Sample PHP application file.             |
| `defaults/main.yml`  | Default role variables.                  |
| `vars/main.yml`      | Role variables.                          |
| `vars/secrets.yml`   | Vault-related variables for lab testing. |
| `tests`              | Basic role test inventory and playbook.  |

## Usage

Use the role from a playbook.

```yaml
- name: Configure web servers
  hosts: webservers
  become: true
  roles:
    - webservers
```

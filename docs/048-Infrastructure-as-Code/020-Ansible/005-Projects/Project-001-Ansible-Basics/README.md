---
title: "Project 001 Ansible Basics"
description: "Project 001 Ansible Basics"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 20
last_update:
  date: 12/18/2020
---

## Overview

This project contains the main hands-on Ansible lab files.

It includes inventories, playbooks, templates, static files, and a sample `users` role.

## Structure

| Path          | Purpose                                      |
| ------------- | -------------------------------------------- |
| `ansible.cfg` | Project-level Ansible configuration.         |
| `inventories` | Static inventory files for lab environments. |
| `playbooks`   | Sample, deployment, user, and two-tier app playbooks. |
| `files`       | Static files and Jinja2 templates used by playbooks. |
| `roles/users` | User-management role created during the labs. |

## Useful Commands

```bash
ansible --list-hosts all
ansible-playbook playbooks/sample-ping.yml
ansible-playbook playbooks/setup-2tier.yml
ansible-playbook playbooks/create-users.yml
```

## Notes

Review inventory hostnames and IP addresses before running these playbooks.

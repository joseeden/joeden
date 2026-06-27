---
title: "Advanced Operations"
description: "Advanced Operations"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 15
last_update:
  date: 1/12/2021
---

## Overview

Advanced Ansible work usually focuses on safer execution, better targeting, and predictable failure handling.

## Check Mode

Use check mode for a dry run.

```bash
ansible-playbook playbooks/setup-app.yml --check
```

**Note**: Not every module supports check mode perfectly. Treat it as a useful preview, then validate changes in a safe environment.

## Tags

Tags let you run part of a playbook.

```yaml
- name: Install web packages
  ansible.builtin.yum:
    name: httpd
    state: present
  tags:
    - packages
```

Run only tagged tasks.

```bash
ansible-playbook playbooks/setup-app.yml --tags packages
```

Skip tagged tasks.

```bash
ansible-playbook playbooks/setup-app.yml --skip-tags packages
```

## Error Handling

Use `ignore_errors` only when a failure is acceptable.

```yaml
- name: Try optional command
  ansible.builtin.command: /opt/example/check.sh
  ignore_errors: true
```

Use `failed_when` when the command exit code does not tell the full story.

```yaml
- name: Check application status
  ansible.builtin.command: curl -s http://localhost
  register: app_status
  failed_when: "'OK' not in app_status.stdout"
```

## Blocks

Blocks group tasks and provide rescue handling.

```yaml
- block:
    - name: Deploy application
      ansible.builtin.command: /opt/app/deploy.sh
  rescue:
    - name: Roll back application
      ansible.builtin.command: /opt/app/rollback.sh
  always:
    - name: Show deployment status
      ansible.builtin.debug:
        msg: "Deployment workflow finished"
```

## Strategy and Forks

Forks control how many hosts Ansible works on at once.

```ini
[defaults]
forks = 10
```

Async tasks allow long-running commands to continue while Ansible checks back later.

```yaml
- name: Run long task
  ansible.builtin.command: /opt/app/long-task.sh
  async: 3600
  poll: 30
```

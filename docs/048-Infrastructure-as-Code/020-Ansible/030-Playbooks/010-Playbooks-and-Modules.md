---
title: "Playbooks and Modules"
description: "Playbooks and Modules"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 12
last_update:
  date: 12/10/2020
---

## Overview

Modules perform actions. Playbooks arrange those actions into repeatable YAML workflows.

Use ad hoc commands for quick one-time work, and use playbooks when the task should be repeated, reviewed, or versioned.

## Ad Hoc Commands

Run a module directly from the command line.

```bash
ansible all -m ping
ansible webservers -m command -a "uptime"
ansible webservers -m yum -a "name=httpd state=present" --become
```

Useful flags:

| Flag | Purpose                                   |
| ---- | ----------------------------------------- |
| `-i` | Sets the inventory file.                  |
| `-m` | Selects the module.                       |
| `-a` | Passes module arguments.                  |
| `-b` | Runs with privilege escalation.           |
| `-u` | Sets the remote user.                     |

## Playbook Structure

A playbook contains one or more plays. Each play targets hosts and runs tasks.

```yaml
---
- name: Check host connectivity
  hosts: all
  tasks:
    - name: Ping hosts
      ansible.builtin.ping:
```

Run the playbook.

```bash
ansible-playbook sample-ping.yml
```

## Common Modules

| Module      | Purpose                                      |
| ----------- | -------------------------------------------- |
| `ping`      | Confirms Ansible can connect to a host.      |
| `command`   | Runs a command without shell processing.     |
| `shell`     | Runs a command through a shell.              |
| `copy`      | Copies local files to remote hosts.          |
| `template`  | Renders Jinja2 templates to remote hosts.    |
| `service`   | Starts, stops, restarts, and enables services. |
| `lineinfile`| Ensures a line exists or is changed in a file. |
| `yum`       | Manages packages on RHEL-based systems.      |
| `apt`       | Manages packages on Debian-based systems.    |

## Validation

Check syntax before running.

```bash
ansible-playbook --syntax-check playbooks/setup-app.yml
```

Run in check mode when a module supports it.

```bash
ansible-playbook playbooks/setup-app.yml --check
```

Limit a run to specific hosts.

```bash
ansible-playbook playbooks/setup-app.yml --limit webservers
```

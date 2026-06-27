---
title: "Roles, Templates, and Vault"
description: "Roles, Templates, and Vault"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 14
last_update:
  date: 1/5/2021
---

## Overview

Roles package reusable automation. Templates render configuration from variables. Vault encrypts sensitive values that must live with playbooks.

## Role Layout

Create a role with `ansible-galaxy`.

```bash
ansible-galaxy init roles/webservers
```

Common role directories:

| Directory  | Purpose                                   |
| ---------- | ----------------------------------------- |
| `tasks`    | Main task list for the role.              |
| `handlers` | Service restarts and notified actions.    |
| `defaults` | Low-priority default variables.           |
| `vars`     | Higher-priority role variables.           |
| `files`    | Static files copied without rendering.    |
| `templates`| Jinja2 templates rendered before copying. |
| `meta`     | Role metadata and dependencies.           |

## Using a Role

```yaml
---
- name: Configure web servers
  hosts: webservers
  become: true
  roles:
    - webservers
```

## Handlers

Handlers run only when notified by a changed task.

```yaml
- name: Copy Apache config
  ansible.builtin.template:
    src: httpd.conf.j2
    dest: /etc/httpd/conf/httpd.conf
  notify: Restart httpd
```

```yaml
- name: Restart httpd
  ansible.builtin.service:
    name: httpd
    state: restarted
```

## Jinja2 Templates

Templates combine static text and variables.

```jinja2
Managed by Ansible.
Host: {{ ansible_hostname }}
OS: {{ ansible_distribution }} {{ ansible_distribution_version }}
```

Deploy the template.

```yaml
- name: Deploy motd
  ansible.builtin.template:
    src: motd.j2
    dest: /etc/motd
```

## Ansible Vault

Create an encrypted variable file.

```bash
ansible-vault create vars/secrets.yml
```

Edit it later.

```bash
ansible-vault edit vars/secrets.yml
```

Run a playbook that needs vault values.

```bash
ansible-playbook playbooks/setup-app-vault.yml --ask-vault-pass
```

:::warning

Do not commit vault password files. Commit encrypted vault files only when the repository is intended to store them.

:::

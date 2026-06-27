---
title: "Inventories and Configuration"
description: "Inventories and Configuration"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 11
last_update:
  date: 12/4/2020
---

## Overview

An inventory tells Ansible which hosts it can manage. The configuration file controls defaults such as inventory location, remote user, roles path, and host key checking.

## Static Inventory

A simple inventory can group hosts by purpose.

```ini
[webservers]
tstsvr1
tstsvr2
tstsvr3
tstsvr4

[loadbalancers]
lb1

[local]
localhost ansible_connection=local
```

You can also define aliases with `ansible_host`.

```ini
[webservers]
app1 ansible_host=13.251.146.254
app2 ansible_host=122.248.203.239
```

## Inventory Groups

Groups help target related hosts.

```bash
ansible webservers --list-hosts
ansible loadbalancers --list-hosts
ansible all --list-hosts
```

Nested groups use `:children`.

```ini
[prod:children]
webservers
loadbalancers
```

## Inventory Variables

Inventory variables can be set beside a host, inside a group, or in `host_vars` and `group_vars`.

| Location       | Use case                                      |
| -------------- | --------------------------------------------- |
| Host line      | Small host-specific connection details.       |
| Group section  | Shared values for every host in the group.    |
| `host_vars`    | Larger host-specific variables.               |
| `group_vars`   | Larger group-specific variables.              |

## Ansible Configuration

Ansible looks for configuration in this order:

1. `ANSIBLE_CONFIG`
2. `ansible.cfg` in the current directory
3. `.ansible.cfg` in the home directory
4. `/etc/ansible/ansible.cfg`

Example project configuration:

```ini
[defaults]
inventory = inventories/edendev.inv
remote_user = eden
roles_path = roles
host_key_checking = False
```

Check active changes.

```bash
ansible-config dump --only-changed
```

## SSH Trust

The controller needs SSH access to managed nodes.

```bash
ssh-keygen
ssh-copy-id tstsvr1
ssh-copy-id tstsvr2
ssh-copy-id tstsvr3
ssh-copy-id tstsvr4
```

:::warning

Do not commit private SSH keys, real host credentials, or vault password files into the repository.

:::

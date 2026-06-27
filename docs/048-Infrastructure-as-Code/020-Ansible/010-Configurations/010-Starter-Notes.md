---
title: "Ansible"
id: ansible-starter-notes
description: "Starter Notes on Ansible"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 10
last_update:
  date: 12/1/2020
---

## Overview

Ansible is an automation tool used to configure servers, deploy applications, and run repeatable operations across managed hosts.

The main pieces are:

| Component     | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| Controller    | Runs Ansible commands and playbooks.                     |
| Managed nodes | Remote machines configured by the controller.            |
| Inventory     | Lists hosts and groups that Ansible can target.          |
| Module        | Performs a specific action on a managed node.            |
| Playbook      | Defines automation steps in YAML.                        |
| Role          | Packages tasks, variables, files, handlers, and defaults. |

**Note**: Older notes may use `master`, `node`, `host`, or `managed host`. In these notes, those terms map to the controller and managed nodes.

## Learning Path

Start with the core workflow:

- Install Ansible on the controller.
- Create an inventory for the target hosts.
- Confirm SSH trust between the controller and managed nodes.
- Test connectivity with the `ping` module.
- Run ad hoc commands for simple tasks.
- Convert repeated commands into playbooks.
- Move repeated playbook patterns into roles.

## Install Ansible

Install Ansible on the controller machine.

```bash
# RHEL, CentOS, Fedora
sudo dnf install ansible -y

# Debian and Ubuntu
sudo apt install ansible -y
```

Check the installed version.

```bash
ansible --version
```

## First Commands

List hosts from the active inventory.

```bash
ansible --list-hosts all
```

List hosts from a custom inventory.

```bash
ansible -i inventories/edendev.inv --list-hosts all
```

Test connectivity.

```bash
ansible all -m ping
```

Run a command on a group.

```bash
ansible webservers -m command -a "uptime"
```

## Documentation

Use `ansible-doc` to inspect modules from the command line.

```bash
ansible-doc -l
ansible-doc ping
ansible-doc copy
```

## Related Pages

- [Inventories and Configuration](../020-Inventory/010-Inventories-and-Configuration.md)
- [Playbooks and Modules](../030-Playbooks/010-Playbooks-and-Modules.md)
- [Variables, Conditionals, and Loops](../050-Variables-Conditionals-Loops/010-Variables-Conditionals-and-Loops.md)
- [Roles, Templates, and Vault](../060-Roles-Templates-Vault/010-Roles-Templates-and-Vault.md)
- [Projects and Labs](../005-Projects/README.md)

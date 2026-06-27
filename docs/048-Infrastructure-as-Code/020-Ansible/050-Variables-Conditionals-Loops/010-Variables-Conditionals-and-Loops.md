---
title: "Variables, Conditionals, and Loops"
description: "Variables, Conditionals, and Loops"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 13
last_update:
  date: 12/17/2020
---

## Overview

Variables make playbooks reusable. Conditionals decide whether a task should run. Loops repeat a task for multiple values.

## Variables

Variables can be defined in several places.

```yaml
vars:
  package_name: httpd
  service_name: httpd
```

Use variables with Jinja2 syntax.

```yaml
- name: Install package
  ansible.builtin.yum:
    name: "{{ package_name }}"
    state: present
```

## Variable Locations

| Location       | Purpose                                      |
| -------------- | -------------------------------------------- |
| `vars`         | Defines values inside a play.                |
| `vars_files`   | Loads variables from a separate file.        |
| `group_vars`   | Applies variables to an inventory group.     |
| `host_vars`    | Applies variables to one host.               |
| `register`     | Stores task output for later tasks.          |

## Registered Variables

Register command output, then use it later.

```yaml
- name: Check uptime
  ansible.builtin.command: uptime
  register: uptime_result

- name: Show uptime
  ansible.builtin.debug:
    var: uptime_result.stdout
```

## Conditionals

Use `when` to run a task only when a condition is true.

```yaml
- name: Install Apache on Red Hat hosts
  ansible.builtin.yum:
    name: httpd
    state: present
  when: ansible_facts['os_family'] == "RedHat"
```

## Loops

Use `loop` to repeat a task.

```yaml
- name: Create users
  ansible.builtin.user:
    name: "{{ item }}"
    state: present
  loop:
    - alice
    - bob
    - carol
```

## Loops with Dictionaries

```yaml
- name: Create users with groups
  ansible.builtin.user:
    name: "{{ item.name }}"
    groups: "{{ item.groups }}"
    state: present
  loop:
    - name: alice
      groups: wheel
    - name: bob
      groups: developers
```

**Note**: Use clear variable names. A readable playbook is easier to troubleshoot than a clever one.

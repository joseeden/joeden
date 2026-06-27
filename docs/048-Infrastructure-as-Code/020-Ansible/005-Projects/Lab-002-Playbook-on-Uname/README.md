---
title: "Playbook on Uname"
description: "Playbook on Uname"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 6
last_update:
  date: 12/3/2020
---

## Overview

This lab creates a simple Ansible playbook that runs `uname` on the target host groups to confirm the operating system type returned by each managed node.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

```bash
# sample-uname.yml
# ansible -m shell -a "uname" webservers
---

- name: Checks uname
  hosts: webservers:loadbalancers
  tasks:
  - name: Get OS Type
    shell: uname
```

To test,
```bash
ansible-playbook playbooks/sample-uname.yml
```

![](/img/docs/accflab2.png)

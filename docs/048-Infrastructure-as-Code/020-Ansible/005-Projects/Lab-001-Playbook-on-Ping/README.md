---
title: "Playbook on Ping"
description: "Playbook on Ping"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 3
last_update:
  date: 12/2/2020
---

## Overview

Diagram:

![](/img/docs/ansible-lab-diagram-1.png)

```bash
# sample-ping.yml
# ansible -m ping hosts
---
- name: Ping all hosts
  hosts: all
  tasks:
  - name: Ping all servers
    action: ping
```

To test,
```bash
ansible-playbook playbooks/sample-ping.yml
```

![](/img/docs/accflab1-1.png)

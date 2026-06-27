---
title: "Lab 012: Two-tier Design Part 6: Consolidate into One Playbook"
description: "Lab 012: Two-tier Design Part 6: Consolidate into One Playbook"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 120
last_update:
  date: 12/13/2020
---

## Overview

**Diagram:**
![](/img/docs/ansible-lab-diagram-1.png)

Here we'll import the previous playbooks into one.
```yaml
# setup-2tier.yml
---

- import_playbook: package-update.yml
- import_playbook: install-services.yml
- import_playbook: setup-app.yml
- import_playbook: setup-lb.yml
- import_playbook: setup-check-status.yml
```

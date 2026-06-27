---
title: "Two tier Design Part 6 Consolidate into One Playbook"
description: "Two tier Design Part 6 Consolidate into One Playbook"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 36
last_update:
  date: 12/13/2020
---

## Overview

This lab consolidates multiple playbooks into one workflow so the two-tier deployment can be run more cleanly.

Diagram:
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

---
title: "Two tier Design Using Include"
description: "Two tier Design Using Include"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 39
last_update:
  date: 12/14/2020
---

## Overview

This lab reuses playbook content with include-style composition instead of keeping every task in one file.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

In this lab, we'll also consolidate and re-used different playbooks. But instead of using **import_playbook**, we'll use **include**.

Note here that we can use **include** as a **task** and as a **play**. In the example below, we're using include as a play.
```yaml
# setup-2tier-include.yml
---

- include: package-update.yml
- include: install-services.yml
- include: setup-app.yml
- include: setup-lb.yml
- include: setup-check-status.yml
```

Note that when you use include as a task inside a play

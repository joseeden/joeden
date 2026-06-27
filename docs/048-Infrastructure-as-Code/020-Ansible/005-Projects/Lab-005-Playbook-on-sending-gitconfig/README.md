---
title: "Playbook on sending gitconfig"
description: "Playbook on sending gitconfig"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 15
last_update:
  date: 12/6/2020
---

## Overview

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

In our **playbooks** directory, let's create **sample-check-git.yml**

```bash
# Here we're converting the adhoc command to a neat playbook.
# ansible -m copy -a "src=master.gitconfig dest=~/new.gitconfig" localhost
---

- name: Ensure master.gitconfig is copied to ~/new1.gitconfig
  hosts: localhost
  tasks:
  - copy: 
      src="~/proj-ansible/one/files/master.gitconfig" 
      dest="~/new1.gitconfig"

```

Now let's try to run the playbook.

```bash
ansible-playbook playbooks/sample-check-git.yml
```

![](/img/docs/accflab51.png)

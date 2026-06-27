---
title: "Doing a dry run using check"
description: "Doing a dry run using check"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 12
last_update:
  date: 12/5/2020
---

## Overview

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

If we don't want to do any update yet and we just want to see a **dry-run** of what change would take place, we could simply add the `--check` flag.

As an example, go back to the localhost and this time we just want to know if there'll be any error if we create a second copy of the master.config file. 

```bash
$ ansible -m copy -a "src=master.gitconfig dest=~/master2-bak.gitconfig" localhost --check
```

![](/img/docs/accflab4.png)

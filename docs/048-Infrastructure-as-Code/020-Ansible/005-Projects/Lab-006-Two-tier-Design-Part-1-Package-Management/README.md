---
title: "Two tier Design Part 1 Package Management"
description: "Two tier Design Part 1 Package Management"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 18
last_update:
  date: 12/7/2020
---

## Overview

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

This particular lab will be divided into phases:
- Part 1: Package Management
- Part 2: Install Services
- Part 3: Upload application to Web Servers 
- Part 4: Configure the Load Balancer

For the first one, we're updating all the packages in our servers using yum.

<details><summary>package-update.yml</summary>

```yaml

# package-update.yml using yum
---

- name: Update packages on the servers using yum
  hosts: webservers:loadbalancers
  tasks:
    - name: Update packages using yum
      yum:  
        name: '*'
        state: latest
```

</details>

When we try to run it, we see an error.
```bash
$ ansible-playbook playbooks/package-update.yml
```

![](/img/docs/accf-lab6-1.png)

Notice that when our playbook fails, it creates a duplicate file appended with *retry*. This is Ansible's way of telling us that the run wasn't succesful. This means that for every failed run, it will create duplicate files which could accumulate quickly. This can be disabled though the ansible.cfg file, which is discussed in the [Adding more on the ansible.cfg](#adding-more-on-the-ansiblecfg) section.

![](/img/docs/accfretry.png)

This means the actions can only be done by the **root** user. To do this, we edit the playbook. "become: true" means become the root user when running the tasks.

<details><summary>package-update.yml</summary>

```yaml
# package-update.yml using yum
---

- name: Update packages on the servers using yum
  become: true
  hosts: webservers:loadbalancers
  tasks:
    - name: Update packages using yum
      yum:  
        name: '*'
        state: latest
```
</details>

When we run the playbook again, it succeeds this time.

![](/img/docs/accf-lab6-2.png)

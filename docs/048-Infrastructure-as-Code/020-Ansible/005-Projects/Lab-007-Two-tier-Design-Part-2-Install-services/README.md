---
title: "Lab 007: Two-tier Design Part 2: Install services"
description: "Lab 007: Two-tier Design Part 2: Install services"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 70
last_update:
  date: 12/8/2020
---

## Overview

**Diagram:**
![](/img/docs/ansible-lab-diagram-1.png)

Here we'll be installing services on our webservers and loadbalancer.
- webservers: Apache and PHP
- loadbalancers: Apache

After installing the services, they would also need to be started.

For the playbook:
<details><summary>install-services.yml</summary>

```bash
# install-services.yml
---
# install-services.yml
---

- name: Install Apache on loadbalancer
  become: true
  hosts: loadbalancers
  tasks:
    - name: Install Apache on loadbalancer
      yum:  
        name: httpd
        state: present
    - name: Starts the service/s
      service:
        name: httpd
        state: started
        enabled: yes

- name: Install Apache and PHP on webservers
  become: true
  hosts: webservers
  tasks:
    - name: Install Apache and PHP on webservers
      yum:  
        name: 
          - httpd
          - php
        state: present
    - name: Starts the service/s
      service:
        name: httpd
        state: started
        enabled: yes      
```

</details>

To test,
```bash
$ ansible-playbook playbooks/install-services.yml
```

Now, as our playbooks get longer as we add more plays and tasks, it will be troublesome to check all the playbooks. One way to easily point out on which Nodes something went wrong or which part failed, is to check the **play recap** and **summary** once the playbook is done.

![](/img/docs/accflabsummary1.png)

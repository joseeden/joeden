---
title: "Two tier Design Using Local Variables"
description: "Two tier Design Using Local Variables"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 45
last_update:
  date: 12/16/2020
---

## Overview

This lab uses local playbook variables to keep repeated values close to the tasks that need them.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

Here we're using **vars** in our playbook just like in any programming language where variables are defined at the beginning.

<details><summary> setup-app-localvars.yml </summary>
 
```bash
# setup-app-localvars.yml
# Similar with setup-app-var.yml, but here we're using local variables
---

- name: Copy app file onto webservers 
  become: true
  vars:
    path_to_app: "/var/www/html"
  hosts: webservers
  tasks:

    - name: Upload application file
      copy:
        src: ~/proj-ansible-1/one/files/index.php
        dest: "{{ path_to_app }}"
        mode: 0755

    - name: Create simple info page
      copy:
        dest: "{{ path_to_app }}/info.php"
        content: "<h1> Info about our webserver: {{ ansible_hostname }} </h1>"
```
 
</details>

![](/img/docs/accflocalvars.png)

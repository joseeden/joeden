---
title: "Loops"
description: "Loops"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 90
last_update:
  date: 1/8/2021
---

## Overview

<details><summary> Task 1</summary>
 
The playbook currently runs an echo command to print a fruit name. Apply a loop directive (with_items) to the task to print all fruits defined in the fruits variable.

</details>
<details><summary> Task 2</summary>
 
To a more realistic use case. We are attempting to install multiple packages using yum module.The current playbook installs only a single package.
</details>

**Solutions**
<details><summary> Solution 1 </summary>
 
```yaml
--- 

- name: 'Print list of fruits'
  hosts: localhost
  vars:
      fruits:
          - Apple
          - Banana
          - Grapes
          - Orange
  tasks:
  - command: 'echo "{{ item }}"'
    with_items: '{{ fruits }}'  
```
 
</details>
<details><summary> Solution 2 </summary>
 
```yaml
--- 
- name: 'Install required packages'
  hosts: localhost
  vars:
      packages:
          - httpd
          - binutils
          - glibc
          - ksh
          - libaio
          - libXext
          - gcc
          - make
          - sysstat
          - unixODBC
          - mongodb
          - nodejs
          - grunt
  tasks:
  - yum: 
        name: '{{ item }}'
        state: 'present'
    with_items: '{{ packages }}'
  
```
 
</details>

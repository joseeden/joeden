---
title: "Execute Script Install httpd and Edit a File"
description: "Execute Script Install httpd and Edit a File"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 84
last_update:
  date: 1/4/2021
---

## Overview

This lab practices common Ansible operations such as running scripts, installing `httpd`, and editing files on managed hosts.

<details>
<summary>Inventory</summary>
 
```bash
# Sample Inventory File

# Web Servers
sql_db1 ansible_host=sql01.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
sql_db2 ansible_host=sql02.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
web_node1 ansible_host=web01.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass
web_node2 ansible_host=web02.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass
web_node3 ansible_host=web03.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass

[db_nodes]
sql_db1
sql_db2

[web_nodes]
web_node1
web_node2
web_node3

[all_nodes:children]
db_nodes
web_nodes
```
 
</details>
<details>
<summary>Task 1</summary>
 
- Update the playbook with a play to Execute a script on all web server nodes. 
- The script is located at /tmp/install_script.sh
- Use the Script module
 
</details>
<details>
<summary>Task 2</summary>
 
- Add a new task to start httpd services on all web nodes
- Use the Service module
 
</details>
<details>
<summary>Task 3</summary>
 
- Add a new task in the beginning to add an entry into /etc/resolv.conf file for hosts. 
- The line to be added is nameserver 10.1.250.10
- Note: The new task must be executed first, so place it accordingly.
- Use the Lineinfile module
 
</details>
<details>
<summary>Task 4</summary>
 
- Add a new task at second position to create a new web user.
- Use the user module for this. 
- User details to be used are given below:
  - Username: web_user
  - uid: 1040
  - group: developers
 
</details>

**Solutions:**
<details>
<summary>Solution 1</summary>
 
```yaml
# Execute a script on all web server nodes.
---

- name: Execute a script on all web server nodes
  hosts: web_nodes
  tasks:
    - name: Execute scripts
      script: /tmp/install_script.sh
    
```
 
</details>
<details>
<summary>Solution 2</summary>
 
```yaml
# Execute a script on all web server nodes.
---

- name: Execute a script on all web server nodes
  hosts: web_nodes
  tasks:
    - name: Execute script
      script: /tmp/install_script.sh
    
    - name: Start httpd
      service:
        name: httpd
        state: started
```
 
</details>
<details>
<summary>Solution 3</summary>
 
```yaml
# Execute a script on all web server nodes.
---

- name: Execute a script on all web server nodes
  hosts: web_nodes
  tasks:
    - name: Add entry to /etc/resolv.conf
      lineinfile:
        line: 'nameserver 10.1.250.10'
        path: /etc/resolv.conf
        
    - name: Execute script
      script: /tmp/install_script.sh
    
    - name: Start httpd
      service:
        name: httpd
        state: present
```
 
</details>
<details>
<summary>Solution 4</summary>
 
```yaml
# Execute a script on all web server nodes.
---

- name: Execute a script on all web server nodes
  hosts: web_nodes
  tasks:
    - name: Add entry to /etc/resolv.conf
      lineinfile:
        path: /etc/resolv.conf
        line: 'nameserver 10.1.250.10'
    
    - name: Add web user
      user:
        name: web_user
        uid: 1040
        group: developers
      
    - name: Execute script
      script: /tmp/install_script.sh
    
    - name: Start httpd
      service:
        name: httpd
        state: present
```
 
</details>

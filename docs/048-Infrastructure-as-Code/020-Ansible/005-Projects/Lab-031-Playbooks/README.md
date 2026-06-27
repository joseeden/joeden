---
title: "Playbooks"
description: "Playbooks"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 93
last_update:
  date: 1/10/2021
---

## Overview

<details><summary> Inventory</summary>
 
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

[boston_nodes]
sql_db1
web_node1

[dallas_nodes]
sql_db2
web_node2
web_node3

[us_nodes:children]
boston_nodes
dallas_nodes
```
 
</details>
<details><summary> Task 1 </summary>
 
Update name of the play to Execute a date command on localhost
 
</details>
<details><summary> Task 2 </summary>
 
Update the task to execute the command cat /etc/hosts and change task name to Execute a command to display hosts file
 
</details>
<details><summary> Task 3 </summary>
 
Update the playbook to add a second task. The new task must execute the command cat /etc/hosts and change new task name to Execute a command to display hosts file
 
</details>
<details><summary> Task 4 </summary>
 
We have been running all tasks on localhost. We would now like to run these tasks on the web_node1. Update the play to run the tasks on web_node1.
 
</details>
<details><summary> Task 5 </summary>
 
Refer to the attached inventory file. We would like to run the tasks defined in the play on all servers in boston.
 
</details>
<details><summary> Task 6 </summary>
 
Create a new play named Execute a command to display hosts file contents on web_node2 to execute cat /etc/hosts command on second node web_node2 and name the task Execute a command to display hosts file.

Refer to the attached inventory file
 
</details>
<details><summary> Task 7 </summary>
 
You are assigned a task to restart a number of servers in a particular sequence. The sequence and the commands to be used are given below. Note that the commands should be run on respective servers only. Refer to the inventory file and update the playbook to create the below sequence.

Note: Use the description below to name the plays and tasks.

Stop the web services on web server nodes - service httpd stop
Shutdown the database services on db server nodes - service mysql stop
Restart all servers (web and db) at once - /sbin/shutdown -r
Start the database services on db server nodes - service mysql start
Start the web services on web server nodes - service httpd start
Warning: Do not use this playbook in a real setup. There are better ways to do these actions. This is only for simple practise.
 
</details>

**Solutions:**
<details><summary> Solution 1</summary>
 
```yaml
--- 
-
    name: 'Execute a date command on localhost'
    hosts: localhost
    tasks:
        -
            name: 'Execute a date command'
            command: date
    
```
 
</details>
<details><summary> Solution 2</summary>
 
```yaml
--- 
-
    name: 'Execute a command to display hosts file on localhost'
    hosts: localhost
    tasks:
        -
            name: 'Execute a command to display hosts file'
            command: cat /etc/hosts
```
 
</details>
<details><summary> Solution 3 </summary>
 
```yaml
---
-
    name: 'Execute two commands on localhost'
    hosts: localhost
    tasks:
        -
            name: 'Execute a date command'
            command: date
        -
            name: 'Execute a command to display hosts file'
            command: cat /etc/hosts   
```
 
</details>
<details><summary> Solution 4 </summary>
 
```yaml
---
-
    name: 'Execute two commands on localhost'
    hosts: web_node1
    tasks:
        -
            name: 'Execute a date command'
            command: date
        -
            name: 'Execute a command to display hosts file'
            command: 'cat /etc/hosts'
  
```
 
</details>
<details><summary> Solution 5 </summary>
 
```yaml
---
-
    name: 'Execute two commands on web_node1'
    hosts: boston_nodes
    tasks:
        -
            name: 'Execute a date command'
            command: date
        -
            name: 'Execute a command to display hosts file'
            command: 'cat /etc/hosts'

```
 
</details>
<details><summary> Solution 6 </summary>
 
```yaml
---
-
    name: 'Execute command to display date on web_node1'
    hosts: web_node1
    tasks:
        -
            name: 'Execute a date command'
            command: date
-
    name: 'Execute a command to display hosts file contents on web_node2'
    hosts: web_node2
    tasks:
        -
            name: 'Execute a command to display hosts file'
            command: cat /etc/hosts
        
  
```
 
</details>
<details><summary> Solution 7 </summary>
 
```yaml
--- 
-
    name: 'Stop the web services on web server nodes'
    hosts: web_nodes
    tasks:
        -
            name: 'Stop the web services on web server nodes'
            command: 'service httpd stop'
-
    name: 'Shutdown the database services on db server nodes'
    hosts: db_nodes
    tasks:
        -
            name: 'Shutdown the database services on db server nodes'
            command: 'service mysql stop'
-
    name: 'Restart all servers (web and db) at once'
    hosts: web_nodes:db_nodes
    tasks:
        -
            name: 'Restart all servers (web and db) at once'
            command: '/sbin/shutdown -r'            
-
    name: 'Start the database services on db server nodes'
    hosts: db_nodes
    tasks:
        -
            name: 'Start the database services on db server nodes'
            command: 'service mysql start'        
-
    name: 'Start the web services on web server nodes'
    hosts: web_nodes
    tasks:
        -
            name: 'Start the web services on web server nodes'
            command: 'service httpd start'                   
```
 
</details>

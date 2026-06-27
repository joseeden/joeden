---
title: "Practice Playbooks"
description: "Practice Playbooks"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 60
last_update:
  date: 12/18/2020
---

## Overview

Note that these are not the exact same questions. You can try to answer them and create a Playbook file in your own machines based on the questions.

Use the expandable answers to compare your solution after you finish each exercise.

**1. Create a playbook to be run on the localhost. The play should be titled 'Execute a date command on localhost'**

<details>
  <summary>Answer</summary>

```yaml
---
name: 'Execute a date command on localhost'
hosts: localhost
tasks:
    -
        name: 'Execute a date command on localhost'
        command: 'date'
```
</details>


**2. We want to change the play below to read the /etc/hosts file. It should be named 'Execute a command to display hosts file' and it will be run on a group of servers called db_servers**

```yaml
---
name: 'Execute a date command on localhost'
hosts: localhost
tasks:
    -
        name: 'Execute a date command on localhost'
        command: 'date'
```

<details>
  <summary>Answer</summary>

```yaml
---
name: 'Execute a command to display hosts file'
hosts: db_servers
tasks:
    -
        name: 'Execute a command to display hosts file'
        command: 'cat /etc/hosts'
```
</details>


**3. instead of replacing task (as done in Question 2), add the new task from Question 2 as a second task to the playbook below.
This playbook should be run on a group of servers called "web_servers"**

```yaml
---
name: 'Execute a date command on localhost'
hosts: localhost
tasks:
    -
        name: 'Execute a date command on localhost'
        command: 'date'
```

<details>
  <summary>Answer</summary>

```yaml
---
name: 'Execute a command to display hosts file'
hosts: web_servers
tasks:
    -
        name: 'Execute a date command on localhost'
        command: 'date'
    -   
        name: 'Execute a command to display hosts file'
        command: 'cat /etc/hosts'
```
</details>


**4. You are assigned a task to restart a number of servers in a particular sequence. The sequence and the commands to be used are given below. Note that the commands should be run on respective servers only. Refer to the inventory file and update the playbook to create the below sequence.**

Note: Use the description below to name the plays and tasks.

1.  Stop the web services on web server nodes - service httpd stop
2.  Shutdown the database services on db server nodes - service mysql stop
3.  Restart all servers (web and db) at once - /sbin/shutdown -r
4.  Start the database services on db server nodes - service mysql start
5.  Start the web services on web server nodes - service httpd start

**Warning**: Do not use this playbook in a real setup. There are better ways to do these actions. This is only for simple practice.

<details>
  <summary>Answer</summary>

```yaml
---
name: 'Stop the web services on web server nodes'
hosts: web_nodes
tasks:
    -
        name: 'Stop the web services on web server nodes'
        command: 'service httpd stop'

---
name: 'Shutdown the database services on db server nodes'
hosts: db_nodes
tasks:
    -
        name: 'Shutdown the database services on db server nodes'
        command: 'service mysql stop'

---
name: 'Restart all servers (web and db) at once'
hosts: all_nodes
tasks:
    -
        name: 'Restart all servers (web and db) at once'
        command: '/sbin/shutdown -r'

---
name: 'Start the database services on db server nodes'
hosts: db_nodes
tasks:
    -
        name: 'Start the database services on db server nodes'
        command: 'service mysql start'

---
name: 'Start the web services on web server nodes'
hosts: web_nodes
tasks:
    -
        name: 'Start the web services on web server nodes'
        command: 'service httpd start'

```
</details>

---
title: "Using host vars and group vars"
description: "Using host vars and group vars"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 60
last_update:
  date: 12/21/2020
---

## Overview

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

This is a continuation of the previous lab. We'll also still be using the same files in project **one** from the first 10 labs. To recap, here is a tree-output of our project **one**:

<details><summary> Project One in tree-output</summary>

![](/img/docs/planstree.png)

</details>

<details><summary> ansible.cfg </summary>
 
```bash
 [defaults]
# E: variables for my personal lab
inventory = ~/proj-ansible-1/one/inventories/edendev.inv
remote_user = eden
private_key_file = ~/.ssh/id_rsa
host_key_checking = False
retry_files_enabled = False
timeout = 24
gather_facts = smart

#ansible_managed = "# This file is managed by Ansible, all local changes will be lost !"
#allow_world_readable_tmpfiles = True
#precedence = all_plugins_play, all_inventory, groups_plugins_play, groups_inventory, all_plugins_inventory, groups_plugins_inventory
#any_errors_fatal = True
#timeout = 24

[privilege_escalation]
#become_method = sudo
#become=True
#become_user=root
#become_ask_pass=False

[paramiko_connection]
#record_host_keys = False

[ssh_connection]
scp_if_ssh = True
pipelining = True
```
 
</details>

<details><summary> inventories/edendev.inv </summary>
 
```bash
[webservers]
app1    ansible_host=13.251.146.254
app2    ansible_host=122.248.203.239
app3    ansible_host=52.76.189.254
app4    ansible_host=54.255.28.202

[loadbalancers]
lb1     ansible_host=13.228.99.157

[local]
localhost   ansible_connection=local
```
 
</details>

<details><summary> symlink in root directory pointing to projects folder </summary>

```bash
$ ls -la | grep "\->"
lrwxrwxrwx  1 joseeden joseeden    70 Jan 14 23:03 proj-ansible-1 -> /mnt/c/Users/Eden Jose/4-Projects
```

</details>

In this lab, we'll first create **host_vars** and **group_vars** inside the playbooks folder. We'll then create the **webservers** and **loadbalancers** file inside the **group_vars** folder.

```bash
$ mkdir playbooks/group_vars
$ mkdir playbooks/host_vars
$ touch playbooks/group_vars/webservers
$ touch playbooks/group_vars/loadbalancers 
```

Our current playbooks folder shold now look like this:

```bash
joseeden@EdenJose:playbooks$ tree
.
├── create-users-vars.yml
├── create-users-vars2.yml
├── create-users.yml
├── group_vars
│   ├── loadbalancers
│   └── webservers
├── host_vars 
```

We'll then modify the **create-users-vars2.yml** from the previous lab. Here is what it currently looks like:

<details><summary> create-users-vars2.yml </summary>
 
```yaml
# create-users-vars2.yml
---

- name: Create users on the webservers
  hosts: webservers
  become: true
  vars:
    username:
      testeden-3:
        uname: testeden-3
        description: ansible-created-user-3
  tasks:
  - name: Create the users
    user:
      name: "{{ username['testeden-3']['uname']}}"
      state: present
      comment: "{{ username['testeden-3']['description'] }}"
```
 
</details>

We'll remove the **username** section and put them in the **group_vars/webservers** file. Also, change the user to **testeden-4**.

```yaml
# Variables for the webservers group

username:
    testeden-4:
        uname: testeden-4
        description: ansible-created-user-4
```

We'll create a copy of the playbook and rename it to **create-users-vars3.yml**. After removing the variables, here's what it looks like now.

```yaml
# create-users-vars3.yml
---

- name: Create users on the webservers
  hosts: webservers
  become: true
  tasks:
  - name: Create the users
    user:
      name: "{{ username['testeden-4']['uname']}}"
      state: present
      comment: "{{ username['testeden-4']['description'] }}"
```

Running the playbook.
```bash
$ ansible-playbook playbooks/create-users-vars3.yml 
```

![](/img/docs/plansusers5.png)

Now to make sure the users were really created, let's login again to two of the four webservers and check.

```bash
$ ssh eden@tstsvr1
Last login: Fri Jan 14 22:37:13 2022 from 1.2.3.4
[eden@tstsvr1 ~]$
[eden@tstsvr1 ~]$ tail -4 /etc/passwd
testeden-1:x:1001:1001:ansible-created-user-1:/home/testeden-1:/bin/bash
testeden-2:x:1002:1002:ansible-created-user-2:/home/testeden-2:/bin/bash
testeden-3:x:1003:1003:ansible-created-user-3:/home/testeden-3:/bin/bash
testeden-4:x:1004:1004:ansible-created-user-4:/home/testeden-4:/bin/bash  
```

```bash
$ ssh eden@tstsvr3
Last login: Fri Jan 14 22:50:08 2022 from 1.2.3.4
[eden@tstsvr3 ~]$
[eden@tstsvr3 ~]$ tail -4 /etc/passwd
testeden-1:x:1001:1001:ansible-created-user-1:/home/testeden-1:/bin/bash
testeden-2:x:1002:1002:ansible-created-user-2:/home/testeden-2:/bin/bash
testeden-3:x:1003:1003:ansible-created-user-3:/home/testeden-3:/bin/bash
testeden-4:x:1004:1004:ansible-created-user-4:/home/testeden-4:/bin/bash 
```

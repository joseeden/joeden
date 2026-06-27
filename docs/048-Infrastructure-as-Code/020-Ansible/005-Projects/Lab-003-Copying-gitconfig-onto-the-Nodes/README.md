---
title: "Copying gitconfig onto the Nodes"
description: "Copying gitconfig onto the Nodes"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 9
last_update:
  date: 12/4/2020
---

## Overview

This lab uses Ansible to copy a Git configuration file from the controller to managed nodes, which demonstrates basic file distribution with a playbook.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

In our **files** directory, let's create **master.gitconfig** which we will then then we can pass that file onto the managed nodes.
```bash
$ cat > master.gitconfig
[user]
        name = Jose Eden
        email = joseden@gmail.com
```

We'll use the **copy** module to the localhost's home directory first.
```bash
$ ansible -m copy -a "src=master.gitconfig dest=~/master-bak.gitconfig" localhost
```
It will then return the following,
```bash
localhost | CHANGED => {
    "changed": true,
    "dest": "/home/joseeden/master-bak.gitconfig",
    "gid": 1000,
    "group": "joseeden",
    "mode": "0644",
    "owner": "joseeden",
    "size": 66,
    "src": "/home/joseeden/.ansible/tmp/ansible-tmp-1642014696.9249792-186511815307980/source",
    "state": "file",
    "uid": 1000
}
```

To test,
```bash
$ git config --global --list
user.name=Jose Eden
user.email=josemanuelitoeden@gmail.com
```

That one is particularly easy because it's as simple as copying the file from one directory to another. 

<details><summary> Sending git to the hosts</summary>

```bash
$ ansible -m copy -a "src=master.gitconfig dest=~/master-bak.gitconfig" webservers -u eden

app2 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/libexec/platform-python"
    },
    "changed": true,
    "dest": "/home/eden/master-bak.gitconfig",
    "gid": 1000,
    "group": "eden",
    "mode": "0664",
    "owner": "eden",
    "secontext": "unconfined_u:object_r:user_home_t:s0",
    "size": 62,
    "src": "/home/eden/.ansible/tmp/ansible-tmp-1641861428.6034608-215829038823036/source",
    "state": "file",
    "uid": 1000
}
app3 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/libexec/platform-python"
    },
    "changed": true,
    "dest": "/home/eden/master-bak.gitconfig",
    "gid": 1000,
    "group": "eden",
    "mode": "0664",
    "owner": "eden",
    "secontext": "unconfined_u:object_r:user_home_t:s0",
    "size": 62,
    "src": "/home/eden/.ansible/tmp/ansible-tmp-1641861428.6450894-210780739412380/source",
    "state": "file",
    "uid": 1000
}
app1 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/libexec/platform-python"
    },
    "changed": true,
    "dest": "/home/eden/master-bak.gitconfig",
    "gid": 1000,
    "group": "eden",
    "mode": "0664",
    "owner": "eden",
    "secontext": "unconfined_u:object_r:user_home_t:s0",
    "size": 62,
    "src": "/home/eden/.ansible/tmp/ansible-tmp-1641861428.5550222-9019062638621/source",
    "state": "file",
    "uid": 1000
}
app4 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/libexec/platform-python"
    },
    "changed": true,
    "dest": "/home/eden/master-bak.gitconfig",
    "gid": 1000,
    "group": "eden",
    "mode": "0664",
    "owner": "eden",
    "secontext": "unconfined_u:object_r:user_home_t:s0",
    "size": 62,
    "src": "/home/eden/.ansible/tmp/ansible-tmp-1641861428.683703-226137740775965/source",
    "state": "file",
    "uid": 1000
}
```
</details>

---
title: "Two tier Design Using Ansible Roles"
description: "Two tier Design Using Ansible Roles"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 51
last_update:
  date: 12/18/2020
---

## Overview

This lab refactors the two-tier deployment into Ansible roles so the configuration is easier to reuse and maintain.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

For this lab, we'll rebuilt our setup to use roles. We'll also create a new project folder named **two** and we'll initialize the directory structure using the **ansible-galaxy** command.

We'll create the **roles** folder and specify our role as **webservers** role and then followed by **init** to initialize the recommended template.

```bash
$ mkdir -p two/roles
$ cd two 
```
```bash
joseeden@EdenJose:two$ ansible-galaxy init roles/webservers
- Role roles/webservers was created successfully
```

We can see that inside the **roles/webservers** folder, we see that several other files have been created.
![](/img/docs/accfroles2.png)

In our IDE, we can also see that some of the created folders have a **main.yml** inside. It also has a templated **README** which you can easily modify.

![](/img/docs/accfroles3.png)

We'll now some files from project **one** to our current project **two**. 

- ansible.cfg
- edendev.inv (inventory file)
- index.php
- setup-app-regvars.yml

![](/img/docs/accfroles5.png)

Also, we'll need to move the **index.php** to the **files** folder.
 
We'll remove all the tasks inside the **setup-app-regvars.yml** playbook and put them in the **tasks/main.yml** file.

```bash
---
# tasks file for roles/webservers
# tasks/main.yml

- name: Upload application file
  copy:
    src: ~/proj-ansible-1/two/roles/webservers/files/index.php
    dest: "{{ path_to_app }}"
    mode: 0755

- name: Create simple info page
  copy:
    dest: "{{ path_to_app }}/info.php"
    content: "<h1> Info about our webserver: {{ ansible_hostname }} </h1>"

- name: See directory contents
  command: ls -la {{ path_to_app }}
  register: dir_contents

- name: Use debug module to print out contents
  debug:
    msg: "{{ dir_contents }}"
```

We'll also move the vars to the **vars/main.yml**.

```bash
---
# vars file for roles/webservers
# vars/main.yml

path_to_app: "/var/www/html"
```

At this point, we've broken down our playbook into pieces and put them in separate folders. Let's save it as **setup-app-roles.yml**. We'll now use **roles** to specify the **webserver** role.

```bash
# setup-app-roles.yml
---
- name: Copy app file onto webservers 
  hosts: webservers
  become: true
  roles:
    - webservers
```

Run the playbook.
```bash
$ ansible-playbook setup-app-roles.yml 
```

Notice that the role name **webservers** is appended on each task.

![](/img/docs/accfroles7.png)

Checking the IP of the loadbalancer in our browser,
![](/img/docs/accfroleswebbrowser.png)

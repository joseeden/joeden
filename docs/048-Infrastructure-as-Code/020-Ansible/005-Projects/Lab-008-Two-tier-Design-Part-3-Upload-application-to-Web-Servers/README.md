---
title: "Two tier Design Part 3 Upload application to Web Servers"
description: "Two tier Design Part 3 Upload application to Web Servers"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 24
last_update:
  date: 12/9/2020
---

## Overview

This lab uploads the application file to the web servers so Apache can serve the PHP application content.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

For this lab, we'll be uploading a PHP file to the webservers' HTML directory, which will then be pulled and served by Apache.

To start off, we'll create the PHP file inside the **files** directory.

```bash
$ vim index.php

<?php
 echo "<h1>Going to be an Awesome 2022, it is!</h1>";
?>
~       
```

The next step now would be to setup the application on the nodes. We will need to copy this file onto the nodes' */var/www/html* directory.

```yaml
# setup-app.yml
---

- name: Copy app file onto webservers 
  become: true
  hosts: webservers
  tasks:
    - name: Upload application file
      copy:
        src: ~/proj-ansible/one/files/index.php
        dest: /var/www/html
        mode: 0755
```

To test it,
```bash
$ ansible-playbook playbooks/setup-app.yml
```

![](/img/docs/accflab81.png)

Now, the real test. When we check open the IPs on our browser, we should see the index file loaded.

![](/img/docs/accflab2.png)

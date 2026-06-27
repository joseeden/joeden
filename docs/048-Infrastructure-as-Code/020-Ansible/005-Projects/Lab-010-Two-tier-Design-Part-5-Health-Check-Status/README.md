---
title: "Two tier Design Part 5 Health Check Status"
description: "Two tier Design Part 5 Health Check Status"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 30
last_update:
  date: 12/11/2020
---

## Overview

This lab adds a validation playbook that checks whether the Apache service is running after the two-tier deployment.

Diagram:
![](/img/docs/ansible-lab-diagram-1.png)

As a final check, we'll just create a simple playbook that checks the status of Apache
```yml
# setup-check-status.yml
---

- name: Check status
  hosts: webservers:loadbalancers
  become: True
  tasks:
    - name: Check status of Apache
      command: service httpd status
```

To test,
```bash
ansible-playbook playbooks/setup-check-status.yml
```

Notice the purple text, where Ansible is suggesting to use the **service** module instead. If this is used, it will start-up httpd if it detects that it's not running.

![](/img/docs/accfcheckstatus.png)

Let's try to stop the httpd service on the loadbalancer,
```bash
$ ansible -m service -a "name=httpd state=stopped" --become loadbalancers

lb1 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/libexec/platform-python"
    },
    "changed": true,
    "name": "httpd",
    "state": "stopped",
    "status": {
```

If we re-run the healthcheck status playbook, we see that it now returns an **fatal** message in red.

![](/img/docs/accfphpwebstopped.png)

Now let's start apache,
```bash
$ ansible -m service -a "name=httpd state=started" --become loadbalancers
```

![](/img/docs/accfphpwebrestarted.png)

Running the healthcheck status playbook again,

![](/img/docs/accfphpwebstarted2x.png)

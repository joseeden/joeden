---
title: "Using Jinja2 Templates to Deploy motd"
description: "Using Jinja2 Templates to Deploy motd"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 69
last_update:
  date: 12/24/2020
---

## Overview

This lab renders a Jinja2 template to deploy a managed `/etc/motd` file to target hosts.

Diagram:
![](/img/docs/ansible-lab-diagram-2.png)

The tree-structure of our Project **One** currently looks like this. Don't worry if you see that there's already a lot of files in the directory. These are the files from the previous labs in this series. The only ones we'll really really need are also provided below.

<details><summary> Project One </summary>
 
![](/img/docs/planslab22tree.png)
 
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
<details><summary> symlink in root directory pointing to projects folder </summary>

```bash
$ ls -la | grep "\->"
lrwxrwxrwx  1 joseeden joseeden    70 Jan 14 23:03 proj-ansible-1 -> /mnt/c/Users/Eden Jose/4-Projects
```

</details>

For this lab, we'll have **two webservers** and **two dbservers**. Recall that we used a default **edendev.inv** inventory file for the previous labs. We'll be using a different inventory file for this lab and instead of changing the ansible.cfg, we'll just specify this new inventory file when we run the playbook.

<details><summary> edentst.inv </summary>
 
```bash
# edentst.inv

[webservers]
app1    ansible_host=13.251.146.254
app2    ansible_host=122.248.203.239

[dbservers]
db1    ansible_host=52.76.189.254
db2    ansible_host=54.255.28.202

[loadbalancers]
lb1     ansible_host=13.228.99.157

[local]
localhost   ansible_connection=local
```
 
</details>

The goal of this lab is to create a custom banner that displays the FQDN of the servers. This means that each server will have a different **message-of-the-day** display when you login to them.

Instead of manually creating a file for each, we'll utilize Jinja 2 templating.

Our **files/motd.j2** will look something like this:

<details><summary> files/motd.j2 </summary>

```jinja2
{# motd.j2 #}
{# -------------------------------------------------------------------- #}
{# Lines enclosed with braces and pound-sign are considered comments #}
{# This means they are skipped when Jinja2 template is read #}
{# -------------------------------------------------------------------- #}

The hostname for this system is: {{ ansible_facts['fqdn'] }}
```

</details>

Next, we'll create an Ansible playbook that will deploy the Jinja2 template to the servers.

<details><summary> deploy-jinja2-motd.yml </summary>
 
```bash
# deploy-jinja2-motd.yml
#-----------------------------------------
--- 
- name: Deploy motd.j2 to the servers
  hosts: all:!localhost
  become: true
  tasks:
  - name: Deploy motd.j2 to the servers
    template:
      src: ../files/motd.j2
      dest: /etc/motd
      owner: root
      group: root
      mode: "0644"
```
 
</details>

To run the playbook,
```bash
$ ansible-playbook playbooks/deploy-jinja2-motd.yml -i inventories/edentst.inv
```

When we login to one of the servers, we realize that from the server's perspective, their FQDN is *localhost*. This is the same for the rest of the other servers.

```bash
$ ssh eden@tstsvr1

The hostname for this system is: localhost.localdomain
Last login: Sun Jan 16 15:29:25 2022 from 1.2.3.4
[eden@tstsvr1 ~]$ 
```

Let's modify our motd.j2 and use **inventory_hotname** this time.

<details><summary> files/motd.j2 </summary>

```jinja2
{# motd.j2 #}
{# -------------------------------------------------------------------- #}
{# Lines enclosed with braces and pound-sign are considered comments #}
{# This means they are skipped when Jinja2 template is read #}
{# -------------------------------------------------------------------- #}

The hostname for this system is: {{ inventory_hostname }}]
```

</details>

When we run the playbook once again and log in to one of the servers, we see that the motd correctly display the hostname of the servers.

```bash
$ ansible-playbook playbooks/deploy-jinja2-motd.yml -i inventories/edentst.inv
```
![](/img/docs/lab23motd.png)

```bash
$ ssh eden@tstsvr1

The hostname for this system is: app1
Last login: Sun Jan 16 23:13:47 2022 from 1.2.3.4
[eden@tstsvr1 ~]$ 
```

Now that we've accomplish the goal, let's do other tests. Let's include the IP of the server in the motd.

<details><summary> files/motd.j2 </summary>

```jinja2
{# motd.j2 #}
{# -------------------------------------------------------------------- #}
{# Lines enclosed with braces and pound-sign are considered comments #}
{# This means they are skipped when Jinja2 template is read #}
{# -------------------------------------------------------------------- #}

The hostname for this system is: {{ inventory_hostname }}:{{ ansible_facts["default_ipv4"]['address'] }}
```

</details>

Running the playbook again, we see that there was something changed on the servers.

![](/img/docs/planslab23motdnew.png)

```bash
$ ssh eden@tstsvr1

The hostname for this system is: app1:172.31.2.181
Last login: Mon Jan 17 00:26:44 2022 from 1.2.3.4 
```

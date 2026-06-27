---
title: "Lab 018: Using Ansible Vault"
description: "Lab 018: Using Ansible Vault"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 180
last_update:
  date: 12/19/2020
---

## Overview

**Diagram:**
![](/img/docs/ansible-lab-diagram-1.png)

Still in project **two**, we'll create a **secrets.yml** file in our **vars** directory. Once you run the command below, it will prompt you to enter the password twice, afterwards it'll open the file where you can enter any secrets or passwords or keys.

```bash
$ ansible-vault create vars/secrets.yml
```

![](/img/docs/accfvault2.png)

If we try to check the **secrets.yml**, we'll see that its contents are hashed.

![](/img/docs/accfvault3.png)

We'll then create a create a copy of **setup-app-roles.yml** and name it **setup-app-vault.yml** playbook.

We then add another task which uses the **debug** module to display the contents of the **secrets** file.

```bash
# setup-app-roles.yml
---

- name: Copy app file onto webservers 
  hosts: webservers
  become: true

  vars_files:
    - ~/proj-ansible-1/two/roles/webservers/vars/secrets.yml
    
  roles:
    - webservers
   
  tasks:
    - name: Display the secrets
      debug:
        msg: "{{ superpassword }}"        
```

Now when we run it, we see it returns the errors. This is because it doesn't know how to decrypt the file.

![](/img/docs/accfvaultfailed.png)

To run the playbook, we need to tell it to ask for the vault password using the `--ask-vault-pass` parameter.

```bash
$ ansible-playbook setup-app-vault.yml --ask-vault-pass 
```

![](/img/docs/accfvaultsuccess.png)

At the end, we see the task for the debug returning the contents of the **secrets** file.

![](/img/docs/accfsecretsreturned.png)

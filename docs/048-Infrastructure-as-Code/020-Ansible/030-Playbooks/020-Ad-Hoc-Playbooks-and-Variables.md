---
title: "Ad Hoc Commands, Playbooks, and Variables"
description: "Ad Hoc Commands, Playbooks, and Variables"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 30
last_update:
  date: 12/15/2020
---

## Ad-hoc Commands

These are commands tha can be ran on the command line which can be one-off command or for testing and troubleshooting. Type **ansible** and press tab twice.
```bash
joseeden@EdenJose:one$ ansible
ansible             ansible-connection  ansible-doc         ansible-inventory   ansible-pull
ansible-config      ansible-console     ansible-galaxy      ansible-playbook    ansible-vault
```


### Listing hosts

```bash
joseeden@EdenJose:one$ ansible --list-hosts webservers
  hosts (4):
    tstsvr1
    tstsvr2
    tstsvr3
    tstsvr4
joseeden@EdenJose:one$ ansible --list-hosts loadbalancers
  hosts (1):
    lb1
joseeden@EdenJose:one$ ansible --list-hosts local
  hosts (1):
    localhost
```
We can also use wildcards.
```bash
joseeden@EdenJose:one$ ansible --list-hosts "*"
  hosts (6):
    app1
    app2
    app3
    app4
    lb1
    localhost
joseeden@EdenJose:one$ ansible --list-hosts app*
  hosts (4):
    app1
    app2
    app3
    app4
```

List webservers **or** loadbalancers.
```bash
joseeden@EdenJose:one$ ansible --list-hosts webservers:loadbalancers
  hosts (5):
    app1
    app2
    app3
    app4
    lb1
```

List everything except local.
```bash
joseeden@EdenJose:one$ ansible --list-hosts \!local
  hosts (5):
    app1
    app2
    app3
    app4
    lb1
```

List first and fourth element in the array.
```bash
joseeden@EdenJose:one$ ansible --list-hosts webservers[0]
  hosts (1):
    app1
joseeden@EdenJose:one$ ansible --list-hosts webservers[3]
  hosts (1):
    app4
```


### Running shell commands

```bash
joseeden@EdenJose:data-eden$ ansible -m shell -a "uname" webservers
app1 | CHANGED | rc=0 >>
Linux
app4 | CHANGED | rc=0 >>
Linux
app2 | CHANGED | rc=0 >>
Linux
app3 | CHANGED | rc=0 >>
Linux
```

Note the **rc**. This is a return code.
- rc-0 means sucess
- rc=1 means failed


### Diplaying ansible_facts

Ansible facts are information about the servers that are gathered by Ansible whenever you run your playbook. This is normally done on the **Gathering phase**, but can also be run on the command line using the **setup** module.

```yaml
# Display information on all the servers in the webservers group
ansible -m setup webservers

# Display the information on localhost
ansible -m setup localhost

# Display the information on app1 only
ansible -m setup app1

# Display the information on the first device under the webservers group that's defined on the inventory list
ansible -m setup webservers[0]

# Display the information on the first three devices under the webservers group that's defined on the inventory list
ansible -m setup webservers[0:2]
```


### Creating Users on the Web servers

We'll first add some config for privilege escalation to our ansible.cfg to make sure that we can run the command on our web servers as the root user.
```bash
$ vim ansible.cfg

[defaults]
# E: variables for my personal lab
inventory = ~/proj-ansible-1/one/inventories/edendev.inv
remote_user = eden
private_key_file = ~/.ssh/id_rsa
host_key_checking = False
retry_files_enabled = False

[privilege_escalation]
become_method = sudo
become=True
become_user=root
become_ask_pass=False 
```

Now, to add users on all our webservers
```bash
$ ansible -m user -a "name=testeden password=admin123 state=present" webservers 
```

Note that on te output, the password are not display for security purposes.
![](/img/docs/plansadduser.png)


### Deleting Users on the Web servers

Of course, the users and password we created were not secured so we need to delete them. To do this, we just changed the **state** in the arguments to **absent**.

```bash
$ ansible -m user -a "name=testeden password=admin123 state=absent" webservers 
```

![](/img/docs/plansdeluser.png)


### Useful Modules

![](/img/docs/plansmod1.png)
![](/img/docs/plansmod2.png)
![](/img/docs/plansmod3.png)
![](/img/docs/plansmod4.png)
![](/img/docs/plansmod5.png)


### Command Modules

![](/img/docs/plansmod6.png)
![](/img/docs/plansmod.png)


### When and When Not to Use Ad-Hoc Commands

![](/img/docs/plansmod7.png)


## Playbooks

![](/img/docs/accf-pb1.png)
![](/img/docs/accf-pb2.png)
![](/img/docs/accf-pb3.png)
![](/img/docs/accf-pb4.png)


### Validating Playbooks

![](/img/docs/planssyntaxcheck.png)


## Variables

![](/img/docs/accfvars.png)

![](/img/docs/accfvars2.png)

### Naming Variables

![](/img/docs/plansnames1.png)

### Variable Scope 

![](/img/docs/plansnames2.png)

### Defining Variables

![](/img/docs/plansvars10.png)

### Managing Variables

![](/img/docs/plansvars11.png)

### Referencing Variables 

![](/img/docs/plansvars12.png)
![](/img/docs/kkvars1.png)

### Host Variables and Group Variables

![](/img/docs/plansvars13.png)
![](/img/docs/plansvars14.png)
![](/img/docs/plansvars15.png)

### Host-based Connection Variables

![](/img/docs/plansvar1.png)
![](/img/docs/plansvar2.png)
![](/img/docs/plansvar3.png)

### Local Variables

![](/img/docs/accfvars3.png)
![](/img/docs/plansvars16.png)
![](/img/docs/plansvars17.png)

### Registered Variables

![](/img/docs/plansregvars1.png)

![](/img/docs/accfregvar.png)

**Sample ad-hoc command:**
We can check the details of a particular host by using the **setup** module. This will return a JSON object which will ontain the ansible facts about the host. These same facts are also gathered during the **Gathering Facts** stage.

```bash
ansible -m setup app1
```

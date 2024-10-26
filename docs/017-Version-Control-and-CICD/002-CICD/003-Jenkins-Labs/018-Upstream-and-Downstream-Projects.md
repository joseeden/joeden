---
title: "Upstream and Downstream Projects"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 18
last_update:
  date: 7/7/2022
---



## Lab Environment

We'll be using the same setup we used during the previous labs for Jenkins and Ansible. We are utilizing Amazon EC2 instances as our remote machines:

- jenkinsmaster1

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

</div>

Note that for this lab, we'll only be using **jenkinsmaster1** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.


## Files used in this lab

We also used Ansible playbooks to setup the Jenkins lab. Currently we have Project **One**. The tree-structure of our Project **One** currently looks like this. Don't worry if you see that there's already a lot of files in the directory. These are the files from the previous labs in this series. 

- **Project One** 

  Note that we have alot of inventory files (.inv) inside the **inventories** folder. The file that will be using for this lab is **edenjen.inv** which is also shown next. 
  
  <div class='img-center'>

  <div class='img-center'>

  ![](/img/docs/jenslab07tree.png)

  </div>
  
  </div>
 
- **ansible.cfg**

  You can replace the **edendev.inv** with **edenjen.inv** with the path since that is the inventory file that we'll be using. If you rename the file, replace the **inventory** with the */path/to/your/inventoryfile*.

    ```bash
    # ansible.cfg

    [defaults]
    # E: variables for my personal lab
    inventory = ~/proj-ansible-1/one/inventories/edendev.inv
    remote_user = eden
    private_key_file = ~/.ssh/id_rsa
    host_key_checking = False
    retry_files_enabled = False
    timeout = 24
    gather_facts = smart

    [privilege_escalation]
    become_method = sudo
    become=True
    become_user=root
    become_ask_pass=True

    #ansible_managed = "# This file is managed by Ansible, all local changes will be lost !"
    #allow_world_readable_tmpfiles = True
    #precedence = all_plugins_play, all_inventory, groups_plugins_play, groups_inventory, all_plugins_inventory, groups_plugins_inventory
    #any_errors_fatal = True
    #timeout = 24

    [paramiko_connection]
    #record_host_keys = False

    [ssh_connection]
    scp_if_ssh = True
    pipelining = True
    ```
    
- **edenjen.inv** 

    We have an option to set this inventory file as our default one but since our uses different inventory files, we'll just specify the inventory when we run the playbook.


    ```bash
    [webservers]

    [jenkins]
    jenkinsmaster     ansible_host=13.228.99.157

    [local]
    localhost   ansible_connection=local
    ```


## Create Symlink (optional) 

To shorten the commands, you can also create a symlink in your root directory that points to the projects folder:

```bash
$ ls -la | grep "\->"
lrwxrwxrwx  1 joseeden joseeden    70 Jan 14 23:03 proj-ansible-1 -> /mnt/c/Users/Eden Jose/4-Projects
```


## Setting Up Ansible and Jenkins

If you have your Jenkins server already setup, you can skip this section. For this one, we'll just run the following Ansible playbook/s on our **jenkinsmaster1**. 

To setup Jenkins using Ansible, please see [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)



## Create the Folder for the Builds

Create a simple test job that will echo out a text. Also create a folder named **Test-builds**. To create the folder

```bash 
New Item > enter a folder name > Folder > Ok
```

<div class='img-center'>

![](/img/docs/orlab7createfolder.png)

</div>

<div class='img-center'>

![](/img/docs/orlab7createfolderdescription.png)

</div>

Back on the dashboard, you should now see the new folder created.

<div class='img-center'>

![](/img/docs/orlab7newfolercreated.png)

</div>


## Create the Upstream Project

Create a simple upstream job that will trigger the second job when it the upstream job is done.

```bash
New Item --> Enter an item name --> Freestyle project --> Ok 
```

<div class='img-center'>

![](/img/docs/lalab08ud.png)

</div>

In the **Build** section, click:

```bash
Add Builds Step --> Execute shell
```

In the Command field, enter:

```bash
echo 'I am the upstream project'
```

Then hit **Save**.

<div class='img-center'>

![](/img/docs/lalab08ud2.png)

</div>

Click **Build Now** to make sure it works. Open the most recent build under **Build History** in the left panel then open **Console Output**.

<div class='img-center'>

![](/img/docs/lalab08ud3.png)

</div>



## Create the Downstream Project

Create the downstream job the same way you created the upstream job.

```bash
New Item --> Enter an item name --> Freestyle project --> Ok 
```

<div class='img-center'>

![](/img/docs/lalab08dp1.png)

</div>

In the **Build Triggers** section, click:

```bash
Build after other projects are built --> Projects to watch: --> job-upstream
```

<div class='img-center'>

![](/img/docs/lalab08pd2.png)

</div>

In the **Build** section, click:
```bash
Add Builds Step --> Execute shell
```

In the Command field, enter:
```bash
echo 'I am the downstream project, triggered by the first one'
```

Then hit **Save**.

<div class='img-center'>

![](/img/docs/lalab08pd3.png)

</div>

Going back to the folder **Test-builds** page, we now have two

<div class='img-center'>

![](/img/docs/lalab08pd4.png)

</div>

Click the **job-stream** and then **Build Now**. Then click the latest build under the **Build History** in the left panel and click the **Console Output**.

You should see this line:
```bash
Triggering a new build of Test-builds » job-downstream 
```

<div class='img-center'>

![](/img/docs/lalab08updp1.png)

</div>

Exit out to the folder and here we'll see that the **job-downstream** now has a green checkmark beside it. This means it was triggered and the build was successful.

<div class='img-center'>

![](/img/docs/lalaobupdp2.png)

</div>

Click **job-downstream** then select the latest build under the **Build History** in the left panel. Click the **Console Output**.

<div class='img-center'>

![](/img/docs/lalab08updp3.png)

</div>


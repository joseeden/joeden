---
title: "Job Parameters"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 17
last_update:
  date: 7/7/2022
---




## Lab Environment

We'll be using the same setup we used during the previous labs for Jenkins and Ansible. We are utilizing Amazon EC2 instances as our remote machines:

- jenkinsmaster1
- jenkinsslave1

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster1** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Files used in this lab

We also used Ansible playbooks to setup the Jenkins lab. Currently we have Project **One**. The tree-structure of our Project **One** currently looks like this. Don't worry if you see that there's already a lot of files in the directory. These are the files from the previous labs in this series. 

- **Project One** 

  Note that we have alot of inventory files (.inv) inside the **inventories** folder. The file that will be using for this lab is **edenjen.inv** which is also shown next. 
  
  <div class='img-center'>

  ![](/img/docs/jenslab07tree.png)
  
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

:::info[NOTE]

Make sure [Ansible installed on your local machine](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-specific-operating-systems) before you can run any Ansible playbooks. Follow the link provided and install Ansible based on your operating system.

:::

To confirm if Ansible is successfully installed:

```bash
$ ansible --version
ansible 2.9.6
  config file = /mnt/c/Users/Eden Jose/Desktop/Git/3-Devops_Tools/4-Ansible_Jenkins/4-Projects/one/ansible.cfg
  configured module search path = ['/home/joseeden/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/lib/python3/dist-packages/ansible
  executable location = /usr/bin/ansible
  python version = 3.8.10 (default, Jun  2 2021, 10:49:15) [GCC 9.4.0] 
```

Next, create your inventory file. You can simply use/copy the **edenjen.inv** file and just replace the IP of the **jenkinsmaster1** with the IP of your remote machine.


### Run the playbooks

Create the **install-jenkins.yml** playbook. You can simply use the playbook below. 

```yaml title="install-jenkins.yml"
# installs jenkins
---

- name: Install jenkins
  hosts: jenkins
  become: true
  tasks:

    - name: Download files
      get_url:
        url: https://pkg.jenkins.io/redhat-stable/jenkins.repo
        dest: /etc/yum.repos.d/jenkins.repo
    
    - name: Download apt_key
      ansible.builtin.rpm_key:
        key: https://pkg.jenkins.io/redhat-stable/jenkins.io.key
        state: present

    - name: Upgrade all packages
      dnf:
        name: '*'
        state: latest

    - name: Ensure epel repo is present
      yum:
        name: https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
        state: present

    - name: Install Jenkins and Java using yum
      yum:
        name:
          - jenkins
          - java-11-openjdk-devel
        state: present 

    - name: Change shell for user 'jenkins'
      ansible.builtin.user:
        name: jenkins
        shell: /bin/bash
        state: present   

    - name: Force systemd to reread configs
      systemd:
        daemon_reload: yes

    - name: Ensures Jenkins is started
      systemd:
        name: jenkins
        enabled: yes
        state: started
    
    # Uncomment play below if you have firewalld
    # - name: FirewallD rules
    #   firewalld:
    #     permanent: yes
    #     immediate: yes
    #     service: 
    #       - jenkins
    #       - http
    #     port: 8080/tcp
    #     zone: public
    #     state: enabled

```

To run the playbook, run the command below. Note that my playbook is inside the **playbooks** folder while my inventory file is inside the **inventories** folder.

```bash
ansible-playbook playbooks/install-jenkins.yml -i inventories/edenjen.inv
```

### Set Password for Jenkins User

Since this is for labbing purposes only, I enabled shell login for the jenkins user. After you've run the playbook, login to your Jenkins server, switch to root, and set the password for the jenkins user.

```bash
passwd jenkins 
```

### Setup Jenkins Console 
 
Once done, get the IP of the machine and paste it to your web browser, followed by ":8080". It should look like this.

```bash
http://13.228.99.157:8080/ 
```

During the first time, Jenkins will display a **Getting Started** page where you will need to follow an instruction. Paste the password in the field.

<div class='img-center'>

![](/img/docs/jengetstart.png)

</div>

On the next page, you're given a choice to select the plugins to install or go with the suggested ones. For now we'll go with the suggested plugins.

<div class='img-center'>

![](/img/docs/jensugg.png)

</div>
<div class='img-center'>

![](/img/docs/jensugg2.png)

</div>

After the plugins are installed, Jenkins will now prompt you to create the first admin user.

<div class='img-center'>

![](/img/docs/jenadmin.png)

</div>

Next, you will need to configure the URL. Afterwards click **Save and Finish**. It should look like this.

```bash
http://13.228.99.157:8080/jenkins-lab 
```

<div class='img-center'>

![](/img/docs/jenurl.png)

</div>

Once the setup is done, you should be brought to the Jenkins landing page.

<div class='img-center'>

![](/img/docs/jen31andingpage.png)

</div>



## Create the Job with Parameters

Create a simple test job that will echo out a text. Also create a folder named **Test-builds**. To create the folder

```bash 
New Item > enter a folder name > Folder > Ok
```

Inside the folder, repeat the same process by clicking the **New item** then entering a project name but this time select **Freestyle project**.

<div class='img-center'>

![](/img/docs/jtlab5ni.png)

</div>

<div class='img-center'>

![](/img/docs/jtlab5ni2.png)

</div>

In the next page, configure the job. Enter a description then check the box for **This prooject is parameterized**. Click **Add parameter** then in the dropdown menu, select **String parameter**.

<div class='img-center'>

![](/img/docs/jtlab5ni3.png)

</div>

On the name field, let's set a variable called **FIRST_NAME**. Add a second parameter by clicking the **Add parameter** again. In the second one, set a variable called **LAST_NAME**.

<div class='img-center'>

![](/img/docs/jtlab5ni4.png)

</div>

Scroll down to the **Build** section then click **Add build step**. Select **Execute shell**.

<div class='img-center'>

![](/img/docs/jtlab5ni5.png)

</div>

In the **Command** field, enter the following line. Click **Save** afterwards.

```bash
echo "Hello there, $FIRST_NAME $LAST_NAME"
```

<div class='img-center'>

![](/img/docs/jtlab5ni6.png)

</div>

Back on the job page, you should now see a new tab on the left panel, **Build with Parameters**. Click this tab. Here we can specify any "first name" and "last name" before running the job. When the job is ran, this parameters are passed to the variables we set and then used by the job.

Set the names to "John Smith" then click **Build**.

<div class='img-center'>

![](/img/docs/jtlab5ni7.png)

</div>

Under the **Build History** section on the left panel, select the most recent build which will always be the first one on the list.

<div class='img-center'>

![](/img/docs/jtlab5ni8.png)

</div>

Click **Console Output** on the left panel.

<div class='img-center'>

![](/img/docs/jtlab5ni81.png)

</div>

Repeat the steps by going to the job page again and selecting **Build withh Parameters**. This time, use the names "Jane" and "Doe" then click **Build**.

<div class='img-center'>

![](/img/docs/jtlab5ni9.png)

</div>

On the console output, you should now see a new name printed.

<div class='img-center'>

![](/img/docs/jtlab5n1.png)

</div>

<div class='img-center'>

![](/img/docs/jtlab5n2.png)

</div>


## List Parameter


On the job page, click **Configure** on the left panel.

<div class='img-center'>

![](/img/docs/jtlab5new1.png)

</div>

Click **Add parameter** to add a third one then select **Choice parameter**.

<div class='img-center'>

![](/img/docs/jtlab5new2.png)

</div>

In the **Choices** field, enter the days of the week. 

<div class='img-center'>

![](/img/docs/jtlab5new3.png)

</div>

Next, let's modify our shell command. Afterwards, click **Save**.

```bash
echo "Hello there, $FIRST_NAME $LAST_NAME"
echo "How was your $WEEK?"
```

<div class='img-center'>

![](/img/docs/jtlab5howwasyourweek.png)

</div>

Back on the job page, click **Build with Parameters**. Enter any name for the `FIRST_NAME` and `LAST_NAME`. We now see a third one named **WEEK** which has a dropdown menu of the days of the week. Select a day then hit **Build**.

<div class='img-center'>

![](/img/docs/jtlab5new4.png)

</div>

In the console output of the most recent job, we now see a new message.

<div class='img-center'>

![](/img/docs/jtlab5new5.png)

</div>


## Basic Logic and Boolean

Click **Configure** and **Add parameter**. From the dropdown menu, select **Boolean Parameter**.

<div class='img-center'>

![](/img/docs/jtlab5bool1.png)

</div>

Set the variable `DISPLAY` for this parameter.

<div class='img-center'>

![](/img/docs/jtlab5bool2.png)

</div>

On the **Build** section, replace the command with this:

```bash
if [ "$DISPLAY" = "true" ]; then 
      echo "Hello $FIRST_NAME $LAST_NAME. How was your $WEEK?"
else 
     echo "Can't display message, please ensure you enabled display"
fi 
```

<div class='img-center'>

![](/img/docs/jtlab5bool3.png)

</div>

Click **Save** afterwards. 

Back on the job page, click **Build with Parameters**. Set the following values and let the box for **Display** unchecked. Hit **Build**.

<div class='img-center'>

![](/img/docs/jtlab5bool4.png)

</div>

On the console output of the latest build, you should see the "error" message saying it can't display the message.

<div class='img-center'>

![](/img/docs/jtlab5bool5.png)

</div>

Go back to the job page and click **Build with Parameters** again. This time, check the box for **Display** then click **Build**.

<div class='img-center'>

![](/img/docs/jtlab5bool6.png)

</div>

Checking the console output of the latest build, we now see the names displayed.

<div class='img-center'>

![](/img/docs/jtlab5bool7.png)

</div>


## Reference 

- [Jenkins, From Zero To Hero: Become a DevOps Jenkins Master](https://www.udemy.com/course/jenkins-from-zero-to-hero/)





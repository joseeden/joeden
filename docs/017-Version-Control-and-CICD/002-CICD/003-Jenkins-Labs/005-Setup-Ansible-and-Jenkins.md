---
title: "Setup Ansible and Jenkins"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Ansible]
sidebar_position: 5
last_update:
  date: 7/7/2022
---


## Overview 

To speed up the creation of testing environment for Jenkins, you can use Ansible playbooks. These playbooks contains the configuration that will be used by Jenkins. You just need to run the playbook and Ansible will take care of the entire installation process.


## Install Ansible 

Make sure [Ansible installed on your local machine](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-specific-operating-systems) before you can run any Ansible playbooks. Follow the link provided and install Ansible based on your operating system.

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


## Run the playbooks

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

## Set Password for Jenkins User

Since this is for labbing purposes only, I enabled shell login for the jenkins user. After you've run the playbook, login to your Jenkins server, switch to root, and set the password for the jenkins user.

```bash
passwd jenkins 
```

## Setup Jenkins Console 
 
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


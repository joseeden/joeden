---
title: "Jenkins Installation"
description: "Different ways to install Jenkins"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 15
last_update:
  date: 7/7/2022
---




## Pre-requisites

**Configure `JAVA_HOME` on Windows:**

- Right click My Computer and select Properties
- On the Advanced tab, select Environment Variables
- Edit `JAVA_HOME` to point to where the JDK software is located
- For example, `C:\Program Files\Java\jdk1.6.0_02`

**Configure Java_Home on Linux:**
- Login to your account and open the startup script file 
- The script is usually `~/.bash_profile`  file 
- It can also be the .bashrc depending on your envrionment settings

    ```bash
    vi ~/.bash_profile
    ```

- In the startup script, set `JAVA_HOME` and `PATH` 

    ```bash
    setenv JAVA_HOME jdk-install-dir
    setenv PATH $JAVA_HOME/bin:$PATH
    export PATH=$JAVA_HOME/bin:$PATH
    ```

- jdk-install-dir is the JDK installation director, which should be something similar to /usr/java/jdk1.5.0_07/bin/java

    - **Bourne shell:**

      ```bash
      JAVA_HOME=jdk-install-dir
      export JAVA_HOME
      PATH=$JAVA_HOME/bin:$PATH
      export PATH
      ```

    - **Korn and bash shells:**
      
      ```bash
      export JAVA_HOME=jdk-install-dir
      export PATH=$JAVA_HOME/bin:$PATH
      ```

- Type the following command to activate the new path settings immediately:

    ```bash
    source ~/.bash_profile 
    ```

- Verify new settings:

    ```bash
    echo $JAVA_HOME
    echo $PATH
    ```


## Install using Ansible 

Reference: [Official Jenkins documentation.](https://www.jenkins.io/doc/book/installing/linux/#red-hat-centos). 


The outline of the steps are:

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install epel-release java-11-openjdk-devel
sudo yum install jenkins
sudo systemctl daemon-reload 
```

From the outline above, we build our playbook piece by piece. After some trial and error, I have arrive to this final playbook.

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
      yum:
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
 
To run the playbook:

```bash
ansible-playbook install-jenkins-on-lb1.yml 
```

Once it's done, get the IP of the machine and paste it to your web browser, followed by ":8080".

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

Next, you will need to configure the URL. Afterwards click **Save and Finish**.

```bash
http://13.228.99.157:8080/jenkins-lab 
```

<div class='img-center'>

![](/img/docs/jenurl.png)

</div>




## Install using Docker

This section outlines how to set up Jenkins using Docker, providing a quick and efficient way to run Jenkins in a containerized environment.

```yaml title="docker-compose-jenkins.yml"
# docker-compose-jenkins.yml

version: '3'
services:
  jenkins:
    container_name: jenkins
    image: jenkins/jenkins
    ports:
      - "8080:8080"
    volumes:
      - $PWD/jenkins_home:/var/jenkins_home
    networks:
      - net
networks:
  net: 
```

**Steps to Install Jenkins using Docker**

1. Save YAML configuration as `docker-compose-jenkins.yml`.

2. Open a terminal and navigate to the directory containing the YAML file.

3. Execute the following command to start Jenkins:  

     ```bash
     docker-compose up -d
     ```



## Access the Jenkins UI  

After you install Jenkins, you can access the Jenkins portal:

1. Open a web browser and go to `http://localhost:8080`.  

2. This will load the Jenkins setup page.

3. Retrieve the initial admin password by running:  

     ```bash
     docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
     ```  

4. Copy the password and paste it into the setup page to unlock Jenkins.

5. Follow the instructions to install recommended plugins and set up your admin user.

9. Once the setup is complete, you can now start creating jobs.
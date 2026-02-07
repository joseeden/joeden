---
title: "Setup Tomcat as Staging Environment"
description: "Using Tomcat as a Staging Environment"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
- Tomcat
sidebar_position: 6
last_update:
  date: 5/15/2020
---



## Overview

Apache Tomcat can serve as an effective staging environment for testing applications before production. By deploying to Tomcat, teams can evaluate application functionality in a controlled setting, ensuring it meets quality standards before full release. 

- Supports testing with similar configurations as the production environment.
- Allows for validation of deployment processes and troubleshooting.
- Enables integration testing with other services in a near-production setting.

## Lab Environment

In this lab, we have the following Linux machines, and we will use a local computer (laptop) to connect to them.

- jenkinsmaster

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Install Tomcat 
 
For labbing purpose, we'll just install the Tomcat in the same Jenkins server. Currently, our Jenkins server is on a RHEL 8 Machine. Following this links:

- [How to Install Apache Tomcat in RHEL 8](https://www.tecmint.com/install-apache-tomcat-in-rhel-8/)
- [Install Apache Tomcat 9 on CentOS 8 / RHEL 8](https://computingforgeeks.com/install-apache-tomcat-9-on-linux-rhel-centos/)

Note that Java must first be installed. To check:

```bash
$ java --version

openjdk 11.0.14 2022-01-18 LTS
OpenJDK Runtime Environment 18.9 (build 11.0.14+9-LTS)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.14+9-LTS, mixed mode, sharing)
```

Once done, install tomcat on the Jenkins server. We have an option to follow the steps from the two links above but since I wanted to make sure I can re-run this lab multiple times without the need to input any commands, I created an Ansible playbook

```yaml title="install-tomcat.yml"
# installs tomcat - needed for Jenkins lab
---

- name: Install tomcat
  hosts: jenkins
  become: true
  tasks:

    - name: Ensure group "tomcat" exists
      ansible.builtin.group:
        name: tomcat
        state: present
        system: true

    - name: Add user+group for Tomcat
      ansible.builtin.user:
        name: tomcat
        shell: /bin/false
        groups: tomcat
        home: /usr/local/tomcatlink
        state: present   

    - name: Get latest version of Tomcat and set in variable
      set_fact:
        ver: 9.0.58

    - name: Download files for Tomcat
      get_url:
        url: https://archive.apache.org/dist/tomcat/tomcat-9/v{{ ver }}/bin/apache-tomcat-{{ ver }}.tar.gz
        dest: /usr/local

    - name: Extract downloaded archive for Tomcat
      ansible.builtin.unarchive:
        src: /usr/local/apache-tomcat-{{ ver }}.tar.gz
        dest: /usr/local
        remote_src: yes    
        owner: tomcat 
        group: tomcat          

    - name: Create symbolic link for Tomcat - Getting error so create dir dirst
      ansible.builtin.file:
        src: /usr/local/apache-tomcat-{{ ver }}
        name:  /usr/local/tomcatlink
        state: directory
        # force: yes     

    - name: Empty dir
      ansible.builtin.file:
        src: /usr/local/apache-tomcat-{{ ver }}
        name: /usr/local/tomcatlink
        state: absent
        # force: yes  

    - name: Create symbolic link for Tomcat
      ansible.builtin.file:
        src: /usr/local/apache-tomcat-{{ ver }}
        name: /usr/local/tomcatlink
        state: link  
        owner: tomcat 
        group: tomcat
        force: yes     

    - name: Set ownership of symbolic link for Tomcat
      ansible.builtin.file:
        name: /usr/local/tomcatlink
        state: link  
        owner: tomcat 
        group: tomcat

    - name: Create /etc/systemd/system/tomcat.service
      copy:
        dest: "/etc/systemd/system/tomcat.service"
        content: |
          [Unit]
          Description=Apache Tomcat Server
          After=syslog.target network.target

          [Service]
          Type=forking
          User=tomcat
          Group=tomcat

          Environment=CATALINA_PID=/usr/local/tomcatlink/temp/tomcat.pid
          Environment=CATALINA_HOME=/usr/local/tomcatlink
          Environment=CATALINA_BASE=/usr/local/tomcatlink

          ExecStart=/usr/local/tomcatlink/bin/catalina.sh start
          ExecStop=/usr/local/tomcatlink/bin/catalina.sh stop

          RestartSec=10
          Restart=always
          [Install]
          WantedBy=multi-user.target

    - name: Change tomcat port to use 8081
      ansible.builtin.replace:
        path: /usr/local/apache-tomcat-{{ ver }}/conf/server.xml
        regexp: '(\s+)<Connector port="8080"(\s+.*)'
        replace: '\1<Connector port="8081"\2'        

    # Uncomment play below if you have firewalld
    # - name: FirewallD rules
    #   firewalld:
    #     permanent: yes
    #     immediate: yes
    #     port: 8081/tcp
    #     zone: public
    #     state: enabled

    - name: Configure users on tomcat-users.xml
      ansible.builtin.lineinfile:
        path: /usr/local/tomcatlink/conf/tomcat-users.xml
        insertbefore: "^</tomcat-users>"
        line: |
          <role rolename="admin-gui"/>
          <role rolename="manager-gui"/>
          <user username="tomcat1" password="tomcat1993" roles="admin-gui,manager-gui,manager-script"/>

    - name: Enable Remote Access to Tomcat Manager 
      ansible.builtin.lineinfile:
        path: /usr/local/apache-tomcat-{{ ver }}/webapps/manager/META-INF/context.xml
        regexp: 'allow="127\.\d+\.\d\+\.\d\+|::1|0:0:0:0:0:0:0:1" />'
        line: '         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1 |.*" />'        
        state: present

    - name: Enable Remote Access to Tomcat Host-manager 
      ansible.builtin.lineinfile:
        path: /usr/local/apache-tomcat-{{ ver }}/webapps/host-manager/META-INF/context.xml
        regexp: 'allow="127\.\d+\.\d\+\.\d\+|::1|0:0:0:0:0:0:0:1" />'
        line: '         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1 |.*" />'        
        state: present

    - name: Force systemd to reread configs
      systemd:
        daemon_reload: yes

    - name: Ensures Tomcat is started
      systemd:
        name: tomcat
        enabled: yes
        state: started
```
 

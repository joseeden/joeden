---
title: "Archive Build Artifacts"
description: "Using a CI Workflow to store artifacts"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 16
last_update:
  date: 7/7/2022
---


## Lab Environment

We are utilizing Amazon EC2 instances as our machines:

- jenkinsmaster

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Jenkins using Ansible

If you have your Jenkins server already setup, you can skip this section. For this one, we'll just run the following Ansible playbook/s on **jenkinsmaster**. The playbook will perform the entire installation of Jenkins on this machine.

To setup Jenkins using Ansible, please see [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)

## Using a CI Workflow

When building and testing software, developers usually follow a **Continuous Integration Workflow**. The process begins with compiling, testing, and packaging the code. Afterward, an artifact is generated and archived for future use. 

<div class='img-center'>

![](/img/docs/1026-jenkins-artifacts-ci-workflow.png)

</div>

The artifact is then deployed to a staging environment for Quality Engineering (QE) testing. This workflow helps streamline the development cycle and ensures consistent build and test practices.



## Artifacts 

> **This is continuation of the Maven-based Jenkins lab.**


In the **maven-project** job, click **Configure**. Then in the **Post-build Actions** section, click the dropdown menu and select **Archive the artifacts**.

In the **Files to archive** field, we'll put in the file that we want to archive. This file can be used to deploy to servlet containers such as tomcat.

<div class='img-center'>

![](/img/docs/archiveart1.png)

</div>


Use **"**/*.war"** - this means to archive all .war files in the current workspace. Then, click **Save**. 

<div class='img-center'>

![](/img/docs/archiveart2.png)

</div>

Trigger the build by clicking **Build Now**. Refresh the job page once build is done. There should now be a **Last Successful Artifacts**

<div class='img-center'>

![](/img/docs/succart1.png)

</div>

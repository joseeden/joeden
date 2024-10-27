---
title: "Source Control Polling"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven]
sidebar_position: 13
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


## Polling

> **This is continuation of the Maven-based Jenkins lab.**

In this scenario, Jenkins is polling the source code repository for nay changes. If it detects updates, it will trigger a build. This can be configured in the **Build Triggers** section. Tick the checkbox for **Poll SCM** then put in the cron schedule (how frequest Jenkins will poll the repsitory.)

As a recap, each line in cron consists of 5 fields separated by TAB or whitespace.

<div class='img-center'>

![](/img/docs/1026-jenkins-source-control-polling.png)

</div>

In our example, we'll set it to poll every minute.

<div class='img-center'>

![](/img/docs/jencron2.png)

</div>

A new tab should appear on the panel on the left. After a minute, click **Git polling log**.

<div class='img-center'>

![](/img/docs/gitpolllog.png)

</div>
 

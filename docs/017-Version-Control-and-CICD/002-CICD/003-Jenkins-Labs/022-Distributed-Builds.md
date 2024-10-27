---
title: "Distributed Builds"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 22
last_update:
  date: 7/7/2022
---



## Lab Environment

We are utilizing Amazon EC2 instances as our machines:

- **jenkinsmaster1**
- **jenkinsslave1**

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>


## Setting Up Jenkins using Ansible

If you have your Jenkins server already setup, you can skip this section. For this one, we'll just run the following Ansible playbook/s on **jenkinsmaster1**. The playbook will perform the entire installation of Jenkins on this machine.

To setup Jenkins using Ansible, please see [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)


## Distributed Builds

Distributed builds allow build jobs to run on separate agents (nodes), while the master controls and assigns specific builds to specific agents, enhancing parallelism and supporting multiconfiguration setups.

For more information, please see [Distributed Builds.](/docs/017-Version-Control-and-CICD/002-CICD/002-Jenkins-Notes/022-Distributed-Builds.md)
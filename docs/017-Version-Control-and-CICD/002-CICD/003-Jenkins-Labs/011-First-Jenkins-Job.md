---
title: "First Jenkins Job"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Lab Environment

We are utilizing Amazon EC2 instances as our machines:

- jenkinsmaster1

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster1** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Jenkins using Ansible

If you have your Jenkins server already setup, you can skip this section. For this one, we'll just run the following Ansible playbook/s on **jenkinsmaster1**. The playbook will perform the entire installation of Jenkins on this machine.

To setup Jenkins using Ansible, please see [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)


## Create the Job 

To create a job, we can click the **New Item** on the left panel or simply click the **Create a job**.

<div class='img-center'>

![](/img/docs/jen1job.png)

</div>

Enter a project name in the field. For this example, we'll just select **Freestyle project** and then **Ok**. 

<div class='img-center'>

![](/img/docs/jen1job1.png)

</div>

You can then configure the job in the next page where you will see different sections.

- **Discard old builds** - this allows limiting the number of builds stored in history. This ensures that the builds doesn't take up space/memory.

    <div class='img-center'>

    ![](/img/docs/jen1job2.png)

    </div>

- **Source code management** - you can specify the git URL and the branch here. For now we'll just leavee it to **None**.

    <div class='img-center'>

    ![](/img/docs/jen1job3.png)

    </div>

- **Build Triggers** - if no option is selected, then the buidl will be triggered manually. In our example, we'll trigger the job manually.

    <div class='img-center'>

    ![](/img/docs/jen1job4.png)

    </div>

- **Build Steps** - here we can define what we want the job to do.

    <div class='img-center'>

    ![](/img/docs/jen1job5.png)

    </div>

In our example, we'll select **execute shell**. Then in the command field, enter *echo "hello world!"*.

<div class='img-center'>

![](/img/docs/jen1job6.png)

</div>
<div class='img-center'>

![](/img/docs/jen1job7.png)

</div>

The last section is the **Post-build** - this is where we normally configure the notification. For this example, we'll leave this section blank. Click **Save**.

<div class='img-center'>

![](/img/docs/jen1job8.png)

</div>

Going back to our dashboard, we see our first job.

<div class='img-center'>

![](/img/docs/jen1job9.png)

</div>

To run our first Jenkins job, select the job and click **Build Now** on the left panel.

<div class='img-center'>

![](/img/docs/jenbuildnow.png)

</div>

Check the finished build under the **Build History**. Then on the build page, click the **Console Output** on the left panel to see the output.

<div class='img-center'>

![](/img/docs/jen1buildnow.png)

</div>
<div class='img-center'>

![](/img/docs/jen1buildnow2.png)

</div>

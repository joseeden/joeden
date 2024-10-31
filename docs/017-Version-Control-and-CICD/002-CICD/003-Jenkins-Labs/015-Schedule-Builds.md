---
title: "Schedule Builds"
description: "Setting a schedule for build runs."
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Git, Github]
sidebar_position: 15
last_update:
  date: 7/7/2022
---


## Lab Environment

In this lab, we have the following machines, and we will use a local computer (laptop) to connect to them.

- jenkinsmaster

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Jenkins

If you have your Jenkins server already setup, you can skip this section. There's an option to manually install Jenkins on a Linux machine or you can also use Ansible playbooks to perform the entire installation of Jenkins on this machine.

To setup Jenkins:

- [Install Jenkins on Linux](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/004-Installing-Jenkins.md)
- [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)



## Using Scheduled Builds

When to use Scheduled Builds?

- For very long running build jobs.
- For jobs where quick feedback is less critical 
- For intensive load and performance tests which may take hours.


## Install the Plugin 

For this one, we need to install the **Schedule Build** plugin from the **Manage Jenkins > Manage plugins > Available**

<div class='img-center'>

![](/img/docs/schedbuild10.png)

</div>

Next, create a new folder **Test-Builds** and a new job called **local-log-viewer**.

<div class='img-center'>

![](/img/docs/llv1.png)

</div>

In the **Build** section, click the dropdown bar and select **Execute shell**. In the **Command** field, enter:

```bash
sudo cat /var/log/messages 
```

<div class='img-center'>

![](/img/docs/llv2.png)

</div>

Hit **Save** afterwards. Back in the Project page, click the **Schedule Build** in the left panel.

<div class='img-center'>

![](/img/docs/llv3.png)

</div>

In the date field, I entered a date/time that will trigger the job after 2 minutes.

<div class='img-center'>

![](/img/docs/lv4.png)

</div>

In the **Build history** in the left panel, you should see how much time is remaining before the job is triggered.

<div class='img-center'>

![](/img/docs/llv5.png)

</div>

Once it's done, you should be able to click the build and see the console output.

<div class='img-center'>

![](/img/docs/llv6.png)

</div>

Now this is good if we just want a build to occur one time. If we want the build to be triggered in some particular intervals, like for example, every midnight, we can set up a "cron-based" schedule.

## Setup a Schedule 

To schedule the build, click **Configure** on the job and go to **Build Triggers > Build periodically**. Then put the cron syntax in the **Schedule** field.

<div class='img-center'>

![](/img/docs/llv8.png)

</div>

In th example, above, we want to run the job every 2 minutes so we used this cron syntax:

```bash
H/2 * * * *
```


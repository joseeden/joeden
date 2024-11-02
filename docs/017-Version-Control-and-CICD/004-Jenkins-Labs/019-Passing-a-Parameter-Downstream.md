---
title: "Passing a Parameter Downstream"
description: "Passing parameters across Jenkins Jobs"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 19
last_update:
  date: 7/7/2022
---



## Overview

> **This is a continuation of the previous lab on Upstream and Downstream Projects**

From the previous lab, we have two projects currently inside **Test-builds**.

<div class='img-center'>

![](/img/docs/lalaobupdp2.png)

</div>


## Lab Environment

In this lab, we have the following Linux machines, and we will use a local computer (laptop) to connect to them.

- jenkinsmaster

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Jenkins

If you have your Jenkins server already setup, you can skip this section. There's an option to manually install Jenkins on a Linux machine or you can also use Ansible playbooks to perform the entire installation of Jenkins on this machine.

To setup Jenkins:

- [Install Jenkins on Linux](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/004-Installing-Jenkins.md)
- [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)


## Install the Parameterized Plugin

Before we proceed, we need to install a plugin.

```bash
Manage Jenkins --> Manage Plugins --> Available --> Search for 'Parameterized Trigger'
```

Check the box beside the plugin and hit **Download now and install after restart**. In the next page, also check the box for **Restart Jenkins when installation is complete and no jobs are running.**

<div class='img-center'>

![](/img/docs/lalab09pluginpara.png)

</div>
<div class='img-center'>

![](/img/docs/lalab09pluginpara2.png)

</div>

Once it's done, you will need to log in again. 


## Configure the Downstream Job with the Parameter to be received

Go to your **job-downstream** again and click **Configure**.
Under **General**, click

```bash
This project is parameterized --> Add Parameter --> String Parameter 
```

Set a variable called `IMPORTANT_PARAM`:

<div class='img-center'>

![](/img/docs/lalab09importparam.png)

</div>

In the **Build Triggers** section, make sure that none of the boxes are checked. 

Under the **Build** section, change the command to:

```bash
echo 'I am the downstream proect, triggered by the first one'
echo 'Received this current build number from Upstream:' $IMPORTANT_PARAM
```

Hit **Save** afterwards.

<div class='img-center'>

![](/img/docs/lalab09dp1workingimportparam.png)

</div>


## Configure the Upstream Job with the Parameter to be passed

Exit out to the folder **Test-builds** then go to your **job-uptream** again and click **Configure**.

Under **Build step**, edit the **Execute shell** command:

```bash
echo 'I am the upstream project'
echo 'Current build number of upstream project:' $BUILD_NUMBER
```

<div class='img-center'>

![](/img/docs/lalab09backtobuildnumber.png)

</div>

Still in **Build step**, add a second step.

```bash
Add Build Step --> Trigger/call builds on other projects --> Projects to build --> job-downstream
```

Then add parameters,
```bash
Add parameter --> Predefined parameters 
```

In the Parameters field, enter the variable we set in the downstream project.
Set the variable to the build number. Click **Save** afterwards.

```bash
IMPORTANT_PARAM=$BUILD_NUMBER
```

<div class='img-center'>

![](/img/docs/lalab09upimportparambuildnumber.png)

</div>

Click **Build now** to test if it works. Then click the latest build under the **Build History** in the left panel and click the **Console Output**.

We see this line:
```bash
Current build number of upstream project: 24 
```

<div class='img-center'>

![](/img/docs/lalab09buildnowup2.png)

</div>

Exit out to the folder **Test-builds** then go to your **job-downtream** again. Then click the latest build under the **Build History** in the left panel and click the **Console Output**.

We see this line:
```bash
Received this current build number from Upstream: 24
```

<div class='img-center'>

![](/img/docs/lalab09buildnowdp.png)

</div>


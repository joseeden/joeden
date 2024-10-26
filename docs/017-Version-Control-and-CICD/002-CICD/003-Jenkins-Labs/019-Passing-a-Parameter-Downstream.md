---
title: "Passing a Parameter Downstream"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 19
last_update:
  date: 7/7/2022
---



## Overview

> **This is a continuation of the previous lab on Upstream and Downstream Projects**

From the previous lab, we have two projects currently inside **Test-builds**.

![](Images/lalaobupdp2.png)


## Install the Parameterized Plugin

Before we proceed, we need to install a plugin.

```bash
Manage Jenkins --> Manage Plugins --> Available --> Search for 'Parameterized Trigger'
```

Check the box beside the plugin and hit **Download now and install after restart**. In the next page, also check the box for **Restart Jenkins when installation is complete and no jobs are running.**

![](Images/lalab09pluginpara.png)
![](Images/lalab09pluginpara2.png)

Once it's done, you will need to log in again. 


## Configure the Downstream Job with the Parameter to be received

Go to your **job-downstream** again and click **Configure**.
Under **General**, click

```bash
This project is parameterized --> Add Parameter --> String Parameter 
```

Set a variable called `IMPORTANT_PARAM`:

![](Images/lalab09importparam.png)

In the **Build Triggers** section, make sure that none of the boxes are checked. 

Under the **Build** section, change the command to:

```bash
echo 'I am the downstream proect, triggered by the first one'
echo 'Received this current build number from Upstream:' $IMPORTANT_PARAM
```

Hit **Save** afterwards.

![](Images/lalab09dp1workingimportparam.png)


## Configure the Upstream Job with the Parameter to be passed

Exit out to the folder **Test-builds** then go to your **job-uptream** again and click **Configure**.

Under **Build step**, edit the **Execute shell** command:

```bash
echo 'I am the upstream project'
echo 'Current build number of upstream project:' $BUILD_NUMBER
```

![](Images/lalab09backtobuildnumber.png)

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

![](Images/lalab09upimportparambuildnumber.png)

Click **Build now** to test if it works. Then click the latest build under the **Build History** in the left panel and click the **Console Output**.

We see this line:
```bash
Current build number of upstream project: 24 
```

![](Images/lalab09buildnowup2.png)

Exit out to the folder **Test-builds** then go to your **job-downtream** again. Then click the latest build under the **Build History** in the left panel and click the **Console Output**.

We see this line:
```bash
Received this current build number from Upstream: 24
```

![](Images/lalab09buildnowdp.png)


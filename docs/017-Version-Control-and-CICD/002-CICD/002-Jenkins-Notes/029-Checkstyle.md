---
title: "Checkstyle"
description: "Adhering to coding practices using checkstyle"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 29
last_update:
  date: 7/7/2022
---



## Overview

Checkstyle is a code static analysis tool to help developers write Java code that adheres to a coding standard such as:

- Avoiding multiple blank lines 
- Removing unused variables 
- Enforcing correct indentations
 
To use this, we must first install the checkstyle plugin in Jenkins. Click **Manage Jenkins > Manage Plugins**.

<div class='img-center'>

![](/img/docs/manplugins.png)

</div>

Search for checkstyle. Unfortunately, it seems that this plugin has been removed totally so we may have to utilize a different one. A quick search online shows that some features have been deprecated and is replaced with [Warnings Next Generation](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Jenkins-Warnings-Plugin-CheckStyle-FindBugs-PMD-Example-Tutorial).

<div class='img-center'>

![](/img/docs/nocheckstyle.png)

</div>

We'll select the **Warnings Next Generation** for now and hit **Install without Restart**.

<div class='img-center'>

![](/img/docs/cswng.png)

</div>

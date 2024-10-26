---
title: Archive Build Artifacts"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 6
last_update:
  date: 7/7/2022
---



## Overview

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

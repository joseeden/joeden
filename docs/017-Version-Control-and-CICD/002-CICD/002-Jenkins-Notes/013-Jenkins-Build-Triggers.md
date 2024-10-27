---
title: "Jenkins Build Triggers"
description: "Triggers when Jenkins should run a Job"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 13
last_update:
  date: 7/7/2022
---


## Build Triggers 

Jenkins Build Triggers provide automatic ways to start builds based on specific events or schedules.

- Enable automatic builds without manual intervention
- Support flexibility to initiate builds based on project dependencies, schedules, and SCM changes


## Types of Triggers

- **Builds after projects are built**
    - Starts a job after other specified jobs finish successfully
    - Useful for chaining builds that rely on each other

<div class='img-center'>

![](/img/docs/1027-jenkins-build-after-projects-are-built.png)

</div>


- **Builds periodically**
    - Runs builds on a fixed schedule, using cron-style expressions
    - Ideal for automated nightly or scheduled builds

<div class='img-center'>

![](/img/docs/1027-jenkins-build-periodically.png)

</div>


- **GitHub hook trigger for GITScm polling**
    - Initiates a build based on push events in GitHub
    - Useful for continuous integration when code changes

<div class='img-center'>

![](/img/docs/1027-jenkins-github-hook-trigger.png)

</div>


- **Poll SCM**
    - Regularly checks for source control changes and triggers builds if changes are detected
    - Helps keep builds up-to-date with the latest codebase changes

<div class='img-center'>

![](/img/docs/1027-jenkins-poll-scmmm.png)

</div>


- **Trigger builds remotely**
    - Allows external systems to initiate builds through a unique URL or token
    - Suitable for triggering builds from scripts, webhooks, or other systems

<div class='img-center'>

![](/img/docs/1027-jenkins-Trigger-builds-remotely.png)

</div>
---
title: "Source Control Polling"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven]
sidebar_position: 3
last_update:
  date: 7/7/2022
---


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
 

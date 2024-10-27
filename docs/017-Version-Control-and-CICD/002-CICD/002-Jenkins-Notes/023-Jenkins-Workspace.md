---
title: "Jenkins Workspace"
description: "Where Jenkins saves all its configuration"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 21
last_update:
  date: 7/7/2022
---


## Jenkins Directory

When Jenkins runs a job that involves working with files or repositories, it stores them within a designated workspace directory on the Jenkins server. This workspace is unique to each job and located within the Jenkins home directory, following a structure like:

```
<JENKINS_HOME>/workspace/<job_name>/
```

In this path:

- `<JENKINS_HOME>`- the main Jenkins home directory
- `workspace` - the subdirectory containing workspaces for all jobs
- `<job_name>` - the specific job's name

In the Jenkins server (where Jenkins is installed), you can check this directory:

```bash
/var/lib/jenkins 
```

![](/img/docs/1027-jenkins-workspace.png) 


## Workspace 

The specific workspaces can be found here:

```bash
/var/lib/jenkins/workspace
```


## Jobs 

The jobs are stored in this directory:

```bash
/var/lib/jenkins/jobs
```




---
title: "Run jobs with Shared Runners"
description: "Run jobs with Shared Runners"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 6
---

## Overview

Shared runners are used to execute jobs on GitLab CI/CD pipelines. They are managed by GitLab and can be used by multiple projects, making it easy to run jobs without setting up dedicated infrastructure. 

For more information, please see [Manage runners.](https://docs.gitlab.com/ee/ci/runners/runners_scope.html)

## Pre-requisites 

- [Create a GitLab account](/docs/050-Version-Control-and-CICD/010-GitLab/001-GitLab-CICD.md#create-a-gitlab-account)
- [Create a Group](/docs/050-Version-Control-and-CICD/010-GitLab/001-GitLab-CICD.md#groups)
- [Create a Project](/docs/050-Version-Control-and-CICD/010-GitLab/001-GitLab-CICD.md#projects)
- [Create a Pipeline](/docs/050-Version-Control-and-CICD/010-GitLab/004-Pipelines.md#creating-a-pipeline)

## Modify the pipeline

Select the project and click the `.gitlab-ci.yml` > Edit > Edit in Pipeline Editor. Paste the code below:

```yaml
windows_job:
    tags:
        - shared_windows
    script:
        - echo "Windows OS Version"
        - systeminfo
linux_job:
    tags:
        - saas-linux-medium-amd64
    script:
        - echo "Linux OS Version"
        - cat /etc/os-release
macos_job:
    tags:
        - saas-macos-medium-m1
    script:
        - echo "Mac OS Version"
        - system_profiler SPSoftwareDataType
```

The tags specify the type of runners that will be used for this pipeline. Tags can be used for different use cases but for this example, we'll use it to specify the runner type. Click Commit changes.

![](/img/docs/12082024-gitlab-pipeline-running-2.png)

The new pipeline should now show "running" in the Pipelines page.

![](/img/docs/12082024-gitlab-pipeline-running.png)

Click the job number to show the status of the three jobs. We can see that the `macos_job` failed.

![](/img/docs/12082024-gitlab-pipeline-failed-macos-job.png)

If you click the failed job, you can see the exact error why it failed.

![](/img/docs/12082024-gitlab-pipeline-failed-macos-job-2.png)

Based on [Hosted runners on macOS](https://docs.gitlab.com/ee/ci/runners/hosted_runners/macos.html), MacOS runners are only available to premium users. Since we're only using the free trial account, we are not able to use MacOS runners.


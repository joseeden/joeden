---
title: "Install Third-Party Libraries"
description: "Install Third-Party Libraries"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 7
---



## Overview

To install third-party libraries in a GitLab CI/CD pipeline, you can specify the installation commands in the `before_script` section. This ensures that necessary libraries are installed before the main pipeline tasks begin, making them available for use during the job execution.

For more information, please see [Scripts and job logs.](https://docs.gitlab.com/ee/ci/yaml/script.html#set-a-default-before_script-or-after_script-for-all-jobs)

## Pre-requisites 

- [Create a GitLab account](/docs/017-Version-Control-and-CICD/010-GitLab/001-GitLab-CICD.md#create-a-gitlab-account)
- [Create a Group](/docs/017-Version-Control-and-CICD/010-GitLab/001-GitLab-CICD.md#groups)
- [Create a Project](/docs/017-Version-Control-and-CICD/010-GitLab/001-GitLab-CICD.md#projects)
- [Create a Pipeline](/docs/017-Version-Control-and-CICD/010-GitLab/004-Pipelines.md#creating-a-pipeline)

## Modify the pipeline

Select the project > Build > Pipeline Editor. Paste the code below and commit changes.

```yaml
workflow:
    name: Generate ASCII Framework 

ascii_job:
    before_script:
        - gem install cowsay
    script:
        - echo "Generating ASCII framework using COWSAY program"
        - cowsay -f dragon "Run for cover, I am a mighty DRAGON!" >> dragon.txt
        - grep -i "dragon" dragon.txt 
        - cat dragon.txt
```

Go to Jobs > Click the `ascii_job`.

![](/img/docs/12082024-gitlab-ascii-job.png)

## Using Scripts

Go back to main page and open the `.gitlab-ci.yml` file > Edit > Open in Web IDE.

![](/img/docs/12082024-gitlab-ascii-job-edit-in-web-ide.png)

In the Web IDE, create `ascii_script.sh` and move the contents of the script section here.

![](/img/docs/12082024-gitlab-ascii-job-edit-in-web-ide-add-script.png)

Modify the `.gitlab-ci.yml` file.

```yaml
workflow:
    name: Generate ASCII Framework 

ascii_job:
    before_script:
        - gem install cowsay
        - chmod +x ./ascii_script.sh
    script:
        - ./ascii_script.sh
    after_script:
        - echo "Done executing."
```

Click the Source Control icon on the left > Add commit message > Commit and push. 

![](/img/docs/12082024-gitlab-ascii-job-edit-in-web-ide-add-script-commit-4.png)

Go to Jobs and click the most recent `ascii_job`.

![](/img/docs/12082024-gitlab-ascii-job-edit-in-web-ide-add-script-commit-4-passed.png)
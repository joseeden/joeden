---
title: "Pipelines"
description: "GitLab Pipelines"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 4
last_update:
  date: 7/2/2024
---


## Overview 

A pipeline in GitLab defines the overall process that automates the build, test, and deployment workflow.

- Pipelines are triggered by events like code commits.
- They run jobs in defined stages, ensuring an efficient workflow.

Once a pipeline is triggered, it moves through stages and executes jobs as defined in the `.gitlab-ci.yml` file.

```yaml
workflow:
  name: app-pipeline
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

stages:
  - build 
  - unit_test
  - deploy

build:
  script:
    - echo "Building the application"

unit_test:
  stage: unit_test
  script:
    - echo "Running unit tests"

deploy:
  stage: deploy
  script:
    - echo "Deploying the application"
```

## Types of Pipelines  

GitLab offers different types of pipelines to suit various workflows:

- **Basic Pipeline**
    - Runs jobs in sequential stages.
    - Ideal for simple workflows.

- **DAG Pipeline**
    - Defines job dependencies in a Directed Acyclic Graph.
    - Allows parallel job execution when no dependencies exist.

- **Merge Request Pipelines**
    - Triggered by merge requests.
    - Validates changes before merging.

- **Merge Results Pipelines**
    - Runs after a merge request is merged.
    - Ensures the merged code works as expected.

- **Merge Trains**
    - Runs pipelines for multiple merge requests in order.
    - Prevents conflicts during merging.

- **Parent-child Pipelines**
    - Parent pipelines trigger child pipelines.
    - Helps manage complex workflows by splitting jobs.

- **Multi-project Pipelines**
    - Spans across multiple repositories.
    - Coordinates jobs across different projects.

## Creating a Pipeline 

:::info

A group and project has been created for this example. To create the group and project, please see [GitLab CiCD.](/docs/017-Version-Control-and-CICD/010-GitLab-Notes/001-GitLab-CICD.md#groups)

:::

Open your project > Setup CI/CD on the right panel > Configure pipeline

![](/img/docs/12082024-gitlab-homelabs-new-cicd.png)

A templated YAML file will be created for you. You can delete the contents the file for now.
 
![](/img/docs/12082024-gitlab-homelabs-new-cicd-2.png)

Paste this script and click Commit changes.

```yaml
first_job:
    script:
        - echo "Running my first job"
        - ls 
        - cat README.md 
```

Back in the repository page, a new `.gitlab-ci.yml` is created.

![](/img/docs/12082024-gitlab-homelabs-new-cicd-3.png)

To check back on the pipeline, go to Build > Pipelines. 

![](/img/docs/12082024-gitlab-homelabs-new-cicd-4.png)

Click the job then click the **test** stage. By default, if no stage is defined in the YAML file, it will use the test stage.

![](/img/docs/12082024-gitlab-homelabs-new-cicd-5.png)

On the right panel, you can see details about the build such as how long the build ran and the commit message.

![](/img/docs/12082024-gitlab-homelabs-new-cicd-6.png)

Going through the logs, we can see the individual steps that the runner took to deploy the change, involving preparing the executor and environment, as well as cloning the repository.

![](/img/docs/12082024-gitlab-homelabs-new-cicd-7.png)
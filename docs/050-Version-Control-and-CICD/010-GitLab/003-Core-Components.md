---
title: "Core Components"
description: "Core Components"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 3
last_update:
  date: 1/17/2023
---


## Overview 

GitLab CI/CD is made up of several core components that work together to automate the software development process, including pipelines, stages, jobs, and scripts.  

## Pipeline  

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

For more information, please see [Pipelines.](/docs/050-Version-Control-and-CICD/010-GitLab/004-Pipelines.md)

## Stages  

Stages group jobs that are executed sequentially. Each stage contains one or more jobs.

- Stages represent different phases like build, test, and deploy.
- Stages are executed in order, but jobs within the same stage can run in parallel.

Stages help organize the flow of tasks and improve pipeline efficiency.

```yaml
stages:
  - build
  - unit_test
  - deploy
```

## Jobs  

Jobs define the tasks that run during each stage. They contain the specific commands to execute.

- Jobs are executed in a stage and can be customized with scripts.
- Jobs can run in parallel within a stage to speed up the process.

Jobs are the individual units of work in the pipeline, and their execution determines the success or failure of each stage.

Job 1:

```yaml
build:
  script:
    - echo "Building the application"
```

Job 2:

```yaml
unit_test:
  stage: unit_test
  script:
    - echo "Running unit tests"
```

Job 3:

```yaml
deploy:
  stage: deploy
  script:
    - echo "Deploying the application"
```

To specify a runner, we can use tags. In this example, the job will use a runner with the tag `saas-linux`.

```yaml
deploy:
  stage: deploy
  tags:
    - saas-linux
  script:
    - echo "Deploying the application"
``` 

If no tag is defined, it will use the default runner.

 

## Script  

Scripts contain the actual commands that execute during a job.

- What needs to be run within each job (e.g., build commands, test scripts).
- Each job can have one or multiple commands in the script section.

The script section is essential for defining the specific operations to be carried out in the pipeline.

```yaml
script:
- echo "Starting build process"
- make build
```

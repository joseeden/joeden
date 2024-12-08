---
title: "GitLab CICD"
description: "Using GitLab CICD"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 1
# last_update:
#   date: 7/2/2024
---


## Overview 

GitLab CI/CD helps automate the software development process by integrating and deploying code efficiently. It streamlines tasks such as building, testing, linting, containerizing, and deploying, ensuring secure and consistent delivery pipelines.

![](/img/docs/12082024-gitlab-cicd.png)


## GitLab Runners 

GitLab Runners execute CI/CD jobs in your pipelines. They can be hosted by GitLab or managed by you.  

- **SaaS Runners** 

    - Hosted by GitLab and shared across projects. 
    - Simple to use, with no setup required.  

- **Self-managed Runners**

    - Hosted on your own infrastructure. 
    - Offers more control and customization options.  

    ![](/img/docs/12082024-gitlab-runners.png)


## How Runners Deploy Code  

Runners automate the process of turning committed code into deployed applications.  

1. Code is committed to the repository.  
2. GitLab CI/CD pipeline is triggered.  
3. Runner clones the repository to its local environment.  
4. Runner reads and executes the `.gitlab-ci.yml` script.  
5. Runners build the application.  
6. Tests and linting are performed.  
7. Security checks and containerization are applied.  
8. Application is deployed to the target environment. 


## GitLab CI/CD Configuration  

The GitLab CI/CD pipeline is defined in a .gitlab-ci.yml file, which specifies jobs like building, testing, and deploying. These jobs are executed by GitLab Runners.

```yaml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building the application"

test_job:
  stage: test
  script:
    - echo "Running tests"

deploy_job:
  stage: deploy
  script:
    - echo "Deploying the application"
```  

## Create a GitLab Account  

Creating a GitLab account allows you to access repositories, run CI/CD pipelines, and manage projects. 

1. Visit the [GitLab website](https://gitlab.com).  
2. Click on the "Sign up" or "Get free trial" button.  
3. Enter your name, email address, username, and password.  
4. You can also opt to sign in using Google account or Github account.
5. Complete the setup by adding additional details (optional).  
6. Start using GitLab for your projects.

## Limits 

GitLab's free trial offers a limited set of features and quotas.

1. Log in to your GitLab account.  
2. Click your profile photo > Edit Profile > Usage Quotas
4. Review the available usage limits for pipelines, storage, and other features.  

Each trial account has access of up to 400 compute units every month, which are used for running CI/CD jobs and other compute tasks. Make sure to monitor your usage to avoid hitting the monthly limit. For more information, please see [Compute minutes administration](https://docs.gitlab.com/ee/administration/cicd/compute_minutes.html).

![](/img/docs/12082024-gitlab-trial-limits.png)


## Groups 

In GitLab, groups are used to organize and manage multiple projects. A group allows teams to collaborate on related projects, share permissions, and centralize management. Groups help simplify user access and security by applying settings across all projects within the group.

To create a new group, go to Groups > New Group > Create Group

![](/img/docs/12082024-gitlab-groups.png)

Specify the details then click Create Group. 

![](/img/docs/12082024-gitlab-new-group.png)

## Projects  

Projects in GitLab are similar to repositories and serve as containers for your code, issues, CI/CD pipelines, and other resources. Each project can be used to manage a single application or multiple components of a larger system.  

1. Create a project to store and organize your code.  
2. Set up project settings, including access control and permissions.  
3. Manage issues, merge requests, and CI/CD pipelines within the project.  
4. Collaborate with team members and track project progress.  

To create a project, select the group > New project > Create blank project

![](/img/docs/12082024-gitlab-new-project.png)

Add a name to your project. You can choose to set it to private and you can also let it initialize a README file. Click Create project.

![](/img/docs/12082024-gitlab-new-project-details.png)

You should now see the README file of your new repository.

![](/img/docs/12082024-gitlab-new-project-details-2.png)
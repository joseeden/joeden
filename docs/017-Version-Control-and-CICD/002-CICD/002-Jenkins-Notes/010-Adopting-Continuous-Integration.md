---
title: "Adopting Continuous Integration"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 10
last_update:
  date: 7/7/2022
---


## Stages in Adopting Continuous Integration 

<div class='img-center'>

![](/img/docs/adopting-cicd.png)

</div>


## Continuous Integration/Continuous Deployment

Continuous Integration (CI) automates building and testing code with each commit, catching issues early. Continuous Deployment (CD) automates releasing code to production, making updates faster and more reliable. Together, CI/CD streamlines software delivery and improves quality.

![](/img/docs/1027-jenkins-cicd-complete-end-to-end.png)


For more information, please see [CICD Overview.](/docs/017-Version-Control-and-CICD/002-CICD/CICD-Overview.md)

## Jenkins 

Jenkins is an open-source automation server used to build, test, and deploy applications efficiently.

- Supports continuous integration and continuous delivery.
- Easy setup and management of automated build pipelines.
- Integrates with many tools and platforms for seamless workflows.

How it works:

1. Developers commit code to the code repository.
2. The commit automatically triggers a build in Jenkins.
3. Jenkins will through the code and perform the operations.
4. These operation include linting, testing, building, and packaging the code.
5. If the build fails, Jenkins send a notification to the team.
6. Developers fixed the code, commit the change, and Jenkins get triggered.

These steps repeat until the code passes and Jenkins deploys the code to the environment.

![](/img/docs/1027-jenkins-how-jenkins-works.png)
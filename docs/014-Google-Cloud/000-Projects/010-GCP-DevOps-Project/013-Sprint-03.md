---
title: "Sprint 03"
tags: 
- Google Cloud
- DevOps
- Cloud
sidebar_position: 13
last_update:
  date: 9/21/2020
---


## Todo

Todo:

✔️ Design Discussions
✔️ Explore CICD options


## Discussions

What we have: 

- Code written in Python 
- Code is hosted in Github 

What we want to do:

- Automate build of Docker image 
- Store the Docker image in an artifactory 
- Write the manifest files for Kubernetes deployment
- Setup CD to deploy code to GKE

Available GCP Tools: 

-  Cloud Build
    - CICD Tool 
    - Can automate docker image build 
    - Can be used to deploy image to GKE cluster
    - Serverless CI/CD platform 
    - No infrastructure to maintain 
    - Build logic is in YAML file 

- GCP Artifact Registry 
    - Store the Docker image 

Architecture:

![](/img/docs/gcp-devops-project-architecture-flow-how-app-will-be-deployed.png)

</details>
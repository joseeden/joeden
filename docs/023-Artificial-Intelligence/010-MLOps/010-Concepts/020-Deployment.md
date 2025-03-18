---
title: "Deployment"
description: "Preparing the model for deployment"
tags: 
- Machine Learning
- MLOps
sidebar_position: 20
# last_update:
#   date: 7/7/2022
---


## Preparing for Deployment  

Before deploying a machine learning model, we need to ensure it runs smoothly in production. This includes managing different runtime environments and using containers for consistency.  

## Development vs. Production  

Models go through different stages before deployment.  

- **Development**: Models are trained using sample data on a local machine or cloud.  
- **Production**: Deployed models process real-world data and make real-time predictions.  

Before full deployment, models may also run in a **testing environment** to identify and fix issues. However, differences in runtime environments can still cause problems.  

<div class="img-center"> 

![](/img/docs/testing-environment.png)

</div>

## Runtime Environments  

Development and production environments may have different software setups, which can lead to errors or performance issues.  

- Different Python versions, libraries, or dependencies can break the model.  
- Hardware, operating systems, or resource limitations may affect speed and accuracy.  

To solve this, we use **containers**.  

## Using Containers  

A container packages a program with all its dependencies to ensure consistent performance across environments.

- Works the same across different environments.  
- Build once, run anywhere.  
- Starts quickly with only necessary components.  

For more information, please see [Containerization.](/docs/015-Containerization/015-Docker/001-From-VMs-to-Containers.md)
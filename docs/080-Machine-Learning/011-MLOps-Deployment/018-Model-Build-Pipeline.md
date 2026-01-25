---
title: "Model Build Pipelines"
description: "Model Build Pipelines"
tags: 
- Machine Learning
- MLOps
sidebar_position: 18
last_update:
  date: 5/14/2023
---


## Overview

In MLOps, there are two key build pipelines: 

- **Model pipeline**
  - Sequence of steps like data cleaning 
  - Includes feature extraction, and making predictions

- **Model build pipeline**
  - Automates training the model and saves it for future use

The model build pipeline focuses on creating and saving the model, while the model pipeline deals with data processing and making predictions.

<div class="img-center"> 

![](/img/docs/all-things-data-Page-33.png)

</div>


## Key Components

A good model build pipeline does more than just train the model. It makes sure the model can be deployed, monitored, and reproduced.

- **Complete model package** - Includes the model and necessary artifacts for deployment
- **Deployment artifacts** - Includes specifications for software dependencies
- **Reproducibility** - Model can be recreated by tracking code and data versions

These features ensure that the model is ready for production, can be easily deployed, and can be trusted to perform consistently.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-084218.png)

</div>


## Reproducibility

Reproducibility shows that the model can be recreated with the same code and data, even at a later time.

- **Code versioning** tracks the exact code version used for training
- **Data versioning** records the version of the training data
- **Model metadata** store both code and data versions within the model's metadata

With reproducibility in place, we can ensure the model's integrity and trustworthiness over time.

## Monitoring the Model

Monitoring helps ensure that the model continues to perform as expected after deployment.

- Continuously monitor to confirm model behaves as expected
- Use data profiles to set expectations and monitor performance
- Catch issues early and keep model's performance in line with requirements

## Integrating with CI/CD

Integrating the model build pipeline into the CI/CD framework automates the entire process and ensures consistent model creation.

- Prevents unversioned code or data from being used to build the model
- The CI/CD pipeline handles the workflow, reducing manual errors

By connecting to CI/CD, you ensure that every model is built, tested, and deployed with the correct versions of code and data.

<div class="img-center"> 

![](/img/docs/all-things-data-ml-buil-pipeline-cicd.png)

</div>


---
title: "Model Registry"
description: "Model Registry"
tags: 
- Machine Learning
- MLOps
sidebar_position: 14
last_update:
  date: 5/15/2023
---


## ML Model Lifecycle  

ML models go through different stages from creation to deployment.  

- **Development**: Model is created and tested  
- **Staging**: Model is validated before deployment  
- **Production**: Model is used in real applications  

Models can be built manually or automatically. In automated pipelines, retraining may trigger deployment.  

## Throwing a Model Over the Fence  

Early ML workflows rely on manual handoffs.  

- A data scientist trains a model  
- The model is shared via email or USB  
- The operations team deploys it  

This approach lacks organization and automation.  

## First Steps to Automation  

A **model registry** helps bridge the gap between ML and Ops.  

- Stores models and related artifacts  
- Tracks the best-performing models  
- Marks models as ready for production  

The model registry serves a **central storage** where models are registered along with the necessary artifacts for deployment.

- Manages model lifecycle  
- Publishes production-ready models  
- Integrates with CI/CD pipelines  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-152615.png)

</div>

## Experimentation & Tracking  

After multiple experiment iterations, the experiment tracking system manages them.  

- Metadata from experiments is stored separately  
- Different model versions are tested  
- Results are recorded in a metadata store

<div class="img-center"> 

![](/img/docs/all-things-data-Page-35.png)

</div>


## Registering a Model  

Once the best model is selected, it is registered.  

- Promoted to the model registry  
- Triggers automated testing  
- Ensures smooth deployment  

## Deploying an Updated Model  

Once all the tests pass, the new model is then deployed to replace the old one.  

- Deployment updates prediction services  
- Old models are archived  

<div class="img-center"> 

![](/img/docs/all-things-data-Page-35-2.png)

</div>


## Model Decommissioning  

When a model is replaced, it is archived.  

- Keeps historical versions  
- Supports rollback if needed  

## Model Registry in MLOps  

A model registry is key to **managing ML models**.  

- **Storage**: Saves models and artifacts  
- **Lifecycle Management**: Controls versioning, validation, and deployment  

Some systems combine model tracking and registry, while others separate them.
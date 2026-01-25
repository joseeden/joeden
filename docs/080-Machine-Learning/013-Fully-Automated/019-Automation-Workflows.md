---
title: "Automation Workflows"
description: "Automation Levels"
tags: 
- Machine Learning
- MLOps
sidebar_position: 19
last_update:
  date: 5/15/2023
---

## Overview

Automation streamlines ML workflows and makes them faster and more reliable. This guide explains different levels of automation and key processes in ML operations.  

## ML Lifecycle  

Machine learning follows a structured process from design to deployment. While not everything can be automated, automation improves efficiency.  

- Design requires human input but can follow standardized steps  
- Automation reduces manual effort in development and operations  

## ML Automation     

ML systems evolve through different automation stages, improving speed and reliability.  

- **Manual**: No tracking, makes reproducibility difficult  
- **Semi-automated**: Some steps orchestrated for efficiency  
- **Fully automated**: Continuous pipelines update models seamlessly  

### Manual Workflow  

Most teams start with manual workflows, running experiments without automation.  

- Models are trained and deployed manually  
- No tracking, making it hard to reproduce results  

<div class="img-center"> 

![](/img/docs/all-things-data-Page-34.png)

</div>

### Semi-Automated Workflow  

Automation speeds up experimentation and deployment while improving tracking.  

- **Source code repository** stores ML code versions  
- **Feature store** provides reusable data inputs  
- **Model registry** saves trained models for deployment  

Continuous Delivery automates the process by using the latest trained model to deliver updated prediction services.

<div class="img-center"> 

![](/img/docs/all-things-data-Page-34-2.png)

</div>

Predictions are also monitored in real time, triggering retraining when performance drops. The ML team can also analyze performance metrics for further improvements.  

<div class="img-center"> 

![](/img/docs/all-things-data-Page-34-4.png)

</div>


### Fully Automated Workflow  

A fully automated system continuously retrains and updates models without manual intervention.  

- Continuous pipelines deliver the latest models  
- Prediction services update automatically  

A fully automated MLOps system improves the semi-automated setup by integrating the ML pipeline into a Continuous Delivery process and enables continuous updates and deployment of the latest models.

<div class="img-center"> 

![](/img/docs/all-things-data-Page-34-5.png)

</div>


## ML Automation in Design  

The design phase involves domain experts and business input, making full automation impossible.  

- Standardized workflows improve efficiency  
- Documentation ensures reproducibility  

## ML Automation in Development  

Automating development tasks speeds up training and improves model performance.  

- Version control tracks code changes  
- Orchestration tools automate training and tuning  

## ML Automation in Operations  

Operations benefit the most from automation, ensuring models remain reliable over time.  

- Automated testing checks data and model performance  
- Continuous monitoring detects and fixes issues  

## Automating Model Retraining  

Automated retraining ensures models stay accurate as data changes.  

1. Predictions are logged and monitored  
2. Performance metrics are stored in a metadata store  
3. If accuracy declines, retraining is triggered  
4. A new model is trained and deployed  


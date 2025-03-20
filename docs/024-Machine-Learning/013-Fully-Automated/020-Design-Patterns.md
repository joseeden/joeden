---
title: "Design Patterns"
description: "Design Patterns"
tags: 
- Machine Learning
- MLOps
sidebar_position: 20
last_update:
  date: 5/15/2023
---

## Software Design Patterns in MLOps

Design patterns are reusable solutions to common problems in software development, especially useful in machine learning operations (MLOps).

## Automate, Monitor, Respond

The **Automate, Monitor, Respond** pattern enhances system reliability by automating tasks, monitoring performance, and responding to issues.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-191620.png)

</div>

## Key MLOps Design Patterns

Three main design patterns are crucial for MLOps systems:

- Automated model retraining
- Model rollback
- Feature imputation

## Automated Model Retraining

To maintain model performance over time, automated retraining ensures the model stays current.

- **Run predictions**  
   - Use the latest trained model to generate predictions.  
   - Continuously monitor prediction accuracy.  

- **Monitor performance**  
   - Track statistics and detect performance dips.  
   - Trigger retraining when performance falls below the threshold.  

- **Retrain and deploy**  
   - Extract new data from the feature store for retraining.  
   - Automatically deploy the updated model.

## Model Rollback

If a new model fails to perform well, rollback to the last successful version.

- **Validation fail**  
   - The model fails the performance validation.  
   - Rollback is triggered to revert to a working model.  

- **Restore previous model**  
   - Automatically revert to last functional model version.  
   - Ensure stability with the rollback model.  

- **Redeploy the old model**  
   - Deploy previous model version to the prediction service.  
   - Minimize downtime while solving issues.

## Feature Imputation

Handle missing data by automatically imputing values to maintain model accuracy.

- **Data quality check**  
   - Monitor feature data for missing values.  
   - Trigger alarms when missing data exceeds a set threshold.  
   
- **Impute missing data**  
   - Use mean/median for numerical features.  
   - Use frequent category or "missing" category for categorical features.  
   
- **Fix defective features**  
   - Automatically replace missing data with statistical estimates.  
   - Ensure the data is complete for model training.